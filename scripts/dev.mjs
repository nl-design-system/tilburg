/* `pnpm dev [react|angular|all] [component] [--open] [--verbose]`: one command to work on components with live
   reload. With a component name (`pnpm dev tooltip`) the browser opens at that component's docs pages.

   The Storybooks load the React, Angular and Web Component libraries from their build output (dist/), so editing a
   component used to mean rebuilding by hand. This starts every library's watcher, waits for their first build,
   then starts the Storybook(s) on a free port (or points at one that is already running). While it runs it shows
   only rebuilds and errors; V shows all output, O opens the browser, Q (or Ctrl-C) stops everything.

   Components-css (SCSS) and storybook-shared are read from source by the Storybooks, so they need no watcher. */
import { spawn } from 'node:child_process';
import { LIBRARIES, ROOT, STORYBOOKS } from './dev-config.mjs';
import { checkInstalled, checkInstallFresh, checkNode, libraryState } from './lib/checks.mjs';
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
import { readDevLock, writeDevLock } from './lib/lock.mjs';
import { choosePort, printStorybookLinks, waitForStorybook } from './lib/storybook.mjs';

installCrashHandler('pnpm dev', { signals: false });

const args = process.argv.slice(2);
const words = args.filter((arg) => !arg.startsWith('-'));
const target = words.find((word) => ['react', 'angular', 'all'].includes(word)) ?? 'all';
const componentQuery = words.filter((word) => !['react', 'angular', 'all'].includes(word)).join(' ');
/* `pnpm dev tooltip`: anything that is not a Storybook name is a component, opened in the browser once it runs. */
const component = componentQuery ? await requireComponent(componentQuery, 'pnpm dev') : null;
const openBrowser = Boolean(component) || args.includes('--open') || args.includes('-o');
let verbose = args.includes('--verbose');

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
    return story?.id ? [storyUrl(`http://localhost:${storybook.port}/`, story.id)] : [];
  });
}
const libraries = LIBRARIES.filter((library) => library.for.some((key) => storybookKeys.includes(key)));

printBanner(`Dev · ${storybookKeys.map((key) => STORYBOOKS[key].name).join(' + ')}`);

// ─── 1. Can this work at all? ────────────────────────────────────────────────

const node = checkNode();
if (!node.ok) {
  fail({ what: `Node ${process.versions.node} is not the Node this repo uses`, why: node.detail, fix: 'nvm use' });
  process.exit(1);
}
if (!checkInstalled().ok) {
  fail({ what: 'Dependencies are not installed', why: 'node_modules is missing.', fix: 'pnpm install' });
  process.exit(1);
}
if (checkInstallFresh().warn) {
  console.log(`  ${c.yellow}⚠${c.reset}  pnpm-lock.yaml differs from what is installed (a branch switch or pull?).`);
  if (await confirm('Run pnpm install first?', { default: true, fallback: false })) {
    try {
      await runStepWithRecovery('Installing dependencies', 'pnpm install');
    } catch (err) {
      reportStepFailure('pnpm install', err);
      process.exit(1);
    }
  }
}

// ─── 2. One pnpm dev at a time ───────────────────────────────────────────────

/* Two sets of watchers would write the same dist/ folders at once. Point at the running one instead. */
const running = readDevLock();
if (running) {
  console.log(
    `  ${c.green}✓${c.reset}  pnpm dev is already running in another terminal (process ${running.pid}, since ${new Date(running.started).toLocaleTimeString('nl-NL')}).`,
  );
  if (running.storybooks?.length) printStorybookLinks(running.storybooks);
  if (component) {
    const pages = pagesFor(running.storybooks ?? []);
    console.log(`  Opening ${component.name}: ${pages.join('  ')}\n`);
    pages.forEach(openUrl);
  }
  console.log(
    `  ${c.gray}Its watchers rebuild what ${running.storybooks?.length === 1 ? 'that Storybook shows' : 'those Storybooks show'}. ` +
      `For another set: q in that terminal, then pnpm dev here (pnpm dev react, pnpm dev angular or both).${c.reset}\n`,
  );
  process.exit(0);
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
      `  ${c.yellow}⚠${c.reset}  Port ${STORYBOOKS[key].port} is taken by something else; the ${STORYBOOKS[key].name} uses ${choice.port}.`,
    );
  }
  storybooks.push({ key, ...STORYBOOKS[key], port: choice.port, running: choice.running });
}
writeDevLock({ storybooks: storybooks.map(({ name, port, note }) => ({ name, port, note })) });

// ─── 4. Processes ────────────────────────────────────────────────────────────

const processes = [];
let stopping = false;
const time = () => new Date().toLocaleTimeString('nl-NL');

/** Start a long-running command; its output goes through onLine(), which decides what is shown. */
function start({ name, command, colour, onLine, onExit }) {
  /* Every process logs to its own file: when one stops, the report points at everything it said. */
  const log = newLogFile(`dev-${name}`);
  appendLog(log, `$ ${command}\n# ${new Date().toISOString()}\n\n`);
  const child = track(
    spawn(command, {
      shell: true,
      cwd: ROOT,
      detached: process.platform !== 'win32',
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env, FORCE_COLOR: '1' },
    }),
  );
  const entry = { name, child, tail: [], log };
  child.on('error', (err) => {
    entry.tail.push(`could not start: ${err.message}`);
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
      if (verbose) console.log(`${colour}[${name}]${c.reset} ${line}`);
      onLine?.(plain, line);
    }
  };
  child.stdout.on('data', read);
  child.stderr.on('data', read);
  child.on('close', (code, signal) => {
    entry.exited = true;
    appendLog(log, `\n# exit ${signal ?? code}\n`);
    if (!stopping) onExit?.(code, signal, entry.tail, log);
  });
  processes.push(entry);
  return entry;
}

