/* `node --test scripts/`: setup's Node step, run on a copy of the scripts against a fake repo and a fake nvm, so the
   failures it explains are reached without touching nvm, corepack or pnpm. */
import './lib/test-env.mjs';
import assert from 'node:assert/strict';
import { copyFileSync, linkSync, mkdirSync, symlinkSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { test } from 'node:test';
import { copyScripts, noShell, prependPath, runScript, tempDir, writeFake } from './lib/test-fakes.mjs';

/* setup starts fnm and the nvm Node without a shell: Windows runs no script that way (a .cmd needs cmd.exe). */
const shellFakes = process.platform === 'win32' && 'Windows starts no script without a shell';
/* A space and an accent in the path: a repo cloned into "My Documents/ontwerp-é" must work too. */
const temp = tempDir('tilburg setup-test-é-');

let count = 0;
/**
 * A repo whose .nvmrc holds `nvmrc`, with an nvm folder holding `nvmVersions`; runs setup in it. `bin` holds fake
 * commands (name → shell script) put first on the PATH; `nodeBin` is the script for the nvm Node's bin/node.
 * `realNode`: a version under which nvm keeps this very Node (nvm-windows' layout on Windows, nvm-sh's elsewhere).
 */
function runSetup(
  nvmrc,
  { nvmVersions = null, bin = {}, nodeBin = '', env: extra = {}, packageJson = {}, realNode = null } = {},
) {
  const root = resolve(temp, `repo-${count++}`);
  copyScripts(root, 'setup.mjs');
  writeFileSync(resolve(root, 'package.json'), JSON.stringify({ packageManager: 'pnpm@11.15.1', ...packageJson }));
  writeFileSync(resolve(root, '.nvmrc'), `${nvmrc}\n`);
  const nvm = resolve(root, 'nvm');
  mkdirSync(nvm);
  if (nvmVersions) {
    writeFileSync(resolve(nvm, 'nvm.sh'), '');
    for (const version of nvmVersions) {
      mkdirSync(resolve(nvm, 'versions/node', version, 'bin'), { recursive: true });
      /* Not executable: re-running setup under it fails to start. */
      writeFileSync(resolve(nvm, 'versions/node', version, 'bin/node'), nodeBin, { mode: nodeBin ? 0o755 : 0o644 });
    }
  }
  if (realNode) {
    const windows = process.platform === 'win32';
    const dir = windows ? resolve(nvm, 'installs', realNode) : resolve(nvm, 'versions/node', realNode, 'bin');
    mkdirSync(dir, { recursive: true });
    const node = resolve(dir, windows ? 'node.exe' : 'node');
    if (!windows) symlinkSync(process.execPath, node);
    else {
      try {
        linkSync(process.execPath, node);
      } catch {
        copyFileSync(process.execPath, node); /* another drive */
      }
    }
    if (windows) extra = { NVM_HOME: nvm, ...extra };
    else writeFileSync(resolve(nvm, 'nvm.sh'), '');
  }
  const fakes = resolve(root, 'bin');
  mkdirSync(fakes);
  for (const [name, script] of Object.entries(bin)) writeFake(fakes, name, script);
  /* NVM_HOME: the developer's own nvm-windows would stand in for the fake nvm. */
  const { CI, SUDO_USER, NODE_OPTIONS, NVM_HOME, ...rest } = process.env;
  const env = prependPath(rest, fakes);
  return runScript(resolve(root, 'scripts/setup.mjs'), [], {
    cwd: root,
    env: { ...env, NVM_DIR: nvm, TILBURG_SETUP_REEXEC: '1', ...extra },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
}

const otherMajor = Number(process.versions.node.split('.')[0]) + 1;

test('an alias in .nvmrc stops setup with an explanation, not an attempt to install "Node NaN"', () => {
  const { status, output } = runSetup('lts/*');
  assert.equal(status, 1);
  assert.match(output, /\.nvmrc does not hold a Node major version/);
  assert.doesNotMatch(output, /NaN/);
});

test('the wrong Node without nvm fails with exit 1 and says how to get the right one', () => {
  const { status, output } = runSetup(String(otherMajor));
  assert.equal(status, 1);
  assert.match(output, new RegExp(`the repo needs Node ${otherMajor}`));
  /* Either message: a developer may have fnm, volta or mise on the PATH. */
  assert.match(output, /nvm.* was not found/);
});

test('the wrong Node without nvm but with fnm on the PATH: prints the fnm command', { skip: shellFakes }, () => {
  const { status, output } = runSetup(String(otherMajor), { bin: { fnm: '#!/bin/sh\nexit 0\n' } });
  assert.equal(status, 1);
  assert.match(output, new RegExp(`fnm install ${otherMajor} && fnm use ${otherMajor}`));
});

test('nvm with only a Node below the engines minimum: that one is not used (it asks to install instead)', () => {
  const { status, output } = runSetup(String(otherMajor), {
    nvmVersions: [`v${otherMajor}.1.0`],
    packageJson: { engines: { node: `>=${otherMajor}.2.0` } },
  });
  assert.equal(status, 1);
  assert.match(output, new RegExp(`Node ${otherMajor} is needed`));
});

test('the wrong Node, nvm present but no terminal to confirm the install: exit 1, no install', () => {
  const { status, output } = runSetup(String(otherMajor), { nvmVersions: [] });
  assert.equal(status, 1);
  assert.match(output, new RegExp(`Node ${otherMajor} is needed`));
});

test('a Node from nvm that cannot start is reported, not a silent exit 1', () => {
  const { status, output } = runSetup(String(otherMajor), { nvmVersions: [`v${otherMajor}.0.0`] });
  assert.equal(status, 1);
  assert.match(output, new RegExp(`Could not start Node ${otherMajor} from nvm`));
  /* Not executable; on Windows there is no node.exe at all. */
  assert.match(output, process.platform === 'win32' ? /ENOENT/ : /EACCES/);
});

/* As root (sudo setup) it stops before writing anything; a test cannot run as root, so that path is the check itself.
   What a test can show: another account reached with sudo -iu (SUDO_USER set, not root) is not refused. */
test('sudo -iu to a normal account (SUDO_USER set, not root) is not refused', () => {
  const { output } = runSetup(String(otherMajor - 1), { env: { SUDO_USER: 'roel' } });
  assert.doesNotMatch(output, /running under sudo/);
});

test('a NODE_OPTIONS flag the nvm Node refuses (exit 9) is named, not a bare exit 9', { skip: shellFakes }, () => {
  /* What Node 24 prints for a flag Node 20 still took (reproduced with --experimental-network-imports). */
  const nodeBin = '#!/bin/sh\necho "node: --experimental-network-imports is not allowed in NODE_OPTIONS" >&2\nexit 9\n';
  const { status, output } = runSetup(String(otherMajor), {
    nvmVersions: [`v${otherMajor}.0.0`],
    nodeBin,
    env: { NODE_OPTIONS: '--max-old-space-size=4096' },
  });
  assert.equal(status, 9);
  assert.match(output, new RegExp(`Node ${otherMajor} does not accept your NODE_OPTIONS`));
  assert.match(output, /--max-old-space-size=4096/);
});

test(
  'offline, corepack cannot download pnpm: says so, instead of blaming another pnpm on the PATH',
  { skip: noShell },
  () => {
    /* The real corepack 0.35 error with no DNS, trimmed. */
    const pnpm =
      '#!/bin/sh\necho "Error: Error when performing the request to https://registry.npmjs.org/pnpm/11.15.1; for troubleshooting help, see https://github.com/nodejs/corepack#troubleshooting" >&2\necho "    [cause]: Error: getaddrinfo ENOTFOUND registry.npmjs.org" >&2\nexit 1\n';
    const { status, output } = runSetup(String(otherMajor - 1), { bin: { pnpm, corepack: '#!/bin/sh\nexit 0\n' } });
    assert.equal(status, 1);
    assert.match(output, /corepack could not download pnpm 11\.15\.1/);
    assert.match(output, /Error when performing the request to https:\/\/registry\.npmjs\.org/);
    assert.doesNotMatch(output, /Another pnpm comes first/);
  },
);

test('nvm (nvm-windows on Windows) keeps another Node under the version setup needs: it restarts once, then stops', () => {
  /* This Node, filed under the next major: setup restarts under it, finds the major still wrong, and must not loop. */
  const { status, output } = runSetup(String(otherMajor), { realNode: `v${otherMajor}.0.0` });
  assert.equal(status, 1);
  assert.match(output, new RegExp(`Continuing with Node ${otherMajor} from nvm`));
  assert.match(output, new RegExp(`The Node that nvm keeps as ${otherMajor} is ${process.versions.node}`));
  assert.equal(output.match(/Continuing with Node/g).length, 1);
});
