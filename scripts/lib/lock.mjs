/* One `pnpm dev` per working copy, and a warning for anything that rebuilds dist/ underneath it.

   `pnpm dev` writes a small lock file (its pid and the Storybook ports) and removes it on exit. Other scripts read it:
   a second `pnpm dev` points at the first one instead of starting watchers that write the same dist/ folders twice;
   `verify`, `sync` and `setup` ask before building while it runs (that is what caused "EEXIST: mkdir dist/…"). A lock
   whose process is gone (a crash, a closed terminal) is stale and ignored. */
import { createHash } from 'node:crypto';
import { readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { ROOT } from '../dev-config.mjs';
import { c, confirm } from './cli-utils.mjs';

/* In the temp folder, not the repo: no stray files to commit, and a reboot clears it. One per working copy. */
export const LOCK_FILE = resolve(
  tmpdir(),
  `tilburg-dev-${createHash('sha1').update(ROOT).digest('hex').slice(0, 10)}.json`,
);

/** Is that process still running? `EPERM` means it is, but owned by someone else. */
export function isAlive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (err) {
    return err.code === 'EPERM';
  }
}

/** The running `pnpm dev` ({ pid, storybooks, started }), or null. Removes a stale lock. */
export function readDevLock(file = LOCK_FILE) {
  let lock;
  try {
    lock = JSON.parse(readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
  if (!Number.isInteger(lock?.pid) || lock.pid === process.pid || !isAlive(lock.pid)) {
    rmSync(file, { force: true });
    return null;
  }
  return lock;
}

export function writeDevLock(data, file = LOCK_FILE) {
  try {
    writeFileSync(file, JSON.stringify({ pid: process.pid, started: new Date().toISOString(), ...data }));
  } catch {
    /* without a lock the other scripts just cannot warn: not worth stopping pnpm dev for */
  }
  process.on('exit', () => rmSync(file, { force: true }));
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
