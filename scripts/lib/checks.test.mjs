/* `node --test scripts/`: the checks behind pnpm check. */
import './test-env.mjs';
import assert from 'node:assert/strict';
import { mkdirSync, realpathSync, symlinkSync, utimesSync, writeFileSync } from 'node:fs';
import http from 'node:http';
import { delimiter, resolve } from 'node:path';
import { test } from 'node:test';
import { PNPM_VERSION, ROOT } from '../dev-config.mjs';
import {
  belowEngines,
  checkCorepack,
  checkCpu,
  checkDiskSpace,
  checkEnvironment,
  checkFolder,
  checkPackageJson,
  checkPnpm,
  folderFromCommandLine,
  identifyStorybook,
  libraryState,
  mountType,
  newestMtime,
  runInherit,
} from './checks.mjs';
import { noSignals, tempDir, writeFake, writeFile } from './test-fakes.mjs';

test('newestMtime does not follow a symlink loop, and skips build output', () => {
  const dir = tempDir('tilburg-test-');
  writeFile(resolve(dir, 'src', 'a.ts'), 'a');
  mkdirSync(resolve(dir, 'src', 'dist'));
  symlinkSync(dir, resolve(dir, 'src', 'loop'));
  assert.ok(newestMtime([resolve(dir, 'src'), resolve(dir, 'missing')]) > 0);
});

test('belowEngines reads the minimum for the running major from an engines range', () => {
  const angular = '^22.22.3 || ^24.15.0 || >=26.0.0';
  assert.equal(belowEngines('24.10.0', angular), '24.15.0');
  assert.equal(belowEngines('v24.14.9', angular), '24.15.0');
  assert.equal(belowEngines('24.15.0-nightly20261001abc', angular), '24.15.0');
  assert.equal(belowEngines('24.15.0', angular), null);
  assert.equal(belowEngines('24.19.0', angular), null);
  assert.equal(belowEngines('22.22.2', angular), '22.22.3');
  assert.equal(belowEngines('26.1.0', angular), null);
  assert.equal(belowEngines('24.1.0', undefined), null);
  assert.equal(belowEngines('2.0.0', angular), null);
});

test('runInherit throws with the exit code, or the signal that stopped the command', () => {
  assert.throws(() => runInherit('exit 3'), /exited with 3$/);
  /* cmd.exe has no kill, and Windows no signals. */
  if (!noSignals) assert.throws(() => runInherit('kill -TERM $$'), /exited with SIGTERM$/);
});

/** checkPnpm with a fake `pnpm` on the PATH (none at all when `script` is null). */
async function withFakePnpm(script) {
  const dir = tempDir('tilburg-pnpm-');
  if (script !== null) writeFake(dir, 'pnpm', `#!/bin/sh\n${script}\n`);
  /* process.env ignores the case of names on Windows: this sets its Path. */
  const path = process.env.PATH;
  process.env.PATH = script === null ? dir : `${dir}${delimiter}${path}`;
  try {
    return await checkPnpm();
  } finally {
    process.env.PATH = path;
  }
}

test('checkPnpm: the pinned version is green, another one a warning', async () => {
  assert.equal((await withFakePnpm(`echo ${PNPM_VERSION}`)).warn, undefined);
  const other = await withFakePnpm('echo 10.2.0');
  assert.equal(other.ok, true);
  assert.equal(other.warn, true);
  assert.match(other.detail, /^10\.2\.0, package\.json pins /);
});

test('checkPnpm: missing pnpm is "not found"', async () => {
  const row = await withFakePnpm(null);
  assert.equal(row.ok, false);
  assert.equal(row.detail, 'pnpm not found');
});

test('checkPnpm: pnpm on a PATH Node too old for it says so', async () => {
  const row = await withFakePnpm(
    'echo "ERROR: This version of pnpm requires at least Node.js v22.13. The current version of Node.js is v20.11.0." >&2; exit 1',
  );
  assert.equal(row.ok, false);
  assert.match(row.detail, /runs on v20\.11\.0 from your PATH/);
});

test('checkPnpm: a pnpm that is there but fails to start is not "not found"', async () => {
  const row = await withFakePnpm('echo "Internal Error: Cannot find matching keyid" >&2; exit 1');
  assert.equal(row.ok, false);
  assert.match(row.detail, /failed: Internal Error: Cannot find matching keyid/);
});

