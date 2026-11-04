/* `node --test scripts/`: `pnpm verify` exits 1 whenever a step fails or is killed, and 0 only when all pass. Runs a
   copy of the scripts in a throwaway folder with a fake pnpm whose steps pass or fail on demand: no builds, no network. */
import './lib/test-env.mjs';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, realpathSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { lockName } from './lib/lock.mjs';
import { copyScripts, gitIn, prependPath, runScript, writeFake, writeLock } from './lib/test-fakes.mjs';

/* The fake pnpm: FAIL and KILL are the exact arguments that make it exit 1 or kill itself. */
const PNPM = `#!/bin/sh
[ "$*" = "$FAIL" ] && { echo "\${OUTPUT:-boom}"; exit 1; }
[ "$*" = "$KILL" ] && kill -TERM $$
[ "$*" = "$TOUCH" ] && echo x > changed.txt
exit 0
`;

function verify({ FAIL = '', KILL = '', TOUCH = '', PARITY_EXIT = '0', OUTPUT = '', args = [], setup } = {}) {
  const dir = mkdtempSync(join(tmpdir(), 'tilburg-verify-test-'));
  const bin = join(dir, 'bin');
  mkdirSync(bin);
  copyScripts(dir, 'verify.mjs');
  writeFileSync(join(dir, 'scripts', 'parity.mjs'), 'process.exit(Number(process.env.PARITY_EXIT));\n');
  writeFileSync(join(dir, 'package.json'), '{}\n');
  writeFake(bin, 'pnpm', PNPM);
  const env = prependPath({ ...process.env, CI: '', FAIL, KILL, TOUCH, PARITY_EXIT, OUTPUT }, bin);
  setup?.(dir, env);
  const result = runScript('scripts/verify.mjs', args, { cwd: dir, env, timeout: 30_000 });
  return result;
}

test('every step passing is the only way to exit 0', () => {
  const result = verify();
  assert.equal(result.status, 0, result.output);
  assert.match(result.output, /Everything CI checks passes/);
});

test('an audit that fails offline is a warning, not a failure', () => {
  const result = verify({ FAIL: 'audit --audit-level critical', OUTPUT: 'getaddrinfo ENOTFOUND registry.npmjs.org' });
  assert.equal(result.status, 0, result.output);
  assert.match(result.output, /could not check: no network/);
});

test('node_modules out of date with pnpm-lock.yaml is said at the top', () => {
  const result = verify({
    setup: (dir) => {
      mkdirSync(join(dir, 'node_modules', '.pnpm'), { recursive: true });
      writeFileSync(join(dir, 'node_modules', '.pnpm', 'lock.yaml'), 'old\n');
      writeFileSync(join(dir, 'pnpm-lock.yaml'), 'new\n');
    },
  });
  assert.match(result.output, /pnpm-lock\.yaml differs from what is installed/);
});

test('a failing step fails verify, and the steps after it still run', () => {
  const result = verify({ FAIL: 'run lint' });
  assert.equal(result.status, 1, result.output);
  assert.match(result.output, /1 of 8 failed/);
  assert.doesNotMatch(result.output, /Everything CI checks passes/);
});

test('a failed build skips the steps that need it, and still fails verify', () => {
  const result = verify({ FAIL: 'run build' });
  assert.equal(result.status, 1, result.output);
  assert.equal(result.output.match(/skipped, the build failed/g)?.length, 3);
  assert.match(result.output, /1 of 5 failed/);
});

test('a step killed by a signal is a failure, not a pass', () => {
  const result = verify({ KILL: 'run test' });
  assert.equal(result.status, 1, result.output);
  assert.match(result.output, /1 of 8 failed/);
});

test('a failing parity check fails verify', () => {
  const result = verify({ PARITY_EXIT: '1' });
  assert.equal(result.status, 1, result.output);
  assert.match(result.output, /Parity \(not in CI\)\s+failed/);
});

test('a changeset check that crashes is reported in the table, not as a crash of verify', () => {
  const result = verify({
    /* origin/main exists, but there is no packages/ folder to read. */
    setup: (dir, env) => {
      const git = gitIn(dir, env);
      git('init', '-q', '-b', 'main');
      git('commit', '-q', '--allow-empty', '--no-gpg-sign', '-m', 'initial');
      git('update-ref', 'refs/remotes/origin/main', 'HEAD');
    },
  });
  assert.equal(result.status, 0, result.output);
  assert.match(result.output, /Changeset \(not in CI\)\s+could not check/);
  assert.match(result.output, /the check itself failed/);
  assert.doesNotMatch(result.output, /stopped with an unexpected error/);
});

/** A repository at dir with origin/main, then a branch that adds a published package called `name`. */
function branchWithPackage(dir, env, name) {
  const run = gitIn(dir, env);
  const git = (...args) => run('-c', 'commit.gpgSign=false', ...args);
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
  assert.equal(result.status, 0, result.output);
  assert.match(result.output, /café changed, but this branch has no changeset/);
});

test('a git that fails in the changeset check is "could not check", not "no published package changed"', () => {
  const result = verify({
    setup: (dir, env) => {
      branchWithPackage(dir, env, 'a');
      writeFileSync(join(dir, '.git', 'index'), 'not an index');
    },
  });
  assert.equal(result.status, 0, result.output);
  assert.match(result.output, /Changeset \(not in CI\)\s+could not check/);
  assert.doesNotMatch(result.output, /no published package changed/);
});

test('a shallow clone without the merge base says so, not "no origin/main"', () => {
  const result = verify({
    setup: (dir, env) => {
      const origin = `${dir}-origin`;
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
  assert.equal(result.status, 0, result.output);
  assert.match(result.output, /no common history with origin\/main/);
  assert.match(result.output, /git fetch --unshallow origin/);
});

test('a lockfile out of date fails the Lockfile step: no pnpm install that would make it pass here only', () => {
  const result = verify({
    FAIL: 'install --frozen-lockfile --lockfile-only',
    OUTPUT: 'ERR_PNPM_OUTDATED_LOCKFILE Cannot install with "frozen-lockfile"',
  });
  assert.equal(result.status, 1, result.output);
  assert.match(result.output, /Lockfile\s+failed/);
  assert.match(result.output, /commit pnpm-lock\.yaml/);
  assert.doesNotMatch(result.output, /attempt 2/);
});

test('--help prints the usage and runs nothing; an unknown argument is refused', () => {
  const help = verify({ args: ['--help'] });
  assert.equal(help.status, 0, help.output);
  assert.match(help.output, /pnpm verify: runs what CI checks/);
  assert.doesNotMatch(help.output, /Security audit/);
  const typo = verify({ args: ['tooltip'] });
  assert.equal(typo.status, 1, typo.output);
  assert.match(typo.output, /Unexpected argument 'tooltip'/);
});

test('while pnpm sync (or pack:local) builds, verify stops before building', () => {
  const result = verify({
    setup: (dir) => {
      writeLock(join(tmpdir(), lockName(realpathSync(dir), 'sync')), { what: 'pnpm sync' });
    },
  });
  assert.equal(result.status, 1, result.output);
  assert.match(result.output, /pnpm sync is running/);
  assert.doesNotMatch(result.output, /Security audit/);
});

test('a working tree that changes while verify runs gets a warning row', () => {
  const result = verify({
    TOUCH: 'run lint',
    setup: (dir, env) => {
      const git = gitIn(dir, env);
      git('init', '-q', '-b', 'main');
      git('add', '.');
      git('commit', '-q', '--no-gpg-sign', '-m', 'initial');
    },
  });
  assert.match(result.output, /Working tree\s+changed while this ran/);
});
