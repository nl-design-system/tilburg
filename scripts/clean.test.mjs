/* `node --test scripts/`: `pnpm run clean:pick` deletes only build output and caches. It runs at import time, so each
   test copies it into a throwaway repo (with a space in its path) and runs it there without a terminal. */
import './lib/test-env.mjs';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import {
  chmodSync,
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  realpathSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, resolve } from 'node:path';
import { afterEach, test } from 'node:test';
import { fileURLToPath } from 'node:url';

const SCRIPTS = dirname(fileURLToPath(import.meta.url));
let sandbox;
afterEach(() => rmSync(sandbox, { recursive: true, force: true }));

/** A fake repo: two packages with dist/, src/ and a workspace symlink, plus a folder outside the repo. */
function makeRepo({ built = true } = {}) {
  sandbox = mkdtempSync(resolve(tmpdir(), 'tilburg clean $(x) '));
  const root = resolve(sandbox, 'repo');
  const file = (path, content = 'x') => {
    mkdirSync(dirname(resolve(root, path)), { recursive: true });
    writeFileSync(resolve(root, path), content);
  };
  for (const name of ['clean.mjs', 'dev-config.mjs', 'lib/cli-utils.mjs', 'lib/keys.mjs', 'lib/lock.mjs']) {
    mkdirSync(dirname(resolve(root, 'scripts', name)), { recursive: true });
    copyFileSync(resolve(SCRIPTS, name), resolve(root, 'scripts', name));
  }
  file('package.json', '{}');
  file('packages/a/src/index.ts');
  file('packages/b/src/index.ts');
  file('proprietary/c/src/index.ts');
  if (built) {
    file('packages/a/dist/index.js');
    file('proprietary/c/.angular/cache/x');
    file('node_modules/.cache/vite/x');
  }
  file('packages/a/node_modules/lodash/index.js');
  mkdirSync(resolve(root, 'packages/a/node_modules/@gemeente-tilburg'));
  symlinkSync(resolve(root, 'packages/b'), resolve(root, 'packages/a/node_modules/@gemeente-tilburg/b'));
  /* A dist/ that is a link to somewhere else: the link goes, what it points at stays. */
  mkdirSync(resolve(sandbox, 'outside'));
  writeFileSync(resolve(sandbox, 'outside/keep.txt'), 'x');
  symlinkSync(resolve(sandbox, 'outside'), resolve(root, 'packages/b/dist'));
  return root;
}

/* TMPDIR in the sandbox, so the pnpm dev lock (lib/lock.mjs) is ours too. */
const run = (root, ...args) =>
  spawnSync(process.execPath, [resolve(root, 'scripts/clean.mjs'), ...args], {
    cwd: root,
    encoding: 'utf8',
    timeout: 15_000,
    env: { ...process.env, CI: '1', TMPDIR: sandbox },
  });

test('without a terminal and without --yes it deletes nothing and exits 1', () => {
  const root = makeRepo();
  const result = run(root);
  assert.equal(result.status, 1, result.stdout + result.stderr);
  assert.match(result.stdout, /These would be deleted: Build output/);
  assert.ok(existsSync(resolve(root, 'packages/a/dist/index.js')));
});

test('--yes deletes build output and caches, and nothing else', () => {
  const root = makeRepo();
  const result = run(root, '--yes');
  assert.equal(result.status, 0, result.stdout + result.stderr);
  for (const gone of ['packages/a/dist', 'packages/b/dist', 'proprietary/c/.angular', 'node_modules/.cache']) {
    assert.equal(existsSync(resolve(root, gone)), false, `${gone} is deleted`);
  }
  for (const kept of [
    'packages/a/src/index.ts',
    'packages/b/src/index.ts',
    'proprietary/c/src/index.ts',
    'packages/a/node_modules/lodash/index.js',
    'packages/a/node_modules/@gemeente-tilburg/b/src/index.ts',
    'scripts/clean.mjs',
  ]) {
    assert.ok(existsSync(resolve(root, kept)), `${kept} is kept`);
  }
  assert.ok(existsSync(resolve(sandbox, 'outside/keep.txt')), 'the target of a symlinked dist/ is kept');
});

