/* `pnpm sync [--to bq-tlb-frontend|hltsamen|all]`: get this working copy of Tilburg into the repositories that use
   it, in one go. Builds and packs what each one needs, checks the tarballs, then runs the consumer's OWN sync (they
   know their lockfile and caches best) and ends with a table of what happened.

   - bq-tlb-frontend copies the `pack:dist` tarballs of components-angular and design-tokens, always together:
     components built against newer tokens lose their styling.
   - hltsamen installs everything from `.tarballs/` (`pnpm run pack:local`) and copies the stories.
   The consumers are expected next to this repository (../bq-tlb-frontend, ../hltsamen). */
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, realpathSync, statSync } from 'node:fs';
import { basename, delimiter, dirname, resolve, sep } from 'node:path';
import { CONSUMERS, LIBRARIES, ROOT } from './dev-config.mjs';
import {
  c,
  capture,
  exitWith,
  installCrashHandler,
  parseArgsOrExit,
  printBanner,
  printCheckTable,
  readJson,
  tryOr,
  warn,
  warnRow,
} from './lib/cli-utils.mjs';
import { confirmNoDevRunningOrExit, readDevLock, SYNC_LOCK, takeBuildLock, writeDevLock } from './lib/lock.mjs';
/* A step that fails stops the sync: a half-packed set is worse than none. */
import { reportStepFailure, runStepOrExit as step, runStepWithRecovery } from './lib/recovery.mjs';
import { GIT_ENV, inProgress, treeState } from './lib/ship.mjs';

installCrashHandler('pnpm sync');
printBanner('Sync to consumers');

/* Strict: `--to=hltsamen`, `--to hltsamen` and a typo like `--too` are all read (or refused), never ignored. */
const wanted = parseArgsOrExit(
  { options: { to: { type: 'string', default: 'all' } } },
  'pnpm sync   or   pnpm sync --to bq-tlb-frontend|hltsamen',
).values.to.toLowerCase();
const known = CONSUMERS.map((consumer) => consumer.key);
if (wanted !== 'all' && !known.includes(wanted))
  exitWith({
    what: `Unknown consumer '${wanted}'`,
    fix: `${known.map((key) => `pnpm sync --to ${key}`).join('   or   ')}   (or leave --to out for all)`,
  });

const selected = CONSUMERS.filter((consumer) => wanted === 'all' || consumer.key === wanted);
/* A checkout reached through a symlink: ROOT is the real path, but the consumers may sit next to the link. */
const realpath = (dir) => tryOr(() => realpathSync(dir), null);
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
if (!present.length)
  exitWith({
    what: 'No consumer repository found',
    why: `pnpm sync looks for ${selected.map((consumer) => `../${consumer.key}`).join(' and ')} next to this repository.`,
    fix: 'clone it next to tilburg, or copy the tarballs by hand (pnpm run pack:local writes them to .tarballs/)',
  });

/** Does the tarball hold what the consumer will import? Catches a package packed without its build output. */
async function checkTarball(file, mustContain, what) {
  if (!existsSync(file)) exitWith({ what: `${what}: no tarball at ${file}`, fix: 'see the build output above' });
  /* A version bump packs to another file name, so the old one would pass every check below. 2 s slack: FAT and exFAT
     keep mtimes in 2 s steps. */
  if (statSync(file).mtimeMs < packStartedAt - 2000)
    exitWith({
      what: `${what}: the tarball at ${file} is stale`,
      why: 'it was not rewritten by the pack just now.',
      fix: 'see the pack output above, then pnpm sync again',
    });
  /* From its own folder: Git Bash's GNU tar reads the C: of a full Windows path as a remote host. */
  const { code, stdout, stderr } = await capture(`tar tzf "${basename(file)}"`, {
    cwd: dirname(file),
    timeoutMs: 30_000,
  });
  if (code !== 0)
    exitWith({ what: `${what}: cannot read the tarball at ${file}`, why: stderr.trim(), fix: 'pnpm sync again' });
  if (!mustContain.test(stdout))
    exitWith({
      what: `${what}: the tarball is missing its build output`,
      why: `${file} has no file matching ${mustContain}. The package was probably packed before (or without) its build.`,
      fix: 'pnpm build, then pnpm sync again',
    });
}

const gitIn =
  (dir) =>
  (...args) => {
    const result = spawnSync('git', ['-C', dir, ...args], { encoding: 'utf8', env: GIT_ENV });
    /* trimEnd: a porcelain entry such as " M file" starts with its own space. */
    return { ok: result.status === 0, out: (result.stdout ?? '').trimEnd() };
  };

