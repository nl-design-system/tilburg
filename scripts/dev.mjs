/* `pnpm dev [react|angular|all] [component] [--open] [--verbose]`: one command to work on components with live
   reload. With a component name (`pnpm dev tooltip`) the browser opens at that component's docs pages.

   The Storybooks load the React, Angular and Web Component libraries from their build output (dist/), so editing a
   component used to mean rebuilding by hand. This starts every library's watcher, waits for their first build,
   then starts the Storybook(s) on a free port (or points at one that is already running). While it runs it shows
   only rebuilds and errors, with the addresses and keys on the bottom lines; V shows all output, S only the
   Storybooks', O opens the browser, Q (or Ctrl-C) stops everything.

   Components-css (SCSS) and storybook-shared are read from source by the Storybooks, so they need no watcher. */
import { spawn } from 'node:child_process';
import { watchFile } from 'node:fs';
import { resolve } from 'node:path';
import { parseArgs } from 'node:util';
import { LIBRARIES, ROOT, STORYBOOKS } from './dev-config.mjs';
import { checkInstalled, checkInstallFresh, checkNode, identifyStorybook, libraryState } from './lib/checks.mjs';
import {
  c,
  confirm,
  fail,
  installCrashHandler,
  appendLog,
  newLogFile,
  printToolOutput,
  track,
  interactive,
  killTree,
  openUrl,
  printBanner,
  stepDone,
  stepFail,
  stepStart,
  stripAnsi,
} from './lib/cli-utils.mjs';
import { classifyFailure, reportStepFailure, runStepWithRecovery } from './lib/recovery.mjs';
import { requireComponent, storyUrl } from './lib/components.mjs';
import { processStart, readDevLock, SYNC_LOCK, updateDevLock, writeDevLock } from './lib/lock.mjs';
import { choosePort, printStorybookLinks, waitForStorybook } from './lib/storybook.mjs';

/* With the shared signal handlers until dev's own take over below: a SIGTERM or a closed terminal during the first
   pnpm install would otherwise end dev without stopping that install (it runs detached, so it outlives dev). */
installCrashHandler('pnpm dev');

const USAGE = 'pnpm dev [react|angular|all] [component] [--open] [--verbose]';
let values;
let positionals;
try {
  ({ values, positionals } = parseArgs({
    allowPositionals: true,
    options: { open: { type: 'boolean', short: 'o' }, verbose: { type: 'boolean' } },
  }));
} catch (err) {
  fail({ what: err.message, fix: USAGE });
  process.exit(1);
}
const NAMES = ['react', 'angular', 'all'];
const targets = positionals.filter((word) => NAMES.includes(word));
if (targets.length > 1) {
  fail({
    what: `One Storybook at a time, not ${targets.join(' and ')}`,
    fix: 'pnpm dev   (both), pnpm dev react or pnpm dev angular',
  });
  process.exit(1);
}
const target = targets[0] ?? 'all';
const componentQuery = positionals.filter((word) => !NAMES.includes(word)).join(' ');
/* `pnpm dev tooltip`: anything that is not a Storybook name is a component, opened in the browser once it runs. */
const component = componentQuery ? await requireComponent(componentQuery, 'pnpm dev') : null;
const openBrowser = Boolean(component) || Boolean(values.open);
let verbose = Boolean(values.verbose);

const storybookKeys = target === 'all' ? ['react', 'angular'] : [target];

/** Where to point the browser: the component's docs page in each Storybook (its own layer, else its HTML page). */
function pagesFor(storybookList) {
  if (!component) return storybookList.map((storybook) => `http://localhost:${storybook.port}/`);
  return storybookList.flatMap((storybook) => {
    const key = Object.keys(STORYBOOKS).find((name) => STORYBOOKS[name].name === storybook.name);
    const { layers } = component;
    const story =
      key === 'angular'
        ? (layers.angular.stories[0] ?? layers.html.stories[1])
        : (layers.react.stories[0] ?? layers.html.stories[0]);
    /* No story yet: the Storybook's start page, rather than nothing. */
    return [
      story?.id ? storyUrl(`http://localhost:${storybook.port}/`, story.id) : `http://localhost:${storybook.port}/`,
    ];
  });
}

