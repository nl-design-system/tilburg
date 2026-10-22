/* The checks behind `pnpm check`, also used by `pnpm dev` and `pnpm sync`. Each returns a table row:
   { ok, warn, label, detail, note, fix }. `ok: false` is broken (nothing will work until it is fixed); `warn` works but
   needs attention, with the command that sorts it out. `fix` is what `pnpm check --fix` offers: { label (a Y/n
   question), command, order (lower runs first), run? }. Without `run` it only prints the command: `nvm use` is a shell
   function, so a child process cannot change your shell's Node. */
import { spawnSync } from 'node:child_process';
import { existsSync, lstatSync, readdirSync, readFileSync, statSync } from 'node:fs';
import net from 'node:net';
import { resolve } from 'node:path';
import { LIBRARIES, NODE_MAJOR, PNPM_VERSION, ROOT, STORYBOOKS } from '../dev-config.mjs';
import { ago, c, capture } from './cli-utils.mjs';
import { readDevLock } from './lock.mjs';

const cmd = (text) => `${c.cyan}${text}${c.reset}`;

/** Run a fix's command in the foreground (its output and questions go to the terminal); throws on failure. */
export function runInherit(command) {
  const { status, error } = spawnSync(command, { shell: true, stdio: 'inherit', cwd: ROOT });
  if (error) throw error;
  if (status !== 0) throw new Error(`\`${command}\` exited with ${status}`);
}

const shellFix = (label, command, order) => ({ label, command, order, run: () => runInherit(command) });
const NVM_FIX = { label: 'Switch Node', command: 'nvm use', order: 10 };
const COREPACK_FIX = shellFix('Run corepack enable?', 'corepack enable', 20);
const INSTALL_FIX = shellFix('Run pnpm install?', 'pnpm install', 30);
const HUSKY_FIX = shellFix('Install the git hooks?', 'pnpm exec husky', 40);

/** Run a check so that a bug in it becomes one red row instead of killing the whole table. */
export async function safely(label, fn, ...args) {
  try {
    /* `recheck` runs the row again after its fix (pnpm check --fix). */
    return { label, ...(await fn(...args)), recheck: () => fn(...args) };
  } catch (error) {
    return { label, ok: false, detail: `the check crashed: ${error?.message ?? error}`, error };
  }
}

// ─── Tools ───────────────────────────────────────────────────────────────────

export function checkNode() {
  const version = process.versions.node;
  if (!Number.isInteger(NODE_MAJOR)) {
    return {
      ok: false,
      detail: `v${version}, but .nvmrc holds no Node version`,
      note: 'put the major version in it, e.g. 24',
    };
  }
  const major = Number(version.split('.')[0]);
  if (major === NODE_MAJOR) return { ok: true, detail: `v${version}`, note: `.nvmrc pins ${NODE_MAJOR}` };
  return {
    ok: false,
    detail: `v${version}, but this repo needs Node ${NODE_MAJOR}`,
    note: process.env.NVM_DIR
      ? `run ${cmd('nvm use')} in this terminal`
      : `install Node ${NODE_MAJOR} (nvm is easiest: ${cmd('nvm install')})`,
    ...(process.env.NVM_DIR && { fix: NVM_FIX }),
  };
}

