/* The checks behind `pnpm check`, also used by `pnpm dev` and `pnpm sync`. Each returns a table row:
   { ok, warn, label, detail, note, fix }. `ok: false` is broken (nothing will work until it is fixed); `warn` works but
   needs attention, with the command that sorts it out. `fix` is what `pnpm check --fix` offers: { label (a Y/n
   question), command, order (lower runs first), run? }. Without `run` it only prints the command: `nvm use` is a shell
   function, so a child process cannot change your shell's Node. */
import { spawnSync } from 'node:child_process';
import fs, { existsSync, lstatSync, readdirSync, readFileSync, readlinkSync, realpathSync, statSync } from 'node:fs';
import http from 'node:http';
import net from 'node:net';
import { cpus, homedir } from 'node:os';
import { delimiter, dirname, resolve } from 'node:path';
import { LIBRARIES, NODE_MAJOR, PNPM_VERSION, ROOT, STORYBOOKS } from '../dev-config.mjs';
import { ago, c, capture } from './cli-utils.mjs';
import { readDevLock } from './lock.mjs';

const cmd = (text) => `${c.cyan}${text}${c.reset}`;

/** Run a fix's command in the foreground (its output and questions go to the terminal); throws on failure. */
export function runInherit(command) {
  const { status, signal, error } = spawnSync(command, { shell: true, stdio: 'inherit', cwd: ROOT });
  if (error) throw error;
  if (status !== 0) throw new Error(`\`${command}\` exited with ${status ?? signal}`);
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

/**
 * The minimum that an engines range ("^22.22.3 || ^24.15.0 || >=26.0.0") sets for `version`'s major, as "24.15.0",
 * when `version` is below it; else null. A prerelease (24.15.0-nightly…) is below its release.
 */
export function belowEngines(version, range) {
  const [major, minor, patch] = version.replace(/^v/, '').split(/[.+-]/).map(Number);
  const min = range?.match(new RegExp(`\\^${major}\\.(\\d+)\\.(\\d+)`));
  if (!min) return null;
  const [m, p] = [Number(min[1]), Number(min[2])];
  const below = minor < m || (minor === m && (patch < p || (patch === p && /^v?[\d.]+-/.test(version))));
  return below ? `${major}.${m}.${p}` : null;
}

/* Angular asks more than .nvmrc's major: Angular 22 refuses Node 24 below 24.15. Unknown until installed. */
function angularNodeRange() {
  try {
    const file = resolve(ROOT, 'packages/storybook-angular/node_modules/@angular/core/package.json');
    return JSON.parse(readFileSync(file, 'utf8')).engines?.node;
  } catch {
    return undefined;
  }
}

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
  const angularNeeds = major === NODE_MAJOR && belowEngines(version, angularNodeRange());
  if (angularNeeds) {
    return {
      ok: true,
      warn: true,
      detail: `v${version}, but Angular needs ${angularNeeds} or newer`,
      note: `install a newer Node ${NODE_MAJOR}: ${cmd(`nvm install ${NODE_MAJOR}`)}`,
    };
  }
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

/** Settings that make pnpm skip devDependencies, which every build, test and Storybook here needs. */
export function checkEnvironment(env = process.env) {
  const set = [
    env.NODE_ENV === 'production' && 'NODE_ENV=production',
    /^(true|1)$/i.test(env.npm_config_production ?? '') && 'npm_config_production',
    /\bdev\b/.test(env.npm_config_omit ?? '') && 'npm_config_omit=dev',
  ].filter(Boolean);
  /* Every child node inherits NODE_OPTIONS: --inspect makes each one fight over port 9229, --require loads its file. */
  const nodeOptions = env.NODE_OPTIONS?.match(/(?<!\S)(--inspect[\w-]*|--require|-r)(?![\w-])/g);
  if (!set.length && nodeOptions) {
    return {
      ok: true,
      warn: true,
      detail: `NODE_OPTIONS holds ${nodeOptions.join(' ')}: every Node that pnpm and the builds start inherits it`,
      note: `unset it in this terminal: ${cmd('unset NODE_OPTIONS')}`,
    };
  }
  if (!set.length) return { ok: true, detail: 'no settings that skip devDependencies' };
  return {
    ok: true,
    warn: true,
    detail: `${set.join(', ')} is set: pnpm install then skips devDependencies (the build tools)`,
    note: `unset it in this terminal (${cmd(`unset ${set.map((name) => name.split('=')[0]).join(' ')}`)}), then pnpm install`,
  };
}

/** An x64 Node on an Apple Silicon Mac (Rosetta): native binaries in node_modules then fit only one of the two. */
export function checkCpu(
  { platform, arch, cpuModel } = { platform: process.platform, arch: process.arch, cpuModel: cpus()[0]?.model ?? '' },
) {
  /* Under Rosetta, os.cpus() still names the Apple chip while process.arch says x64. */
  if (platform === 'darwin' && arch === 'x64' && /^Apple /.test(cpuModel)) {
    return {
      ok: true,
      warn: true,
      detail: `x64 Node under Rosetta on ${cpuModel}`,
      note: `open a native terminal (${cmd('arch -arm64 zsh')}); if ${cmd('node -p process.arch')} still says x64, reinstall Node (${cmd(`nvm uninstall ${process.versions.node} && nvm install ${NODE_MAJOR}`)}), then ${cmd('rm -rf node_modules && pnpm install')}`,
    };
  }
  return { ok: true, detail: `${arch}${cpuModel ? `, ${cpuModel}` : ''}` };
}

/** The first `corepack` on the PATH and its version (from its package.json), or null. */
function findCorepack() {
  /* On Windows the PATH holds corepack.cmd, next to node_modules/corepack. */
  const names = process.platform === 'win32' ? ['corepack.cmd', 'corepack'] : ['corepack'];
  for (const dir of (process.env.PATH ?? '').split(delimiter)) {
    const path = names.map((name) => resolve(dir || '.', name)).find((file) => existsSync(file));
    if (!path) continue;
    try {
      const pkg = resolve(dirname(realpathSync(path)), '..', 'package.json');
      return { path, version: JSON.parse(readFileSync(pkg, 'utf8')).version };
    } catch {
      return { path, version: undefined };
    }
  }
  return null;
}

/**
 * corepack older than 0.31 cannot verify (or, on Node 24, even start) the pnpm 11 it has to fetch. It is usually a
 * leftover from another install (an old Node in /usr/local, Homebrew) that comes before nvm's on the PATH.
 */
export function checkCorepack(found = findCorepack(), nodeBin = dirname(process.execPath)) {
  if (!found) return { ok: true, detail: 'not on your PATH', note: `only needed for ${cmd('corepack enable')}` };
  const [major, minor] = (found.version ?? '').split('.').map(Number);
  if (!(major === 0 && minor < 31)) return { ok: true, detail: found.version ?? 'version unknown', note: found.path };
  const other = dirname(found.path) !== nodeBin ? `, not the one of the Node in ${nodeBin}` : '';
  return {
    ok: true,
    warn: true,
    detail: `${found.version} at ${found.path}${other}: too old for pnpm 11`,
    note: `run ${cmd('npm install -g corepack@latest && corepack enable')}${other && `, or remove ${found.path}`}`,
  };
}

export async function checkPnpm() {
  const { code, stdout, stderr, timedOut } = await capture('pnpm --version', { timeoutMs: 60_000, cwd: ROOT });
  const version = stdout.trim();
  /* pnpm 11 runs on whatever `node` is first on the PATH, which can be another than the one running this check
     (an nvm default of 20, say). Then it cannot start at all: say so instead of "not found". */
  if (/requires at least Node|node:sqlite|ERR_UNKNOWN_BUILTIN_MODULE/.test(stderr)) {
    const pathNode = stderr.match(/current version of Node\.js is (v\d+(?:\.\d+)*)/)?.[1] ?? 'an older Node';
    return {
      ok: false,
      detail: `cannot start: pnpm 11 runs on ${pathNode} from your PATH`,
      note: `run ${cmd('nvm use')}, or make ${NODE_MAJOR} the default: ${cmd(`nvm alias default ${NODE_MAJOR}`)}`,
      fix: NVM_FIX,
    };
  }
  /* It is there but does not start (corepack cannot fetch or verify it, say): "not found" would send you the wrong way. */
  if (timedOut || (code !== 0 && code !== 127 && !/not found/.test(stderr))) {
    const why = timedOut ? 'gave no answer in 60 s' : stderr.trim().split('\n')[0] || `exited with ${code}`;
    return {
      ok: false,
      detail: `\`pnpm --version\` failed: ${why}`,
      note: `run ${cmd('pnpm --version')} to see why; ${cmd('corepack enable')} reinstalls it`,
      fix: COREPACK_FIX,
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
  /* Deleted by accident (or by a tool): restore it, since pnpm install would resolve every version anew. */
  if (!existsSync(resolve(ROOT, 'pnpm-lock.yaml'))) {
    return {
      ok: false,
      detail: 'pnpm-lock.yaml is missing',
      note: `restore it: ${cmd('git restore pnpm-lock.yaml')} (pnpm install would resolve every version anew)`,
    };
  }
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

/** statfs of `path`; undefined on a Node without it, null where it throws (network mounts, FUSE). */
function statfs(path) {
  if (!fs.statfsSync) return undefined;
  try {
    return fs.statfsSync(path);
  } catch {
    return null;
  }
}

/** Under 2 GB free, an install or build stops halfway with ENOSPC. */
export function checkDiskSpace(free = statfs(ROOT)) {
  /* statfsSync came in Node 18.15, and this check must still run on an old Node to say so. */
  if (free === undefined) return { skip: true, ok: true, detail: 'unknown on this Node' };
  if (free === null) return { skip: true, ok: true, detail: 'unknown on this filesystem' };
  if (typeof free === 'object') free = free.bavail * free.bsize;
  const gb = (free / 1024 ** 3).toFixed(1);
  if (free >= 2 * 1024 ** 3) return { ok: true, detail: `${gb} GB free` };
  return {
    ok: true,
    warn: true,
    detail: `only ${gb} GB free: installs and builds may stop with ENOSPC`,
    note: `${cmd('pnpm store prune')} and ${cmd('pnpm run clean:pick')} free some`,
  };
}

/** The root package.json parses (a merge conflict or half-saved edit leaves it broken for every pnpm command). */
export function checkPackageJson(file = resolve(ROOT, 'package.json')) {
  try {
    JSON.parse(readFileSync(file, 'utf8'));
    return { ok: true, detail: 'readable' };
  } catch (err) {
    return { ok: false, detail: `does not parse: ${err.message}`, note: `fix ${cmd(file)} (merge conflict markers?)` };
  }
}

/** A synced folder (iCloud Drive, OneDrive, Dropbox) uploads node_modules and leaves "file 2" conflict copies in it. */
export function checkFolder(
  root = realpathSync(ROOT),
  platform = process.platform,
  home = homedir(),
  /* iCloud "Desktop & Documents" keeps the /Users/x/Documents path, so only this folder gives it away. */
  icloudDocuments = platform === 'darwin' &&
    existsSync(resolve(home, 'Library/Mobile Documents/com~apple~CloudDocs/Documents')),
) {
  /* WSL on a Windows drive: file watching does not see changes there, and every install is many times slower. */
  if (platform === 'linux' && /^\/mnt\/[a-z]\//.test(root)) {
    return {
      ok: true,
      warn: true,
      detail: 'on a Windows drive under WSL: the watchers miss changes and installs are slow',
      note: `clone it inside WSL instead, e.g. ${cmd('~/code/tilburg')}`,
    };
  }
  /* Forward slashes, so the same patterns match Windows paths (C:\\Users\\…\\OneDrive\\…). */
  const synced = root
    .replace(/\\/g, '/')
    .match(/\/Library\/(Mobile Documents|CloudStorage)\/|\/(Dropbox|OneDrive|Google Drive)[^/]*\//)?.[0];
  if (!synced && icloudDocuments && ['Documents', 'Desktop'].some((dir) => root.startsWith(`${home}/${dir}/`))) {
    return {
      ok: true,
      warn: true,
      detail: 'in ~/Documents or ~/Desktop with iCloud "Desktop & Documents" on: sync conflicts in node_modules',
      note: `move it out, e.g. ${cmd(`mv "${root}" ~/Developer/`)}, then ${cmd('pnpm install')} there`,
    };
  }
  if (!synced) return { ok: true, detail: 'not in a synced folder', note: root };
  return {
    ok: true,
    warn: true,
    detail: `inside a synced folder (${synced.replace(/^\/|\/$/g, '')}): sync conflicts in node_modules`,
    note: `move it out, e.g. ${cmd(`mv "${root}" ~/Developer/`)}, then ${cmd('pnpm install')} there`,
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
    /* Folders too: deleting a file changes only its folder's mtime. */
    newest = Math.max(newest, stat.mtimeMs);
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
  /* A source file from the future (a zip, a machine whose clock ran ahead) would beat every build: rebuild, say why. */
  const skewed = changedAt > Date.now();
  return { state: skewed || changedAt > builtAt ? 'stale' : 'fresh', builtAt, changedAt, skewed };
}

export function checkLibrary(library) {
  const { state, builtAt, changedAt, skewed } = libraryState(library);
  const forWhom = library.for.map((key) => STORYBOOKS[key].name.replace(' Storybook', '')).join(' + ');
  if (state === 'missing') {
    return {
      ok: true,
      warn: true,
      detail: 'not built yet',
      note: `${cmd('pnpm dev')} builds it (needed by ${forWhom})`,
    };
  }
  if (skewed) {
    return {
      ok: true,
      warn: true,
      detail: 'source has a modification time in the future (clock skew, or files from a zip)',
      note: `${cmd('pnpm dev')} rebuilds it every time until the clock passes it; check the date, or touch the files`,
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

/**
 * A Storybook gives itself away by its index.json: its `entries`, or null when the port serves no Storybook. node:http,
 * not fetch: Node 24's fetch (undici) sets the socket's type of service, which macOS refuses (EINVAL) on a connection
 * the server just closed, and that error escapes as an uncaught exception no try/catch around fetch can stop (seen
 * with a Storybook that was killed mid-check).
 */
export async function storybookEntries(port) {
  /* Both loopbacks, not `localhost`: /etc/hosts may map that to only one, and the Storybook may listen on the other. */
  return (await entriesAt('127.0.0.1', port)) ?? (await entriesAt('::1', port));
}

function entriesAt(host, port) {
  return new Promise((done) => {
    const request = http.get({ host, port, path: '/index.json', timeout: 1500 }, (response) => {
      let body = '';
      response.setEncoding('utf8');
      response.on('data', (chunk) => (body += chunk));
      response.on('error', () => done(null));
      response.on('end', () => {
        try {
          done((response.statusCode === 200 && JSON.parse(body)?.entries) || null);
        } catch {
          done(null);
        }
      });
    });
    request.on('timeout', () => request.destroy());
    request.on('error', () => done(null));
  });
}

export async function isStorybookOn(port) {
  return Boolean(await storybookEntries(port));
}

/**
 * The working directory of the process listening on `port`, or null when it cannot tell (Windows, no lsof and no ss,
 * another user's process).
 */
export function listenerDir(port) {
  const run = (command, args) => spawnSync(command, args, { encoding: 'utf8', timeout: 3000 }).stdout ?? '';
  /* -b -w: do not block on a hung network mount (and do not warn about it). */
  const lsof = (args) => run('lsof', ['-b', '-w', ...args]);
  let pid = lsof(['-nP', `-iTCP:${port}`, '-sTCP:LISTEN', '-t'])
    .split('\n')[0]
    .trim();
  /* Linux without lsof (Docker, minimal Ubuntu, WSL): ss names the pid, /proc its folder. */
  if (process.platform === 'linux') {
    if (!pid) pid = run('ss', ['-ltnpH', `sport = :${port}`]).match(/pid=(\d+)/)?.[1];
    try {
      if (pid) return readlinkSync(`/proc/${pid}/cwd`);
    } catch {
      /* not ours to read: fall through to lsof */
    }
  }
  if (!pid) return null;
  const line = lsof(['-a', '-p', pid, '-d', 'cwd', '-Fn'])
    .split('\n')
    .find((entry) => entry.startsWith('n'));
  return line ? line.slice(1) : null;
}

/**
 * Is the Storybook on `port` this one, from this working copy? Another clone or worktree (on another branch), a
 * consumer's Storybook (hltsamen shows our stories too) or the other Tilburg Storybook must not be reused.
 * `{ ours: true }`, or `{ ours: false, what }` with a description for the message; null when no Storybook serves there.
 */
export async function identifyStorybook(storybook, port, findDir = listenerDir) {
  const entries = await storybookEntries(port);
  if (!entries) return null;
  const dir = findDir(port);
  const root = realpathSync(ROOT);
  /* The root or one of our packages: a worktree inside the checkout (.claude/worktrees/…) is another branch. */
  const ours = dir === root || ['packages', 'proprietary'].some((group) => dir?.startsWith(`${root}/${group}/`));
  if (dir && !ours) return { ours: false, what: `a Storybook from ${dir}` };
  if (!Object.keys(entries).some((id) => storybook.storyId?.test(id) ?? true)) {
    const other = Object.values(STORYBOOKS).find(
      (candidate) => candidate !== storybook && Object.keys(entries).some((id) => candidate.storyId?.test(id)),
    );
    return { ours: false, what: other ? `the ${other.name}` : 'another Storybook' };
  }
  /* Unknown folder (Windows, no lsof): it may be another clone's, so do not reuse it; pnpm dev moves to a free port. */
  if (!dir) return { ours: false, what: 'a Storybook whose folder cannot be told (no lsof)' };
  return { ours: true };
}

export async function checkStorybookPort(storybook) {
  /* pnpm dev may have moved it to another port (its usual one was taken): then that is where it is, nothing to fix. */
  const viaDev = readDevLock()?.storybooks?.find((running) => running.name === storybook.name);
  if (viaDev)
    return { ok: true, detail: `running in pnpm dev on ${viaDev.port}`, note: `http://localhost:${viaDev.port}/` };
  const code = await portStatus(storybook.port);
  if (code === null) return { ok: true, detail: `${storybook.port} is free` };
  const found = code === 'EADDRINUSE' ? await identifyStorybook(storybook, storybook.port) : null;
  if (found?.ours) {
    return { ok: true, detail: `already running on ${storybook.port}`, note: `http://localhost:${storybook.port}/` };
  }
  if (found) {
    return {
      ok: true,
      warn: true,
      detail: `${storybook.port} is taken by ${found.what}`,
      note: `${cmd('pnpm dev')} uses the next free port; stop that Storybook to get ${storybook.port} back`,
    };
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
        safely('Environment', checkEnvironment),
        safely('CPU', checkCpu),
        safely('corepack', checkCorepack),
        safely('Disk space', checkDiskSpace),
        safely('Folder', checkFolder),
        safely('Git hooks', checkGitHooks),
        safely('Git push', checkGitPush),
        safely('Git branch', checkBranchBehind),
      ]),
    },
    {
      title: 'Install',
      rows: await Promise.all([
        safely('package.json', checkPackageJson),
        safely('node_modules', checkInstalled),
        safely('Dependencies', checkInstallFresh),
      ]),
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
