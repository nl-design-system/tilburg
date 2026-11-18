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
import { delimiter, dirname, resolve, sep } from 'node:path';
import { LIBRARIES, NODE_MAJOR, PNPM_VERSION, ROOT, STORYBOOKS } from '../dev-config.mjs';
import { ago, capture, cmd, readJson, readText, tryOr, warnRow } from './cli-utils.mjs';
import { readDevLock } from './lock.mjs';
import { newestNvmNode, nodeOutsideNvmWindows, NVM_HOME } from './nvm.mjs';

/** Run a fix's command in the foreground (its output and questions go to the terminal); throws on failure. */
export function runInherit(command) {
  const { status, signal, error } = spawnSync(command, { shell: true, stdio: 'inherit', cwd: ROOT });
  if (error) throw error;
  if (status !== 0) throw new Error(`\`${command}\` exited with ${status ?? signal}`);
}

const shellFix = (label, command, order) => ({ label, command, order, run: () => runInherit(command) });
/* nvm-windows has no .nvmrc support: `nvm use` there needs the version. No `a && b` in a command to type: Windows
   PowerShell 5.1 refuses it. */
const NVM_USE = NVM_HOME ? `nvm use ${NODE_MAJOR}` : 'nvm use';
const NVM_FIX = { label: 'Switch Node', command: NVM_USE, order: 10 };
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
 * The minimum an engines range ("^22.22.3 || ^24.15.0 || >=26.0.0") sets for `version`'s major, as "24.15.0", when
 * `version` is below it; else null. A prerelease (24.15.0-nightly…) is below its release.
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
  return readJson(resolve(ROOT, 'packages/storybook-angular/node_modules/@angular/core/package.json'))?.engines?.node;
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
    return warnRow(
      `v${version}, but Angular needs ${angularNeeds} or newer`,
      `install a newer Node ${NODE_MAJOR}: ${cmd(`nvm install ${NODE_MAJOR}`)}`,
    );
  }
  if (major === NODE_MAJOR) return { ok: true, detail: `v${version}`, note: `.nvmrc pins ${NODE_MAJOR}` };
  if (NVM_HOME) {
    const installed = newestNvmNode(NODE_MAJOR);
    const outside = installed && nodeOutsideNvmWindows();
    return {
      ok: false,
      detail: outside
        ? `v${version} from ${outside}, which comes before nvm's Node ${installed.version} on your PATH`
        : `v${version}, but this repo needs Node ${NODE_MAJOR}`,
      /* nvm use cannot switch away from a Node that Windows finds first on the (system) PATH. */
      note: outside
        ? `nvm use cannot change that: uninstall that Node (Settings → Apps → Node.js), then open a new terminal; ${cmd('node scripts/setup.mjs')} runs under nvm's Node meanwhile`
        : installed
          ? `run ${cmd(NVM_USE)}`
          : `run ${cmd(`nvm install ${NODE_MAJOR}`)}, then ${cmd(NVM_USE)}`,
      ...(!outside && { fix: NVM_FIX }),
    };
  }
  return {
    ok: false,
    detail: `v${version}, but this repo needs Node ${NODE_MAJOR}`,
    note: process.env.NVM_DIR
      ? `run ${cmd(NVM_USE)} in this terminal`
      : `install Node ${NODE_MAJOR} (nvm is easiest: ${cmd('nvm install')})`,
    ...(process.env.NVM_DIR && { fix: NVM_FIX }),
  };
}