/** Open the component (or the Storybooks) in the browser, saying what opens. */
function openPages(storybookList) {
  const pages = pagesFor(storybookList);
  if (component) {
    const what = pages.some((page) => page.includes('?path=')) ? '' : ' (no story yet, so the Storybook itself)';
    console.log(`  Opening ${component.name}${what}: ${pages.join('  ')}\n`);
  }
  pages.forEach(openUrl);
}
const libraries = LIBRARIES.filter((library) => library.for.some((key) => storybookKeys.includes(key)));

printBanner(`Dev · ${storybookKeys.map((key) => STORYBOOKS[key].name).join(' + ')}`);

// ─── 1. Can this work at all? ────────────────────────────────────────────────

const node = checkNode();
if (!node.ok) {
  fail({ what: `Node ${process.versions.node} is not the Node this repo uses`, why: node.detail, fix: node.note });
  process.exit(1);
}
if (node.warn) console.log(`  ${c.yellow}⚠${c.reset}  Node ${node.detail}: ${node.note}.`);
if (!checkInstalled().ok) {
  fail({ what: 'Dependencies are not installed', why: 'node_modules is missing.', fix: 'pnpm install' });
  process.exit(1);
}

// ─── 2. One pnpm dev at a time ───────────────────────────────────────────────

/* Two sets of watchers would write the same dist/ folders at once. Point at the running one instead. */
function pointAtRunning(running) {
  console.log(
    `  ${c.green}✓${c.reset}  pnpm dev is already running in another terminal (process ${running.pid}, since ${new Date(running.started).toLocaleTimeString('nl-NL')}).`,
  );
  if (running.storybooks?.length) printStorybookLinks(running.storybooks);
  if (component) openPages(running.storybooks ?? []);
  console.log(
    `  ${c.gray}Its watchers rebuild what ${running.storybooks?.length === 1 ? 'that Storybook shows' : 'those Storybooks show'}. ` +
      `For another set: q in that terminal, then pnpm dev here (pnpm dev react, pnpm dev angular or both).${c.reset}\n`,
  );
  process.exit(0);
}
/* Before the install question: an install would swap node_modules under the running one's watchers. `reap`: a pnpm dev
   that was killed hard left its watchers running; stop those. */
const running = readDevLock(undefined, { reap: true });
if (running) pointAtRunning(running);
/* pnpm sync packs (and so rebuilds) the same dist/ folders the watchers write. */
const syncing = readDevLock(SYNC_LOCK);
if (syncing) {
  fail({
    what: `pnpm sync is running (process ${syncing.pid})`,
    why: 'it rebuilds the same dist/ folders as the watchers pnpm dev would start, and two builds at once fail with EEXIST.',
    fix: 'wait for it to finish, then pnpm dev again',
  });
  process.exit(1);
}

// ─── 2b. Dependencies ─────────────────────────────────────────────────────────

const fresh = checkInstallFresh();
if (!fresh.ok) console.log(`  ${c.yellow}⚠${c.reset}  ${fresh.detail}: ${fresh.note}.`);
if (fresh.warn) {
  console.log(`  ${c.yellow}⚠${c.reset}  pnpm-lock.yaml differs from what is installed (a branch switch or pull?).`);
  if (await confirm('Run pnpm install first?', { default: true, fallback: false })) {
    try {
      await runStepWithRecovery('Installing dependencies', 'pnpm install', { cwd: ROOT });
    } catch (err) {
      reportStepFailure('pnpm install', err);
      process.exit(1);
    }
  }
}

// ─── 3. Ports ────────────────────────────────────────────────────────────────

const storybooks = [];
for (const key of storybookKeys) {
  const choice = await choosePort(
    STORYBOOKS[key],
    storybooks.map((storybook) => storybook.port),
  );
  if (choice.error) {
    fail({
      what: `No port for the ${STORYBOOKS[key].name}`,
      why: choice.error,
      fix: `lsof -i :${STORYBOOKS[key].port}`,
    });
    process.exit(1);
  }
  if (choice.running) {
    console.log(
      `  ${c.green}✓${c.reset}  ${STORYBOOKS[key].name} is already running on ${choice.port}; using that one.`,
    );
  } else if (choice.moved) {
    console.log(
      `  ${c.yellow}⚠${c.reset}  Port ${STORYBOOKS[key].port} is taken by ${choice.taken}; the ${STORYBOOKS[key].name} uses ${choice.port}.`,
    );
  }
  storybooks.push({ key, ...STORYBOOKS[key], port: choice.port, running: choice.running });
}
/* Another pnpm dev started in the seconds since the check above: it has the lock, so point at that one. */
if (!writeDevLock({ storybooks: storybooks.map(({ name, port, note }) => ({ name, port, note })) })) {
  const other = readDevLock();
  if (other) pointAtRunning(other);
}

