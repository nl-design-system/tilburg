/* For the script tests: fake commands, PATH and the temp folder, the same way on macOS, Linux and Windows.

   The fakes are shell scripts (or node scripts with #!/usr/bin/env node). Windows runs neither from a file without an
   extension: cmd.exe, and the scripts' `shell: true`, look for name.cmd. writeFake() adds one that hands the script to
   Git for Windows' sh.exe (every clone of this repo on Windows has Git), or to node. On macOS and Linux it writes
   exactly what the tests wrote before: the script, executable. */
import { spawnSync } from 'node:child_process';
import { chmodSync, existsSync, writeFileSync } from 'node:fs';
import { delimiter, dirname, join, resolve } from 'node:path';

/** Git for Windows' sh.exe (C:\Program Files\Git\bin\sh.exe), found from `git --exec-path`; null elsewhere. */
export const WINDOWS_SH = process.platform === 'win32' ? findWindowsSh() : null;

function findWindowsSh() {
  /* e.g. C:/Program Files/Git/mingw64/libexec/git-core: Git's root is a few folders up. */
  const exec = spawnSync('git', ['--exec-path'], { encoding: 'utf8' }).stdout?.trim();
  if (!exec) return null;
  for (let dir = resolve(exec), up = 0; up < 4; dir = dirname(dir), up++) {
    for (const candidate of ['bin/sh.exe', 'usr/bin/sh.exe']) {
      if (existsSync(join(dir, candidate))) return join(dir, candidate);
    }
  }
  return null;
}

/** Why a test with shell-script fakes cannot run on this machine, or false. For `{ skip: noShell }`. */
export const noShell =
  process.platform === 'win32' && !WINDOWS_SH && 'the fakes are shell scripts, and Git for Windows (sh.exe) is missing';

/** Why a test that sends POSIX signals (SIGINT, SIGTERM, SIGHUP to a child) cannot run here, or false. */
export const noSignals =
  process.platform === 'win32' && 'Windows has no POSIX signals: a kill ends the process at once';

/**
 * Write the fake command `name` into `dir`: `script` as is, executable; on Windows also name.cmd that runs it. Returns
 * the path of the script.
 */
export function writeFake(dir, name, script) {
  const file = join(dir, name);
  writeFileSync(file, script);
  chmodSync(file, 0o755);
  if (process.platform === 'win32') {
    const runner = /^#!.*\bnode\b/.test(script) ? `"${process.execPath}"` : `"${WINDOWS_SH ?? 'sh'}"`;
    /* %~dp0: the folder of the .cmd itself. CRLF: cmd.exe reads a batch file line by line. */
    writeFileSync(`${file}.cmd`, `@${runner} "%~dp0${name}" %*\r\n`);
  }
  return file;
}

/** `env` with `dirs` first on its PATH, under the key it already has (Windows spells it Path; two keys would clash). */
export function prependPath(env, ...dirs) {
  const key =
    process.platform === 'win32' ? (Object.keys(env).find((name) => name.toUpperCase() === 'PATH') ?? 'PATH') : 'PATH';
  /* Joined exactly as the tests always did (bin, delimiter, PATH), also when PATH is empty or unset. */
  return { ...env, [key]: `${dirs.join(delimiter)}${delimiter}${env[key]}` };
}

/**
 * A shell command that runs `code` with this Node, the same in sh and in cmd.exe (`shell: true` on Windows). Keep
 * `code` to single quotes, without $, `, %, " and backslashes: each shell gives one of those a meaning of its own.
 */
export const nodeCommand = (code) => `"${process.execPath}" -e "${code}"`;

/** Points a child's os.tmpdir() at `dir`: TMPDIR on macOS and Linux (only that, as before), TEMP and TMP on Windows. */
export const tempEnv = (dir) => (process.platform === 'win32' ? { TMPDIR: dir, TEMP: dir, TMP: dir } : { TMPDIR: dir });
