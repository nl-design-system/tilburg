/* `node --test scripts/`: the pnpm dev lock file — stale, corrupt and overwritten locks. */
import './test-env.mjs';
import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import { chmodSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { after, test } from 'node:test';
import { isAlive, LOCK_FILE, processStart, readDevLock, releaseDevLock, updateDevLock, writeDevLock } from './lock.mjs';

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

test(
  'a lock whose pid now belongs to another process (started later) is stale',
  /* BusyBox ps (Alpine) has no lstart; Linux reads /proc instead, so only a box with neither skips. */
  { skip: process.platform === 'win32' || !processStart(process.pid) },
  () => {
    const started = processStart(process.ppid);
    assert.ok(started, 'ps tells when a process started');
    /* The parent is alive, but the lock says its process started a minute earlier: the pid was handed on. */
    const file = lockWith({ pid: process.ppid, started: new Date().toISOString(), processStarted: started - 60_000 });
    assert.equal(readDevLock(file), null);
    assert.equal(existsSync(file), false);
    const same = lockWith({ pid: process.ppid, started: new Date().toISOString(), processStarted: started });
    assert.equal(readDevLock(same)?.pid, process.ppid);
  },
);

test('writeDevLock says when another process already holds the lock', () => {
  const file = lockWith({ pid: process.ppid, started: new Date().toISOString() });
  assert.equal(writeDevLock({}, file), false);
  assert.equal(JSON.parse(readFileSync(file, 'utf8')).pid, process.ppid, 'the other lock is left alone');
  const mine = resolve(dir, `lock-${count++}.json`);
  assert.equal(writeDevLock({}, mine), true);
  updateDevLock({ groups: [{ pid: 1, started: 0 }] }, mine);
  assert.deepEqual(JSON.parse(readFileSync(mine, 'utf8')).groups, [{ pid: 1, started: 0 }]);
  updateDevLock({ groups: [] }, file);
  assert.equal(JSON.parse(readFileSync(file, 'utf8')).groups, undefined, 'never writes another process its lock');
});

for (const content of [
  { pid: process.ppid, started: new Date().toISOString(), storybooks: 'x' },
  { pid: process.ppid, started: 'yesterday-ish' },
]) {
  test(`a lock of another shape (${JSON.stringify(content).slice(0, 60)}) is broken, not a crash later`, () => {
    const file = lockWith(content);
    assert.equal(readDevLock(file), null);
    assert.equal(existsSync(file), false);
  });
}

test('a lock in a folder we may not delete from is ignored, not a crash', { skip: !process.getuid }, () => {
  const sticky = resolve(dir, 'ro');
  mkdirSync(sticky);
  const file = resolve(sticky, 'lock.json');
  writeFileSync(file, 'broken');
  chmodSync(sticky, 0o555);
  try {
    assert.equal(readDevLock(file), null);
  } finally {
    chmodSync(sticky, 0o755);
  }
});

test('our own lock reads as null and stays; with own it is returned (installSkip inside pnpm dev)', () => {
  const file = resolve(dir, `lock-${count++}.json`);
  writeDevLock({ storybooks: [] }, file);
  assert.equal(readDevLock(file), null);
  assert.equal(existsSync(file), true, 'not removed');
  assert.equal(readDevLock(file, { own: true })?.pid, process.pid);
  releaseDevLock(file);
  assert.equal(existsSync(file), false);
});

test('the lock name is per user', { skip: !process.getuid }, () => {
  assert.match(LOCK_FILE, new RegExp(`tilburg-dev-${process.getuid()}-[0-9a-f]{10}\\.json$`));
});

test(
  'every reader stops the groups of a stale lock, also one whose leader is gone',
  { skip: process.platform === 'win32' },
  async () => {
    /* A group whose leader (sh) exits at once, leaving its child (sleep) in the group: what a pnpm that died leaves. */
    const group = spawn('sh', ['-c', 'sleep 30 & exit 0'], { detached: true, stdio: 'ignore' });
    await new Promise((done) => group.on('exit', done));
    const alive = () => {
      try {
        process.kill(-group.pid, 0);
        return true;
      } catch {
        return false;
      }
    };
    assert.equal(alive(), true, 'the sleep still runs in the group');
    const file = lockWith({
      pid: 2 ** 22 + 17,
      started: new Date().toISOString(),
      groups: [{ pid: group.pid, started: 1 }],
    });
    assert.equal(readDevLock(file), null);
    for (let waited = 0; waited < 3000 && alive(); waited += 50) await new Promise((done) => setTimeout(done, 50));
    assert.equal(alive(), false, 'the orphan was stopped');
  },
);

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