/** Settings that make pnpm skip devDependencies, which every build, test and Storybook here needs. */
export function checkEnvironment(env = process.env, platform = process.platform) {
  /* PowerShell has no `unset`. */
  const unset = (names) =>
    platform === 'win32' ? names.map((name) => `Remove-Item Env:${name}`).join('; ') : `unset ${names.join(' ')}`;
  const set = [
    env.NODE_ENV === 'production' && 'NODE_ENV=production',
    /^(true|1)$/i.test(env.npm_config_production ?? '') && 'npm_config_production',
    /\bdev\b/.test(env.npm_config_omit ?? '') && 'npm_config_omit=dev',
  ].filter(Boolean);
  /* Every child node inherits NODE_OPTIONS: --inspect makes each one fight over port 9229, --require loads its file. */
  const nodeOptions = env.NODE_OPTIONS?.match(/(?<!\S)(--inspect[\w-]*|--require|-r)(?![\w-])/g);
  if (!set.length && nodeOptions) {
    return warnRow(
      `NODE_OPTIONS holds ${nodeOptions.join(' ')}: every Node that pnpm and the builds start inherits it`,
      `unset it in this terminal: ${cmd(unset(['NODE_OPTIONS']))}`,
    );
  }
  if (!set.length) return { ok: true, detail: 'no settings that skip devDependencies' };
  return warnRow(
    `${set.join(', ')} is set: pnpm install then skips devDependencies (the build tools)`,
    `unset it in this terminal (${cmd(unset(set.map((name) => name.split('=')[0])))}), then pnpm install`,
  );
}

/** An x64 Node on an Apple Silicon Mac (Rosetta): native binaries in node_modules then fit only one of the two. */
export function checkCpu(
  { platform, arch, cpuModel } = { platform: process.platform, arch: process.arch, cpuModel: cpus()[0]?.model ?? '' },
) {
  /* Under Rosetta, os.cpus() still names the Apple chip while process.arch says x64. */
  if (platform === 'darwin' && arch === 'x64' && /^Apple /.test(cpuModel)) {
    return warnRow(
      `x64 Node under Rosetta on ${cpuModel}`,
      `open a native terminal (${cmd('arch -arm64 zsh')}); if ${cmd('node -p process.arch')} still says x64, reinstall Node (${cmd(`nvm uninstall ${process.versions.node} && nvm install ${NODE_MAJOR}`)}), then ${cmd('rm -rf node_modules && pnpm install')}`,
    );
  }
  return { ok: true, detail: `${arch}${cpuModel ? `, ${cpuModel}` : ''}` };
}

/** The first `name` on the PATH (on Windows, name.cmd: the shims npm and corepack install), or undefined. */
function firstOnPath(name) {
  const names = process.platform === 'win32' ? [`${name}.cmd`, name] : [name];
  for (const dir of (process.env.PATH ?? '').split(delimiter)) {
    const path = names.map((file) => resolve(dir || '.', file)).find((file) => existsSync(file));
    if (path) return path;
  }
  return undefined;
}

/** The first `corepack` on the PATH and its version (from its package.json), or null. */
function findCorepack() {
  const path = firstOnPath('corepack');
  if (!path) return null;
  /* npm's Windows shim corepack.cmd sits in the Node folder, beside node_modules\corepack; elsewhere corepack is a
     link to corepack/dist/corepack.js. */
  const pkg = () =>
    process.platform === 'win32' && path.endsWith('.cmd')
      ? resolve(dirname(path), 'node_modules', 'corepack', 'package.json')
      : resolve(dirname(realpathSync(path)), '..', 'package.json');
  return { path, version: tryOr(() => readJson(pkg())?.version) };
}

/**
 * corepack before 0.31 cannot verify (or, on Node 24, even start) the pnpm 11 it has to fetch: usually a leftover of
 * another install (an old Node in /usr/local, Homebrew) that comes before nvm's on the PATH.
 */
export function checkCorepack(found = findCorepack(), nodeBin = dirname(process.execPath)) {
  if (!found) return { ok: true, detail: 'not on your PATH', note: `only needed for ${cmd('corepack enable')}` };
  const [major, minor] = (found.version ?? '').split('.').map(Number);
  if (!(major === 0 && minor < 31)) return { ok: true, detail: found.version ?? 'version unknown', note: found.path };
  const other = dirname(found.path) !== nodeBin ? `, not the one of the Node in ${nodeBin}` : '';
  /* Two commands on Windows: PowerShell 5.1 has no &&. */
  return warnRow(
    `${found.version} at ${found.path}${other}: too old for pnpm 11`,
    `run ${process.platform === 'win32' ? `${cmd('npm install -g corepack@latest')}, then ${cmd('corepack enable')}` : cmd('npm install -g corepack@latest && corepack enable')}${other && `, or remove ${found.path}`}`,
  );
}

