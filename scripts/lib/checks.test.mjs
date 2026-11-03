/* `node --test scripts/`: the checks behind pnpm check, the lock file, and pnpm parity end to end. */
import './test-env.mjs';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { chmodSync, existsSync, mkdirSync, mkdtempSync, rmSync, symlinkSync, utimesSync, writeFileSync } from 'node:fs';
import http from 'node:http';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { PNPM_VERSION } from '../dev-config.mjs';
import {
  belowEngines,
  checkCorepack,
  checkCpu,
  checkDiskSpace,
  checkEnvironment,
  checkFolder,
  checkPackageJson,
  checkPnpm,
  identifyStorybook,
  libraryState,
  newestMtime,
  runInherit,
} from './checks.mjs';
import { readDevLock } from './lock.mjs';

const scripts = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');

test('newestMtime does not follow a symlink loop, and skips build output', (t) => {
  const dir = mkdtempSync(resolve(tmpdir(), 'tilburg-test-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  mkdirSync(resolve(dir, 'src'));
  mkdirSync(resolve(dir, 'src', 'dist'));
  writeFileSync(resolve(dir, 'src', 'a.ts'), 'a');
  symlinkSync(dir, resolve(dir, 'src', 'loop'));
  assert.ok(newestMtime([resolve(dir, 'src'), resolve(dir, 'missing')]) > 0);
});

test('a lock left by a process that is gone is stale: ignored and removed', (t) => {
  const dir = mkdtempSync(resolve(tmpdir(), 'tilburg-lock-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const file = resolve(dir, 'lock.json');
  writeFileSync(file, JSON.stringify({ pid: 2 ** 22 + 17, started: new Date().toISOString() }));
  assert.equal(readDevLock(file), null);
  assert.equal(existsSync(file), false);
});

test('a lock of a running process is read', (t) => {
  const dir = mkdtempSync(resolve(tmpdir(), 'tilburg-lock-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const file = resolve(dir, 'lock.json');
  writeFileSync(
    file,
    JSON.stringify({ pid: process.ppid, started: new Date().toISOString(), storybooks: [{ port: 6006 }] }),
  );
  assert.equal(readDevLock(file)?.storybooks[0].port, 6006);
});

test('a broken lock file is ignored', (t) => {
  const dir = mkdtempSync(resolve(tmpdir(), 'tilburg-lock-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const file = resolve(dir, 'lock.json');
  writeFileSync(file, '{ not json');
  assert.equal(readDevLock(file), null);
});

test('pnpm parity passes for a complete component and names the layers', () => {
  const result = spawnSync(process.execPath, [resolve(scripts, 'parity.mjs'), 'tooltip'], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.match(result.stdout, /Tooltip\s+✓\s+✓\s+✓\s+✓/);
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
  assert.throws(() => runInherit('kill -TERM $$'), /exited with SIGTERM$/);
});

/** checkPnpm with a fake `pnpm` on the PATH (none at all when `script` is null). */
async function withFakePnpm(script) {
  const dir = mkdtempSync(resolve(tmpdir(), 'tilburg-pnpm-'));
  if (script !== null) {
    writeFileSync(resolve(dir, 'pnpm'), `#!/bin/sh\n${script}\n`);
    chmodSync(resolve(dir, 'pnpm'), 0o755);
  }
  const path = process.env.PATH;
  process.env.PATH = script === null ? dir : `${dir}:${path}`;
  try {
    return await checkPnpm();
  } finally {
    process.env.PATH = path;
    rmSync(dir, { recursive: true, force: true });
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
  for (const version of ['0.31.0', '0.35.0', '1.0.0', undefined]) {
    assert.equal(checkCorepack({ path: '/n/bin/corepack', version }, '/n/bin').warn, undefined, version);
  }
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
  ]) {
    assert.equal(checkFolder(root).warn, true, root);
  }
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
  const dir = mkdtempSync(resolve(tmpdir(), 'tilburg-pkg-'));
  try {
    writeFileSync(resolve(dir, 'package.json'), '{\n<<<<<<< HEAD\n  "name": "a"\n=======\n}');
    assert.equal(checkPackageJson(resolve(dir, 'package.json')).ok, false);
    writeFileSync(resolve(dir, 'package.json'), '{"name":"a"}');
    assert.equal(checkPackageJson(resolve(dir, 'package.json')).ok, true);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('a deleted file makes the source newer (its folder mtime counts)', (t) => {
  const dir = mkdtempSync(resolve(tmpdir(), 'tilburg-test-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  mkdirSync(resolve(dir, 'src'));
  writeFileSync(resolve(dir, 'src', 'a.ts'), 'a');
  utimesSync(resolve(dir, 'src', 'a.ts'), 1, 1);
  utimesSync(resolve(dir, 'src'), 1, 1);
  assert.equal(newestMtime([resolve(dir, 'src')]), 1000);
  rmSync(resolve(dir, 'src', 'a.ts'));
  assert.ok(newestMtime([resolve(dir, 'src')]) > 1000);
});

test('a source file from the future is stale and says clock skew', (t) => {
  const dir = mkdtempSync(resolve(tmpdir(), 'tilburg-test-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  mkdirSync(resolve(dir, 'src'));
  mkdirSync(resolve(dir, 'dist'));
  writeFileSync(resolve(dir, 'src', 'a.ts'), 'a');
  writeFileSync(resolve(dir, 'dist', 'index.js'), 'a');
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
    try {
      const { port } = server.address();
      assert.deepEqual(await identifyStorybook({}, port, () => null), {
        ours: false,
        what: 'a Storybook whose folder cannot be told (no lsof)',
      });
    } finally {
      server.close();
    }
  }
});
