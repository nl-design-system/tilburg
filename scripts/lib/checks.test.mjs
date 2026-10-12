/* `node --test scripts/`: the checks behind pnpm check, the lock file, and pnpm parity end to end. */
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { newestMtime } from './checks.mjs';
import { readDevLock } from './lock.mjs';

const scripts = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');

test('newestMtime does not follow a symlink loop, and skips build output', () => {
  const dir = mkdtempSync(resolve(tmpdir(), 'tilburg-test-'));
  mkdirSync(resolve(dir, 'src'));
  mkdirSync(resolve(dir, 'src', 'dist'));
  writeFileSync(resolve(dir, 'src', 'a.ts'), 'a');
  symlinkSync(dir, resolve(dir, 'src', 'loop'));
  assert.ok(newestMtime([resolve(dir, 'src'), resolve(dir, 'missing')]) > 0);
});

test('a lock left by a process that is gone is stale: ignored and removed', () => {
  const file = resolve(mkdtempSync(resolve(tmpdir(), 'tilburg-lock-')), 'lock.json');
  writeFileSync(file, JSON.stringify({ pid: 2 ** 22 + 17, started: new Date().toISOString() }));
  assert.equal(readDevLock(file), null);
  assert.equal(existsSync(file), false);
});

test('a lock of a running process is read', () => {
  const file = resolve(mkdtempSync(resolve(tmpdir(), 'tilburg-lock-')), 'lock.json');
  writeFileSync(
    file,
    JSON.stringify({ pid: process.ppid, started: new Date().toISOString(), storybooks: [{ port: 6006 }] }),
  );
  assert.equal(readDevLock(file)?.storybooks[0].port, 6006);
});

test('a broken lock file is ignored', () => {
  const file = resolve(mkdtempSync(resolve(tmpdir(), 'tilburg-lock-')), 'lock.json');
  writeFileSync(file, '{ not json');
  assert.equal(readDevLock(file), null);
});

test('pnpm parity passes for a complete component and names the layers', () => {
  const result = spawnSync(process.execPath, [resolve(scripts, 'parity.mjs'), 'tooltip'], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.match(result.stdout, /Tooltip\s+✓\s+✓\s+✓\s+✓/);
});
