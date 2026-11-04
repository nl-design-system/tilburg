/* Where nvm keeps the Node versions it installed: nvm (nvm-sh) on macOS, Linux and WSL, nvm-windows on Windows. Used by
   setup.mjs and recovery.mjs to run a step under the right Node without the user's shell having switched to it.
   Node built-ins only, and nothing newer than Node 18: setup.mjs loads it on the Node it is about to replace. */
import { readdirSync, realpathSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, resolve, sep } from 'node:path';

/* homedir(), not HOME: cron, env -i and docker --user have no HOME. */
export const NVM_DIR = process.env.NVM_DIR ?? resolve(homedir(), '.nvm');

/* nvm-windows sets NVM_HOME at install. It is a program (nvm.exe), not nvm-sh's shell function, and has no nvm.sh. */
export const NVM_HOME = (process.platform === 'win32' && process.env.NVM_HOME) || null;

/** Whether `a` is an older version than `b` ("24.9.0" before "24.15.0"). */
const older = (a, b) => a.localeCompare(b, undefined, { numeric: true }) < 0;

/**
 * The Node versions of `major` that nvm has installed, newest first, as { version: '24.15.0', bin }, where bin is the
 * folder that holds the node program (what goes first on the PATH). With `minimum`, none older than that.
 *   nvm-sh:           $NVM_DIR/versions/node/v24.15.0/bin/node
 *   nvm-windows 1.x:  %NVM_HOME%\v24.15.0\node.exe
 *   nvm-windows 2.x:  %NVM_HOME%\installs\v24.15.0\node.exe
 */
export function nvmNodes(major, { minimum, nvmDir = NVM_DIR, nvmHome = NVM_HOME } = {}) {
  const found = [];
  const scan = (folder, binOf) => {
    let names = [];
    try {
      names = readdirSync(folder);
    } catch {
      return; /* no such folder: this nvm (or this layout of it) is not installed */
    }
    for (const name of names) {
      /* startsWith, as setup.mjs and recovery.mjs always matched: a v24.0.0-rc.1 folder counts too. */
      if (!name.startsWith(`v${major}.`)) continue;
      found.push({ version: name.slice(1), bin: binOf(resolve(folder, name)) });
    }
  };
  if (nvmHome) {
    scan(nvmHome, (dir) => dir);
    scan(resolve(nvmHome, 'installs'), (dir) => dir);
  } else {
    scan(resolve(nvmDir, 'versions/node'), (dir) => resolve(dir, 'bin'));
  }
  return found
    .filter(({ version }) => !minimum || !older(version, minimum))
    .sort((a, b) => (older(a.version, b.version) ? 1 : -1));
}

/** The newest of nvmNodes(), or null. */
export const newestNvmNode = (major, options) => nvmNodes(major, options)[0] ?? null;

/**
 * With nvm-windows: the folder of the running Node when that is not one nvm-windows installed, else null. Such a Node
 * (the nodejs.org installer puts one in C:\Program Files\nodejs, on the system PATH, which Windows searches before the
 * user PATH that nvm-windows adds itself to) is found first in every terminal, so `nvm use` changes nothing.
 * realpath: nvm-windows 1.x runs Node through a symlink (NVM_SYMLINK) that points into NVM_HOME.
 */
export function nodeOutsideNvmWindows(execPath = process.execPath, nvmHome = NVM_HOME) {
  if (!nvmHome) return null;
  const real = (path) => {
    try {
      return realpathSync(path).toLowerCase();
    } catch {
      return resolve(path).toLowerCase();
    }
  };
  const folder = dirname(execPath);
  const home = real(nvmHome);
  const here = real(folder);
  return here === home || here.startsWith(`${home}${sep}`) ? null : folder;
}
