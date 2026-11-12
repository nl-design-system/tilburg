/* `node --test scripts/`: `pnpm where` with names that fit one, several or no component, and without its table. */
import './lib/test-env.mjs';
import assert from 'node:assert/strict';
import { cpSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { runScript, SCRIPTS, tempDir } from './lib/test-fakes.mjs';

const where = (args, script = join(SCRIPTS, 'where.mjs')) =>
  runScript(script, args, { env: { ...process.env, CI: '1' }, timeout: 10_000 });

test('a known name shows its files and exits 0', () => {
  const result = where(['PasswordInput']);
  assert.equal(result.status, 0, result.output);
  assert.match(result.stdout, /Where: Password Input/);
});

test('an unknown name exits 1 and says how to find the right one', () => {
  const result = where(['no-such-component-xyz']);
  assert.equal(result.status, 1);
  assert.match(result.stdout, /No component called "no-such-component-xyz"/);
  assert.match(result.stdout, /pnpm where --list/);
});

test('a near miss suggests the closest name', () => {
  const result = where(['tooltipp']);
  assert.equal(result.status, 1);
  assert.match(result.stdout, /Did you mean Tooltip/);
});

test('a name that fits several exits 1 and lists each candidate', () => {
  const result = where(['list']);
  assert.equal(result.status, 1);
  assert.match(result.stdout, /"list" fits \d+ components/);
  assert.match(result.stdout, /pnpm where data-list/);
  assert.match(result.stdout, /pnpm where badge-list/);
});

test('--list exits 1 when the component table is missing, instead of listing nothing', () => {
  const dir = tempDir('tilburg-where-');
  cpSync(SCRIPTS, join(dir, 'scripts'), { recursive: true });
  cpSync(join(SCRIPTS, '..', 'package.json'), join(dir, 'package.json'));
  const result = where(['--list'], join(dir, 'scripts', 'where.mjs'));
  assert.equal(result.status, 1, result.output);
  assert.match(result.stdout, /No components found/);
});

test('an empty name exits 1 instead of listing everything', () => {
  const result = where(['']);
  assert.equal(result.status, 1);
  assert.match(result.stdout, /The component name is empty/);
});

test("a mistyped flag does not suggest Node's '--' form", () => {
  const result = where(['--bogus']);
  assert.equal(result.status, 1);
  assert.doesNotMatch(result.stdout, /To specify a positional/);
});
