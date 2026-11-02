/* `node --test scripts/`: `pnpm verify` exits 1 whenever a step fails or is killed, and 0 only when all pass. Runs a
   copy of the scripts in a throwaway folder with a fake pnpm whose steps pass or fail on demand: no builds, no network. */
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { chmodSync, cpSync, mkdirSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { after, test } from 'node:test';
import { fileURLToPath } from 'node:url';

const SCRIPTS = fileURLToPath(new URL('.', import.meta.url));
const dirs = [];
after(() => dirs.forEach((dir) => rmSync(dir, { recursive: true, force: true })));

/* The fake pnpm: FAIL and KILL are the exact arguments that make it exit 1 or kill itself. */
const PNPM = `#!/bin/sh
[ "$*" = "$FAIL" ] && { echo "boom"; exit 1; }
[ "$*" = "$KILL" ] && kill -TERM $$
exit 0
`;

function verify({ FAIL = '', KILL = '', PARITY_EXIT = '0', setup } = {}) {
  const dir = mkdtempSync(join(tmpdir(), 'tilburg-verify-test-'));
  dirs.push(dir);
  const bin = join(dir, 'bin');
  mkdirSync(join(dir, 'scripts', 'lib'), { recursive: true });
  mkdirSync(bin);
  for (const file of ['verify.mjs', 'dev-config.mjs']) cpSync(join(SCRIPTS, file), join(dir, 'scripts', file));
  for (const file of readdirSync(join(SCRIPTS, 'lib')).filter((name) => /^[^.]+\.mjs$/.test(name)))
    cpSync(join(SCRIPTS, 'lib', file), join(dir, 'scripts', 'lib', file));
  writeFileSync(join(dir, 'scripts', 'parity.mjs'), 'process.exit(Number(process.env.PARITY_EXIT));\n');
  writeFileSync(join(dir, 'package.json'), '{}\n');
  writeFileSync(join(bin, 'pnpm'), PNPM);
  chmodSync(join(bin, 'pnpm'), 0o755);
  const env = { ...process.env, CI: '', FAIL, KILL, PARITY_EXIT, PATH: `${bin}:${process.env.PATH}` };
  setup?.(dir, env);
  const result = spawnSync(process.execPath, ['scripts/verify.mjs'], {
    cwd: dir,
    env,
    encoding: 'utf8',
    timeout: 30_000,
  });
  return { ...result, all: result.stdout + result.stderr };
}

test('every step passing is the only way to exit 0', () => {
  const result = verify();
  assert.equal(result.status, 0, result.all);
  assert.match(result.all, /Everything CI checks passes/);
});

test('a failing step fails verify, and the steps after it still run', () => {
  const result = verify({ FAIL: 'run lint' });
  assert.equal(result.status, 1, result.all);
  assert.match(result.all, /1 of 7 failed/);
  assert.doesNotMatch(result.all, /Everything CI checks passes/);
});

test('a failed build skips the steps that need it, and still fails verify', () => {
  const result = verify({ FAIL: 'run build' });
  assert.equal(result.status, 1, result.all);
  assert.equal(result.all.match(/skipped, the build failed/g)?.length, 3);
  assert.match(result.all, /1 of 4 failed/);
});

test('a step killed by a signal is a failure, not a pass', () => {
  const result = verify({ KILL: 'run test' });
  assert.equal(result.status, 1, result.all);
  assert.match(result.all, /1 of 7 failed/);
});

test('a failing parity check fails verify', () => {
  const result = verify({ PARITY_EXIT: '1' });
  assert.equal(result.status, 1, result.all);
  assert.match(result.all, /Parity \(not in CI\)\s+failed/);
});

test('a changeset check that crashes is reported in the table, not as a crash of verify', () => {
  const result = verify({
    /* origin/main exists, but there is no packages/ folder to read. */
    setup: (dir, env) => {
      const git = (...args) =>
        spawnSync('git', ['-c', 'user.name=t', '-c', 'user.email=t@t', ...args], { cwd: dir, env });
      git('init', '-q', '-b', 'main');
      git('commit', '-q', '--allow-empty', '--no-gpg-sign', '-m', 'initial');
      git('update-ref', 'refs/remotes/origin/main', 'HEAD');
    },
  });
  assert.equal(result.status, 0, result.all);
  assert.match(result.all, /Changeset \(not in CI\)\s+could not check/);
  assert.match(result.all, /the check itself failed/);
  assert.doesNotMatch(result.all, /stopped with an unexpected error/);
});

/** A repository at dir with origin/main, then a branch that adds a published package called `name`. */
function branchWithPackage(dir, env, name) {
  const git = (...args) =>
    spawnSync('git', ['-c', 'user.name=t', '-c', 'user.email=t@t', '-c', 'commit.gpgSign=false', ...args], {
      cwd: dir,
      env,
    });
  mkdirSync(join(dir, 'packages', name), { recursive: true });
  mkdirSync(join(dir, 'proprietary'));
  git('init', '-q', '-b', 'main');
  git('commit', '-q', '--allow-empty', '-m', 'initial');
  git('update-ref', 'refs/remotes/origin/main', 'HEAD');
  git('switch', '-q', '-c', 'feat/x');
  writeFileSync(join(dir, 'packages', name, 'package.json'), `{ "name": "${name}" }\n`);
  git('add', 'packages');
  git('commit', '-q', '-m', 'package');
  return git;
}

test('a package with a non-ASCII name still needs a changeset (git quotes such paths by default)', () => {
  const result = verify({ setup: (dir, env) => branchWithPackage(dir, env, 'café') });
  assert.equal(result.status, 0, result.all);
  assert.match(result.all, /café changed, but this branch has no changeset/);
});

test('a git that fails in the changeset check is "could not check", not "no published package changed"', () => {
  const result = verify({
    setup: (dir, env) => {
      branchWithPackage(dir, env, 'a');
      writeFileSync(join(dir, '.git', 'index'), 'not an index');
    },
  });
  assert.equal(result.status, 0, result.all);
  assert.match(result.all, /Changeset \(not in CI\)\s+could not check/);
  assert.doesNotMatch(result.all, /no published package changed/);
});

test('a shallow clone without the merge base says so, not "no origin/main"', () => {
  const result = verify({
    setup: (dir, env) => {
      const origin = `${dir}-origin`;
      dirs.push(origin);
      const git = branchWithPackage(origin, env, 'a');
      git('switch', '-q', 'main');
      git('commit', '-q', '--allow-empty', '-m', 'main moves on');
      const run = (...args) => spawnSync('git', args, { cwd: dir, env });
      run('init', '-q');
      run(
        'fetch',
        '-q',
        '--depth',
        '1',
        `file://${origin}`,
        'feat/x:refs/heads/feat/x',
        'main:refs/remotes/origin/main',
      );
      run('switch', '-q', 'feat/x');
    },
  });
  assert.equal(result.status, 0, result.all);
  assert.match(result.all, /no common history with origin\/main/);
  assert.match(result.all, /git fetch --unshallow origin/);
});
