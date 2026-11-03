/* The git helpers of `pnpm ship`, also used by verify and sync. */
import { execFile, spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * The GitHub "open a pull request" page for `branch` against `base`, from the remote URL in any of its forms
 * (git@github.com:owner/repo.git, ssh://git@github.com/…, https://user@github.com/…). null for anything that is not
 * a GitHub URL (a local path, GitLab, Bitbucket).
 */
export function pullRequestUrl(remote, branch, base = 'main') {
  /* A port only in ssh://: in git@host:1234/repo.git the 1234 is the owner. */
  const match =
    /^ssh:\/\/(?:[^@/\s]+@)?([^:/\s]+)(?::\d+)?\/(.+?)(?:\.git)?\/?$/.exec(remote) ??
    /^[^@/\s]+@([^:/\s]+):(.+?)(?:\.git)?\/?$/.exec(remote) ??
    /^https?:\/\/(?:[^@/]+@)?([^/]+)\/(.+?)(?:\.git)?\/?$/.exec(remote);
  if (!match) return null;
  const [, host, path] = match;
  /* GitLab and Bitbucket have other pull request URLs: no link beats a wrong one. */
  if (!/github/i.test(host)) return null;
  /* Slashes stay: GitHub reads feat/x as one branch name in a compare URL. */
  const ref = (name) => name.split('/').map(encodeURIComponent).join('/');
  return `https://${host}/${path}/compare/${ref(base)}...${ref(branch)}?expand=1`;
}

/* Half-way through one of these the branch (or HEAD) is not what it will end up as: ship will not push it, sync will
   not write a consumer's lockfile into it. [file under `git rev-parse --git-path`, what, how to finish it] */
export const IN_PROGRESS = [
  ['rebase-merge', 'A rebase', 'git rebase --continue (or git rebase --abort)'],
  ['rebase-apply', 'A rebase', 'git rebase --continue (or git rebase --abort)'],
  ['MERGE_HEAD', 'A merge', 'git commit to finish it (or git merge --abort)'],
  ['CHERRY_PICK_HEAD', 'A cherry-pick', 'git cherry-pick --continue (or git cherry-pick --abort)'],
  ['REVERT_HEAD', 'A revert', 'git revert --continue (or git revert --abort)'],
  ['BISECT_LOG', 'A bisect', 'git bisect reset'],
];

/**
 * The IN_PROGRESS entry `dir` is in the middle of, or undefined. `git` runs git in `dir` and returns { ok, out }.
 * --git-path: in a worktree these live in .git/worktrees/<name>/, not in .git/.
 */
export function inProgress(dir, git) {
  return IN_PROGRESS.find(([file]) => {
    const path = git('rev-parse', '--git-path', file);
    return path.ok && existsSync(resolve(dir, path.out));
  });
}

/**
 * HEAD plus a hash of `git status`, or null outside a checkout. Taken at the start and the end of a long build: when
 * they differ, a checkout, pull or stash happened meanwhile and the result came from a mix of two trees.
 */
export async function treeState(dir) {
  /* From a git hook, GIT_DIR and friends would point elsewhere than `dir`. */
  const { GIT_DIR, GIT_INDEX_FILE, GIT_WORK_TREE, ...env } = process.env;
  /* Async: a blocking git (a hung mount, a lock) would keep Ctrl-C from stopping the script. */
  const git = (...args) =>
    new Promise((done) =>
      execFile(
        'git',
        ['-C', dir, ...args],
        { encoding: 'utf8', env, timeout: 30_000, maxBuffer: 64 << 20 },
        (err, stdout) => done(err ? null : stdout),
      ),
    );
  const [head, status] = await Promise.all([git('rev-parse', '-q', '--verify', 'HEAD'), git('status', '--porcelain')]);
  if (status === null) return null;
  return `${(head ?? '').trim()} ${createHash('sha1').update(status).digest('hex')}`;
}
