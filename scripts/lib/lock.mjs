/* One `pnpm dev` per working copy, and a warning for anything that rebuilds dist/ underneath it.

   pnpm dev writes a small lock (its pid and the Storybook ports) and removes it on exit. A second pnpm dev points at
   the first instead of starting watchers that write the same dist/ twice; verify, sync and setup ask before building
   while it runs (the cause of "EEXIST: mkdir dist/…"). A lock whose process is gone (a crash, a closed terminal) is
   stale: any reader stops the watchers it left behind and removes it. */
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { linkSync, lstatSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { ROOT } from '../dev-config.mjs';
import { c, confirm, exitAfter, exitWith, readJson, tryOr } from './cli-utils.mjs';

/* In the temp folder (nothing stray to commit), one per working copy and user: on a shared /tmp, another user's lock
   (or a root-owned one from an old sudo run) must not block ours. Windows paths ignore case, and the drive letter's
   case depends on how the terminal was opened (c:\ or C:\): same checkout, one lock. */
const uid = process.getuid ? `${process.getuid()}-` : '';

/** The file name of the `kind` lock ('dev' or 'sync') of the working copy at `root`. Tests use it to plant locks. */
export function lockName(root, kind = 'dev') {
  const key = process.platform === 'win32' ? root.toLowerCase() : root;
  return `tilburg-${kind}-${uid}${createHash('sha1').update(key).digest('hex').slice(0, 10)}.json`;
}

export const LOCK_FILE = resolve(tmpdir(), lockName(ROOT));

/** The build lock sync, verify and pack:local share (one rebuild of dist/ at a time); same format as the dev lock. */
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
 * When that process started (ms), or null where nobody can tell (Windows); comparable only on the same machine. A pid
 * alone proves nothing: it can be handed to a new process after the one that wrote the lock died.
 */
export function processStart(pid) {
  if (process.platform === 'win32') return null;
  if (process.platform === 'linux') {
    /* Field 22 of /proc/<pid>/stat (ticks since boot) plus btime from /proc/stat, so a pid from before a reboot never
       matches. ps's lstart follows the wall clock (NTP steps, WSL2 resyncs), and BusyBox ps has none. The name
       (field 2) may hold spaces and ")". */
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

/* Windows has no start time: a pid is still pnpm dev's only while it belongs to a node.exe. No tasklist, or one that
   fails, proves nothing: the lock stays. */
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
    /* Only while the leader is provably the one pnpm dev started: a group whose leader is gone may be someone else's
       by now (the lock can be days old, or from before a reboot). Better leave it than stop the wrong thing. */
    if (!isAlive(pid) || processStart(pid) === null || !sameProcess(pid, started)) continue;
    tryOr(() => process.kill(-pid, 'SIGTERM'));
  }
}

/* Another user's file in a sticky /tmp cannot be removed (EPERM): leave it, it is not ours anyway. */
const removeLock = (file) => tryOr(() => rmSync(file, { force: true }));

/**
 * The running pnpm dev ({ pid, storybooks, started }), or null. A stale lock is removed after stopping the watchers a
 * hard-killed pnpm dev left behind; every reader does that, as removing the lock loses the record of them (`reap` is
 * still accepted, and ignored). Our own lock reads as null, untouched, unless `own` asks for it.
 */
export function readDevLock(file = LOCK_FILE, { own = false } = {}) {
  let lock;
  try {
    /* Another user's lock (a shared box, or planted in /tmp) says nothing about our pnpm dev. */
    const owner = lstatSync(file).uid;
    if (process.getuid && owner !== process.getuid()) return null;
    lock = JSON.parse(readFileSync(file, 'utf8'));
  } catch {
    /* unreadable, broken, or a symlink planted in a shared temp folder: remove the link itself, not its target */
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
 * False when another process holds the lock (written between our check and now); true otherwise, also when it could
 * not be written for another reason (the other scripts then just cannot warn).
 */
export function writeDevLock(data, file = LOCK_FILE) {
  let written = true;
  const content = JSON.stringify({
    pid: process.pid,
    started: new Date().toISOString(),
    processStarted: processStart(process.pid),
    ...data,
  });
  /* Written whole to our own file, then linked into place: link() fails when the lock exists (as exclusive as 'wx'),
     and no reader ever sees a half-written lock and removes it. */
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
  if (readJson(file)?.pid === process.pid) removeLock(file);
}

/** Add to our own lock (e.g. the watchers' process groups once they run). Never touches another process's lock. */
export function updateDevLock(data, file = LOCK_FILE) {
  try {
    const lock = readJson(file);
    if (lock?.pid !== process.pid) return;
    /* A new file renamed over the old one: the rename replaces a planted symlink instead of writing through it. */
    const next = `${file}.${process.pid}`;
    rmSync(next, { force: true });
    writeFileSync(next, JSON.stringify({ ...lock, ...data }), { flag: 'wx', mode: 0o600 });
    renameSync(next, file);
  } catch {}
}

/**
 * Before a script rebuilds dist/: if pnpm dev runs, say so and ask whether to go on (without a terminal: go on, with
 * the warning in the log). False when the user would rather stop.
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
  return confirm('Continue anyway? (or stop pnpm dev with q first)', { default: false, fallback: true });
}

/** confirmNoDevRunning(what), or exit 1 when the user would rather stop pnpm dev first. */
export async function confirmNoDevRunningOrExit(what) {
  if (await confirmNoDevRunning(what)) return;
  exitAfter('  Stopped: stop pnpm dev with q, then run this again.', 1);
}

/**
 * Take the build lock of sync, verify and pack:local for `what` ('pnpm verify'), or exit 1 when another build holds
 * it, with `why` two at once go wrong. A lock for which `ours(lock)` is true is left alone (pack:local started by the
 * sync holding it).
 */
export function takeBuildLock(what, why, ours = () => false) {
  const other = readDevLock(SYNC_LOCK);
  if (other && !ours(other)) {
    const running = other.what ?? 'pnpm sync';
    exitWith({
      what: `${running === what ? 'Another ' : ''}${running} is running (process ${other.pid}, since ${other.started})`,
      why,
      fix: `wait for it to finish, then ${what} again`,
    });
  }
  if (!other && !writeDevLock({ what }, SYNC_LOCK))
    exitWith({
      what: 'Another build took the build lock just now',
      why: 'it started between the check above and this one; two builds at once fail with EEXIST.',
      fix: 'wait for it to finish, then run this again',
    });
}