export async function checkPnpm() {
  const { code, stdout, stderr } = await capture('pnpm --version', { timeoutMs: 15_000, cwd: ROOT });
  const version = stdout.trim();
  /* pnpm 11 runs on whatever `node` is first on the PATH, which can be another than the one running this check
     (an nvm default of 20, say). Then it cannot start at all: say so instead of "not found". */
  if (/requires at least Node|node:sqlite|ERR_UNKNOWN_BUILTIN_MODULE/.test(stderr)) {
    const pathNode = stderr.match(/current version of Node\.js is (v[\d.]+)/)?.[1] ?? 'an older Node';
    return {
      ok: false,
      detail: `cannot start: pnpm 11 runs on ${pathNode} from your PATH`,
      note: `run ${cmd('nvm use')}, or make ${NODE_MAJOR} the default: ${cmd(`nvm alias default ${NODE_MAJOR}`)}`,
      fix: NVM_FIX,
    };
  }
  if (code !== 0 || !version) {
    return {
      ok: false,
      detail: 'pnpm not found',
      note: `run ${cmd('corepack enable')} (it comes with Node)`,
      fix: COREPACK_FIX,
    };
  }
  if (PNPM_VERSION && version !== PNPM_VERSION) {
    return {
      ok: true,
      warn: true,
      detail: `${version}, package.json pins ${PNPM_VERSION}`,
      note: `run ${cmd('corepack enable')} so this folder uses the pinned pnpm`,
      fix: COREPACK_FIX,
    };
  }
  return { ok: true, detail: version, note: 'package.json "packageManager"' };
}

/** husky's `prepare` script installs the pre-commit hook on `pnpm install`; a clone that never installed has none. */
export async function checkGitHooks() {
  const { stdout } = await capture('git config core.hooksPath', { cwd: ROOT, timeoutMs: 5000 });
  if (stdout.trim() === '.husky/_' && existsSync(resolve(ROOT, '.husky/_'))) {
    return { ok: true, detail: 'pre-commit runs lint-staged', note: '.husky/pre-commit' };
  }
  return {
    ok: true,
    warn: true,
    detail: 'not installed, so commits are not linted',
    note: `run ${cmd('pnpm install')} (its prepare step installs them) or ${cmd('pnpm exec husky')}`,
    fix: HUSKY_FIX,
  };
}

/** Not a requirement, but a failed `git push` halfway through a release is a poor moment to find out. */
export async function checkGitPush() {
  const { stdout: url } = await capture('git remote get-url origin', { cwd: ROOT, timeoutMs: 5000 });
  if (!url.trim()) return { skip: true, ok: true, detail: 'no origin remote' };
  if (!url.startsWith('https://')) return { ok: true, detail: 'over SSH', note: url.trim() };
  const { stdout: helper } = await capture('git config credential.helper', { cwd: ROOT, timeoutMs: 5000 });
  if (helper.trim()) return { ok: true, detail: `HTTPS, credentials from ${helper.trim()}`, note: url.trim() };
  return {
    ok: true,
    warn: true,
    detail: 'HTTPS without a credential helper',
    note: `git push will ask for a username; ${cmd('gh auth login')} or a credential helper fixes that`,
  };
}

/**
 * Commits the branch is behind its upstream and origin/main, from the refs already here: no fetch, so it stays fast and
 * offline. Skipped outside a git checkout or when there is nothing to compare with.
 */
export async function checkBranchBehind() {
  const note = 'as of the last fetch';
  const git = async (args) => capture(`git ${args}`, { cwd: ROOT, timeoutMs: 5000 });
  const count = ({ code, stdout }) => (code === 0 ? Number(stdout.trim()) : 0);
  const [head, upstream, behindUp, behindMain, hasMain] = await Promise.all([
    git('rev-parse --abbrev-ref HEAD'),
    git('rev-parse --abbrev-ref "@{u}"'),
    git('rev-list --count "HEAD..@{u}"'),
    git('rev-list --count HEAD..origin/main'),
    git('rev-parse --verify --quiet origin/main'),
  ]);
  const up = upstream.code === 0 ? upstream.stdout.trim() : null;
  const main = hasMain.code === 0;
  if (head.code !== 0 || (!up && !main)) return { skip: true, ok: true, detail: 'nothing to compare with' };

  const behind = [];
  if (up && count(behindUp)) behind.push(`${count(behindUp)} commit(s) behind ${up} — run ${cmd('git pull')}`);
  if (main && up !== 'origin/main' && count(behindMain))
    behind.push(
      `${count(behindMain)} commit(s) behind origin/main — run ${cmd('git fetch && git rebase origin/main')}`,
    );
  if (behind.length) return { ok: true, warn: true, detail: behind.join('; '), note };
  const compared = [up, main && up !== 'origin/main' && 'origin/main'].filter(Boolean).join(' and ');
  return { ok: true, detail: `up to date with ${compared}`, note };
}