test('NODE_ENV=production (and npm settings that omit dev) are flagged: pnpm install would skip the build tools', () => {
  assert.equal(checkEnvironment({}).warn, undefined);
  for (const env of [{ NODE_ENV: 'production' }, { npm_config_production: 'true' }, { npm_config_omit: 'dev' }]) {
    const row = checkEnvironment(env);
    assert.equal(row.warn, true, JSON.stringify(env));
    assert.match(row.note, /unset/);
  }
});

test('an x64 Node on an Apple chip (Rosetta) is flagged; native Nodes and Intel Macs are not', () => {
  const rosetta = checkCpu({ platform: 'darwin', arch: 'x64', cpuModel: 'Apple M1 Pro' });
  assert.equal(rosetta.warn, true);
  assert.match(rosetta.note, /arch -arm64 zsh/);
  assert.equal(checkCpu({ platform: 'darwin', arch: 'arm64', cpuModel: 'Apple M1 Pro' }).warn, undefined);
  assert.equal(checkCpu({ platform: 'darwin', arch: 'x64', cpuModel: 'Intel(R) Core(TM) i7' }).warn, undefined);
  assert.equal(checkCpu({ platform: 'linux', arch: 'x64', cpuModel: '' }).warn, undefined);
});

test('corepack older than 0.31 is flagged, and named as another install when it is not next to node', () => {
  const old = checkCorepack({ path: '/usr/local/bin/corepack', version: '0.14.2' }, '/u/.nvm/versions/node/v24/bin');
  assert.equal(old.warn, true);
  assert.match(old.detail, /0\.14\.2 at \/usr\/local\/bin\/corepack, not the one of the Node/);
  assert.match(old.note, /npm install -g corepack@latest/);
  assert.doesNotMatch(checkCorepack({ path: '/n/bin/corepack', version: '0.30.0' }, '/n/bin').detail, /not the one/);
  for (const version of ['0.31.0', '0.35.0', '1.0.0', undefined])
    assert.equal(checkCorepack({ path: '/n/bin/corepack', version }, '/n/bin').warn, undefined, version);
  assert.equal(checkCorepack(null).warn, undefined);
});

test('less than 2 GB free is a warning', () => {
  assert.equal(checkDiskSpace(5 * 1024 ** 3).warn, undefined);
  const low = checkDiskSpace(1.5 * 1024 ** 3);
  assert.equal(low.warn, true);
  assert.match(low.detail, /only 1\.5 GB free/);
});

test('a repository in iCloud Drive, OneDrive or Dropbox is flagged', () => {
  for (const root of [
    '/Users/x/Library/Mobile Documents/com~apple~CloudDocs/tilburg',
    '/Users/x/Library/CloudStorage/OneDrive-Gemeente/tilburg',
    '/Users/x/Dropbox/work/tilburg',
    '/Users/x/OneDrive - Company/tilburg',
  ])
    assert.equal(checkFolder(root).warn, true, root);
  assert.equal(checkFolder('/Users/x/Documents/BitBucket/tilburg').warn, undefined);
  assert.equal(checkFolder('/Users/x/dev/dropbox-client').warn, undefined);
  assert.equal(checkFolder('C:\\Users\\x\\OneDrive - Company\\tilburg', 'win32').warn, true);
});

test('WSL on a Windows drive is flagged, a clone inside WSL is not', () => {
  assert.equal(checkFolder('/mnt/c/Users/x/tilburg', 'linux').warn, true);
  assert.equal(checkFolder('/home/x/tilburg', 'linux').warn, undefined);
  assert.equal(checkFolder('/mnt/c/Users/x/tilburg', 'darwin').warn, undefined);
});

test('a package.json that does not parse (merge conflict) fails the check instead of crashing', () => {
  const dir = tempDir('tilburg-pkg-');
  writeFileSync(resolve(dir, 'package.json'), '{\n<<<<<<< HEAD\n  "name": "a"\n=======\n}');
  assert.equal(checkPackageJson(resolve(dir, 'package.json')).ok, false);
  writeFileSync(resolve(dir, 'package.json'), '{"name":"a"}');
  assert.equal(checkPackageJson(resolve(dir, 'package.json')).ok, true);
});

