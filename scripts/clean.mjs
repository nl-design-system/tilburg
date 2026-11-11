/* `pnpm run clean:pick`: choose what to delete, with sizes. Build output and caches are ticked; the tarballs and
   node_modules are not, and node_modules asks again. Without a terminal it only lists the ticked defaults, unless
   `--yes` is passed. (`pnpm clean` still runs every package's own clean script.) */
import { execFile } from 'node:child_process';
import { existsSync, readdirSync, rmSync } from 'node:fs';
import { relative, resolve } from 'node:path';
import { promisify } from 'node:util';
import { ROOT } from './dev-config.mjs';
import {
  c,
  cmd,
  confirm,
  exitAfter,
  fitLine,
  installCrashHandler,
  interactive,
  printBanner,
  printError,
  readKeys,
  stepDone,
  stepFail,
  stepStart,
  stopKeys,
} from './lib/cli-utils.mjs';
import { splitKeys } from './lib/keys.mjs';
import { readDevLock, SYNC_LOCK } from './lib/lock.mjs';

installCrashHandler('pnpm run clean:pick');
printBanner('Clean');

const workspaceDirs = ['packages', 'proprietary'].flatMap((group) =>
  readdirSync(resolve(ROOT, group), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => resolve(ROOT, group, entry.name)),
);
const inPackages = (sub) => workspaceDirs.map((dir) => resolve(dir, sub)).filter(existsSync);

const TARGETS = [
  { label: 'Build output', what: "every package's dist/", paths: inPackages('dist'), checked: true },
  {
    label: 'Tarballs',
    what: '.tarballs/ (pack:local; hltsamen installs from it)',
    paths: [resolve(ROOT, '.tarballs')].filter(existsSync),
    /* Not by default: hltsamen installs from these (file:../tilburg/.tarballs/…), and its next install would fail. */
    checked: false,
  },
  {
    label: 'Angular caches',
    what: '.angular/ (fixes odd Angular build errors)',
    paths: inPackages('.angular'),
    checked: true,
  },
  {
    label: 'Tool caches',
    what: 'node_modules/.cache (Vite, Storybook, Babel) and .stencil/',
    paths: [
      resolve(ROOT, 'node_modules/.cache'),
      ...inPackages('node_modules/.cache'),
      ...inPackages('.stencil'),
    ].filter(existsSync),
    checked: true,
  },
  {
    label: 'node_modules',
    what: 'all installed packages; pnpm install afterwards',
    paths: [resolve(ROOT, 'node_modules'), ...inPackages('node_modules')].filter(existsSync),
    checked: false,
    dangerous: true,
  },
];

async function size(paths) {
  if (!paths.length) return null;
  try {
    const { stdout } = await promisify(execFile)('du', ['-sk', ...paths]);
    const kb = stdout
      .trim()
      .split('\n')
      .reduce((sum, line) => sum + Number(line.split(/\s/)[0]), 0);
    return kb > 1024 * 1024 ? `${(kb / 1024 / 1024).toFixed(1)} GB` : `${Math.round(kb / 1024)} MB`;
  } catch {
    return null;
  }
}
const sizes = await Promise.all(TARGETS.map((target) => size(target.paths)));
TARGETS.forEach((target, index) => {
  target.size = sizes[index];
  if (!target.paths.length) target.checked = false;
});

/** A small checkbox list: ↑ ↓ move, space ticks, enter goes, q stops. Node built-ins only. */
function pick(targets) {
  return new Promise((done) => {
    let cursor = 0;
    let drawn = 0;
    const draw = () => {
      if (drawn) process.stdout.write(`\x1b[${drawn}A`);
      const lines = targets.map((target, index) => {
        const box = !target.paths.length ? `${c.gray}[ ]` : target.checked ? `${c.green}[x]` : '[ ]';
        const pointer = index === cursor ? `${cmd('❯')}` : ' ';
        const sizeText = target.paths.length
          ? `${c.gray}${(target.size ?? '').padStart(8)}${c.reset}`
          : `${c.gray}  (none)${c.reset}`;
        const warning = target.dangerous ? `  ${c.yellow}⚠${c.reset}` : '';
        return `  ${pointer} ${box}${c.reset} ${target.label.padEnd(15)} ${sizeText}  ${c.gray}${target.what}${c.reset}${warning}\x1b[0K`;
      });
      lines.push(`\n  ${c.gray}↑ ↓ move   space tick   enter delete   q cancel${c.reset}\x1b[0K`);
      /* A line that wraps would make the cursor-up above miss, and the list drift down the screen. */
      const fit = (line) => (fitLine(line) === line ? line : `${fitLine(line)}\x1b[0K`);
      process.stdout.write(`${lines.map(fit).join('\n')}\n`);
      drawn = lines.length + 1;
    };
    draw();
    const onKey = (key) => {
      if (key === '\u0003') {
        /* Ctrl-C is a stop, not a choice: exit like a SIGINT would. */
        finish(null);
        exitAfter(`\n  ${c.gray}Nothing deleted.${c.reset}\n`, 130);
      } else if (key === 'q' || key === 'Q' || key === '\x1b') {
        finish(null);
        return;
      } else if (key === '\x1b[A') {
        cursor = (cursor - 1 + targets.length) % targets.length;
      } else if (key === '\x1b[B') {
        cursor = (cursor + 1) % targets.length;
      } else if (key === ' ' && targets[cursor].paths.length) {
        targets[cursor].checked = !targets[cursor].checked;
      } else if (key === '\r' || key === '\n') {
        finish(targets.filter((target) => target.checked));
        return;
      }
      draw();
    };
    let finished = false;
    const onData = (chunk) => {
      for (const key of splitKeys(chunk)) if (!finished) onKey(key);
    };
    const finish = (result) => {
      finished = true;
      stopKeys(onData);
      done(result);
    };
    readKeys(onData);
  });
}