// ─── Install ─────────────────────────────────────────────────────────────────

const installMarker = resolve(ROOT, 'node_modules/.modules.yaml');

export function checkInstalled() {
  if (!existsSync(installMarker)) {
    return { ok: false, detail: 'node_modules is missing', note: `run ${cmd('pnpm install')}`, fix: INSTALL_FIX };
  }
  return { ok: true, detail: `installed ${ago(statSync(installMarker).mtimeMs)}`, note: 'node_modules' };
}

/**
 * A branch switch or a pull that changed the dependencies, without an install since. pnpm keeps a copy of the
 * lockfile it installed (node_modules/.pnpm/lock.yaml); compared by content, because pnpm also rewrites an unchanged
 * pnpm-lock.yaml.
 */
export function checkInstallFresh() {
  const installedLock = resolve(ROOT, 'node_modules/.pnpm/lock.yaml');
  if (!existsSync(installedLock)) return { skip: true, ok: true, detail: 'not installed yet' };
  if (readFileSync(installedLock, 'utf8') === readFileSync(resolve(ROOT, 'pnpm-lock.yaml'), 'utf8')) {
    return { ok: true, detail: 'match pnpm-lock.yaml' };
  }
  return {
    ok: true,
    warn: true,
    detail: 'pnpm-lock.yaml differs from what is installed',
    note: `run ${cmd('pnpm install')} (a branch switch or pull changed the dependencies)`,
    fix: INSTALL_FIX,
  };
}

// ─── Build output ────────────────────────────────────────────────────────────

/**
 * The newest modification time below `paths` (files or folders), skipping node_modules and build output. Symlinks
 * are not followed (a link back up the tree would never end), and a folder it may not read is skipped, not fatal.
 */
