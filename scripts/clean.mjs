/* `pnpm run clean:pick`: choose what to delete, with sizes. Build output and caches are ticked; node_modules is not,
   and asks again. Without a terminal it only lists the ticked defaults, unless `--yes` is passed. (`pnpm clean` still runs every package's own
   clean script.) */
import { exec } from 'node:child_process';
import { existsSync, readdirSync, rmSync } from 'node:fs';
import { relative, resolve } from 'node:path';
import { promisify } from 'node:util';
import { ROOT } from './dev-config.mjs';
import {
  c,
  confirm,
  installCrashHandler,
  printBanner,
  printError,
  stepDone,
  stepFail,
  stepStart,
} from './lib/cli-utils.mjs';

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
    what: '.tarballs/ (pnpm run pack:local)',
    paths: [resolve(ROOT, '.tarballs')].filter(existsSync),
    checked: true,
  },
  {
    label: 'Angular caches',
    what: '.angular/ (fixes odd Angular build errors)',
    paths: inPackages('.angular'),
    checked: true,
  },
  {
    label: 'Tool caches',
    what: 'node_modules/.cache (Vite, Storybook, Babel)',
    paths: [resolve(ROOT, 'node_modules/.cache'), ...inPackages('node_modules/.cache')].filter(existsSync),
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
    const { stdout } = await promisify(exec)(`du -sk ${paths.map((path) => `"${path}"`).join(' ')}`);
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
        const pointer = index === cursor ? `${c.cyan}❯${c.reset}` : ' ';
        const sizeText = target.paths.length
          ? `${c.gray}${(target.size ?? '').padStart(8)}${c.reset}`
          : `${c.gray}  (none)${c.reset}`;
        const warning = target.dangerous ? `  ${c.yellow}⚠${c.reset}` : '';
        return `  ${pointer} ${box}${c.reset} ${target.label.padEnd(15)} ${sizeText}  ${c.gray}${target.what}${c.reset}${warning}\x1b[0K`;
      });
      lines.push(`\n  ${c.gray}↑ ↓ move   space tick   enter delete   q cancel${c.reset}\x1b[0K`);
      process.stdout.write(`${lines.join('\n')}\n`);
      drawn = lines.length + 1;
    };
    draw();
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    const onKey = (key) => {
      if (key === '\u0003' || key === 'q') {
        finish(null);
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
    const finish = (result) => {
      process.stdin.removeListener('data', onKey);
      process.stdin.setRawMode(false);
      process.stdin.pause();
      done(result);
    };
    process.stdin.on('data', onKey);
  });
}

let selected;
if (process.stdin.isTTY) {
  selected = await pick(TARGETS);
} else {
  /* No one to ask: deleting without a question needs --yes, so a piped or scripted run cannot wipe dist/ by accident. */
  selected = TARGETS.filter((target) => target.checked);
  if (!process.argv.includes('--yes')) {
    console.log(
      `  No terminal to ask in. These would be deleted: ${selected.map((target) => target.label).join(', ')}.`,
    );
    console.log(`  Run ${c.cyan}pnpm run clean:pick --yes${c.reset} to delete them without asking.\n`);
    process.exit(1);
  }
}

if (!selected?.length) {
  console.log(`\n  ${c.gray}Nothing deleted.${c.reset}\n`);
  process.exit(0);
}
if (selected.some((target) => target.dangerous)) {
  console.log('');
  if (
    !(await confirm(`${c.yellow}Delete node_modules? You need pnpm install afterwards.${c.reset}`, { default: false }))
  ) {
    console.log(`\n  ${c.gray}Cancelled.${c.reset}\n`);
    process.exit(0);
  }
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
            what: `${relative(ROOT, err.path ?? target.paths[0])} is in use`,
            why: 'A running Storybook, watcher (pnpm dev), test runner or editor holds files in it.',
            fix: 'stop those (q in pnpm dev), then run this again',
          }
        : { what: `Could not delete ${target.label.toLowerCase()}` },
    );
  }
}

console.log('');
if (selected.some((target) => target.dangerous) && !existsSync(resolve(ROOT, 'node_modules'))) {
  console.log(`  Next: ${c.cyan}pnpm install${c.reset}`);
} else if (selected.some((target) => target.label === 'Build output')) {
  console.log(
    `  Next: ${c.cyan}pnpm dev${c.reset} builds what the Storybooks need, ${c.cyan}pnpm build${c.reset} builds everything.`,
  );
}
console.log('');
process.exit(failures ? 1 : 0);
