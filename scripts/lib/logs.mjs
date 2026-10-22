/* The step logs runStep() and pnpm dev write to LOG_DIR, read back for `pnpm logs`. */
import { closeSync, openSync, readdirSync, readSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { LOG_DIR } from './cli-utils.mjs';

/** The last `bytes` of a file as text. */
function readTail(path, bytes) {
  const fd = openSync(path, 'r');
  try {
    const size = statSync(path).size;
    const buffer = Buffer.alloc(Math.min(bytes, size));
    readSync(fd, buffer, 0, buffer.length, size - buffer.length);
    return buffer.toString('utf8');
  } finally {
    closeSync(fd);
  }
}

/**
 * The logs in `dir`, newest first: { path, step, time, size, exit }. `exit` is what runStep wrote last ("0", "1",
 * "SIGTERM"), or null while it runs, for a pnpm dev process, or when it was killed before it could. A missing folder
 * is no logs.
 */
export function readLogs(dir = LOG_DIR) {
  let names;
  try {
    names = readdirSync(dir).filter((name) => name.endsWith('.log'));
  } catch {
    return [];
  }
  return names
    .sort()
    .reverse()
    .map((name) => {
      const path = join(dir, name);
      const { size, mtime } = statSync(path);
      return {
        path,
        /* Names are <ISO stamp>-<slug>.log (newLogFile). */
        step: name.replace(/^\d{4}-\d\d-\d\dT\d\d-\d\d-\d\d-/, '').replace(/\.log$/, ''),
        time: mtime,
        size,
        exit: /# exit (\S+)\s*$/.exec(size ? readTail(path, 200) : '')?.[1] ?? null,
      };
    });
}

/** The log `pnpm logs --last` shows: the newest failure, else the newest log. */
export const pickLast = (logs) => logs.find((log) => log.exit !== null && log.exit !== '0') ?? logs[0] ?? null;

/** The last `count` lines of a log (256 KB holds far more than that of any tool's output). */
export function tailLines(path, count = 80) {
  return readTail(path, 256 * 1024)
    .replace(/\n$/, '')
    .split('\n')
    .slice(-count);
}
