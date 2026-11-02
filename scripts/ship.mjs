/* `pnpm ship`: the checks before a push, then the push and the pull request link.
   Not on main, nothing uncommitted (or you say so), up to date with origin/main, `pnpm verify` passes. Then it shows
   the commits, asks, pushes this branch to origin/<same name> and prints the GitHub "open a pull request" link.

   --no-verify skips pnpm verify. --dry-run does everything but the push. --yes answers the questions; without a
   terminal it is the only way to push. */
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { parseArgs } from 'node:util';
import { ROOT } from './dev-config.mjs';
import { c, confirm, fail, hyperlink, installCrashHandler, printBanner } from './lib/cli-utils.mjs';
import { classifyFailure } from './lib/recovery.mjs';
import { pullRequestUrl } from './lib/ship.mjs';

installCrashHandler('pnpm ship');

/** git in the repository. Never throws: { ok, out }. */
function git(...args) {
  /* A fetch that hangs (network, credential prompt) gives up after two minutes instead of blocking ship. */
  const result = spawnSync('git', args, { cwd: ROOT, encoding: 'utf8', timeout: 120_000 });
  /* Ctrl-C reaches git, not our SIGINT handler (spawnSync blocks it): stop here rather than carry on to the push. */
  if (result.signal === 'SIGINT') {
    console.log('\n  Stopped (Ctrl-C).\n');
    process.exit(130);
  }
  return { ok: result.status === 0, out: (result.stdout ?? '').trimEnd() };
}

function stop(problem) {
  fail(problem);
  process.exit(1);
}

let args;
try {
  ({ values: args } = parseArgs({
    options: {
      'no-verify': { type: 'boolean' },
      'dry-run': { type: 'boolean' },
      yes: { type: 'boolean', short: 'y' },
    },
  }));
} catch (err) {
  stop({ what: err.message, fix: 'pnpm ship --dry-run --no-verify' });
}

printBanner(args['dry-run'] ? 'Ship (dry run)' : 'Ship');

/* Half-way through one of these the branch (or HEAD) is not what will end up on it: finish or abort it first. */
const IN_PROGRESS = [
  ['rebase-merge', 'A rebase', 'git rebase --continue (or git rebase --abort)'],
  ['rebase-apply', 'A rebase', 'git rebase --continue (or git rebase --abort)'],
  ['MERGE_HEAD', 'A merge', 'git commit to finish it (or git merge --abort)'],
  ['CHERRY_PICK_HEAD', 'A cherry-pick', 'git cherry-pick --continue (or git cherry-pick --abort)'],
  ['REVERT_HEAD', 'A revert', 'git revert --continue (or git revert --abort)'],
  ['BISECT_LOG', 'A bisect', 'git bisect reset'],
];
/* --git-path: in a worktree these live in .git/worktrees/<name>/, not in .git/. */
const busy = IN_PROGRESS.find(([file]) => {
  const path = git('rev-parse', '--git-path', file);
  return path.ok && existsSync(resolve(ROOT, path.out));
});
if (busy) stop({ what: `${busy[1]} is in progress`, why: 'pushing now would push the state before it', fix: busy[2] });

if (!git('remote', 'get-url', 'origin').ok)
  stop({
    what: 'No remote called origin',
    why: 'ship pushes to origin',
    fix: 'git remote add origin <url> (git remote -v lists the remotes)',
  });

const branch = git('symbolic-ref', '--short', 'HEAD');
if (!branch.ok)
  stop({
    what: 'Not on a branch',
    why: 'HEAD is detached (or this is not a git repository)',
    fix: 'git switch -c <feature-branch>',
  });
if (['main', 'master'].includes(branch.out)) {
  const ahead = Number(git('rev-list', '--count', `origin/${branch.out}..HEAD`).out) || 0;
  stop({
    what: `You are on ${branch.out}`,
    why: `work reaches main through a pull request, not a direct push${ahead ? `; ${branch.out} has ${ahead} local commit${ahead === 1 ? '' : 's'}` : ''}`,
    /* The new branch keeps the commits; only then is it safe to put main back where origin has it. */
    fix: ahead
      ? `git switch -c <feature-branch> && git branch -f ${branch.out} origin/${branch.out}`
      : 'git switch -c <feature-branch>',
  });
}
console.log(`  Branch  ${c.cyan}${branch.out}${c.reset}`);

const status = git('status', '--porcelain');
if (!status.ok) stop({ what: 'Could not read the working tree', why: 'git status failed', fix: 'git status' });
const dirty = status.out;
if (dirty) {
  console.log(`\n  ${c.yellow}Uncommitted changes (they will not be pushed):${c.reset}`);
  for (const line of dirty.split('\n')) console.log(`     ${line}`);
  if (!(await confirm('Continue anyway?', { default: false, fallback: args.yes })))
    stop({ what: 'Stopped: uncommitted changes', fix: 'commit or stash them, then pnpm ship again' });
}

