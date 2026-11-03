/* `pnpm sync [--to bq-tlb-frontend|hltsamen|all]`: get this working copy of Tilburg into the repositories that use
   it, in one go. Builds and packs what each one needs, checks the tarballs, then runs the consumer's OWN sync (they
   know their lockfile and caches best) and ends with a table of what happened.

   - bq-tlb-frontend copies the `pack:dist` tarballs of components-angular and design-tokens, always together:
     components built against newer tokens lose their styling.
   - hltsamen installs everything from `.tarballs/` (`pnpm run pack:local`) and copies the stories.
   The consumers are expected next to this repository (../bq-tlb-frontend, ../hltsamen). */
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, realpathSync, statSync } from 'node:fs';
import { delimiter, resolve, sep } from 'node:path';
import { parseArgs } from 'node:util';
import { CONSUMERS, ROOT } from './dev-config.mjs';
import { c, capture, fail, installCrashHandler, printBanner, printCheckTable } from './lib/cli-utils.mjs';
import { confirmNoDevRunning, readDevLock, SYNC_LOCK, writeDevLock } from './lib/lock.mjs';
import { reportStepFailure, runStepWithRecovery } from './lib/recovery.mjs';

installCrashHandler('pnpm sync');
printBanner('Sync to consumers');

let wanted;
try {
  /* Strict: `--to=hltsamen`, `--to hltsamen` and a typo like `--too` are all read (or refused), never ignored. */
  wanted = parseArgs({ options: { to: { type: 'string', default: 'all' } } }).values.to;
} catch (err) {
  fail({ what: err.message, fix: 'pnpm sync   or   pnpm sync --to bq-tlb-frontend|hltsamen' });
  process.exit(1);
}
const known = CONSUMERS.map((consumer) => consumer.key);
if (wanted !== 'all' && !known.includes(wanted)) {
  fail({
    what: `Unknown consumer '${wanted}'`,
    fix: `pnpm sync --to ${known.join(' | ')} (or leave --to out for all)`,
  });
  process.exit(1);
}

const selected = CONSUMERS.filter((consumer) => wanted === 'all' || consumer.key === wanted);
/* A checkout reached through a symlink: ROOT is the real path, but the consumers may sit next to the link. */
const realpath = (dir) => {
  try {
    return realpathSync(dir);
  } catch {
    return null;
  }
};
const linkedRoot = [process.env.PWD, process.env.INIT_CWD].find(
  (dir) => dir && resolve(dir) !== ROOT && realpath(dir) === realpath(ROOT),
);
for (const consumer of selected) {
  const besideLink = linkedRoot && resolve(linkedRoot, '..', consumer.key);
  if (besideLink && !existsSync(consumer.dir) && existsSync(besideLink)) consumer.dir = besideLink;
}
const present = selected.filter((consumer) => existsSync(consumer.dir));
for (const consumer of selected.filter((consumer) => !present.includes(consumer))) {
  console.log(`  ${c.gray}–  ${consumer.key}: not found at ${consumer.dir}, skipped.${c.reset}`);
}
if (!present.length) {
  fail({
    what: 'No consumer repository found',
    why: `pnpm sync looks for ${selected.map((consumer) => `../${consumer.key}`).join(' and ')} next to this repository.`,
    fix: 'clone it next to tilburg, or copy the tarballs by hand (pnpm run pack:local writes them to .tarballs/)',
  });
  process.exit(1);
}

/** Run a step; on failure explain it and stop, since a half-packed set is worse than none. */
async function step(label, command, options) {
  try {
    await runStepWithRecovery(label, command, options);
  } catch (err) {
    reportStepFailure(label, err);
    process.exit(1);
  }
}

/** Does the tarball hold what the consumer will import? Catches a package packed without its build output. */
async function checkTarball(file, mustContain, what) {
  if (!existsSync(file)) {
    fail({ what: `${what}: no tarball at ${file}`, fix: 'see the build output above' });
    process.exit(1);
  }
  /* A version bump packs to another file name, so the old one would pass every check below. 2 s slack: FAT and exFAT
     keep mtimes in 2 s steps. */
  if (statSync(file).mtimeMs < packStartedAt - 2000) {
    fail({
      what: `${what}: the tarball at ${file} is stale`,
      why: 'it was not rewritten by the pack just now.',
      fix: 'see the pack output above, then pnpm sync again',
    });
    process.exit(1);
  }
  const { code, stdout, stderr } = await capture(`tar tzf "${file}"`, { timeoutMs: 30_000 });
  if (code !== 0) {
    fail({ what: `${what}: cannot read the tarball at ${file}`, why: stderr.trim(), fix: 'pnpm sync again' });
    process.exit(1);
  }
  if (!mustContain.test(stdout)) {
    fail({
      what: `${what}: the tarball is missing its build output`,
      why: `${file} has no file matching ${mustContain}. The package was probably packed before (or without) its build.`,
      fix: 'pnpm build, then pnpm sync again',
    });
    process.exit(1);
  }
}