/** The `.tarballs/` files a consumer installs (`file:…/.tarballs/x.tgz` in its package.json files), as full paths. */
function tarballSpecs(dir) {
  const manifests = [
    resolve(dir, 'package.json'),
    ...['packages', 'proprietary'].flatMap((group) =>
      tryOr(() => readdirSync(resolve(dir, group)), []).map((name) => resolve(dir, group, name, 'package.json')),
    ),
  ];
  return manifests.filter(existsSync).flatMap((manifest) => {
    const pkg = readJson(manifest);
    if (!pkg) return [];
    return Object.values({ ...pkg.dependencies, ...pkg.devDependencies, ...pkg.optionalDependencies })
      .filter((spec) => typeof spec === 'string' && /^file:.*\.tarballs\/[^/]+\.tgz$/.test(spec))
      .map((spec) => resolve(dirname(manifest), spec.slice('file:'.length)));
  });
}
/* Packing into .tarballs/ only helps a consumer whose file: dependencies point at this checkout's. */
const installsAll = (consumer) => consumer.pack.includes('all');

/* Before packing anything: does each consumer have the script we are about to call? An older checkout may not. */
const rows = [];
const refuse = (consumer, detail, note) => rows.push({ ok: false, label: consumer.key, detail, note });
const usable = [];
for (const consumer of present) {
  let scripts = {};
  try {
    scripts = JSON.parse(readFileSync(resolve(consumer.dir, 'package.json'), 'utf8')).scripts ?? {};
  } catch (err) {
    refuse(consumer, `cannot read its package.json (${err.code ?? err.message})`, consumer.dir);
    continue;
  }
  const missingScripts = (consumer.requires ?? []).filter((name) => !scripts[name]);
  if (missingScripts.length) {
    refuse(
      consumer,
      `has no ${missingScripts.map((name) => `"${name}"`).join(', ')} script`,
      `an older checkout? git pull in ${consumer.dir}`,
    );
    continue;
  }
  /* npm/pnpm would rewrite the lockfile into the merge (or a bisect's old commit), and the "git restore" below would
     be no clean way back. */
  const midway = inProgress(consumer.dir, gitIn(consumer.dir));
  if (midway) {
    refuse(
      consumer,
      `is in the middle of ${midway[1].toLowerCase()}`,
      `finish or abort it first, in ${consumer.dir}: ${midway[2]}`,
    );
    continue;
  }
  /* A worktree or second clone: the consumer would install the tarballs of the checkout its paths name, not ours. */
  const foreign = installsAll(consumer)
    ? tarballSpecs(consumer.dir).find((file) => realpath(dirname(dirname(file))) !== realpath(ROOT))
    : null;
  if (foreign) {
    refuse(
      consumer,
      `installs from ${dirname(foreign)}, not from this checkout`,
      `run pnpm sync from ${dirname(dirname(foreign))}, or point its file: dependencies at ${resolve(ROOT, '.tarballs')}`,
    );
    continue;
  }
  usable.push(consumer);
}
if (!usable.length) {
  printCheckTable([{ title: 'Result', rows }]);
  process.exit(1);
}
/* Two syncs pack into the same dist/ and .tarballs/ folders: one would install what the other is still writing. */
takeBuildLock('pnpm sync', (otherSync) => ({
  what: `Another ${otherSync.what ?? 'pnpm sync'} is running (process ${otherSync.pid}, since ${otherSync.started})`,
  why: 'two builds at once rebuild the same dist/ and tarballs, and a consumer could install one while it is being rewritten.',
  fix: 'wait for it to finish, then pnpm sync again',
}));
/* And one per consumer folder: a sync from another checkout (a worktree) would run its install in the same folder. */
for (const consumer of usable) {
  const hash = createHash('sha1').update(realpath(consumer.dir)).digest('hex').slice(0, 10);
  const lock = SYNC_LOCK.replace(/[0-9a-f]{10}\.json$/, `to-${hash}.json`);
  const other = readDevLock(lock);
  if (other || !writeDevLock({ what: 'pnpm sync' }, lock))
    exitWith({
      what: `Another pnpm sync is syncing ${consumer.key}${other ? ` (process ${other.pid}, since ${other.started})` : ''}`,
      why: 'probably from another checkout of tilburg; two installs at once in one folder break each other.',
      fix: 'wait for it to finish, then pnpm sync again',
    });
}
await confirmNoDevRunningOrExit('pnpm sync rebuilds the packages it packs, and');

/** Where `pnpm pack` writes each tarball: the name carries the version, so it changes with every release. */
const tarball = (pack) => {
  const { dir } = LIBRARIES.find((library) => library.name === pack);
  const { name, version } = JSON.parse(readFileSync(resolve(ROOT, dir, 'package.json'), 'utf8'));
  return resolve(ROOT, dir, 'dist', `${name.replace(/^@/, '').replace('/', '-')}-${version}.tgz`);
};

const needs = new Set(usable.flatMap((consumer) => consumer.pack));
const treeAtStart = await treeState(ROOT);
// Whole seconds: some file systems round mtimes down.
const packStartedAt = Math.floor(Date.now() / 1000) * 1000;

/* First: its builds empty dist/ (ng-packagr does too), where pack:dist puts the tarballs for bq-tlb-frontend. */
if (needs.has('all')) {
  /* TILBURG_SYNC_PID: pack:local takes the build lock too, but not against the sync that started it. */
  await step('Packing every package into .tarballs/', 'pnpm run pack:local', {
    cwd: ROOT,
    env: { ...process.env, TILBURG_SYNC_PID: String(process.pid) },
  });
}

