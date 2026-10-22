/* `pnpm ship`: the checks before a push, then the push and the pull request link.
   Not on main, nothing uncommitted (or you say so), up to date with origin/main, `pnpm verify` passes. Then it shows
   the commits, asks, pushes this branch to origin/<same name> and prints the GitHub "open a pull request" link.

   --no-verify skips pnpm verify. --dry-run does everything but the push. --yes answers the questions; without a
   terminal it is the only way to push. */
import { spawnSync } from 'node:child_process';
import { parseArgs } from 'node:util';
import { ROOT } from './dev-config.mjs';
import { c, confirm, fail, hyperlink, installCrashHandler, printBanner } from './lib/cli-utils.mjs';
import { pullRequestUrl } from './lib/ship.mjs';

installCrashHandler('pnpm ship');

/** git in the repository. Never throws: { ok, out }. */
function git(...args) {
  const result = spawnSync('git', args, { cwd: ROOT, encoding: 'utf8' });
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

const branch = git('symbolic-ref', '--short', 'HEAD');
if (!branch.ok)
  stop({
    what: 'Not on a branch',
    why: 'HEAD is detached (or this is not a git repository)',
    fix: 'git switch -c <feature-branch>',
  });
if (['main', 'master'].includes(branch.out))
  stop({
    what: `You are on ${branch.out}`,
    why: 'work reaches main through a pull request, not a direct push',
    fix: 'git switch -c <feature-branch>',
  });
console.log(`  Branch  ${c.cyan}${branch.out}${c.reset}`);

const dirty = git('status', '--porcelain').out;
if (dirty) {
  console.log(`\n  ${c.yellow}Uncommitted changes (they will not be pushed):${c.reset}`);
  for (const line of dirty.split('\n')) console.log(`     ${line}`);
  if (!(await confirm('Continue anyway?', { default: false, fallback: args.yes })))
    stop({ what: 'Stopped: uncommitted changes', fix: 'commit or stash them, then pnpm ship again' });
}

/* Not fatal: offline, compare against what was fetched last. */
if (!git('fetch', '--quiet', 'origin', 'main').ok)
  console.log(`  ${c.gray}Could not fetch origin/main; comparing against the last fetch.${c.reset}`);

const upstream = git('rev-parse', '--abbrev-ref', '--symbolic-full-name', '@{u}');
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
  if (verify.status !== 0)
    stop({ what: 'Verify failed — not pushing', fix: 'fix what the table above says, or pnpm ship --no-verify' });
}

const commits = git('log', '--oneline', '--no-decorate', range).out;
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
  if (spawnSync('git', push, { cwd: ROOT, stdio: 'inherit' }).status !== 0)
    stop({ what: 'git push failed', why: 'see the message from git above' });
}

const remote = git('config', '--get', 'remote.origin.url').out;
const url = pullRequestUrl(remote, branch.out);
console.log(
  url
    ? `\n  Open the pull request:\n  ${hyperlink(url, url)}\n`
    : `\n  ${c.gray}origin (${remote || 'none'}) is not a host URL; no pull request link.${c.reset}\n`,
);