// ─── 4. Processes ────────────────────────────────────────────────────────────

const processes = [];
let stopping = false;
let storybookOutput = false;
const time = () => new Date().toLocaleTimeString('nl-NL');

/* The last lines of the terminal while watching: every console.log goes above them, so they never scroll away. */
let footer = [];
let footerSource = [];
const printLine = console.log;
/* Rows, not lines: a terminal made narrower wraps the footer's lines onto more rows. */
const footerRows = () =>
  footer.reduce(
    (rows, line) => rows + Math.max(1, Math.ceil(stripAnsi(line).length / (process.stdout.columns || 80))),
    0,
  );
const clearFooter = () => {
  const rows = footerRows();
  if (rows) process.stdout.write(`\r${rows > 1 ? `\x1b[${rows - 1}A` : ''}\x1b[J`);
};
process.stdout.on('resize', () => setFooter(footerSource));
function setFooter(lines) {
  clearFooter();
  footerSource = lines;
  /* A line that wraps would leave a copy behind on every redraw: cut it to the terminal's width. */
  const width = (process.stdout.columns || 80) - 1;
  footer = interactive
    ? lines.map((line) => (stripAnsi(line).length > width ? stripAnsi(line).slice(0, width) : line))
    : [];
  process.stdout.write(footer.join('\n'));
}
console.log = (...args) => {
  clearFooter();
  printLine(...args);
  process.stdout.write(footer.join('\n'));
};

/** Start a long-running command; its output goes through onLine(), which decides what is shown. */
function start({ name, command, colour, onLine, onExit, storybook = false }) {
  /* Every process logs to its own file: when one stops, the report points at everything it said. */
  const log = newLogFile(`dev-${name}`);
  appendLog(log, `$ ${command}\n# ${new Date().toISOString()}\n\n`);
  const child = track(
    spawn(command, {
      shell: true,
      cwd: ROOT,
      detached: process.platform !== 'win32',
      stdio: ['ignore', 'pipe', 'pipe'],
      /* NO_COLOR and FORCE_COLOR=0 ask for plain text, as in runStep (cli-utils.mjs). */
      env: { ...process.env, ...(process.env.NO_COLOR || process.env.FORCE_COLOR === '0' ? {} : { FORCE_COLOR: '1' }) },
    }),
  );
  const entry = { name, child, tail: [], log };
  /* A spawn that fails (EAGAIN) may never send 'close': report it as an exit, once. */
  const exit = (code, signal) => {
    if (entry.exited) return;
    entry.exited = true;
    /* "stopped": pnpm dev stopped it (q, Ctrl-C), so pnpm logs --last does not show it as the last failure. */
    appendLog(log, `\n# exit ${stopping ? 'stopped' : (signal ?? code)}\n`);
    if (!stopping) onExit?.(code, signal, entry.tail, log);
  };
  child.on('error', (err) => {
    entry.tail.push(`could not start: ${err.message}`);
    exit(null, null);
  });
  let partial = '';
  const read = (data) => {
    const lines = (partial + data).split('\n');
    partial = lines.pop();
    for (const raw of lines) {
      const line = raw.replace(/\r/g, '');
      const plain = stripAnsi(line);
      entry.tail = [...entry.tail.slice(-199), plain];
      appendLog(log, `${plain}\n`);
      if (verbose || (storybook && storybookOutput)) console.log(`${colour}[${name}]${c.reset} ${line}`);
      onLine?.(plain, line);
    }
  };
  child.stdout.on('data', read);
  child.stderr.on('data', read);
  child.on('close', exit);
  processes.push(entry);
  /* Each runs in its own process group: if this process is killed hard, the next pnpm dev stops them (lock.mjs). */
  if (child.pid && process.platform !== 'win32') {
    entry.group = { pid: child.pid, started: processStart(child.pid) };
    updateDevLock({ groups: processes.filter((running) => running.group).map((running) => running.group) });
  }
  return entry;
}

function stopAll(exitCode = 0) {
  if (stopping) return;
  stopping = true;
  setFooter([]);
  try {
    if (process.stdin.isTTY) process.stdin.setRawMode(false);
  } catch {
    /* stdin already gone (closed terminal) */
  }
  console.log(`\n  ${c.gray}Stopping the watchers and Storybooks...${c.reset}`);
  for (const { name, port } of storybooks.filter((storybook) => storybook.running)) {
    console.log(`  ${c.gray}The ${name} on ${port} was already running before pnpm dev and keeps running.${c.reset}`);
  }
  /* The whole group, also when its shell has exited: a grandchild may still run in it (killTree ignores ESRCH). */
  for (const { child } of processes) killTree(child, 'SIGTERM');
  setTimeout(() => {
    for (const { child } of processes) killTree(child, 'SIGKILL');
    process.exit(exitCode);
  }, 1500).unref();
  setTimeout(() => process.exit(exitCode), 1600);
}
for (const signal of ['SIGINT', 'SIGTERM', 'SIGHUP']) process.removeAllListeners(signal);
process.on('SIGINT', () => stopAll(0));
process.on('SIGTERM', () => stopAll(143));
/* The terminal window was closed (SIGHUP, and every write fails with EIO): stop too, or the watchers keep running
   without anyone to see them. The usual EPIPE exit, or a crash on EIO, ended this process before the SIGKILL in
   stopAll, leaving a watcher that ignores SIGTERM behind: write nowhere instead, and stop the normal way. */
function hangUp() {
  for (const stream of [process.stdout, process.stderr]) stream.write = () => true;
  stopAll(0);
}
process.on('SIGHUP', hangUp);
for (const stream of [process.stdout, process.stderr]) stream.removeAllListeners('error').on('error', hangUp);

/** Explain a process that stopped on its own: why (when recognised), what it said, where its log is, what now. */
function reportExit(name, code, signal, tail, log, consequence) {
  const output = tail.join('\n');
  const diagnosis = classifyFailure(output, { signal, exitCode: code });
  console.log(
    `\n  ${c.red}✗${c.reset}  ${c.bold}${name} stopped${c.reset} ${c.gray}(${signal ?? `exit code ${code}`})${c.reset}`,
  );
  console.log(`     ${c.gray}Why:${c.reset}  ${diagnosis.why}`);
  if (diagnosis.fix) console.log(`     ${c.gray}Fix:${c.reset}  ${c.cyan}${diagnosis.fix}${c.reset}`);
  printToolOutput({ output, log });
  console.log(`     ${consequence}\n`);
}

// ─── 5. Library watchers: wait for their first build ─────────────────────────

const tokens = libraries.find((library) => library.key === 'tokens');
if (tokens && libraryState(tokens).state !== 'fresh') {
  /* The token watcher only builds after a change, so bring a stale build up to date first. */
  try {
    await runStepWithRecovery('Building design-tokens', tokens.build, { cwd: ROOT });
  } catch (err) {
    reportStepFailure('Building design-tokens', err);
    process.exit(1);
  }
}

// ─── Keys: from the first build on, so q works while it runs ─────────────────

/* Not when the output is no terminal, and a background job (`pnpm dev &`) may not take the terminal: try. */
if (process.stdin.isTTY && process.stdout.isTTY) {
  try {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (key) => {
      if (key.includes('\u0003') || key === 'q' || key === 'Q') stopAll(0);
      else if (key === 'v' || key === 'V') {
        verbose = !verbose;
        console.log(`  ${c.gray}${verbose ? 'Showing all output.' : 'Showing rebuilds and errors only.'}${c.reset}`);
      } else if (key === 's' || key === 'S') {
        storybookOutput = !storybookOutput;
        console.log(
          `  ${c.gray}${storybookOutput ? 'Showing the Storybook output.' : 'Hiding the Storybook output (errors still show).'}${c.reset}`,
        );
      } else if (key === 'o' || key === 'O') pagesFor(storybooks).forEach(openUrl);
    });
  } catch {
    /* no keys then; Ctrl-C still stops */
  }
}