/* Run from a git hook, GIT_DIR and friends point at tilburg and would override `git -C <consumer>`. */
const { GIT_DIR, GIT_INDEX_FILE, GIT_WORK_TREE, ...gitEnv } = process.env;

/* Before packing anything: does each consumer have the script we are about to call? An older checkout may not. */
const rows = [];
const usable = [];
for (const consumer of present) {
  let scripts = {};
  try {
    scripts = JSON.parse(readFileSync(resolve(consumer.dir, 'package.json'), 'utf8')).scripts ?? {};
  } catch (err) {
    rows.push({
      ok: false,
      label: consumer.key,
      detail: `cannot read its package.json (${err.code ?? err.message})`,
      note: consumer.dir,
    });
    continue;
  }
  const missingScripts = (consumer.requires ?? []).filter((name) => !scripts[name]);
  if (missingScripts.length) {
    rows.push({
      ok: false,
      label: consumer.key,
      detail: `has no ${missingScripts.map((name) => `"${name}"`).join(', ')} script`,
      note: `an older checkout? git pull in ${consumer.dir}`,
    });
    continue;
  }
  /* npm/pnpm would rewrite the lockfile into the merge, and "git restore" below would not be a clean way back. */
  const midway = ['MERGE_HEAD', 'REBASE_HEAD', 'CHERRY_PICK_HEAD'].find(
    (ref) => spawnSync('git', ['-C', consumer.dir, 'rev-parse', '-q', '--verify', ref], { env: gitEnv }).status === 0,
  );
  if (midway) {
    rows.push({
      ok: false,
      label: consumer.key,
      detail: `is in the middle of a ${{ MERGE_HEAD: 'merge', REBASE_HEAD: 'rebase', CHERRY_PICK_HEAD: 'cherry-pick' }[midway]}`,
      note: `finish or abort it first (git -C "${consumer.dir}" status)`,
    });
    continue;
  }
  usable.push(consumer);
}
if (!usable.length) {
  printCheckTable([{ title: 'Result', rows }]);
  process.exit(1);
}
/* Two syncs pack into the same dist/ and .tarballs/ folders: one would install what the other is still writing. */
const otherSync = readDevLock(SYNC_LOCK);
if (otherSync) {
  fail({
    what: `Another pnpm sync is running (process ${otherSync.pid}, since ${otherSync.started})`,
    why: 'two syncs at once rebuild the same tarballs, and a consumer could install one while it is being rewritten.',
    fix: 'wait for it to finish, then pnpm sync again',
  });
  process.exit(1);
}
writeDevLock({}, SYNC_LOCK);
if (!(await confirmNoDevRunning('pnpm sync rebuilds the packages it packs, and'))) process.exit(1);

// ─── Pack ────────────────────────────────────────────────────────────────────

/** Where `pnpm pack` writes each tarball: the name carries the version, so it changes with every release. */
const tarball = (dir) => {
  const { name, version } = JSON.parse(readFileSync(resolve(ROOT, dir, 'package.json'), 'utf8'));
  return resolve(ROOT, dir, 'dist', `${name.replace(/^@/, '').replace('/', '-')}-${version}.tgz`);
};
const PACKAGE_DIRS = {
  'components-angular': 'packages/components-angular',
  'design-tokens': 'proprietary/design-tokens',
};

const needs = new Set(usable.flatMap((consumer) => consumer.pack));
// Whole seconds: some file systems round mtimes down.
const packStartedAt = Math.floor(Date.now() / 1000) * 1000;

if (needs.has('components-angular')) {
  await step('Packing design-tokens', 'pnpm --filter @gemeente-tilburg/design-tokens run pack:dist', { cwd: ROOT });
  await step('Packing components-angular', 'pnpm --filter @gemeente-tilburg/components-angular run pack:dist', {
    cwd: ROOT,
  });
  await checkTarball(
    tarball(PACKAGE_DIRS['components-angular']),
    /package\/dist\/fesm2022\/.*\.mjs/,
    'components-angular',
  );
  await checkTarball(tarball(PACKAGE_DIRS['design-tokens']), /package\/dist\/tilburg\/theme\.css/, 'design-tokens');
}
if (needs.has('all')) {
  await step('Packing every package into .tarballs/', 'pnpm run pack:local', { cwd: ROOT });
}

