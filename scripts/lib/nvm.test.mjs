/* `node --test scripts/`: finding the Node versions nvm-sh and nvm-windows installed, and a Node that comes before
   nvm-windows' on the PATH. */
import './test-env.mjs';
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, realpathSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { test } from 'node:test';
import { newestNvmNode, nodeOutsideNvmWindows, nvmNodes } from './nvm.mjs';

/* realpath: macOS's temp folder is behind a link (/var -> /private/var), which nodeOutsideNvmWindows resolves. */
const temp = realpathSync(mkdtempSync(resolve(tmpdir(), 'tilburg nvm-test-')));

let count = 0;
/** A folder holding `dirs` (relative paths), each with an empty file in it so it is a real install. */
function folder(dirs) {
  const root = resolve(temp, `nvm-${count++}`);
  for (const dir of dirs) {
    mkdirSync(resolve(root, dir), { recursive: true });
    writeFileSync(resolve(root, dir, 'node'), '');
  }
  return root;
}

test('nvm-sh: versions/node/v*/bin, newest first, numerically (24.15 after 24.9)', () => {
  const nvmDir = folder(['versions/node/v24.9.0/bin', 'versions/node/v24.15.0/bin', 'versions/node/v22.1.0/bin']);
  const found = nvmNodes(24, { nvmDir, nvmHome: null });
  assert.deepEqual(
    found.map(({ version }) => version),
    ['24.15.0', '24.9.0'],
  );
  assert.equal(found[0].bin, resolve(nvmDir, 'versions/node/v24.15.0/bin'));
});

test('nvm-sh: none below the minimum, and null when none is left', () => {
  const nvmDir = folder(['versions/node/v24.13.0/bin']);
  assert.equal(newestNvmNode(24, { nvmDir, nvmHome: null, minimum: '24.15.0' }), null);
  assert.equal(newestNvmNode(24, { nvmDir, nvmHome: null, minimum: '24.13.0' })?.version, '24.13.0');
});

test('nvm-windows 1.x (NVM_HOME\\v24.x) and 2.x (NVM_HOME\\installs\\v24.x): node.exe sits in the folder itself', () => {
  const nvmHome = folder(['v24.10.0', 'installs/v24.22.2', 'installs/v22.18.0', 'v24-not-a-version']);
  const found = nvmNodes(24, { nvmHome });
  assert.deepEqual(
    found.map(({ version }) => version),
    ['24.22.2', '24.10.0'],
  );
  assert.equal(found[0].bin, resolve(nvmHome, 'installs/v24.22.2'));
});

test('no nvm at all: no versions, not a crash', () => {
  assert.deepEqual(nvmNodes(24, { nvmDir: resolve(temp, 'missing'), nvmHome: null }), []);
  assert.deepEqual(nvmNodes(24, { nvmHome: resolve(temp, 'missing') }), []);
});

test("nodeOutsideNvmWindows: a Node in NVM_HOME is nvm's own; one elsewhere (C:\\Program Files\\nodejs) is named", () => {
  const nvmHome = folder(['installs/v24.22.2']);
  const other = folder(['nodejs']);
  assert.equal(nodeOutsideNvmWindows(resolve(nvmHome, 'installs/v24.22.2/node.exe'), nvmHome), null);
  assert.equal(nodeOutsideNvmWindows(resolve(other, 'nodejs/node.exe'), nvmHome), resolve(other, 'nodejs'));
  /* A folder whose name only starts like NVM_HOME is not inside it. */
  assert.equal(nodeOutsideNvmWindows(resolve(`${nvmHome}-other`, 'node.exe'), nvmHome), `${nvmHome}-other`);
  /* Without nvm-windows there is nothing to come before. */
  assert.equal(nodeOutsideNvmWindows(resolve(other, 'nodejs/node.exe'), null), null);
});