export function newestMtime(paths) {
  let newest = 0;
  const visit = (path) => {
    let stat;
    try {
      stat = lstatSync(path);
    } catch {
      return;
    }
    if (stat.isSymbolicLink()) return;
    if (stat.isFile()) {
      newest = Math.max(newest, stat.mtimeMs);
      return;
    }
    if (!stat.isDirectory()) return;
    let entries = [];
    try {
      entries = readdirSync(path, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (['node_modules', 'dist', '.angular'].includes(entry.name)) continue;
      visit(resolve(path, entry.name));
    }
  };
  paths.forEach(visit);
  return newest;
}

/** Is the library built, and is the build newer than its source? `state` is 'missing', 'stale' or 'fresh'. */
export function libraryState(library) {
  const built = resolve(ROOT, library.dir, library.built);
  if (!existsSync(built)) return { state: 'missing' };
  const builtAt = statSync(built).mtimeMs;
  const changedAt = newestMtime(library.src.map((src) => resolve(ROOT, library.dir, src)));
  return { state: changedAt > builtAt ? 'stale' : 'fresh', builtAt, changedAt };
}

export function checkLibrary(library) {
  const { state, builtAt, changedAt } = libraryState(library);
  const forWhom = library.for.map((key) => STORYBOOKS[key].name.replace(' Storybook', '')).join(' + ');
  if (state === 'missing') {
    return {
      ok: true,
      warn: true,
      detail: 'not built yet',
      note: `${cmd('pnpm dev')} builds it (needed by ${forWhom})`,
    };
  }
  if (state === 'stale') {
    return {
      ok: true,
      warn: true,
      detail: `source newer than the build (${ago(changedAt)} vs ${ago(builtAt)})`,
      note: `an edit, or git touched the files (checkout, stash, reset). ${cmd('pnpm dev')} rebuilds it`,
    };
  }
  return { ok: true, detail: `built ${ago(builtAt)}`, note: `${library.dir}/${library.built}` };
}

// ─── Ports ───────────────────────────────────────────────────────────────────

function tryBind(port, host) {
  return new Promise((done) => {
    const server = net.createServer();
    server.once('error', (err) => done(err.code ?? 'UNKNOWN'));
    server.once('listening', () => server.close(() => done(null)));
    server.listen(port, host);
  });
}

/**
 * null when the port is free, else the error code. Tries the loopbacks and the wildcard addresses: a server on
 * 0.0.0.0 (http-server, Storybook) does not stop a bind to 127.0.0.1 on macOS, so testing only the loopbacks misses it.
 */
export async function portStatus(port) {
  for (const host of ['127.0.0.1', '::1', '0.0.0.0', '::']) {
    const code = await tryBind(port, host);
    if (code === null || code === 'EADDRNOTAVAIL' || code === 'EAFNOSUPPORT') continue;
    return code;
  }
  return null;
}

export async function findFreePort(from, span = 20, skip = []) {
  for (let port = from; port < from + span; port++) {
    if (!skip.includes(port) && (await portStatus(port)) === null) return port;
  }
  return null;
}

/** A Storybook gives itself away by its index.json. */
export async function isStorybookOn(port) {
  try {
    const response = await fetch(`http://localhost:${port}/index.json`, { signal: AbortSignal.timeout(1500) });
    return response.ok && Boolean((await response.json())?.entries);
  } catch {
    return false;
  }
}

export async function checkStorybookPort(storybook) {
  /* pnpm dev may have moved it to another port (its usual one was taken): then that is where it is, nothing to fix. */
  const viaDev = readDevLock()?.storybooks?.find((running) => running.name === storybook.name);
  if (viaDev)
    return { ok: true, detail: `running in pnpm dev on ${viaDev.port}`, note: `http://localhost:${viaDev.port}/` };
  const code = await portStatus(storybook.port);
  if (code === null) return { ok: true, detail: `${storybook.port} is free` };
  if (code === 'EADDRINUSE' && (await isStorybookOn(storybook.port))) {
    return { ok: true, detail: `already running on ${storybook.port}`, note: `http://localhost:${storybook.port}/` };
  }
  return {
    ok: true,
    warn: true,
    detail: `${storybook.port} is taken by another process`,
    note: `${cmd('pnpm dev')} uses the next free port; ${cmd(`lsof -i :${storybook.port}`)} shows who has it`,
  };
}

/** Is pnpm dev running for this working copy? Read from its lock file; a crashed one does not count. */
export function checkDevRunning() {
  const lock = readDevLock();
  if (!lock) return { ok: true, detail: 'not running', note: `${cmd('pnpm dev')} starts it` };
  const ports = (lock.storybooks ?? []).map((storybook) => `http://localhost:${storybook.port}/`).join('  ');
  return { ok: true, detail: `running (process ${lock.pid}, since ${ago(Date.parse(lock.started))})`, note: ports };
}

/** All of it, grouped for printCheckTable(). */
export async function runAllChecks() {
  return [
    {
      title: 'Tools',
      rows: await Promise.all([
        safely('Node', checkNode),
        safely('pnpm', checkPnpm),
        safely('Git hooks', checkGitHooks),
        safely('Git push', checkGitPush),
        safely('Git branch', checkBranchBehind),
      ]),
    },
    {
      title: 'Install',
      rows: await Promise.all([safely('node_modules', checkInstalled), safely('Dependencies', checkInstallFresh)]),
    },
    {
      title: 'Libraries the Storybooks load from dist/',
      rows: await Promise.all(LIBRARIES.map((library) => safely(library.name, checkLibrary, library))),
    },
    {
      title: 'Storybooks',
      rows: await Promise.all([
        safely('pnpm dev', checkDevRunning),
        ...Object.values(STORYBOOKS).map((storybook) => safely(storybook.name, checkStorybookPort, storybook)),
      ]),
    },
  ];
}