// ─── Sync ────────────────────────────────────────────────────────────────────

/** `git status` of a consumer as Map(path → 'XY'), or null when git cannot tell (not a checkout). */
function gitChanges(dir) {
  const result = spawnSync('git', ['-C', dir, 'status', '--porcelain', '-z', '--untracked-files=all'], {
    encoding: 'utf8',
    env: gitEnv,
  });
  // ponytail: a rename entry's second (old) path shows up as its own odd entry; renames are not what a sync does.
  return result.status === 0
    ? new Map(
        result.stdout
          .split('\0')
          .filter(Boolean)
          .map((entry) => [entry.slice(3), entry.slice(0, 2)]),
      )
    : null;
}

/** After a failed or interrupted sync: which files did it change in the consumer, and how to put them back. */
function reportConsumerState(consumer, before) {
  const after = gitChanges(consumer.dir);
  if (!before || !after) {
    console.log(
      `  ${c.yellow}⚠${c.reset}  ${consumer.key} is not a git checkout, so what the sync changed is unknown.`,
    );
    return;
  }
  const changed = [...after.keys()].filter((path) => !before.has(path));
  const already = [...before.keys()];
  if (!changed.length) {
    console.log(`  ${consumer.key}: no files changed by this sync; git status is as before it started.`);
  } else {
    const tracked = changed.filter((path) => after.get(path) !== '??');
    const added = changed.filter((path) => after.get(path) === '??');
    const install = existsSync(resolve(consumer.dir, 'pnpm-lock.yaml')) ? 'pnpm install' : 'npm install';
    console.log(
      `  ${c.yellow}⚠${c.reset}  ${consumer.key} may be half-updated. Changed by this sync: ${changed.join(', ')}`,
    );
    /* A file you saved in the consumer while it synced looks changed by the sync too: look before restoring. */
    if (tracked.length) {
      console.log(`     Check first: git -C "${consumer.dir}" diff -- ${tracked.join(' ')}`);
      console.log(
        `     To undo: git -C "${consumer.dir}" restore -- ${tracked.join(' ')} && cd "${consumer.dir}" && ${install}`,
      );
    }
    if (added.length) console.log(`     New files (delete them to undo): ${added.join(', ')}`);
  }
  if (already.length) console.log(`     Already changed before this sync, left alone: ${already.join(', ')}`);
}

/* Ctrl-C (or a kill) mid-sync exits straight from the crash handler: say what state the consumer is in. */
let syncing = null;
process.on('exit', () => {
  if (syncing) reportConsumerState(syncing.consumer, syncing.before);
});

/**
 * The consumer's own environment: without what `pnpm run` set for tilburg (the lowercase npm_* and pnpm_* settings,
 * our node_modules/.bin first on PATH), which its npm install would otherwise take as its own. Plus where our
 * tarballs are, for a consumer that reads them from the environment.
 */
function consumerEnv(consumer) {
  const env = Object.fromEntries(Object.entries(process.env).filter(([key]) => !/^(npm|pnpm)_/.test(key)));
  const pathKey = Object.keys(env).find((key) => key.toUpperCase() === 'PATH') ?? 'PATH';
  env[pathKey] = (env[pathKey] ?? '')
    .split(delimiter)
    .filter((entry) => entry && entry !== ROOT && !entry.startsWith(`${ROOT}${sep}`))
    .join(delimiter);
  for (const [pack, variable] of Object.entries(consumer.tarballEnv ?? {})) env[variable] = tarball(PACKAGE_DIRS[pack]);
  return env;
}

for (const consumer of usable) {
  syncing = { consumer, before: gitChanges(consumer.dir) };
  try {
    await runStepWithRecovery(`Syncing ${consumer.key}`, consumer.sync, {
      cwd: consumer.dir,
      env: consumerEnv(consumer),
    });
    rows.push({
      ok: true,
      label: consumer.key,
      detail: 'up to date',
      note: `restart its dev server or Storybook to see the change`,
    });
  } catch (err) {
    reportStepFailure(`Syncing ${consumer.key} (${consumer.sync})`, err);
    rows.push({
      ok: false,
      label: consumer.key,
      detail: 'failed, see above',
      note: `cd ${consumer.dir} && ${consumer.sync}`,
    });
    reportConsumerState(consumer, syncing.before);
  }
  syncing = null;
}

console.log('');
const { failed } = printCheckTable([{ title: 'Result', rows }]);
process.exit(failed.length ? 1 : 0);