test('only files count: a reinstall or a Finder .DS_Store does not make the source newer', () => {
  const dir = tempDir('tilburg-test-');
  writeFile(resolve(dir, 'src', 'a.ts'), 'a');
  utimesSync(resolve(dir, 'src', 'a.ts'), 1, 1);
  mkdirSync(resolve(dir, 'src', 'node_modules'));
  writeFileSync(resolve(dir, 'src', '.DS_Store'), '');
  assert.equal(newestMtime([resolve(dir, 'src')]), 1000);
});

test('a source file from the future is stale and says clock skew', () => {
  const dir = tempDir('tilburg-test-');
  writeFile(resolve(dir, 'src', 'a.ts'), 'a');
  writeFile(resolve(dir, 'dist', 'index.js'), 'a');
  for (const path of ['src', 'src/a.ts']) utimesSync(resolve(dir, path), 1, 1);
  const library = { dir, src: ['src'], built: 'dist/index.js' };
  assert.equal(libraryState(library).state, 'fresh');
  const future = Date.now() / 1000 + 3600;
  utimesSync(resolve(dir, 'src', 'a.ts'), future, future);
  utimesSync(resolve(dir, 'dist', 'index.js'), future + 60, future + 60);
  assert.deepEqual([libraryState(library).state, libraryState(library).skewed], ['stale', true]);
});

test('NODE_OPTIONS with --inspect or --require is flagged, other options are not', () => {
  assert.equal(checkEnvironment({ NODE_OPTIONS: '--inspect' }).warn, true);
  assert.equal(checkEnvironment({ NODE_OPTIONS: '--max-old-space-size=4096 -r ./x.js' }).warn, true);
  assert.equal(checkEnvironment({ NODE_OPTIONS: '--max-old-space-size=4096' }).warn, undefined);
});

test('disk space that cannot be read (network mount) is skipped, not a failure', () => {
  assert.deepEqual(checkDiskSpace(null), { skip: true, ok: true, detail: 'unknown on this filesystem' });
});

test('~/Documents and ~/Desktop are flagged only with iCloud "Desktop & Documents" on', () => {
  assert.equal(checkFolder('/Users/x/Documents/tilburg', 'darwin', '/Users/x', true).warn, true);
  assert.equal(checkFolder('/Users/x/Desktop/tilburg', 'darwin', '/Users/x', true).warn, true);
  assert.equal(checkFolder('/Users/x/Documents/tilburg', 'darwin', '/Users/x', false).warn, undefined);
  assert.equal(checkFolder('/Users/x/code/tilburg', 'darwin', '/Users/x', true).warn, undefined);
});

/** A fake Storybook on `host` that serves one story; resolves with its server. */
const fakeStorybook = (host) =>
  new Promise((done, fail) => {
    const server = http.createServer((_, response) => response.end('{"entries":{"a--b":{}}}'));
    server.once('error', fail);
    server.listen(0, host, () => done(server));
  });

test('a Storybook whose folder cannot be told is not taken for ours; one on ::1 only is still seen', async (t) => {
  for (const host of ['127.0.0.1', '::1']) {
    let server;
    try {
      server = await fakeStorybook(host);
    } catch {
      t.diagnostic(`${host} not available`);
      continue;
    }
    t.after(() => server.close());
    assert.deepEqual(await identifyStorybook({}, server.address().port, () => null), {
      ours: false,
      what: 'a Storybook whose folder cannot be told (no lsof)',
    });
  }
});

test('a Storybook from one of our packages is ours, in whatever case Windows spells the path', async (t) => {
  const server = await fakeStorybook('127.0.0.1');
  t.after(() => server.close());
  const { port } = server.address();
  const dir = resolve(realpathSync(ROOT), 'packages', 'storybook');
  assert.deepEqual(await identifyStorybook({}, port, () => dir), { ours: true });
  if (process.platform === 'win32')
    assert.deepEqual(await identifyStorybook({}, port, () => dir.toUpperCase()), { ours: true });
  assert.deepEqual(await identifyStorybook({}, port, () => `${realpathSync(ROOT)}-other`), {
    ours: false,
    what: `a Storybook from ${realpathSync(ROOT)}-other`,
  });
});