test('nothing to delete is not a failure, also without --yes', () => {
  const root = makeRepo({ built: false });
  rmSync(resolve(root, 'packages/b/dist'));
  const result = run(root);
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.match(result.stdout, /Nothing deleted/);
  assert.doesNotMatch(result.stdout, /These would be deleted/);
});

test('while pnpm dev runs it refuses to delete the dist/ it serves, also with --yes', () => {
  const root = makeRepo();
  /* LOCK_FILE's name: ROOT is where the script really is, macOS's /var is a link to /private/var. */
  const id = createHash('sha1').update(realpathSync(root)).digest('hex').slice(0, 10);
  writeFileSync(
    /* …and the user (lock.mjs). */
    resolve(sandbox, `tilburg-dev-${process.getuid ? `${process.getuid()}-` : ''}${id}.json`),
    JSON.stringify({ pid: process.pid, started: new Date().toISOString(), storybooks: [] }),
  );
  const result = run(root, '--yes');
  assert.equal(result.status, 1, result.stdout + result.stderr);
  assert.match(result.stdout, /pnpm dev is running/);
  assert.ok(existsSync(resolve(root, 'packages/a/dist/index.js')));
});

test(
  'a folder it may not delete (read-only, or made with sudo) is a failure that says so, not a crash',
  {
    skip: process.getuid?.() === 0 && 'root ignores permissions',
  },
  () => {
    const root = makeRepo();
    mkdirSync(resolve(root, 'packages/a/dist/locked'));
    writeFileSync(resolve(root, 'packages/a/dist/locked/x.js'), 'x');
    chmodSync(resolve(root, 'packages/a/dist/locked'), 0o555);
    try {
      const result = run(root, '--yes');
      assert.equal(result.status, 1, result.stdout + result.stderr);
      assert.match(
        result.stdout + result.stderr,
        /packages\/a\/dist could not be deleted[\s\S]*read-only or not yours/,
      );
      assert.equal(existsSync(resolve(root, 'proprietary/c/.angular')), false, 'the other targets are still deleted');
    } finally {
      chmodSync(resolve(root, 'packages/a/dist/locked'), 0o755);
    }
  },
);

/* A terminal faked in a preload, 40 columns wide: no real pty in node:test. */
const inTerminal = (root, input) =>
  spawnSync(
    process.execPath,
    [
      '--import',
      `data:text/javascript,${encodeURIComponent(
        `process.stdin.isTTY = true; process.stdout.isTTY = true; process.stdin.setRawMode = () => process.stdin;
         Object.defineProperty(process.stdout, 'columns', { value: 40 });`,
      )}`,
      resolve(root, 'scripts/clean.mjs'),
    ],
    { cwd: root, input, encoding: 'utf8', timeout: 15_000, env: { ...process.env, CI: '', TMPDIR: sandbox } },
  );

test('in the picker, Ctrl-C exits 130 and deletes nothing; no line is wider than the terminal', () => {
  const root = makeRepo();
  /* An application-mode ↓ and a space in the same chunk as the Ctrl-C: all read, none deletes anything. */
  const result = inTerminal(root, '\x1bOB \u0003');
  assert.equal(result.status, 130, result.stdout + result.stderr);
  assert.ok(existsSync(resolve(root, 'packages/a/dist/index.js')));
  const picker = result.stdout.replace(/\x1b\[[0-9;]*[A-Za-z]/g, '');
  for (const line of picker.split('\n').filter((line) => line.includes('[')))
    assert.ok(line.length < 40, `${line.length}: ${line}`);
});

test('the tarballs are not ticked by default: hltsamen installs from them', () => {
  const root = makeRepo();
  writeFileSync(resolve(root, 'package.json'), '{}');
  mkdirSync(resolve(root, '.tarballs'));
  writeFileSync(resolve(root, '.tarballs/x.tgz'), '');
  const result = run(root, '--yes');
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.ok(existsSync(resolve(root, '.tarballs/x.tgz')));
});

test('in the picker, a pasted line ending in Enter deletes nothing', () => {
  const root = makeRepo();
  const result = inTerminal(root, 'pnpm dev\r');
  assert.notEqual(result.status, null, 'did not hang');
  assert.ok(existsSync(resolve(root, 'packages/a/dist/index.js')));
});
