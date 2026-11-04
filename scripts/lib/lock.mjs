/* One `pnpm dev` per working copy, and a warning for anything that rebuilds dist/ underneath it.

   `pnpm dev` writes a small lock file (its pid and the Storybook ports) and removes it on exit. Other scripts read it:
   a second `pnpm dev` points at the first one instead of starting watchers that write the same dist/ folders twice;
   `verify`, `sync` and `setup` ask before building while it runs (that is what caused "EEXIST: mkdir dist/…"). A lock
   whose process is gone (a crash, a closed terminal) is stale: any reader stops the watchers it left and removes it. */
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { linkSync, lstatSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { ROOT } from '../dev-config.mjs';
import { c, confirm } from './cli-utils.mjs';

/* In the temp folder, not the repo: no stray files to commit. One per working copy and user: on a shared /tmp another
   user's lock (or a root-owned one from an old sudo run) would otherwise block ours. Windows paths ignore case, and
   the drive letter's case depends on how the terminal was opened (c:\ or C:\): the same checkout, one lock. */
const uid = process.getuid ? `${process.getuid()}-` : '';

/**
 * The name (no folder) of the `kind` lock ('dev' or 'sync') of the working copy at `root`. Exported for the tests,
 * which put a lock where a script copied into a temp folder will look for it.
 */
export function lockName(root, kind = 'dev') {
  const key = process.platform === 'win32' ? root.toLowerCase() : root;
  return `tilburg-${kind}-${uid}${createHash('sha1').update(key).digest('hex').slice(0, 10)}.json`;
}

export const LOCK_FILE = resolve(tmpdir(), lockName(ROOT));

/** The build lock pnpm sync, verify and pack:local share (one rebuild of dist/ at a time); the same format as the dev lock. */
export const SYNC_LOCK = resolve(tmpdir(), lockName(ROOT, 'sync'));

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
 * When that process started, in ms, or null where nobody can tell (Windows). Only comparable with another
 * processStart() on the same machine. A pid can be handed to a new process after the old one died, so a pid alone
 * does not say the lock's process is still the one that wrote it.
 */
export function processStart(pid) {
  if (process.platform === 'win32') return null;
  if (process.platform === 'linux') {
    /* Field 22 of /proc/<pid>/stat: clock ticks since boot, plus the boot time from /proc/stat, so a pid from before a
       reboot never matches. ps derives lstart from the wall clock, which moves with an NTP step or a WSL2 resync, and
       BusyBox ps has no lstart at all. The name (field 2) may hold spaces and ")". */
    try {
      const ticks = Number(readFileSync(`/proc/${pid}/stat`, 'utf8').split(') ').pop().split(' ')[19]);
      const boot = Number(readFileSync('/proc/stat', 'utf8').match(/^btime (\d+)/m)?.[1]);
      /* ponytail: assumes 100 ticks a second (every mainstream kernel); only the unit is off otherwise, not the match. */
      if (Number.isFinite(ticks) && Number.isFinite(boot)) return boot * 1000 + ticks * 10;
    } catch {
      /* no /proc (or the process is gone): ask ps */
    }
  }
  const result = spawnSync('ps', ['-o', 'lstart=', '-p', String(pid)], {
    encoding: 'utf8',
    env: { ...process.env, LC_ALL: 'C' },
    timeout: 3000,
  });
  const started = Date.parse(result.stdout?.trim().replace(/\s+/g, ' ') ?? '');
  return Number.isNaN(started) ? null : started;
}

/* Windows has no start time: a pid there is only still pnpm dev's while it belongs to a node.exe. No tasklist
   (or it fails) proves nothing, so the lock stays. */
function windowsNode(pid) {
  const result = spawnSync('tasklist', ['/fi', `PID eq ${pid}`, '/fo', 'csv', '/nh'], {
    encoding: 'utf8',
    timeout: 3000,
  });
  return result.status !== 0 || /^"node\.exe"/im.test(result.stdout ?? '');
}

/* lstart has whole seconds: allow a little for the rounding. */
const sameProcess = (pid, started) => {
  if (process.platform === 'win32') return windowsNode(pid);
  if (!Number.isFinite(started)) return true;
  const now = processStart(pid);
  return now === null || Math.abs(now - started) <= 2000;
};

/** Stop the watcher process groups a pnpm dev that was killed hard (kill -9, a crash) left running. */
function reapGroups(lock) {
  for (const { pid, started } of Array.isArray(lock?.groups) ? lock.groups : []) {
    if (!Number.isInteger(pid) || pid <= 1 || !Number.isFinite(started)) continue;
    /* Only while the leader is provably the process pnpm dev started. A group whose leader is gone may by now be
       someone else's (the lock can be days old, or from before a reboot): leave it rather than stop the wrong thing. */
    if (!isAlive(pid) || processStart(pid) === null || !sameProcess(pid, started)) continue;
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
 * The running `pnpm dev` ({ pid, storybooks, started }), or null. A stale lock is removed, after stopping the watchers
 * a pnpm dev that was killed hard left behind: every reader does that, since removing the lock loses the record of
 * them (`reap` is still accepted, and ignored). Our own lock is null without being touched, unless `own` asks for it
 * (code inside pnpm dev that needs to know whether pnpm dev runs).
 */
export function readDevLock(file = LOCK_FILE, { own = false } = {}) {
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
  if (lock?.pid === process.pid) return own ? lock : null;
  /* pid 0 and negatives would signal a process group, which always "exists" */
  if (
    !Number.isInteger(lock?.pid) ||
    lock.pid <= 0 ||
    /* Another shape (an older script, a hand edit): the readers would crash on it or print "Invalid Date". */
    (lock.storybooks !== undefined && !Array.isArray(lock.storybooks)) ||
    Number.isNaN(Date.parse(lock.started)) ||
    !isAlive(lock.pid) ||
    !sameProcess(lock.pid, lock.processStarted)
  ) {
    reapGroups(lock);
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
  const content = JSON.stringify({
    pid: process.pid,
    started: new Date().toISOString(),
    processStarted: processStart(process.pid),
    ...data,
  });
  /* Written whole to a file of our own, then linked into place: link() fails when the lock exists, so it is as
     exclusive as 'wx', and no reader ever sees the lock empty halfway through being written (and removes it). */
  const draft = `${file}.${process.pid}.new`;
  try {
    rmSync(draft, { force: true });
    writeFileSync(draft, content, { flag: 'wx', mode: 0o600 });
    linkSync(draft, file);
  } catch (err) {
    if (err.code === 'EEXIST') written = false;
    else if (err.syscall === 'link') {
      /* A filesystem without hard links: the plain exclusive write. */
      try {
        writeFileSync(file, content, { flag: 'wx', mode: 0o600 });
      } catch (writeErr) {
        if (writeErr.code === 'EEXIST') written = false;
      }
    }
  } finally {
    rmSync(draft, { force: true });
  }
  process.on('exit', () => releaseDevLock(file));
  return written;
}

/** Remove our own lock now (writeDevLock also does on exit). Only our own: another pnpm dev may have written over it. */
export function releaseDevLock(file = LOCK_FILE) {
  try {
    if (JSON.parse(readFileSync(file, 'utf8')).pid === process.pid) rmSync(file, { force: true });
  } catch {
    /* gone already, or not ours to judge */
  }
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
  /* An install does not build dist/: it swaps node_modules under the watchers that read it. */
  const clash = /\binstall\b/.test(what)
    ? 'replaces node_modules under its watchers, and they can crash or build from half-installed packages.'
    : 'writes the same dist/ folders as its watchers, and two builds at once can fail with EEXIST or leave a half-written build.';
  console.log(
    `  ${c.yellow}⚠${c.reset}  pnpm dev is running (process ${lock.pid}${ports ? `, Storybook on ${ports}` : ''}). ${what} ${clash}`,
  );
  const goOn = await confirm('Continue anyway? (or stop pnpm dev with q first)', { default: false, fallback: true });
  return goOn;
}