export async function checkPnpm(pnpmPath = process.platform === 'linux' ? firstOnPath('pnpm') : undefined) {
  /* WSL with appendWindowsPath: the Windows pnpm would install win32 binaries into this Linux node_modules. */
  if (pnpmPath?.startsWith('/mnt/')) {
    return warnRow(
      `the Windows pnpm (${pnpmPath}) comes first on your PATH: installs would fetch win32 binaries`,
      `install Node inside WSL (${cmd(`nvm install ${NODE_MAJOR}`)}), then ${cmd('corepack enable')}`,
    );
  }
  const { code, stdout, stderr, timedOut } = await capture('pnpm --version', { timeoutMs: 60_000, cwd: ROOT });
  const version = stdout.trim();
  /* pnpm 11 runs on whatever `node` is first on the PATH, which may not be the one running this check (an nvm
     default of 20, say); then it cannot start at all: say so instead of "not found". */
  if (/requires at least Node|node:sqlite|ERR_UNKNOWN_BUILTIN_MODULE/.test(stderr)) {
    const pathNode = stderr.match(/current version of Node\.js is (v\d+(?:\.\d+)*)/)?.[1] ?? 'an older Node';
    return {
      ok: false,
      detail: `cannot start: pnpm 11 runs on ${pathNode} from your PATH`,
      /* nvm-windows has no default alias: its `nvm use` already switches every terminal. */
      note: NVM_HOME
        ? `run ${cmd(NVM_USE)}`
        : `run ${cmd(NVM_USE)}, or make ${NODE_MAJOR} the default: ${cmd(`nvm alias default ${NODE_MAJOR}`)}`,
      fix: NVM_FIX,
    };
  }
  /* There but not starting (corepack cannot fetch or verify it, say): "not found" would send you the wrong way. */
  /* Not found: 127 or "not found" from sh. On Windows also 9009 and "is not recognized" from cmd.exe, and
     "CommandNotFound" from the pnpm.exe shim of nvm-windows 2.x while the Node it runs has no pnpm. */
  const notFound =
    code === 127 ||
    /not found/.test(stderr) ||
    (process.platform === 'win32' &&
      (code === 9009 || /CommandNotFound|is not recognized as an internal or external/.test(stderr)));
  if (timedOut || (code !== 0 && !notFound)) {
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
    return warnRow(
      `${version}, package.json pins ${PNPM_VERSION}`,
      `run ${cmd('corepack enable')} so this folder uses the pinned pnpm`,
      { fix: COREPACK_FIX },
    );
  }
  return { ok: true, detail: version, note: 'package.json "packageManager"' };
}

/** A quick, read-only git question about this repository: { code, stdout, … } as capture() gives it. */
const git = (args) => capture(`git ${args}`, { cwd: ROOT, timeoutMs: 5000 });

/** husky's `prepare` script installs the pre-commit hook on `pnpm install`; a clone that never installed has none. */
export async function checkGitHooks() {
  const { stdout } = await git('config core.hooksPath');
  if (stdout.trim() === '.husky/_' && existsSync(resolve(ROOT, '.husky/_'))) {
    return { ok: true, detail: 'pre-commit runs lint-staged', note: '.husky/pre-commit' };
  }
  return warnRow(
    'not installed, so commits are not linted',
    `run ${cmd('pnpm install')} (its prepare step installs them) or ${cmd('pnpm exec husky')}`,
    { fix: HUSKY_FIX },
  );
}

