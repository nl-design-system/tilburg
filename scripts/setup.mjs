/* `pnpm setup` — or, on a fresh clone where pnpm cannot start yet, `node scripts/setup.mjs`: from clone to a running
   Storybook in one go. Safe to run again: every step checks first and only does what is missing.

     1. Node 24 (installs it with nvm when missing, then carries on under it)
     2. pnpm through corepack, the version package.json pins
     3. pnpm install (or a clean reinstall with --reset)
     4. the git hooks (husky)
     5. the libraries the Storybooks load from dist/
     6. the `pnpm check` table, and `pnpm dev` if you like

   Flags: --yes (no questions, take the defaults), --reset (delete node_modules first), --skip-dev (do not offer to start pnpm dev). Not --no-…: pnpm reads those as its own options.
   With flags, type `pnpm run setup --yes` (or `pnpm setup:reset`): `pnpm setup` is also pnpm's own command, which
   swallows --yes and refuses --reset.
   Node built-ins only, and nothing newer than Node 18, because it may be running on the Node it is about to replace. */
import { spawn, spawnSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { homedir } from 'node:os';
import { delimiter, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LIBRARIES, NODE_MAJOR, PNPM_VERSION, ROOT } from './dev-config.mjs';
import { checkGitHooks, checkInstalled, checkInstallFresh, libraryState, runAllChecks } from './lib/checks.mjs';
import {
  c,
  capture,
  confirm,
  fail,
  installCrashHandler,
  printBanner,
  printCheckTable,
  stepSkip,
} from './lib/cli-utils.mjs';
import { confirmNoDevRunning, readDevLock, SYNC_LOCK } from './lib/lock.mjs';
import { enginesMinimum, reportStepFailure, runStepWithRecovery } from './lib/recovery.mjs';

installCrashHandler('pnpm setup');

const args = process.argv.slice(2);
const yes = args.includes('--yes') || args.includes('-y');
const reset = args.includes('--reset');
const noStart = args.includes('--skip-dev');
const ask = (question, options = {}) => (yes ? Promise.resolve(options.default ?? true) : confirm(question, options));

/** Run a step; on failure explain it and stop: later steps need this one. */
async function step(label, command, options = {}) {
  try {
    await runStepWithRecovery(label, command, { cwd: ROOT, ...options, env: { ...process.env, TILBURG_QUIET: '1' } });
  } catch (err) {
    reportStepFailure(label, err);
    console.log(
      `  ${c.gray}Fix it and run ${c.cyan}node scripts/setup.mjs${c.gray} again; finished steps are skipped.${c.reset}\n`,
    );
    process.exit(1);
  }
}

const done = (label, why) => stepSkip(label, why);

if (!process.env.TILBURG_SETUP_REEXEC) printBanner('Setup');

/* Under sudo it has already stopped: installCrashHandler refuses that for every script (cli-utils.mjs). */

/* cmd.exe cannot use a UNC folder as its working folder: every step would run in C:\Windows and fail oddly. */
if (process.platform === 'win32' && ROOT.startsWith('\\\\')) {
  fail({
    what: `The repository is on a network path (${ROOT})`,
    why: 'Windows runs the commands of every step in C:\\Windows instead of a \\\\server\\… folder.',
    fix: 'run it in a WSL terminal (for \\\\wsl.localhost\\…), or map a drive letter to the share and run setup there',
  });
  process.exit(1);
}

// ─── 1. Node ─────────────────────────────────────────────────────────────────

/* homedir(), not HOME: cron, env -i and docker --user have no HOME, and recovery.mjs looks there too. */
const NVM_DIR = process.env.NVM_DIR ?? resolve(homedir(), '.nvm');
const hasNvm = existsSync(resolve(NVM_DIR, 'nvm.sh'));

/** The newest Node <NODE_MAJOR> that nvm has installed, as the path of its bin/ folder. */
function nvmNodeBin() {
  const versions = resolve(NVM_DIR, 'versions/node');
  if (!existsSync(versions)) return null;
  /* Not one below the engines minimum (24.13 when engines says >=24.15): pnpm install would refuse it. */
  const minimum = enginesMinimum();
  const matching = readdirSync(versions)
    .filter((name) => name.startsWith(`v${NODE_MAJOR}.`))
    .filter((name) => name.slice(1).localeCompare(minimum, undefined, { numeric: true }) >= 0)
    .sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
  return matching.length ? resolve(versions, matching[0], 'bin') : null;
}

/* Without this, an alias like lts/* reads as NaN and setup would try to install "Node NaN" with nvm. */
if (!Number.isInteger(NODE_MAJOR)) {
  fail({
    what: '.nvmrc does not hold a Node major version',
    why: 'setup reads the Node to switch to from .nvmrc; an alias such as lts/* does not say which.',
    fix: 'put the major version in .nvmrc (e.g. 24), then node scripts/setup.mjs again',
  });
  process.exit(1);
}

const major = Number(process.versions.node.split('.')[0]);
if (major !== NODE_MAJOR) {
  if (!hasNvm) {
    /* Another version manager: setup only drives nvm, but can say what to type in this one. */
    const managers = {
      fnm: `fnm install ${NODE_MAJOR} && fnm use ${NODE_MAJOR}`,
      volta: `volta install node@${NODE_MAJOR}`,
      mise: `mise use node@${NODE_MAJOR}`,
      'nvm-windows': `nvm install ${NODE_MAJOR} && nvm use ${NODE_MAJOR}`,
    };
    /* nvm-windows is not nvm-sh (no nvm.sh to load), and its `nvm use` needs the version. */
    const manager =
      process.platform === 'win32' && process.env.NVM_HOME
        ? 'nvm-windows'
        : Object.keys(managers).find((name) => !spawnSync(name, ['--version'], { stdio: 'ignore' }).error);
    fail({
      what: `This is Node ${process.versions.node}; the repo needs Node ${NODE_MAJOR}`,
      why: manager
        ? `nvm was not found, and setup does not drive ${manager}.`
        : 'nvm (the Node version manager) was not found, so setup cannot switch for you.',
      fix: manager
        ? `${managers[manager]}, then node scripts/setup.mjs again`
        : `install nvm (https://github.com/nvm-sh/nvm), then run node scripts/setup.mjs again. Or install Node ${NODE_MAJOR} from https://nodejs.org/`,
    });
    process.exit(1);
  }
  let bin = nvmNodeBin();
  if (!bin) {
    console.log(`  ${c.yellow}⚠${c.reset}  Node ${NODE_MAJOR} is not installed (this is ${process.versions.node}).`);
    if (!(await ask(`Install Node ${NODE_MAJOR} with nvm?`, { default: true }))) {
      fail({ what: `Node ${NODE_MAJOR} is needed`, fix: `nvm install ${NODE_MAJOR}, then node scripts/setup.mjs` });
      process.exit(1);
    }
    /* nvm is a shell function, not a program: load it in a shell and let it read .nvmrc. sh: minimal images lack bash. */
    const result = spawnSync('sh', ['-c', `. "${NVM_DIR}/nvm.sh" && nvm install`], { cwd: ROOT, stdio: 'inherit' });
    bin = nvmNodeBin();
    if (result.status !== 0 || !bin) {
      fail({
        what: `nvm could not install Node ${NODE_MAJOR}`,
        why: 'See the nvm output above.',
        fix: `nvm install ${NODE_MAJOR}`,
      });
      process.exit(1);
    }
  }
  /* Carry on under Node 24, with it first on the PATH so pnpm and corepack use it too. */
  console.log(`  ${c.green}✓${c.reset}  Continuing with Node ${NODE_MAJOR} from nvm (${bin}).\n`);
  const result = spawnSync(resolve(bin, 'node'), [fileURLToPath(import.meta.url), ...args], {
    stdio: 'inherit',
    env: {
      ...process.env,
      PATH: `${bin}${delimiter}${process.env.PATH}`,
      TILBURG_SETUP_REEXEC: '1',
      TILBURG_SETUP_FROM_NODE: process.versions.node,
    },
  });
  /* Exit 9 is Node refusing its options: a NODE_OPTIONS flag the old Node took but Node 24 does not. */
  if (result.error)
    fail({
      what: `Could not start Node ${NODE_MAJOR} from nvm`,
      why: result.error.message,
      fix: 'nvm use, then node scripts/setup.mjs',
    });
  else if (result.status === 9 && process.env.NODE_OPTIONS)
    fail({
      what: `Node ${NODE_MAJOR} does not accept your NODE_OPTIONS`,
      why: `NODE_OPTIONS="${process.env.NODE_OPTIONS}" holds a flag that only the Node you came from knows (see above).`,
      fix: 'remove that flag from NODE_OPTIONS (it is usually set in your shell profile), then node scripts/setup.mjs',
    });
  process.exit(result.status ?? 1);
}
done(`Node ${process.versions.node}`, `.nvmrc pins ${NODE_MAJOR}`);

/* A terminal that opens with another Node makes pnpm 11 fail before it starts ("requires at least Node.js v22.13"). */
if (hasNvm) {
  let defaultAlias = '';
  try {
    defaultAlias = readFileSync(resolve(NVM_DIR, 'alias/default'), 'utf8').trim();
  } catch {
    /* no default alias set */
  }
  if (!defaultAlias.replace(/^v/, '').startsWith(`${NODE_MAJOR}`)) {
    console.log(
      `  ${c.yellow}⚠${c.reset}  New terminals start with Node ${defaultAlias || '(no nvm default)'}; there, pnpm cannot run in this repo until you type nvm use.`,
    );
    if (
      await ask(`Make Node ${NODE_MAJOR} the default for new terminals (nvm alias default ${NODE_MAJOR})?`, {
        default: true,
      })
    ) {
      await step(`nvm default → ${NODE_MAJOR}`, `sh -c '. "${NVM_DIR}/nvm.sh" && nvm alias default ${NODE_MAJOR}'`);
    }
  } else {
    done('nvm default', `new terminals start with Node ${NODE_MAJOR}`);
  }
}

// ─── 2. pnpm ─────────────────────────────────────────────────────────────────

const pnpmVersion = async () => (await capture('pnpm --version', { cwd: ROOT, timeoutMs: 60_000 })).stdout.trim();
if ((await pnpmVersion()) === PNPM_VERSION) {
  done(`pnpm ${PNPM_VERSION}`, 'via corepack');
} else {
  /* COREPACK_ENABLE_DOWNLOAD_PROMPT=0: corepack would otherwise ask before downloading the pinned pnpm. */
  process.env.COREPACK_ENABLE_DOWNLOAD_PROMPT = '0';
  await step('Enabling corepack (pnpm comes with it)', 'corepack enable');
  const { stdout, stderr } = await capture('pnpm --version', { cwd: ROOT, timeoutMs: 60_000 });
  const version = stdout.trim();
  /* corepack downloads the pinned pnpm on first use; offline, that is what fails here, not another pnpm. */
  if (!version && /Error when performing the request/.test(stderr)) {
    fail({
      what: `corepack could not download pnpm ${PNPM_VERSION}`,
      why: stderr.match(/^Error: .*/m)?.[0] ?? 'see pnpm --version',
      fix: 'connect to the internet (behind a proxy: set HTTPS_PROXY), then node scripts/setup.mjs again',
    });
    process.exit(1);
  }
  if (version !== PNPM_VERSION) {
    const { stdout: where } = await capture('command -v pnpm', { timeoutMs: 5000 });
    fail({
      what: `pnpm is ${version || 'not runnable'}, but package.json pins ${PNPM_VERSION}`,
      why: `Another pnpm comes first on your PATH (${where.trim() || 'not found'}), before corepack's.`,
      fix: 'remove that one (brew uninstall pnpm, or npm rm -g pnpm), then node scripts/setup.mjs again',
    });
    process.exit(1);
  }
}

// ─── 3. Dependencies ─────────────────────────────────────────────────────────

/* A build (sync, verify, pack:local) needs node_modules and dist/ to stay put until it is done. */
const building = readDevLock(SYNC_LOCK);
if (building) {
  fail({
    what: `${building.what ?? 'pnpm sync'} is running (process ${building.pid})`,
    why: 'setup installs and builds the same node_modules and dist/ folders.',
    fix: 'wait for it to finish, then pnpm setup again',
  });
  process.exit(1);
}

/* Swapping node_modules under pnpm dev's running watchers and Storybooks breaks them half-way. */
const needsInstall = reset || !checkInstalled().ok || checkInstallFresh().warn;
if (needsInstall && !(await confirmNoDevRunning('pnpm install'))) process.exit(1);

if (reset) {
  if (await ask('Delete every node_modules folder and install from scratch?', { default: true })) {
    const folders = [resolve(ROOT, 'node_modules')];
    for (const group of ['packages', 'proprietary']) {
      for (const name of readdirSync(resolve(ROOT, group))) folders.push(resolve(ROOT, group, name, 'node_modules'));
    }
    for (const folder of folders) rmSync(folder, { recursive: true, force: true, maxRetries: 5 });
    console.log(`  ${c.green}✓${c.reset}  node_modules deleted.`);
  } else {
    done(
      '--reset',
      process.stdin.isTTY ? 'kept node_modules' : 'no terminal to confirm it: add --yes to delete without asking',
    );
  }
}
if (!checkInstalled().ok || checkInstallFresh().warn) {
  await step('Installing dependencies (pnpm install)', 'pnpm install');
} else {
  done('Dependencies', 'installed and matching pnpm-lock.yaml');
}

// ─── 4. Git hooks ────────────────────────────────────────────────────────────

if ((await checkGitHooks()).warn) {
  await step('Installing the git hooks (husky)', 'pnpm exec husky');
} else {
  done('Git hooks', 'pre-commit runs lint-staged');
}

// ─── 5. Libraries ────────────────────────────────────────────────────────────

/* In dependency order: Stencil generates the source of web-components-react. */
const needsBuild = LIBRARIES.some((library) => libraryState(library).state !== 'fresh');
/* While pnpm dev runs, its watchers build these: a second build at the same time is what fails with EEXIST. */
const leaveToDev = needsBuild && !(await confirmNoDevRunning('Building the libraries'));
for (const library of LIBRARIES) {
  const { state } = libraryState(library);
  if (state === 'fresh') done(library.name, 'build is up to date');
  else if (leaveToDev) done(library.name, 'left to the watchers of the running pnpm dev');
  else await step(`Building ${library.name}${state === 'stale' ? ' (source changed)' : ''}`, library.build);
}

// ─── 6. Check, then go ───────────────────────────────────────────────────────

console.log('');
const { failed } = printCheckTable(await runAllChecks());
if (failed.length) {
  console.log(
    `  ${c.red}Not everything is ready:${c.reset} ${failed.map((row) => row.label).join(', ')}. See the notes above.\n`,
  );
  process.exit(1);
}

const fromNode = process.env.TILBURG_SETUP_FROM_NODE;
if (fromNode) {
  console.log(
    `  ${c.yellow}Note:${c.reset} this terminal itself still runs Node ${fromNode}. Type ${c.cyan}nvm use${c.reset} before running pnpm here.\n`,
  );
}

console.log(
  `  ${c.green}${c.bold}Ready.${c.reset} ${c.gray}pnpm commands lists every command; CONTRIBUTING.md explains the rest.${c.reset}\n`,
);
if (noStart || !process.stdin.isTTY) {
  console.log(`  Next: ${c.cyan}pnpm dev${c.reset}\n`);
  process.exit(0);
}
if (await ask('Start pnpm dev now (both Storybooks, rebuilt as you save)?', { default: true })) {
  /* pnpm dev owns the terminal now: Ctrl-C is for it (it stops its watchers itself), not for setup. */
  process.removeAllListeners('SIGINT');
  process.on('SIGINT', () => {});
  spawn('pnpm', ['run', 'dev', '--', '--open'], { cwd: ROOT, stdio: 'inherit', shell: process.platform === 'win32' })
    .on('error', (err) => {
      fail({ what: 'Could not start pnpm dev', why: err.message, fix: 'pnpm dev' });
      process.exit(1);
    })
    /* Killed by a signal (out of memory, a crash) is not a success. */
    .on('close', (code) => process.exit(code ?? 1));
}
