/* `node --test scripts/`: the pnpm dev lock file — stale, corrupt and overwritten locks. */
import './test-env.mjs';
import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import { chmodSync, existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { test } from 'node:test';
import { ROOT } from '../dev-config.mjs';
import {
  isAlive,
  LOCK_FILE,
  lockName,
  processStart,
  readDevLock,
  releaseDevLock,
  updateDevLock,
  writeDevLock,
} from './lock.mjs';

const dir = mkdtempSync(resolve(tmpdir(), 'tilburg-lock-'));
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
  'a reader stops the groups of a stale lock while their leader is the recorded one, and leaves the rest alone',
  { skip: process.platform === 'win32' },
  async () => {
    const spawnGroup = (script) => spawn('sh', ['-c', script], { detached: true, stdio: 'ignore' });
    const alive = (pid) => {
      try {
        process.kill(-pid, 0);
        return true;
      } catch {
        return false;
      }
    };
    /* ours: the leader still runs, with the start time the lock recorded. */
    const ours = spawnGroup('sleep 30');
    /* recycled: same shape, but the lock says it started at another time (its number was handed on). */
    const recycled = spawnGroup('sleep 30');
    /* leaderless: the leader exited and left a child; the group id may by now be anyone's. */
    const leaderless = spawnGroup('sleep 30 & exit 0');
    await new Promise((done) => leaderless.on('exit', done));
    await new Promise((done) => setTimeout(done, 100));
    const file = lockWith({
      pid: 2 ** 22 + 17,
      started: new Date().toISOString(),
      groups: [
        { pid: ours.pid, started: processStart(ours.pid) },
        { pid: recycled.pid, started: processStart(recycled.pid) - 60_000 },
        { pid: leaderless.pid, started: 1 },
      ],
    });
    try {
      assert.equal(readDevLock(file), null);
      for (let waited = 0; waited < 3000 && alive(ours.pid); waited += 50)
        await new Promise((done) => setTimeout(done, 50));
      assert.equal(alive(ours.pid), false, 'the orphan was stopped');
      assert.equal(alive(recycled.pid), true, 'a group whose leader started at another time is left alone');
      assert.equal(alive(leaderless.pid), true, 'a group without its leader is left alone');
    } finally {
      for (const group of [ours, recycled, leaderless]) {
        try {
          process.kill(-group.pid, 'SIGKILL');
        } catch {
          /* already gone */
        }
      }
    }
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

test('takeBuildLock: takes a free lock, exits 1 with the busy problem when another build holds it, leaves "ours" alone', () => {
  const temp = mkdtempSync(resolve(dir, 'build-'));
  const take = (ours) =>
    spawnSync(
      process.execPath,
      [
        '--input-type=module',
        '-e',
        `import { readFileSync } from 'node:fs';
         import { SYNC_LOCK, takeBuildLock } from ${JSON.stringify(new URL('./lock.mjs', import.meta.url).href)};
         takeBuildLock('pnpm test', (other) => ({ what: 'busy: ' + other.what }), ${ours ? '() => true' : 'undefined'});
         console.log('took ' + JSON.parse(readFileSync(SYNC_LOCK, 'utf8')).what);`,
      ],
      { env: { ...process.env, TMPDIR: temp, TMP: temp, TEMP: temp }, encoding: 'utf8', timeout: 10_000 },
    );
  const free = take();
  assert.equal(free.status, 0, free.stderr);
  assert.match(free.stdout, /took pnpm test/);

  writeDevLock({ what: 'pnpm sync' }, resolve(temp, lockName(ROOT, 'sync')));
  const busy = take();
  assert.equal(busy.status, 1);
  assert.match(busy.stdout, /busy: pnpm sync/);
  const ours = take(true);
  assert.equal(ours.status, 0, ours.stderr);
  assert.match(ours.stdout, /took pnpm sync/);
});