/* Not fatal: offline, compare against what was fetched last. --prune: a branch deleted on origin (merged) must not
   still count as our upstream. */
if (!git('fetch', '--quiet', '--prune', 'origin').ok)
  console.log(`  ${c.gray}Could not fetch origin; comparing against the last fetch.${c.reset}`);

const upstream = git('rev-parse', '--abbrev-ref', '--symbolic-full-name', '@{u}');
if (!upstream.ok && git('config', `branch.${branch.out}.merge`).ok)
  console.log(
    `  ${c.yellow}⚠  The upstream of ${branch.out} is gone from origin (deleted after a merge?); ship pushes it as a new branch.${c.reset}`,
  );
const hasMain = git('rev-parse', '--verify', '--quiet', 'origin/main').ok;
/* Only origin/<branch> counts as our upstream. A branch made with `git switch -c x origin/main` tracks origin/main,
   and a bare `git push` could then push it straight to main (push.default=upstream). */
const target = `origin/${branch.out}`;
const ownUpstream = upstream.ok && upstream.out === target;
if (upstream.ok && !ownUpstream)
  console.log(
    `  ${c.yellow}⚠  This branch tracks ${upstream.out}; ship pushes to ${target} and makes that its upstream.${c.reset}`,
  );
/* What the push adds: past our upstream, or for a new branch everything not on main yet. */
const base = ownUpstream ? target : hasMain ? 'origin/main' : null;
const range = base ? `${base}..HEAD` : 'HEAD';

const behind = hasMain ? Number(git('rev-list', '--count', 'HEAD..origin/main').out) : 0;
if (behind)
  console.log(
    `\n  ${c.yellow}⚠  ${behind} commit${behind === 1 ? '' : 's'} behind origin/main.${c.reset} To catch up first:\n     ${c.cyan}git fetch && git rebase origin/main${c.reset}`,
  );

if (args['no-verify']) console.log(`\n  ${c.gray}Skipping verify (--no-verify).${c.reset}`);
else {
  if (dirty)
    console.log(
      `\n  ${c.yellow}⚠  Verify runs on your working tree, uncommitted changes included — not exactly what is pushed.${c.reset}`,
    );
  console.log('');
  const verify = spawnSync('pnpm', ['run', 'verify'], {
    cwd: ROOT,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
  /* status is null when pnpm did not start or was killed: then there is no table to point at. */
  if (verify.status !== 0)
    stop({
      what: 'Verify failed — not pushing',
      why: verify.error?.message ?? (verify.signal ? `pnpm verify was stopped by ${verify.signal}` : undefined),
      fix: 'fix what the table above says, or pnpm ship --no-verify',
    });
}

const log = git('log', '--oneline', '--no-decorate', range);
/* Fails on a branch without commits (or a broken ref): that is not "up to date". */
if (!log.ok) stop({ what: 'Could not list the commits to push', why: `git log ${range} failed`, fix: 'git status' });
const commits = log.out;
if (!commits) {
  console.log(`\n  ${c.green}Nothing to push.${c.reset} ${branch.out} is up to date with ${base}.\n`);
  process.exit(0);
}
const count = commits.split('\n').length;
console.log(`\n  ${count} commit${count === 1 ? '' : 's'} to push${base ? ` (${range})` : ''}:`);
for (const line of commits.split('\n')) console.log(`     ${line}`);
console.log('');

/* Always explicit: this branch to origin/<same name>, whatever push.default or the tracking setting says. */
const push = ['push', '-u', 'origin', `HEAD:refs/heads/${branch.out}`];
if (args['dry-run']) console.log(`  ${c.gray}Dry run — would run: git ${push.join(' ')}${c.reset}`);
else {
  if (!args.yes && !process.stdin.isTTY) stop({ what: 'Not pushing: no terminal to ask', fix: 'pnpm ship --yes' });
  if (!args.yes && !(await confirm(`Push to ${target}?`))) {
    console.log('  Not pushed.\n');
    process.exit(0);
  }
  /* stderr is read back to say why a push failed; git writes its progress there too, so pass it on. */
  const pushed = spawnSync('git', push, { cwd: ROOT, stdio: ['inherit', 'inherit', 'pipe'], encoding: 'utf8' });
  process.stderr.write(pushed.stderr ?? '');
  if (pushed.status !== 0) {
    const { kind, why, fix } = classifyFailure(pushed.stderr ?? '', pushed.error);
    stop({ what: 'git push failed', why: kind === 'unknown' ? 'see the message from git above' : why, fix });
  }
}

const remote = git('config', '--get', 'remote.origin.url').out;
const url = pullRequestUrl(remote, branch.out);
console.log(
  url
    ? `\n  Open the pull request:\n  ${hyperlink(url, url)}\n`
    : `\n  ${c.gray}origin (${remote || 'none'}) is not on GitHub; open the pull request on its site.${c.reset}\n`,
);