const colours = [c.cyan, c.magenta, c.yellow, c.blue, c.green];
const FIRST_BUILD_LIMIT_MS = 5 * 60_000;
const STORYBOOK_SILENT_MS = 10 * 60_000;
const firstBuilds = libraries.map((library, index) => {
  const colour = colours[index % colours.length];
  let initial = true;
  let broken = false;
  /* An error's first line rarely says where: also show the lines after it (file, line, message). */
  let errorLinesLeft = 0;
  let lastDone = 0;
  return new Promise((resolveFirst) => {
    /* The token watcher has nothing to build until a file changes, and a watcher that leaves dist/ in place while it
       builds cannot break a Storybook that starts on an up-to-date build: ready at once. Its first build still runs. */
    if (library.key === 'tokens' || (library.keepsDist && libraryState(library).state === 'fresh'))
      resolveFirst({ library, ok: true });
    start({
      name: library.name,
      command: library.watch,
      colour,
      onLine: (plain) => {
        if (library.failed.test(plain) && !/Found 0 errors/.test(plain)) {
          if (!verbose) console.log(`${c.red}[${library.name}]${c.reset} ${plain}`);
          errorLinesLeft = 8;
          if (initial) {
            initial = false;
            resolveFirst({ library, ok: false });
          }
          broken = true;
          return;
        }
        if (!library.done.test(plain)) {
          if (errorLinesLeft > 0 && plain.trim() && !verbose) {
            errorLinesLeft--;
            console.log(`${c.red}[${library.name}]${c.reset} ${c.gray}${plain}${c.reset}`);
          }
          return;
        }
        errorLinesLeft = 0;
        /* Some tools report one build twice (e.g. once per output format): count it once. */
        if (Date.now() - lastDone < 3000) return;
        lastDone = Date.now();
        if (initial) {
          initial = false;
          resolveFirst({ library, ok: true });
          return;
        }
        if (!verbose) {
          const status = broken ? `${c.green}fixed and rebuilt${c.reset}` : 'rebuilt';
          console.log(`  ${c.gray}${time()}${c.reset}  ${c.green}✓${c.reset}  ${library.name} ${status}`);
        }
        broken = false;
      },
      onExit: (code, signal, tail, log) => {
        if (initial) resolveFirst({ library, ok: false, exited: true });
        reportExit(
          library.name,
          code,
          signal,
          tail,
          log,
          `Changes to ${library.dir} are no longer rebuilt. Stop (q) and start pnpm dev again.`,
        );
      },
    });
    /* A watcher that never says "done" (after a tool update changed its wording, say) must not hang pnpm dev. */
    setTimeout(() => {
      if (!initial) return;
      initial = false;
      resolveFirst({ library, ok: true, silent: true });
    }, FIRST_BUILD_LIMIT_MS).unref();
  });
});

