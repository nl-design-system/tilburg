/* One `pnpm dev` per working copy, and a warning for anything that rebuilds dist/ underneath it.

   `pnpm dev` writes a small lock file (its pid and the Storybook ports) and removes it on exit. Other scripts read it:
   a second `pnpm dev` points at the first one instead of starting watchers that write the same dist/ folders twice;
   `verify`, `sync` and `setup` ask before building while it runs (that is what caused "EEXIST: mkdir dist/…"). A lock
   whose process is gone (a crash, a closed terminal) is stale and ignored. */
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { lstatSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { ROOT } from '../dev-config.mjs';
import { c, confirm } from './cli-utils.mjs';

/* In the temp folder, not the repo: no stray files to commit, and a reboot clears it. One per working copy. */
export const LOCK_FILE = resolve(
  tmpdir(),
  `tilburg-dev-${createHash('sha1').update(ROOT).digest('hex').slice(0, 10)}.json`,
);

/** pnpm sync's lock: the same format, so readDevLock/writeDevLock work on it too. */
export const SYNC_LOCK = LOCK_FILE.replace('tilburg-dev-', 'tilburg-sync-');

/** Is that process still running? `EPERM` means it is, but owned by someone else. */
export function isAlive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (err) {
    return err.code === 'EPERM';
  }
}

/**
 * When that process started (ms), or null where ps cannot tell (Windows). A pid can be handed to a new process after
 * the old one died, so a pid alone does not say the lock's process is still the one that wrote it.
 */
export function processStart(pid) {
  if (process.platform === 'win32') return null;
  const result = spawnSync('ps', ['-o', 'lstart=', '-p', String(pid)], {
    encoding: 'utf8',
    env: { ...process.env, LC_ALL: 'C' },
    timeout: 3000,
  });
  const started = Date.parse(result.stdout?.trim().replace(/\s+/g, ' ') ?? '');
  return Number.isNaN(started) ? null : started;
}

/* lstart has whole seconds: allow a little for the rounding. */
const sameProcess = (pid, started) => {
  if (!Number.isFinite(started)) return true;
  const now = processStart(pid);
  return now === null || Math.abs(now - started) <= 2000;
};

/** Stop the watcher process groups a pnpm dev that was killed hard (kill -9, a crash) left running. */
function reapGroups(lock) {
  for (const { pid, started } of Array.isArray(lock?.groups) ? lock.groups : []) {
    /* Only a group whose leader is still the process pnpm dev started, never one that got its number later. */
    if (!Number.isInteger(pid) || pid <= 1 || !Number.isFinite(started) || !isAlive(pid)) continue;
    if (processStart(pid) === null || !sameProcess(pid, started)) continue;
    try {
      process.kill(-pid, 'SIGTERM');
    } catch {
      /* gone meanwhile, or not ours */
    }
  }
}

/* Another user's file in a sticky /tmp cannot be removed (EPERM): leave it, it is not ours anyway. */
function removeLock(file) {
  try {
    rmSync(file, { force: true });
  } catch {
    /* not ours to remove */
  }
}

/**
 * The running `pnpm dev` ({ pid, storybooks, started }), or null. Removes a stale lock; with `reap`, also stops the
 * watchers a pnpm dev that was killed hard left behind (only pnpm dev itself asks for that).
 */
export function readDevLock(file = LOCK_FILE, { reap = false } = {}) {
  let lock;
  try {
    /* Another user's lock (a shared box, or planted in /tmp) says nothing about our pnpm dev. */
    const owner = lstatSync(file).uid;
    if (process.getuid && owner !== process.getuid()) return null;
    lock = JSON.parse(readFileSync(file, 'utf8'));
  } catch {
    /* unreadable or broken (also a symlink planted in a shared temp folder): remove the link itself, not its target */
    removeLock(file);
    return null;
  }
  /* pid 0 and negatives would signal a process group, which always "exists" */
  if (
    !Number.isInteger(lock?.pid) ||
    lock.pid <= 0 ||
    /* Another shape (an older script, a hand edit): the readers would crash on it or print "Invalid Date". */
    (lock.storybooks !== undefined && !Array.isArray(lock.storybooks)) ||
    Number.isNaN(Date.parse(lock.started)) ||
    lock.pid === process.pid ||
    !isAlive(lock.pid) ||
    !sameProcess(lock.pid, lock.processStarted)
  ) {
    if (reap) reapGroups(lock);
    removeLock(file);
    return null;
  }
  return lock;
}

/**
 * Returns false when another process holds the lock (it wrote it between our check and now); true otherwise, also
 * when the lock could not be written for another reason (then the other scripts just cannot warn).
 */
export function writeDevLock(data, file = LOCK_FILE) {
  let written = true;
  try {
    /* 'wx': never through a symlink or over a file someone else just made (readDevLock removed a stale one). */
    writeFileSync(
      file,
      JSON.stringify({
        pid: process.pid,
        started: new Date().toISOString(),
        processStarted: processStart(process.pid),
        ...data,
      }),
      { flag: 'wx', mode: 0o600 },
    );
  } catch (err) {
    if (err.code === 'EEXIST') written = false;
  }
  process.on('exit', () => {
    /* Only our own: a second pnpm dev that started at the same moment may have written its lock over this one. */
    try {
      if (JSON.parse(readFileSync(file, 'utf8')).pid === process.pid) rmSync(file, { force: true });
    } catch {
      /* gone already, or not ours to judge */
    }
  });
  return written;
}

/** Add to our own lock (e.g. the watchers' process groups once they run). Never touches another process's lock. */
export function updateDevLock(data, file = LOCK_FILE) {
  try {
    const lock = JSON.parse(readFileSync(file, 'utf8'));
    if (lock.pid !== process.pid) return;
    /* A new file renamed over the old one: the rename replaces a planted symlink instead of writing through it. */
    const next = `${file}.${process.pid}`;
    rmSync(next, { force: true });
    writeFileSync(next, JSON.stringify({ ...lock, ...data }), { flag: 'wx', mode: 0o600 });
    renameSync(next, file);
  } catch {
    /* no lock to add to */
  }
}

/**
 * Before a script rebuilds dist/: is `pnpm dev` running? Then say so, and ask whether to go on (without a terminal
 * it goes on, with the warning in the log). Returns false when the user would rather stop.
 */
export async function confirmNoDevRunning(what) {
  const lock = readDevLock();
  if (!lock) return true;
  const ports = (lock.storybooks ?? []).map((storybook) => storybook.port).join(' and ');
  console.log(
    `  ${c.yellow}⚠${c.reset}  pnpm dev is running (process ${lock.pid}${ports ? `, Storybook on ${ports}` : ''}). ` +
      `${what} writes the same dist/ folders as its watchers, and two builds at once can fail with EEXIST or leave a half-written build.`,
  );
  const goOn = await confirm('Continue anyway? (or stop pnpm dev with q first)', { default: false, fallback: true });
  return goOn;
}
