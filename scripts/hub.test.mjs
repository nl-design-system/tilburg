/* `node --test scripts/`: the menu without a terminal (CI, a pipe, closed stdin) prints the list and never waits. */
import './lib/test-env.mjs';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { stripAnsi } from './lib/cli-utils.mjs';

const hub = fileURLToPath(new URL('./hub.mjs', import.meta.url));
const env = { ...process.env, CI: '1', TILBURG_TTY: '' };

for (const [label, input] of [
  ['closed stdin (EOF)', ''],
  ['keys on a pipe', 'q\r'],
]) {
  test(`with ${label} it prints the commands and exits 0 instead of waiting for keys`, () => {
    const result = spawnSync(process.execPath, [hub], { input, env, encoding: 'utf8', timeout: 10_000 });
    assert.equal(result.error, undefined, 'did not hang');
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /pnpm setup/);
    assert.doesNotMatch(result.stdout, /Enter run/, 'no interactive menu');
  });
}

test('with stdin ignored altogether it does the same', () => {
  const result = spawnSync(process.execPath, [hub], {
    stdio: ['ignore', 'pipe', 'pipe'],
    env,
    encoding: 'utf8',
    timeout: 10_000,
  });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /pnpm where/);
});

/* A terminal faked in a preload, `columns` wide: no real pty in node:test. */
const asTerminal = (columns) =>
  `data:text/javascript,${encodeURIComponent(
    `process.stdin.isTTY = true; process.stdout.isTTY = true; process.stdin.setRawMode = () => process.stdin;
     Object.defineProperty(process.stdout, 'columns', { value: ${columns} });`,
  )}`;

test('in a terminal too narrow for its columns it prints the list instead of a menu that wraps', () => {
  const result = spawnSync(process.execPath, ['--import', asTerminal(40), hub], {
    input: '',
    env: { ...process.env, CI: '', TILBURG_TTY: '' },
    encoding: 'utf8',
    timeout: 10_000,
  });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /pnpm setup/);
  assert.doesNotMatch(result.stdout, /Enter run/);
});

test('no menu line is wider than an 80-column terminal, or a redraw drifts down the screen', () => {
  /* → selects `where`, whose description is the longest. */
  const result = spawnSync(process.execPath, ['--import', asTerminal(80), hub], {
    input: '\x1b[C',
    env: { ...process.env, CI: '', TILBURG_TTY: '' },
    encoding: 'utf8',
    timeout: 10_000,
  });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /❯ where/);
  const menu = stripAnsi(result.stdout.slice(result.stdout.indexOf('START'))).replace(/\x1b\[\?25[hl]/g, '');
  for (const line of menu.split('\n')) assert.ok(line.length < 80, `${line.length}: ${line}`);
});

test('application-mode arrows and several keys in one chunk are all read', () => {
  /* →→ in application mode, then q. */
  const result = spawnSync(process.execPath, ['--import', asTerminal(80), hub], {
    input: '\x1bOC\x1bOCq',
    env: { ...process.env, CI: '', TILBURG_TTY: '' },
    encoding: 'utf8',
    timeout: 10_000,
  });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stdout.split('Enter run').length - 1, 3, 'drawn once, then once per arrow');
});

test('TERM=dumb (no cursor control) gets the list, not a menu drawn with escape codes', () => {
  const result = spawnSync(process.execPath, ['--import', asTerminal(120), hub], {
    input: '',
    env: { ...process.env, CI: '', TILBURG_TTY: '', TERM: 'dumb' },
    encoding: 'utf8',
    timeout: 10_000,
  });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /pnpm setup/);
  assert.doesNotMatch(result.stdout, /Enter run/);
});

test('Home and F2 are neither help nor quit: the menu stays until q', () => {
  const result = spawnSync(process.execPath, ['--import', asTerminal(80), hub], {
    input: '\x1b[H\x1bOQ\x1b[Cq',
    env: { ...process.env, CI: '', TILBURG_TTY: '' },
    encoding: 'utf8',
    timeout: 10_000,
  });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stdout.split('Enter run').length - 1, 2, 'drawn once, then once for the arrow');
});
