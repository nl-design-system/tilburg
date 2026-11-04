/* `node --test scripts/`: when `pnpm ship` stops, and that it never reports success after a failed step. Runs a copy
   of the scripts in a throwaway repository with a local "origin" and a fake pnpm: no network, no push to GitHub. */
import './lib/test-env.mjs';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cpSync, mkdirSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { after, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { pullRequestUrl } from './lib/ship.mjs';
import { noSignals, prependPath, writeFake } from './lib/test-fakes.mjs';

test('pullRequestUrl reads every remote form, and nothing that is not GitHub', () => {
  const pr = 'compare/main...feat/x?expand=1';
  assert.equal(pullRequestUrl('git@github.com:o/r.git', 'feat/x'), `https://github.com/o/r/${pr}`);
  assert.equal(pullRequestUrl('ssh://git@github.com/o/r.git', 'feat/x'), `https://github.com/o/r/${pr}`);
  assert.equal(pullRequestUrl('ssh://git@github.com:22/o/r.git', 'feat/x'), `https://github.com/o/r/${pr}`);
  assert.equal(pullRequestUrl('ssh://github.com/o/r.git', 'feat/x'), `https://github.com/o/r/${pr}`);
  assert.equal(pullRequestUrl('https://user@github.com/o/r/', 'feat/x'), `https://github.com/o/r/${pr}`);
  /* A numeric owner is not a port. */
  assert.equal(pullRequestUrl('git@github.com:1234/r.git', 'feat/x'), `https://github.com/1234/r/${pr}`);
  assert.equal(pullRequestUrl('/Users/me/remote.git', 'feat/x'), null);
  assert.equal(pullRequestUrl('../remote.git', 'feat/x'), null);
  assert.equal(pullRequestUrl('', 'feat/x'), null);
  /* Other hosts have other pull request URLs. */
  assert.equal(pullRequestUrl('git@gitlab.com:o/r.git', 'feat/x'), null);
  assert.equal(pullRequestUrl('https://bitbucket.org/o/r.git', 'feat/x'), null);
});

const SCRIPTS = fileURLToPath(new URL('.', import.meta.url));
const dirs = [];
after(() => dirs.forEach((dir) => rmSync(dir, { recursive: true, force: true })));

const ENV = {
  ...process.env,
  CI: '',
  GIT_CONFIG_NOSYSTEM: '1',
  GIT_AUTHOR_NAME: 't',
  GIT_AUTHOR_EMAIL: 't@t',
  GIT_COMMITTER_NAME: 't',
  GIT_COMMITTER_EMAIL: 't@t',
};

/** A repository with the ship scripts committed on main, pushed to a local bare origin, and a fake `pnpm`. */
function sandbox(pnpm = 'exit 0') {
  const dir = mkdtempSync(join(tmpdir(), 'tilburg-ship-test-'));
  dirs.push(dir);
  const repo = join(dir, 'repo');
  const bin = join(dir, 'bin');
  mkdirSync(join(repo, 'scripts', 'lib'), { recursive: true });
  mkdirSync(bin);
  for (const file of ['ship.mjs', 'dev-config.mjs']) cpSync(join(SCRIPTS, file), join(repo, 'scripts', file));
  for (const file of readdirSync(join(SCRIPTS, 'lib')).filter((name) => /^[^.]+\.mjs$/.test(name)))
    cpSync(join(SCRIPTS, 'lib', file), join(repo, 'scripts', 'lib', file));
  writeFileSync(join(repo, 'package.json'), '{}\n');
  writeFake(bin, 'pnpm', `#!/bin/sh\n${pnpm}\n`);
  writeFileSync(join(dir, 'gitconfig'), '');
  const env = prependPath({ ...ENV, GIT_CONFIG_GLOBAL: join(dir, 'gitconfig') }, bin);
  const git = (...args) => {
    const result = spawnSync('git', args, { cwd: repo, env, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    return result.stdout.trim();
  };
  spawnSync('git', ['init', '-q', '--bare', join(dir, 'origin.git')], { env });
  git('init', '-q', '-b', 'main');
  git('add', '.');
  git('commit', '-q', '-m', 'initial');
  git('remote', 'add', 'origin', join(dir, 'origin.git'));
  git('push', '-q', '-u', 'origin', 'main');
  /* As on GitHub: origin's HEAD is main, so a clone of it checks main out. */
  git('--git-dir', join(dir, 'origin.git'), 'symbolic-ref', 'HEAD', 'refs/heads/main');
  const ship = (...args) => {
    const result = spawnSync(process.execPath, ['scripts/ship.mjs', ...args], {
      cwd: repo,
      env,
      encoding: 'utf8',
      timeout: 20_000,
    });
    return { ...result, all: result.stdout + result.stderr };
  };
  return { dir, repo, env, git, ship };
}

test('ship refuses to run on main', () => {
  const { ship } = sandbox();
  const result = ship('--no-verify', '--dry-run');
  assert.equal(result.status, 1, result.all);
  assert.match(result.all, /You are on main/);
});

test('ship refuses a detached HEAD', () => {
  const { git, ship } = sandbox();
  git('switch', '-q', '--detach');
  const result = ship('--no-verify', '--dry-run');
  assert.equal(result.status, 1, result.all);
  assert.match(result.all, /Not on a branch/);
});

test('uncommitted changes without a terminal stop ship unless --yes says go on', () => {
  const { repo, git, ship } = sandbox();
  git('switch', '-q', '-c', 'feat/x');
  writeFileSync(join(repo, 'new.txt'), 'x');
  const result = ship('--no-verify', '--dry-run');
  assert.equal(result.status, 1, result.all);
  assert.match(result.all, /Stopped: uncommitted changes/);
});

test('a git status that fails is not read as a clean working tree', () => {
  const { repo, git, ship } = sandbox();
  git('switch', '-q', '-c', 'feat/x');
  writeFileSync(join(repo, '.git', 'index'), 'not an index');
  const result = ship('--no-verify', '--dry-run');
  assert.equal(result.status, 1, result.all);
  assert.match(result.all, /Could not read the working tree/);
});

test('a branch without commits is a failure, not "up to date"', () => {
  const { git, ship } = sandbox();
  git('symbolic-ref', 'HEAD', 'refs/heads/empty');
  const result = ship('--no-verify', '--dry-run', '--yes');
  assert.equal(result.status, 1, result.all);
  assert.match(result.all, /Could not list the commits to push/);
  assert.doesNotMatch(result.all, /Nothing to push/);
});

test('a branch with nothing new says so and exits 0', () => {
  const { git, ship } = sandbox();
  git('switch', '-q', '-c', 'feat/x');
  const result = ship('--no-verify', '--dry-run');
  assert.equal(result.status, 0, result.all);
  assert.match(result.all, /Nothing to push/);
});

test('a dry run lists the commits and pushes nothing', () => {
  const { git, ship } = sandbox();
  git('switch', '-q', '-c', 'feat/x');
  git('commit', '-q', '--allow-empty', '-m', 'feature');
  const result = ship('--no-verify', '--dry-run');
  assert.equal(result.status, 0, result.all);
  assert.match(result.all, /1 commit to push \(origin\/main\.\.HEAD\)/);
  assert.match(result.all, /would run: git push -u origin HEAD:refs\/heads\/feat\/x/);
  assert.equal(git('ls-remote', '--heads', 'origin', 'feat/x'), '');
});

test('without a terminal and without --yes, ship does not push', () => {
  const { git, ship } = sandbox();
  git('switch', '-q', '-c', 'feat/x');
  git('commit', '-q', '--allow-empty', '-m', 'feature');
  const result = ship('--no-verify');
  assert.equal(result.status, 1, result.all);
  assert.match(result.all, /no terminal to ask/);
  assert.equal(git('ls-remote', '--heads', 'origin', 'feat/x'), '');
});

test('a failing verify stops ship before the push', () => {
  const { git, ship } = sandbox('exit 3');
  git('switch', '-q', '-c', 'feat/x');
  git('commit', '-q', '--allow-empty', '-m', 'feature');
  const result = ship('--yes');
  assert.equal(result.status, 1, result.all);
  assert.match(result.all, /Verify failed — not pushing/);
  assert.equal(git('ls-remote', '--heads', 'origin', 'feat/x'), '');
});

test('a commit made while verify runs (another terminal) stops ship before the push', () => {
  const { git, ship } = sandbox('git commit -q --allow-empty -m moved');
  git('switch', '-q', '-c', 'feat/x');
  git('commit', '-q', '--allow-empty', '-m', 'feature');
  const result = ship('--yes');
  assert.equal(result.status, 1, result.all);
  assert.match(result.all, /changed while verify ran/);
  assert.equal(git('ls-remote', '--heads', 'origin', 'feat/x'), '');
});

test('a verify killed by a signal (status null) stops ship too, and says so', { skip: noSignals }, () => {
  const { git, ship } = sandbox('kill -TERM $$');
  git('switch', '-q', '-c', 'feat/x');
  git('commit', '-q', '--allow-empty', '-m', 'feature');
  const result = ship('--yes');
  assert.equal(result.status, 1, result.all);
  assert.match(result.all, /Verify failed — not pushing/);
  assert.match(result.all, /stopped by SIGTERM/);
  assert.equal(git('ls-remote', '--heads', 'origin', 'feat/x'), '');
});

test('an unknown option stops ship with exit 1', () => {
  const { ship } = sandbox();
  const result = ship('--nope');
  assert.equal(result.status, 1, result.all);
  assert.match(result.all, /Unknown option/);
});

test('a merge in progress stops ship, even with --yes, and nothing is pushed', () => {
  const { git, ship } = sandbox();
  git('switch', '-q', '-c', 'other');
  git('commit', '-q', '--allow-empty', '-m', 'other');
  git('switch', '-q', '-c', 'feat/x', 'main');
  git('commit', '-q', '--allow-empty', '-m', 'feature');
  git('merge', '-q', '--no-commit', '--no-ff', 'other');
  const result = ship('--no-verify', '--yes');
  assert.equal(result.status, 1, result.all);
  assert.match(result.all, /A merge is in progress/);
  assert.match(result.all, /git merge --abort/);
  assert.equal(git('ls-remote', '--heads', 'origin', 'feat/x'), '');
});

test('a rebase that stopped on a conflict says so, not just "detached HEAD"', () => {
  const { repo, env, git, ship } = sandbox();
  git('switch', '-q', '-c', 'other');
  writeFileSync(join(repo, 'a.txt'), 'other');
  git('add', 'a.txt');
  git('commit', '-q', '-m', 'other');
  git('switch', '-q', '-c', 'feat/x', 'main');
  writeFileSync(join(repo, 'a.txt'), 'mine');
  git('add', 'a.txt');
  git('commit', '-q', '-m', 'mine');
  assert.notEqual(spawnSync('git', ['rebase', 'other'], { cwd: repo, env }).status, 0);
  const result = ship('--no-verify', '--dry-run', '--yes');
  assert.equal(result.status, 1, result.all);
  assert.match(result.all, /A rebase is in progress/);
  assert.match(result.all, /git rebase --continue/);
});

test('a cherry-pick in progress in a worktree is found too (its state is not in .git/)', () => {
  const { dir, repo, env, git } = sandbox();
  git('switch', '-q', '-c', 'other');
  writeFileSync(join(repo, 'a.txt'), 'other');
  git('add', 'a.txt');
  git('commit', '-q', '-m', 'other');
  git('switch', '-q', 'main');
  const tree = join(dir, 'tree');
  git('worktree', 'add', '-q', '-b', 'feat/x', tree, 'main');
  writeFileSync(join(tree, 'a.txt'), 'mine');
  spawnSync('git', ['add', 'a.txt'], { cwd: tree, env });
  spawnSync('git', ['commit', '-q', '-m', 'mine'], { cwd: tree, env });
  assert.notEqual(spawnSync('git', ['cherry-pick', 'other'], { cwd: tree, env }).status, 0);
  const result = spawnSync(process.execPath, ['scripts/ship.mjs', '--no-verify', '--yes'], {
    cwd: tree,
    env,
    encoding: 'utf8',
    timeout: 20_000,
  });
  assert.equal(result.status, 1, result.stdout + result.stderr);
  assert.match(result.stdout, /A cherry-pick is in progress/);
  assert.equal(git('ls-remote', '--heads', 'origin', 'feat/x'), '');
});

test('without an origin, ship stops before verify and says how to add one', () => {
  const { git, ship } = sandbox('exit 3');
  git('switch', '-q', '-c', 'feat/x');
  git('remote', 'remove', 'origin');
  const result = ship('--dry-run', '--yes');
  assert.equal(result.status, 1, result.all);
  assert.match(result.all, /No remote called origin/);
  assert.doesNotMatch(result.all, /Verify failed/);
});

test('local commits on main: the fix moves them to a branch and puts main back', () => {
  const { git, ship } = sandbox();
  git('commit', '-q', '--allow-empty', '-m', 'oops');
  const result = ship('--no-verify', '--dry-run');
  assert.equal(result.status, 1, result.all);
  assert.match(result.all, /main has 1 local commit/);
  assert.match(result.all, /git switch -c <feature-branch> && git branch -f main origin\/main/);
});

test('a branch deleted on origin (merged) is not "up to date" with it', () => {
  const { dir, git, ship } = sandbox();
  git('switch', '-q', '-c', 'feat/x');
  git('commit', '-q', '--allow-empty', '-m', 'feature');
  git('push', '-q', '-u', 'origin', 'feat/x');
  /* Deleted on the server, as GitHub does after a merge: the local origin/feat/x is still there. */
  git('--git-dir', join(dir, 'origin.git'), 'branch', '-q', '-D', 'feat/x');
  const result = ship('--no-verify', '--dry-run');
  assert.equal(result.status, 0, result.all);
  assert.doesNotMatch(result.all, /Nothing to push/);
  assert.match(result.all, /upstream of feat\/x is gone from origin/);
  assert.match(result.all, /1 commit to push \(origin\/main\.\.HEAD\)/);
});

test('without origin/main the whole history is listed, cut at 20 lines', () => {
  const { dir, git, ship } = sandbox();
  git('switch', '-q', '-c', 'feat/x');
  for (let i = 0; i < 24; i++) git('commit', '-q', '--allow-empty', '-m', `c${i}`);
  /* An origin without main: a new branch in a clone of an empty repository. */
  spawnSync('git', ['init', '-q', '--bare', join(dir, 'empty.git')]);
  git('remote', 'set-url', 'origin', join(dir, 'empty.git'));
  git('update-ref', '-d', 'refs/remotes/origin/main');
  const result = ship('--no-verify', '--dry-run');
  assert.equal(result.status, 0, result.all);
  assert.match(result.all, /25 commits to push/);
  assert.match(result.all, /… and 5 more/);
});

test('git missing from the PATH says so, not "No remote called origin"', () => {
  const { dir, repo, env } = sandbox();
  const result = spawnSync(process.execPath, ['scripts/ship.mjs', '--no-verify', '--dry-run'], {
    cwd: repo,
    env: { ...env, PATH: join(dir, 'bin') },
    encoding: 'utf8',
    timeout: 20_000,
  });
  assert.equal(result.status, 1, result.stdout + result.stderr);
  assert.match(result.stdout + result.stderr, /git not found/);
});