// ─── 6. Storybooks ───────────────────────────────────────────────────────────

const toStart = storybooks.filter((storybook) => !storybook.running);
/* Each Storybook starts as soon as its own libraries have built, while the others are still building. */
const ready = toStart.map((storybook, index) =>
  Promise.all(firstBuilds.filter((_, i) => libraries[i].for.includes(storybook.key))).then(
    () =>
      new Promise((resolveReady) => {
        if (stopping) return resolveReady(false);
        let exited = false;
        /* performance.now(), not Date.now(): time the laptop spent asleep does not count against the limit. */
        let lastOutput = performance.now();
        start({
          name: storybook.name,
          command: storybook.command(storybook.port),
          colour: colours[(libraries.length + index) % colours.length],
          storybook: true,
          onLine: (plain) => {
            lastOutput = performance.now();
            if (
              !verbose &&
              !storybookOutput &&
              /\bERROR\b|Error:|✖|Module not found|Failed to (resolve|load)/.test(plain)
            ) {
              console.log(`${c.red}[${storybook.name}]${c.reset} ${plain}`);
            }
          },
          onExit: (code, signal, tail, log) => {
            exited = true;
            resolveReady(false);
            reportExit(storybook.name, code, signal, tail, log, 'Stopping everything.');
            stopAll(1);
          },
        });
        /* A cold first build can take long: give up only after a long silence, not after a total time. */
        let warned = false;
        waitForStorybook(storybook.port, () => {
          if (!warned && performance.now() - lastOutput > STORYBOOK_SILENT_MS / 2) {
            warned = true;
            console.log(
              `\n  ${c.yellow}⚠${c.reset}  The ${storybook.name} has not answered on ${storybook.port} and printed nothing for 5 minutes. [v] shows what it is doing.`,
            );
          }
          return exited || stopping || performance.now() - lastOutput > STORYBOOK_SILENT_MS;
        })
          .then(async (up) => {
            /* The port was free when chosen, minutes ago: make sure what answers now is this Storybook. */
            const found = up ? await identifyStorybook(storybook, storybook.port) : null;
            if (!found || found.ours || stopping) return up;
            console.log(
              `\n  ${c.red}✗${c.reset}  ${c.bold}Port ${storybook.port} now serves ${found.what}, not the ${storybook.name}${c.reset}` +
                `\n     ${c.gray}It was taken while the libraries built. Stop that one, or run pnpm dev again for another port.${c.reset}`,
            );
            stopAll(1);
            return false;
          })
          .then(resolveReady);
      }),
  ),
);