test('folderFromCommandLine: the folder before node_modules, not the node.exe in front of it', () => {
  /* String.raw: the backslashes as Windows prints them. */
  const quoted = String.raw`"C:\Program Files\nodejs\node.exe" "C:\Users\a b\tilburg\packages\storybook\node_modules\.bin\..\storybook\bin\index.cjs" dev`;
  assert.equal(folderFromCommandLine(quoted), String.raw`C:\Users\a b\tilburg\packages\storybook`);
  assert.equal(folderFromCommandLine(String.raw`C:\nvm\node.exe C:/x/tilburg/node_modules/a.js`), 'C:/x/tilburg');
  assert.equal(folderFromCommandLine('node.exe --test scripts/x.mjs'), null);
  assert.equal(folderFromCommandLine('node node_modules/a.js'), null);
});

test('mountType picks the longest mount point that holds the path', () => {
  const mounts = 'overlay / overlay rw 0 0\nC:\\ /c 9p rw 0 0\nsrv:/x /home/x/my\\040share nfs4 rw 0 0\n';
  assert.equal(mountType('/c/Users/x/tilburg', mounts), '9p');
  assert.equal(mountType('/home/x/my share/tilburg', mounts), 'nfs4');
  assert.equal(mountType('/cx/tilburg', mounts), 'overlay');
  assert.equal(mountType('/x', ''), undefined);
});

test('a Windows drive mounted anywhere under WSL and a network share are flagged', () => {
  assert.match(checkFolder('/c/Users/x/tilburg', 'linux', '/home/x', false, '9p').detail, /Windows drive/);
  assert.match(checkFolder('/home/x/share/tilburg', 'linux', '/home/x', false, 'nfs4').detail, /network/);
  assert.equal(checkFolder('/home/x/tilburg', 'linux', '/home/x', false, 'ext4').warn, undefined);
});

test('the move-it-out fix creates ~/Developer first and names the sibling repos', () => {
  const { note } = checkFolder('/Users/x/Dropbox/tilburg', 'darwin', '/Users/x', false);
  assert.match(note, /mkdir -p ~\/Developer && mv "\/Users\/x\/Dropbox\/tilburg" ~\/Developer\//);
  assert.match(note, /hltsamen/);
  assert.match(checkFolder('C:\\Users\\x\\OneDrive\\tilburg', 'win32').note, /Move-Item/);
});

test('fix texts use PowerShell syntax on Windows', () => {
  assert.match(checkEnvironment({ NODE_OPTIONS: '--inspect' }, 'win32').note, /Remove-Item Env:NODE_OPTIONS/);
  assert.match(checkEnvironment({ NODE_ENV: 'production' }, 'linux').note, /unset NODE_ENV/);
});

test('checkPnpm warns when the Windows pnpm comes first on the PATH under WSL', async () => {
  const row = await checkPnpm('/mnt/c/Program Files/nodejs/pnpm');
  assert.equal(row.warn, true);
  assert.match(row.detail, /Windows pnpm/);
});

test('newestMtime follows a symlink given as a path, not one below it', () => {
  const dir = tempDir('tilburg-test-');
  writeFile(resolve(dir, 'real', 'a.ts'), 'a');
  utimesSync(resolve(dir, 'real', 'a.ts'), 5, 5);
  utimesSync(resolve(dir, 'real'), 5, 5);
  symlinkSync(resolve(dir, 'real'), resolve(dir, 'src'));
  assert.equal(newestMtime([resolve(dir, 'src')]), 5000);
});

test('a build is fresh when any file in dist/ is newer than the source (Stencil skips unchanged files)', () => {
  const dir = tempDir('tilburg-test-');
  writeFile(resolve(dir, 'src', 'a.ts'), 'a');
  writeFile(resolve(dir, 'dist', 'index.js'), 'a');
  writeFile(resolve(dir, 'dist', 'esm', 'a.js'), 'a');
  for (const path of ['src', 'src/a.ts']) utimesSync(resolve(dir, path), 20, 20);
  for (const path of ['dist', 'dist/esm', 'dist/index.js']) utimesSync(resolve(dir, path), 10, 10);
  utimesSync(resolve(dir, 'dist', 'esm', 'a.js'), 30, 30);
  assert.equal(libraryState({ dir, src: ['src'], built: 'dist/index.js' }).state, 'fresh');
});