/** Not a requirement, but a failed `git push` halfway through a release is a poor moment to find out. */
async function checkGitPush() {
  const { stdout: url } = await git('remote get-url origin');
  if (!url.trim()) return { skip: true, ok: true, detail: 'no origin remote' };
  if (!url.startsWith('https://')) return { ok: true, detail: 'over SSH', note: url.trim() };
  const { stdout: helper } = await git('config credential.helper');
  if (helper.trim()) return { ok: true, detail: `HTTPS, credentials from ${helper.trim()}`, note: url.trim() };
  return warnRow(
    'HTTPS without a credential helper',
    `git push will ask for a username; ${cmd('gh auth login')} or a credential helper fixes that`,
  );
}

/**
 * Commits the branch is behind its upstream and origin/main, from the refs already here (no fetch: fast and offline).
 * Skipped outside a git checkout or with nothing to compare with.
 */
async function checkBranchBehind() {
  const note = 'as of the last fetch';
  const count = ({ code, stdout }) => (code === 0 ? Number(stdout.trim()) : 0);
  const [head, upstream, behindUp, behindMain, hasMain, shallow] = await Promise.all([
    git('rev-parse --abbrev-ref HEAD'),
    git('rev-parse --abbrev-ref "@{u}"'),
    git('rev-list --count "HEAD..@{u}"'),
    git('rev-list --count HEAD..origin/main'),
    git('rev-parse --verify --quiet origin/main'),
    git('rev-parse --is-shallow-repository'),
  ]);
  /* A shallow clone counts every commit past its cut-off as "behind". */
  if (shallow.stdout.trim() === 'true') return { skip: true, ok: true, detail: 'shallow clone: cannot count commits' };
  const up = upstream.code === 0 ? upstream.stdout.trim() : null;
  const main = hasMain.code === 0;
  if (head.code !== 0 || (!up && !main)) return { skip: true, ok: true, detail: 'nothing to compare with' };

  const behind = [];
  if (up && count(behindUp)) behind.push(`${count(behindUp)} commit(s) behind ${up} — run ${cmd('git pull')}`);
  if (main && up !== 'origin/main' && count(behindMain))
    behind.push(
      `${count(behindMain)} commit(s) behind origin/main — run ${cmd('git fetch && git rebase origin/main')}`,
    );
  if (behind.length) return warnRow(behind.join('; '), note);
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
 * A branch switch or pull that changed the dependencies without an install since. pnpm keeps a copy of the lockfile
 * it installed (node_modules/.pnpm/lock.yaml); compared by content, as pnpm also rewrites an unchanged pnpm-lock.yaml.
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
  return warnRow(
    'pnpm-lock.yaml differs from what is installed',
    `run ${cmd('pnpm install')} (a branch switch or pull changed the dependencies)`,
    { fix: INSTALL_FIX },
  );
}

/** statfs of `path`; undefined on a Node without it, null where it throws (network mounts, FUSE). */
const statfs = (path) => (fs.statfsSync ? tryOr(() => fs.statfsSync(path), null) : undefined);

