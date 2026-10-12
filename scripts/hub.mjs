/* `pnpm menu`: every command in a menu, after bq-tlb-frontend's hub.mjs. ↑ ↓ ← → choose, Enter runs, H help, Q quits.
   Sections sit side by side; without a terminal it prints the help list instead. */
import { spawn } from 'node:child_process';
import { c, printBanner, stripAnsi } from './lib/cli-utils.mjs';
import { SECTIONS } from './lib/commands.mjs';
import { randomSaying } from './lib/sayings.mjs';

const COLUMNS = 3;
const COLUMN_WIDTH = 18;
const GAP = 3;

if (!process.stdin.isTTY || !process.stdout.isTTY) {
  await import('./help.mjs');
  process.exit(0);
}

let section = 0;
let item = 0;
let drawn = 0;

const pad = (text, width) => text + ' '.repeat(Math.max(0, width - stripAnsi(text).length));

function renderSection(current, index) {
  const title = ` ${current.label} `;
  const lines = [
    `${current.colour}${c.bold}──${title}${'─'.repeat(Math.max(0, COLUMN_WIDTH - title.length - 2))}${c.reset}`,
    '',
  ];
  current.items.forEach(({ script }, position) => {
    const selected = index === section && position === item;
    lines.push(selected ? `${current.colour}${c.bold}❯ ${script}${c.reset}` : `${c.gray}  ${script}${c.reset}`);
  });
  return lines;
}

function render() {
  const out = [];
  for (let start = 0; start < SECTIONS.length; start += COLUMNS) {
    const columns = SECTIONS.slice(start, start + COLUMNS).map((current, offset) =>
      renderSection(current, start + offset),
    );
    const height = Math.max(...columns.map((column) => column.length));
    for (let line = 0; line < height; line++) {
      out.push(`  ${columns.map((column) => pad(column[line] ?? '', COLUMN_WIDTH)).join(' '.repeat(GAP))}`);
    }
    out.push('');
  }
  const { script, what } = SECTIONS[section].items[item];
  out.push(`  ${c.cyan}pnpm ${script}${c.reset}  ${c.gray}${what}${c.reset}`);
  out.push('');
  out.push(`  ${c.gray}↑ ↓ ← → choose   Enter run   H help   Q quit${c.reset}`);
  if (drawn) process.stdout.write(`\x1b[${drawn}A\x1b[G`);
  process.stdout.write(`${out.map((line) => `${line}\x1b[0K`).join('\n')}\n`);
  drawn = out.length;
}

function leave() {
  process.stdout.write('\x1b[?25h');
  process.stdin.setRawMode(false);
  process.stdin.pause();
}

function run(script) {
  leave();
  process.stdout.write('\x1b[2J\x1b[H');
  /* The command owns the terminal now: Ctrl-C is for it (it stops itself), not for the menu that started it. */
  process.on('SIGINT', () => {});
  spawn(`pnpm run ${script}`, { shell: true, stdio: 'inherit' })
    .on('error', (err) => {
      console.error(`\n  Could not start pnpm run ${script}: ${err.message}. Is pnpm on your PATH? (pnpm check)\n`);
      process.exit(1);
    })
    .on('close', (code) => process.exit(code ?? 0));
}

process.stdout.write('\x1b[2J\x1b[H\x1b[?25l');
printBanner('Menu');
/* Below the title, a different Tilburg saying every time (scripts/lib/sayings.mjs). */
const [saying, meaning] = randomSaying();
console.log(`      ${c.magenta}${c.bold}“${saying}”${c.reset}  ${c.gray}${meaning}${c.reset}\n`);
render();

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', (key) => {
  const items = () => SECTIONS[section].items;
  if (key === '\u0003' || key === 'q' || key === 'Q') {
    leave();
    process.stdout.write('\n');
    process.exit(0);
  } else if (key === 'h' || key === 'H' || key === '?') {
    run('help');
  } else if (key === '\r' || key === '\n') {
    run(items()[item].script);
  } else if (key === '\x1b[A') {
    if (item > 0) item--;
    else {
      section = (section - 1 + SECTIONS.length) % SECTIONS.length;
      item = items().length - 1;
    }
    render();
  } else if (key === '\x1b[B') {
    if (item < items().length - 1) item++;
    else {
      section = (section + 1) % SECTIONS.length;
      item = 0;
    }
    render();
  } else if (key === '\x1b[D' || key === '\x1b[C') {
    section = (section + (key === '\x1b[C' ? 1 : -1) + SECTIONS.length) % SECTIONS.length;
    item = Math.min(item, items().length - 1);
    render();
  }
});