function stopAll(exitCode = 0) {
  if (stopping) return;
  stopping = true;
  try {
    if (process.stdin.isTTY) process.stdin.setRawMode(false);
  } catch {
    /* stdin already gone (closed terminal) */
  }
  console.log(`\n  ${c.gray}Stopping the watchers and Storybooks...${c.reset}`);
  for (const { child, exited } of processes) if (!exited) killTree(child, 'SIGTERM');
  setTimeout(() => {
    for (const { child, exited } of processes) if (!exited) killTree(child, 'SIGKILL');
    process.exit(exitCode);
  }, 1500).unref();
  setTimeout(() => process.exit(exitCode), 1600);
}
process.on('SIGINT', () => stopAll(0));
process.on('SIGTERM', () => stopAll(0));
/* The terminal window was closed: stop too, or the watchers keep running without anyone to see them. */
process.on('SIGHUP', () => stopAll(0));

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
    await runStepWithRecovery('Building design-tokens', tokens.build);
  } catch (err) {
    reportStepFailure('Building design-tokens', err);
    process.exit(1);
  }
}

const colours = [c.cyan, c.magenta, c.yellow, c.blue, c.green];
const FIRST_BUILD_LIMIT_MS = 5 * 60_000;
const STORYBOOK_LIMIT_MS = 10 * 60_000;
const firstBuilds = libraries.map((library, index) => {
  const colour = colours[index % colours.length];
  let initial = true;
  let broken = false;
  /* An error's first line rarely says where: also show the lines after it (file, line, message). */
  let errorLinesLeft = 0;
  let lastDone = 0;
  return new Promise((resolveFirst) => {
    /* The token watcher has nothing to build until a file changes: ready at once. */
    if (library.key === 'tokens') resolveFirst({ library, ok: true });
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
      `  ${c.yellow}⚠${c.reset}  ${library.name} ${exited ? 'stopped' : 'did not build'}: the Storybook shows its previous build.` +
        (exited ? '' : ` Fix the error above and save; the watcher tries again.`),
    );
  }
} else {
  stepDone(step);
}

// ─── 6. Storybooks ───────────────────────────────────────────────────────────

const toStart = storybooks.filter((storybook) => !storybook.running);
const ready = toStart.map(
  (storybook, index) =>
    new Promise((resolveReady) => {
      let exited = false;
      start({
        name: storybook.name,
        command: storybook.command(storybook.port),
        colour: colours[(libraries.length + index) % colours.length],
        onLine: (plain) => {
          if (!verbose && /\bERROR\b|Error:|✖|Module not found|Failed to (resolve|load)/.test(plain)) {
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
      const startedAt = Date.now();
      let warned = false;
      waitForStorybook(storybook.port, () => {
        if (!warned && Date.now() - startedAt > STORYBOOK_LIMIT_MS / 2) {
          warned = true;
          console.log(
            `\n  ${c.yellow}⚠${c.reset}  The ${storybook.name} has not answered on ${storybook.port} for 5 minutes. [v] shows what it is doing.`,
          );
        }
        return exited || stopping || Date.now() - startedAt > STORYBOOK_LIMIT_MS;
      }).then(resolveReady);
    }),
);

if (toStart.length) {
  const storybookStep = stepStart(`Starting the ${toStart.map((storybook) => storybook.name).join(' and ')}`);
  const started = await Promise.all(ready);
  if (started.every(Boolean)) stepDone(storybookStep);
  else if (!stopping) {
    stepFail(storybookStep);
    for (const entry of processes.filter((entry) => toStart.some((storybook) => storybook.name === entry.name))) {
      if (entry.exited) continue;
      console.log(`\n  ${c.red}✗${c.reset}  ${c.bold}${entry.name} did not start within 10 minutes${c.reset}`);
      printToolOutput({ output: entry.tail.join('\n'), log: entry.log });
    }
    stopAll(1);
  }
}

if (!stopping) {
  printStorybookLinks(storybooks);
  if (openBrowser) {
    const pages = pagesFor(storybooks);
    if (component) console.log(`  Opening ${component.name}: ${pages.join('  ')}\n`);
    pages.forEach(openUrl);
  }
  console.log(
    `  ${c.gray}Watching. Save a file and the Storybook reloads; rebuilds and errors show up here.${c.reset}`,
  );
  console.log(`  ${c.gray}[v] all output  [o] open in browser  [q] stop${c.reset}\n`);
}

// ─── 7. Keys ─────────────────────────────────────────────────────────────────

if (process.stdin.isTTY && !stopping) {
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (key) => {
    if (key.includes('\u0003') || key === 'q' || key === 'Q') stopAll(0);
    else if (key === 'v' || key === 'V') {
      verbose = !verbose;
      console.log(`  ${c.gray}${verbose ? 'Showing all output.' : 'Showing rebuilds and errors only.'}${c.reset}`);
    } else if (key === 'o' || key === 'O') pagesFor(storybooks).forEach(openUrl);
  });
}