/** Under 2 GB free, an install or build stops halfway with ENOSPC. */
export function checkDiskSpace(free = statfs(ROOT)) {
  /* statfsSync came in Node 18.15, and this check must still run on an old Node to say so. */
  if (free === undefined) return { skip: true, ok: true, detail: 'unknown on this Node' };
  if (free === null) return { skip: true, ok: true, detail: 'unknown on this filesystem' };
  if (typeof free === 'object') free = free.bavail * free.bsize;
  const gb = (free / 1024 ** 3).toFixed(1);
  if (free >= 2 * 1024 ** 3) return { ok: true, detail: `${gb} GB free` };
  return warnRow(
    `only ${gb} GB free: installs and builds may stop with ENOSPC`,
    `${cmd('pnpm store prune')} and ${cmd('pnpm run clean:pick')} free some`,
  );
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

/** The filesystem type of the mount that holds `path`, from /proc/mounts (Linux): the longest, last mount point wins. */
export function mountType(path, mounts = readText('/proc/mounts')) {
  let found = { dir: '', type: undefined };
  for (const line of mounts.split('\n')) {
    const [, raw, type] = line.split(' ');
    const dir = raw?.replace(/\\040/g, ' ');
    if (!dir || !(path === dir || path.startsWith(dir.endsWith('/') ? dir : `${dir}/`))) continue;
    if (dir.length >= found.dir.length) found = { dir, type };
  }
  return found.type;
}

/** A synced folder (iCloud Drive, OneDrive, Dropbox) uploads node_modules and leaves "file 2" conflict copies in it. */
export function checkFolder(
  root = realpathSync(ROOT),
  platform = process.platform,
  home = homedir(),
  /* iCloud "Desktop & Documents" keeps the /Users/x/Documents path, so only this folder gives it away. */
  icloudDocuments = platform === 'darwin' &&
    existsSync(resolve(home, 'Library/Mobile Documents/com~apple~CloudDocs/Documents')),
  fsType = platform === 'linux' ? mountType(root) : undefined,
) {
  /* WSL on a Windows drive (9p/drvfs, wherever wsl.conf mounts it): file watching does not see changes there, and
     every install is many times slower. */
  if (platform === 'linux' && (/^\/mnt\/[a-z]\//.test(root) || /^(9p|drvfs)$/.test(fsType ?? ''))) {
    return warnRow(
      'on a Windows drive under WSL: the watchers miss changes and installs are slow',
      `clone it inside WSL instead, e.g. ${cmd('~/code/tilburg')}`,
    );
  }
  /* ponytail: network shares on macOS and Windows are not detected (Node gives no filesystem type there). */
  if (/^(nfs4?|cifs|smb3?|smbfs|fuse\.sshfs)$/.test(fsType ?? '')) {
    return warnRow(
      `on a network filesystem (${fsType}): the watchers miss changes and installs are slow`,
      `clone it onto a local disk instead, e.g. ${cmd('~/Developer/tilburg')}`,
    );
  }
  /* mv into a folder that does not exist renames the repo to it; pnpm sync looks for the consumers next to it. */
  const moveOut = `move it out, e.g. ${cmd(
    platform === 'win32'
      ? `New-Item -ItemType Directory -Force ~/Developer; Move-Item "${root}" ~/Developer/`
      : `mkdir -p ~/Developer && mv "${root}" ~/Developer/`,
  )}, together with ../bq-tlb-frontend and ../hltsamen, then ${cmd('pnpm install')} there`;
  /* Forward slashes, so the same patterns match Windows paths (C:\\Users\\…\\OneDrive\\…). */
  const synced = root
    .replace(/\\/g, '/')
    .match(/\/Library\/(Mobile Documents|CloudStorage)\/|\/(Dropbox|OneDrive|Google Drive)[^/]*\//)?.[0];
  if (!synced && icloudDocuments && ['Documents', 'Desktop'].some((dir) => root.startsWith(`${home}/${dir}/`))) {
    return warnRow(
      'in ~/Documents or ~/Desktop with iCloud "Desktop & Documents" on: sync conflicts in node_modules',
      moveOut,
    );
  }
  if (!synced) return { ok: true, detail: 'not in a synced folder', note: root };
  return warnRow(`inside a synced folder (${synced.replace(/^\/|\/$/g, '')}): sync conflicts in node_modules`, moveOut);
}

// ─── Build output ────────────────────────────────────────────────────────────

/**
 * The newest modification time below `paths` (files or folders), skipping node_modules and build output. Symlinks
 * below `paths` are not followed (a link back up the tree would never end); `paths` themselves may be links. A folder
 * it may not read is skipped, not fatal.
 */
export function newestMtime(paths) {
  let newest = 0;
  const visit = (path, top = false) => {
    const stat = tryOr(() => (top ? statSync(path) : lstatSync(path)));
    if (!stat || stat.isSymbolicLink()) return;
    /* Files only: a folder's mtime also moves for a reinstall of its node_modules or a Finder .DS_Store, which would
       mark the build stale for nothing. ponytail: so a branch switch that only deletes files is not noticed. */
    if (!stat.isDirectory()) {
      newest = Math.max(newest, stat.mtimeMs);
      return;
    }
    for (const entry of tryOr(() => readdirSync(path, { withFileTypes: true }), [])) {
      if (['node_modules', 'dist', '.angular', '.DS_Store'].includes(entry.name)) continue;
      visit(resolve(path, entry.name));
    }
  };
  paths.forEach((path) => visit(path, true));
  return newest;
}

/** Is the library built, and is the build newer than its source? `state` is 'missing', 'stale' or 'fresh'. */
export function libraryState(library) {
  const built = resolve(ROOT, library.dir, library.built);
  if (!existsSync(built)) return { state: 'missing' };
  /* The newest file in dist/, not only `built`: Stencil's watch rebuild skips files whose content did not change. */
  const builtAt = Math.max(
    statSync(built).mtimeMs,
    newestMtime([resolve(ROOT, library.dir, library.built.split('/')[0])]),
  );
  const changedAt = newestMtime(library.src.map((src) => resolve(ROOT, library.dir, src)));
  /* A source file from the future (a zip, a machine whose clock ran ahead) would beat every build: rebuild, say why. */
  const skewed = changedAt > Date.now();
  return { state: skewed || changedAt > builtAt ? 'stale' : 'fresh', builtAt, changedAt, skewed };
}

function checkLibrary(library) {
  const { state, builtAt, changedAt, skewed } = libraryState(library);
  const forWhom = library.for.map((key) => STORYBOOKS[key].name.replace(' Storybook', '')).join(' + ');
  if (state === 'missing') {
    return warnRow('not built yet', `${cmd('pnpm dev')} builds it (needed by ${forWhom})`);
  }
  if (skewed) {
    return warnRow(
      'source has a modification time in the future (clock skew, or files from a zip)',
      `${cmd('pnpm dev')} rebuilds it every time until the clock passes it; check the date, or touch the files`,
    );
  }
  if (state === 'stale') {
    return warnRow(
      `source newer than the build (${ago(changedAt)} vs ${ago(builtAt)})`,
      `an edit, or git touched the files (checkout, stash, reset). ${cmd('pnpm dev')} rebuilds it`,
    );
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
 * null when the port is free, else the error code. Tries the loopbacks and the wildcards: on macOS a server on 0.0.0.0
 * (http-server, Storybook) does not stop a bind to 127.0.0.1, so the loopbacks alone would miss it.
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
 * the server just closed (a Storybook killed mid-check), and that error escapes as an uncaught exception no try/catch
 * around fetch can stop.
 */
export async function storybookEntries(port) {
  /* Both loopbacks, not `localhost`: /etc/hosts may map that to only one, and the Storybook may listen on the other. */
  return (await entriesAt('127.0.0.1', port)) ?? (await entriesAt('::1', port));
}

function entriesAt(host, port) {
  return new Promise((done) => {
    /* agent: false: a one-off agent, so NODE_USE_ENV_PROXY does not send a loopback probe to the proxy. */
    const request = http.get({ host, port, path: '/index.json', timeout: 1500, agent: false }, (response) => {
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

/**
 * The folder a program was started from, read from its (Windows) command line: what comes before `\node_modules\`
 * (pnpm's shims run node with node_modules/.bin/../<tool>/… under the package), from the last drive letter before it,
 * so the path of node.exe in front (with spaces, quoted or not) is not taken along. Null when there is none.
 */
export function folderFromCommandLine(commandLine) {
  const end = commandLine.search(/[\\/]node_modules[\\/]/);
  if (end < 0) return null;
  const starts = [...commandLine.slice(0, end).matchAll(/[A-Za-z]:[\\/]/g)];
  return starts.length ? commandLine.slice(starts.at(-1).index, end) : null;
}

/**
 * Windows has no lsof, and no way to read another process's working directory: netstat names the pid listening on
 * `port`, and its command line (from CIM, through PowerShell) the folder it runs from. Null when it cannot tell.
 */
function windowsListenerDir(port, run) {
  /* "  TCP    0.0.0.0:6006    0.0.0.0:0    LISTENING    5452"; [::]:6006 for IPv6. */
  const listening = new RegExp(`^\\s*TCP\\s+\\S+:${port}\\s+\\S+\\s+LISTENING\\s+(\\d+)\\s*$`, 'm');
  const pidOn = (protocol) => run('netstat', ['-ano', '-p', protocol]).match(listening)?.[1];
  const pid = pidOn('TCP') ?? pidOn('TCPv6');
  if (!pid) return null;
  const commandLine = run('powershell.exe', [
    '-NoProfile',
    '-NonInteractive',
    '-Command',
    `(Get-CimInstance Win32_Process -Filter 'ProcessId=${Number(pid)}').CommandLine`,
  ]);
  const folder = folderFromCommandLine(commandLine);
  return folder && resolve(folder);
}

/**
 * The working directory of the process listening on `port` (on Windows: the folder its command line runs from), or
 * null when it cannot tell (no lsof and no ss, another user's process).
 */
export function listenerDir(port) {
  /* 10 s: the first PowerShell of a session can take a few seconds to start. */
  const run = (command, args) =>
    spawnSync(command, args, { encoding: 'utf8', timeout: process.platform === 'win32' ? 10_000 : 3000 }).stdout ?? '';
  if (process.platform === 'win32') return windowsListenerDir(port, run);
  /* -b: do not block on a hung network mount, but Linux lsof needs the stat calls -b skips to match a socket to a
     pid. -w: do not warn about it. */
  const lsof = (args) => run('lsof', [...(process.platform === 'linux' ? [] : ['-b']), '-w', ...args]);
  let pid = lsof(['-nP', `-iTCP:${port}`, '-sTCP:LISTEN', '-t'])
    .split('\n')[0]
    .trim();
  /* Linux without lsof (Docker, minimal Ubuntu, WSL): ss names the pid, /proc its folder. */
  if (process.platform === 'linux') {
    if (!pid) pid = run('ss', ['-ltnpH', `sport = :${port}`]).match(/pid=(\d+)/)?.[1];
    /* Another user's /proc entry cannot be read: lsof then. */
    const cwd = pid && tryOr(() => readlinkSync(`/proc/${pid}/cwd`));
    if (cwd) return cwd;
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
  /* Windows paths ignore case (and the drive letter's case depends on how the terminal was opened). */
  const key = (path) => (process.platform === 'win32' ? path?.toLowerCase() : path);
  const root = key(realpathSync(ROOT));
  const here = key(dir);
  /* The root or one of our packages: a worktree inside the checkout (.claude/worktrees/…) is another branch. */
  const ours =
    here === root || ['packages', 'proprietary'].some((group) => here?.startsWith(`${root}${sep}${group}${sep}`));
  if (dir && !ours) return { ours: false, what: `a Storybook from ${dir}` };
  if (!Object.keys(entries).some((id) => storybook.storyId?.test(id) ?? true)) {
    const other = Object.values(STORYBOOKS).find(
      (candidate) => candidate !== storybook && Object.keys(entries).some((id) => candidate.storyId?.test(id)),
    );
    return { ours: false, what: other ? `the ${other.name}` : 'another Storybook' };
  }
  /* Unknown folder (no lsof): it may be another clone's, so do not reuse it; pnpm dev moves to a free port. */
  if (!dir) return { ours: false, what: 'a Storybook whose folder cannot be told (no lsof)' };
  return { ours: true };
}

async function checkStorybookPort(storybook) {
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
    return warnRow(
      `${storybook.port} is taken by ${found.what}`,
      `${cmd('pnpm dev')} uses the next free port; stop that Storybook to get ${storybook.port} back`,
    );
  }
  return warnRow(
    `${storybook.port} is taken by another process`,
    `${cmd('pnpm dev')} uses the next free port; ${cmd(process.platform === 'win32' ? `netstat -ano | findstr :${storybook.port}` : `lsof -i :${storybook.port}`)} shows who has it`,
  );
}

/** Is pnpm dev running for this working copy? Read from its lock file; a crashed one does not count. */
function checkDevRunning() {
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