let selected;
if (process.stdin.isTTY && interactive) {
  selected = await pick(TARGETS);
} else if (process.stdin.isTTY) {
  /* TERM=dumb: no cursor control for the picker, so one plain question about the defaults. */
  const defaults = TARGETS.filter((target) => target.checked);
  const ok =
    defaults.length &&
    (await confirm(`Delete ${defaults.map((target) => target.label).join(', ')}?`, { default: false }));
  selected = ok ? defaults : [];
} else {
  /* No one to ask: deleting without a question needs --yes, so a piped or scripted run cannot wipe dist/ by accident. */
  selected = TARGETS.filter((target) => target.checked);
  if (selected.length && !process.argv.includes('--yes')) {
    console.log(
      `  No terminal to ask in. These would be deleted: ${selected.map((target) => target.label).join(', ')}.`,
    );
    exitAfter(`  Run ${cmd('pnpm run clean:pick --yes')} to delete them without asking.\n`, 1);
  }
}

if (!selected?.length) exitAfter(`\n  ${c.gray}Nothing deleted.${c.reset}\n`);
if (selected.some((target) => target.dangerous)) {
  console.log('');
  if (
    !(await confirm(`${c.yellow}Delete node_modules? You need pnpm install afterwards.${c.reset}`, { default: false }))
  )
    exitAfter(`\n  ${c.gray}Cancelled.${c.reset}\n`);
}

/* A build (sync, verify, pack:local) writes what this would delete: wait for it instead. */
const building = selected.length > 0 && readDevLock(SYNC_LOCK);
if (building)
  exitAfter(
    `\n  ${c.yellow}⚠${c.reset}  ${building.what ?? 'pnpm sync'} is running (process ${building.pid}). Nothing deleted: run this again when it is done.\n`,
    1,
  );

/* Deleting dist/, node_modules or the caches under a running pnpm dev breaks its watchers and Storybooks. */
const devLock = selected.length > 0 && readDevLock();
if (devLock) {
  console.log(`\n  ${c.yellow}⚠${c.reset}  pnpm dev is running (process ${devLock.pid}) and uses what you picked.`);
  if (!(await confirm('Delete them anyway? (or stop pnpm dev with q first)', { default: false })))
    exitAfter(`\n  ${c.gray}Nothing deleted. Stop pnpm dev with q, then run this again.${c.reset}\n`, 1);
}

console.log('');
let failures = 0;
for (const target of selected) {
  const step = stepStart(
    `Deleting ${target.label.toLowerCase()} (${target.paths.length} folder${target.paths.length === 1 ? '' : 's'})`,
  );
  try {
    /* Retries ride out the short locks of an editor's indexer or a virus scanner. */
    for (const path of target.paths) rmSync(path, { recursive: true, force: true, maxRetries: 5, retryDelay: 300 });
    stepDone(step);
  } catch (err) {
    stepFail(step);
    failures++;
    const locked = ['EBUSY', 'EPERM', 'ENOTEMPTY', 'EACCES'].includes(err.code);
    printError(
      err,
      locked
        ? {
            what: `${relative(ROOT, err.path ?? target.paths[0])} could not be deleted`,
            why: 'A running Storybook, watcher (pnpm dev), test runner or editor holds files in it, or a folder in it is read-only or not yours (made with sudo).',
            fix: `stop those (q in pnpm dev), or check the owner with ls -la ${relative(ROOT, err.path ?? target.paths[0])}, then run this again`,
          }
        : { what: `Could not delete ${target.label.toLowerCase()}` },
    );
  }
}

console.log('');
if (selected.some((target) => target.dangerous) && !existsSync(resolve(ROOT, 'node_modules'))) {
  console.log(`  Next: ${cmd('pnpm install')}`);
} else if (selected.some((target) => target.label === 'Build output')) {
  console.log(`  Next: ${cmd('pnpm dev')} builds what the Storybooks need, ${cmd('pnpm build')} builds everything.`);
}
console.log('');
process.exit(failures ? 1 : 0);
