/* `node --test scripts/`: the pnpm dev lock file — stale, corrupt and overwritten locks. */
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { after, test } from 'node:test';
import { isAlive, readDevLock, writeDevLock } from './lock.mjs';

const dir = mkdtempSync(resolve(tmpdir(), 'tilburg-lock-'));
after(() => rmSync(dir, { recursive: true, force: true }));
let count = 0;
const lockWith = (content) => {
  const file = resolve(dir, `lock-${count++}.json`);
  writeFileSync(file, typeof content === 'string' ? content : JSON.stringify(content));
  return file;
};

test('this process is alive; a pid nobody has is not', () => {
  assert.equal(isAlive(process.pid), true);
  assert.equal(isAlive(2 ** 22 + 17), false);
});

for (const pid of [0, -1]) {
  test(`a corrupt lock with pid ${pid} is not taken for a running pnpm dev (it would signal a process group)`, () => {
    const file = lockWith({ pid, started: new Date().toISOString() });
    assert.equal(readDevLock(file), null);
    assert.equal(existsSync(file), false);
  });
}

for (const content of ['null', '[]', '{"pid":"123"}', '{"pid":1.5}', '']) {
  test(`a lock file holding ${JSON.stringify(content)} is ignored, not a crash`, () => {
    assert.equal(readDevLock(lockWith(content)), null);
  });
}

test('a missing lock file means nothing is running', () => {
  assert.equal(readDevLock(resolve(dir, 'missing.json')), null);
});

test('a lock that cannot be written does not stop pnpm dev', () => {
  assert.doesNotThrow(() => writeDevLock({}, resolve(dir, 'no-such-dir', 'lock.json')));
});

/* writeDevLock removes the file on exit, so it runs in a child process. */
const runWriter = (file, overwriteWith) =>
  spawnSync(
    process.execPath,
    [
      '--input-type=module',
      '-e',
      `import { writeFileSync } from 'node:fs';
       import { writeDevLock } from ${JSON.stringify(new URL('./lock.mjs', import.meta.url).href)};
       writeDevLock({ storybooks: [] }, ${JSON.stringify(file)});
       ${overwriteWith ? `writeFileSync(${JSON.stringify(file)}, ${JSON.stringify(JSON.stringify(overwriteWith))});` : ''}`,
    ],
    { timeout: 10_000, encoding: 'utf8' },
  );

test('pnpm dev removes its own lock when it exits', () => {
  const file = resolve(dir, 'own.json');
  const result = runWriter(file);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(existsSync(file), false);
});

test('pnpm dev leaves a lock alone that another pnpm dev wrote over its own', () => {
  const file = resolve(dir, 'other.json');
  const result = runWriter(file, { pid: process.pid, started: 'x' });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(JSON.parse(readFileSync(file, 'utf8')).pid, process.pid);
});