const step = stepStart(`Building ${libraries.length} libraries in watch mode`);
if (interactive) process.stdout.write(`  ${c.gray}(the first build takes a minute)${c.reset}`);
const results = await Promise.all(firstBuilds);
for (const { library } of results.filter((result) => result.silent)) {
  console.log(
    `\n  ${c.yellow}⚠${c.reset}  ${library.name} has not reported a finished build after 5 minutes. Carrying on; [v] shows its output.` +
      `\n     ${c.gray}If it did build, its "done" message may have changed: update \`done\` for ${library.key} in scripts/dev-config.mjs.${c.reset}`,
  );
}
const brokenLibraries = results.filter((result) => !result.ok);
if (brokenLibraries.length) {
  stepFail(step);
  for (const { library, exited } of brokenLibraries) {
    console.log(
      `  ${c.yellow}⚠${c.reset}  ${library.name} ${exited ? 'stopped' : 'did not build'}: ` +
        /* No dist/ at all (a fresh clone, or a watcher that empties it first): there is no previous build to show. */
        (libraryState(library).state === 'missing'
          ? 'it has no build yet, so the Storybook cannot load it.'
          : 'the Storybook shows its previous build.') +
        (exited ? '' : ` Fix the error above and save; the watcher tries again.`),
    );
  }
} else {
  stepDone(step);
}

if (toStart.length) {
  const storybookStep = stepStart(`Starting the ${toStart.map((storybook) => storybook.name).join(' and ')}`);
  const started = await Promise.all(ready);
  if (started.every(Boolean)) stepDone(storybookStep);
  else if (!stopping) {
    stepFail(storybookStep);
    for (const entry of processes.filter((entry) => toStart.some((storybook) => storybook.name === entry.name))) {
      if (entry.exited) continue;
      console.log(
        `\n  ${c.red}✗${c.reset}  ${c.bold}${entry.name} printed nothing for 10 minutes and did not start${c.reset}`,
      );
      printToolOutput({ output: entry.tail.join('\n'), log: entry.log });
    }
    stopAll(1);
  }
}

if (!stopping) {
  printStorybookLinks(storybooks);
  if (openBrowser) openPages(storybooks);
  console.log(
    `  ${c.gray}Watching. Save a file and the Storybook reloads; rebuilds and errors show up here.${c.reset}`,
  );
  console.log('');
  setFooter([
    `  ${storybooks.map(({ name, port }) => `${c.cyan}${name.replace(' Storybook', '')}${c.reset} http://localhost:${port}/`).join('   ')}`,
    `  ${c.gray}[v] all output  [s] Storybook output  [o] open in browser  [q] stop${c.reset}`,
  ]);
}

/* A `git checkout` or pull while this runs can change the dependencies under the running watchers and Storybooks. */
if (!stopping) {
  watchFile(resolve(ROOT, 'pnpm-lock.yaml'), { interval: 2000 }, (now, before) => {
    const fresh = checkInstallFresh();
    if (now.mtimeMs === before.mtimeMs || (fresh.ok && !fresh.warn)) return;
    /* Deleted: restore it rather than install, which would resolve every version anew. */
    if (!fresh.ok) return console.log(`\n  ${c.yellow}⚠${c.reset}  ${fresh.detail}: ${fresh.note}.\n`);
    console.log(
      `\n  ${c.yellow}⚠${c.reset}  pnpm-lock.yaml changed and no longer matches node_modules (a branch switch or pull?).` +
        `\n     ${c.gray}Errors from here on may come from that: stop (q), run ${c.cyan}pnpm install${c.gray}, then pnpm dev again.${c.reset}\n`,
    );
  }).unref();
  /* A library's exports or build config changed without a lockfile change: the running watchers keep the old one. */
  for (const file of libraries.flatMap((library) =>
    ['package.json', 'vite.config.ts'].map((name) => `${library.dir}/${name}`),
  )) {
    watchFile(resolve(ROOT, file), { interval: 2000 }, (now, before) => {
      if (now.mtimeMs === before.mtimeMs) return;
      console.log(
        `\n  ${c.yellow}⚠${c.reset}  ${file} changed; the running watchers still use the old one.` +
          `\n     ${c.gray}Stop (q) and start pnpm dev again.${c.reset}\n`,
      );
    }).unref();
  }
}