if (needs.has('components-angular')) {
  await step('Packing design-tokens', 'pnpm --filter @gemeente-tilburg/design-tokens run pack:dist', { cwd: ROOT });
  await step('Packing components-angular', 'pnpm --filter @gemeente-tilburg/components-angular run pack:dist', {
    cwd: ROOT,
  });
  await checkTarball(tarball('components-angular'), /package\/dist\/fesm2022\/.*\.mjs/, 'components-angular');
  await checkTarball(tarball('design-tokens'), /package\/dist\/tilburg\/theme\.css/, 'design-tokens');
}
/* A version bump packs to new file names, and the consumer's file: dependencies still name the old ones. */
const blocked = new Set();
for (const consumer of usable.filter(installsAll)) {
  const missing = tarballSpecs(consumer.dir).filter((file) => !existsSync(file));
  if (!missing.length) continue;
  blocked.add(consumer);
  const packed = tryOr(() => readdirSync(resolve(ROOT, '.tarballs')), []).filter((file) => file.endsWith('.tgz'));
  refuse(
    consumer,
    `its package.json files name ${[...new Set(missing.map((file) => basename(file)))].join(', ')}, which .tarballs/ does not have`,
    `a version bump? .tarballs/ has ${packed.join(', ') || 'nothing'}: update those file: dependencies in ${consumer.dir}`,
  );
}

/** `git status` of a consumer as Map(path → 'XY'), or null when git cannot tell (not a checkout). */
function gitChanges(dir) {
  const { ok, out } = gitIn(dir)('status', '--porcelain', '-z', '--untracked-files=all');
  // ponytail: a rename entry's second (old) path shows up as its own odd entry; renames are not what a sync does.
  return ok
    ? new Map(
        out
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
    warn(`${consumer.key} is not a git checkout, so what the sync changed is unknown.`);
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
    warn(`${consumer.key} may be half-updated. Changed by this sync: ${changed.join(', ')}`);
    /* A file you saved in the consumer while it synced looks changed by the sync too: look before restoring. */
    if (tracked.length) {
      /* Quoted: a path with a space must paste as one argument. */
      const paths = tracked.map((path) => JSON.stringify(path)).join(' ');
      console.log(`     Check first: git -C "${consumer.dir}" diff -- ${paths}`);
      console.log(`     To undo: git -C "${consumer.dir}" restore -- ${paths} && cd "${consumer.dir}" && ${install}`);
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
 * our node_modules/.bin first on PATH), which its npm install would otherwise take as its own; plus where our
 * tarballs are, for a consumer that reads them from the environment.
 */
function consumerEnv(consumer) {
  const env = Object.fromEntries(Object.entries(process.env).filter(([key]) => !/^(npm|pnpm)_/.test(key)));
  const pathKey = Object.keys(env).find((key) => key.toUpperCase() === 'PATH') ?? 'PATH';
  env[pathKey] = (env[pathKey] ?? '')
    .split(delimiter)
    .filter((entry) => entry && entry !== ROOT && !entry.startsWith(`${ROOT}${sep}`))
    .join(delimiter);
  for (const [pack, variable] of Object.entries(consumer.tarballEnv ?? {})) env[variable] = tarball(pack);
  /* Where hltsamen's sync-stories copies the stories from (its default is ../tilburg, maybe another checkout). */
  if (installsAll(consumer)) env.TILBURG_REPO = ROOT;
  return env;
}

/** The consumer's sync to run by hand, with the variables it gets here: without them it falls back to old names. */
function manualSync(consumer) {
  const env = consumerEnv(consumer);
  const vars = [...Object.values(consumer.tarballEnv ?? {}), ...(installsAll(consumer) ? ['TILBURG_REPO'] : [])];
  /* Windows: PowerShell, its own terminal, has no `env` or `sh`, and 5.1 no `&&`. */
  if (process.platform === 'win32')
    return [
      `cd "${consumer.dir}"`,
      ...vars.map((variable) => `$env:${variable}="${env[variable]}"`),
      consumer.sync,
    ].join('; ');
  const command = vars.length
    ? `env ${vars.map((variable) => `${variable}="${env[variable]}"`).join(' ')} sh -c '${consumer.sync}'`
    : consumer.sync;
  return `cd "${consumer.dir}" && ${command}`;
}

for (const consumer of usable.filter((consumer) => !blocked.has(consumer))) {
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
    refuse(consumer, 'failed, see above', manualSync(consumer));
    reportConsumerState(consumer, syncing.before);
  }
  syncing = null;
}

const treeAtEnd = await treeState(ROOT);
if (treeAtStart && treeAtEnd && treeAtStart !== treeAtEnd)
  rows.push(
    warnRow(
      'the working tree changed while this ran',
      'a checkout, pull or stash meanwhile: the tarballs may mix two trees, so pnpm sync again',
      { label: 'tilburg' },
    ),
  );

console.log('');
const { failed } = printCheckTable([{ title: 'Result', rows }]);
process.exit(failed.length ? 1 : 0);
