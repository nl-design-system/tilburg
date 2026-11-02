/* Every command a message tells someone to run must work: the `fix`, `note` and `why` texts in scripts/, and the
   FAILURES fixes and RECOVERIES labels in recovery.mjs (the CONTRIBUTING.md table is generated from those). Static:
   nothing here runs a step or a tool, except `git help -a` to list git's own commands. */
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { ROOT } from './dev-config.mjs';
import { FAILURES, RECOVERIES } from './lib/recovery.mjs';

const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
/* pnpm's own commands (and `pnpm changeset`, a bin it runs without a script). `setup` and `help` are left out on
   purpose: `pnpm help` is pnpm's help, not scripts/help.mjs. */
const BUILTINS = new Set(['audit', 'changeset', 'config', 'env', 'exec', 'install', 'pack', 'store', 'view']);
/* Words after "pnpm" / "git" / "nvm" in prose ("the pnpm that …", "git tools", "with nvm first"), not commands. */
const PNPM_PROSE = new Set(['in', 'that']);
const GIT_PROSE = new Set(['process', 'tools', 'touched']);

const sources = ['scripts', 'scripts/lib'].flatMap((dir) =>
  readdirSync(join(ROOT, dir))
    .filter((file) => file.endsWith('.mjs') && !file.endsWith('.test.mjs') && file !== 'recovery.mjs')
    .map((file) => `${dir}/${file}`),
);

/** The literal `fix:` / `note:` / `label:` strings (`why` is prose) in a source text, ${…} left as is. */
export function messageStrings(source) {
  return [...source.matchAll(/\b(?:fix|note|label):\s*(['`])((?:\\.|(?!\1)[^\\])*)\1/g)].map((match) => match[2]);
}

/** [{ name, run, flags }] for each `pnpm <name> --flag…` in a message. */
export function pnpmCommands(text) {
  return [...text.matchAll(/\bpnpm[ \t]+(run[ \t]+)?([a-z][\w:.-]*)((?:[ \t]+--?[a-z][\w-]*)*)/g)]
    .filter(([, run, name]) => !PNPM_PROSE.has(name) && (run || !BUILTINS.has(name)))
    .map(([, run, name, flags]) => ({ name, run: Boolean(run), flags: flags.trim().split(/\s+/).filter(Boolean) }));
}

test('messageStrings and pnpmCommands read messages, skip pnpm built-ins and code', () => {
  const source =
    "fail({ fix: 'pnpm logs --last, or pnpm install' }); const x = { note: `run ${cmd('pnpm check --fix')}` };";
  const commands = messageStrings(source).flatMap(pnpmCommands);
  assert.deepEqual(commands, [
    { name: 'logs', run: false, flags: ['--last'] },
    { name: 'check', run: false, flags: ['--fix'] },
  ]);
});

const messages = [
  ...sources.flatMap((file) =>
    messageStrings(readFileSync(join(ROOT, file), 'utf8')).map((text) => ({ where: file, text })),
  ),
  ...FAILURES.map(({ kind, fix }) => ({ where: `FAILURES ${kind}`, text: fix })),
  ...Object.entries(RECOVERIES).map(([kind, { label }]) => ({ where: `RECOVERIES ${kind}`, text: label })),
];

test('every pnpm script a message names exists in the root package.json', () => {
  const missing = messages.flatMap(({ where, text }) =>
    pnpmCommands(text)
      .filter(({ name }) => !(name in pkg.scripts))
      .map(({ name }) => `${where}: pnpm ${name}`),
  );
  assert.deepEqual(missing, []);
});

test('every flag a message passes to one of our scripts is one that script reads', () => {
  const unknown = messages.flatMap(({ where, text }) =>
    pnpmCommands(text).flatMap(({ name, flags }) => {
      const file = pkg.scripts[name]?.match(/^node (scripts\/\S+\.mjs)/)?.[1];
      if (!file) return [];
      const source = readFileSync(join(ROOT, file), 'utf8');
      return flags
        .filter((flag) => {
          const bare = flag.replace(/^--?/, '');
          /* argv.includes('--x') or a parseArgs option (`x:` or `'x':`). */
          return !source.includes(`'${flag}'`) && !new RegExp(`['\\s]${bare}'?:\\s*\\{`).test(source);
        })
        .map((flag) => `${where}: pnpm ${name} ${flag} (${file})`);
    }),
  );
  assert.deepEqual(unknown, []);
});

test('every node scripts/<file> a message names exists', () => {
  const texts = [...messages.map(({ text }) => text), ...Object.values(pkg.scripts)];
  const missing = texts
    .flatMap((text) => [...text.matchAll(/\bnode (scripts\/[\w./-]+\.mjs)/g)].map((match) => match[1]))
    .filter((file) => !existsSync(join(ROOT, file)));
  assert.deepEqual(missing, []);
});

test('every git subcommand a message names is one git has', () => {
  const known = new Set(
    spawnSync('git', ['help', '-a'], { encoding: 'utf8' })
      .stdout.split('\n')
      .map((line) => line.match(/^ {3}([a-z][\w-]*)/)?.[1])
      .filter(Boolean),
  );
  assert.ok(known.has('push'), 'git help -a lists the commands');
  const unknown = messages.flatMap(({ where, text }) =>
    [...text.matchAll(/\bgit ([a-z][\w-]*)/g)]
      .map((match) => match[1])
      .filter((sub) => !known.has(sub) && !GIT_PROSE.has(sub))
      .map((sub) => `${where}: git ${sub}`),
  );
  assert.deepEqual(unknown, []);
});

test('nvm and corepack are only told to do what they can', () => {
  const NVM = new Set(['install', 'use', 'alias', 'first']);
  const wrong = messages.flatMap(({ where, text }) => [
    ...[...text.matchAll(/\bnvm ([a-z]+)/g)].filter(([, sub]) => !NVM.has(sub)).map(([all]) => `${where}: ${all}`),
    ...[...text.matchAll(/\bcorepack ([a-z]+)/g)]
      .filter(([, sub]) => !['enable', 'is', 'refuses', 'then', 'reinstalls', 'cannot'].includes(sub))
      .map(([all]) => `${where}: ${all}`),
  ]);
  assert.deepEqual(wrong, []);
});

test('the files and settings the fixes point at exist', () => {
  const workspace = readFileSync(join(ROOT, 'pnpm-workspace.yaml'), 'utf8');
  for (const key of ['allowBuilds', 'minimumReleaseAge', 'minimumReleaseAgeExclude', 'overrides']) {
    assert.match(workspace, new RegExp(`^${key}:`, 'm'), `pnpm-workspace.yaml has ${key}`);
  }
  assert.match(readFileSync(join(ROOT, '.nvmrc'), 'utf8'), /^\d+\s*$/, '.nvmrc holds a major version');
  assert.ok(pkg.packageManager?.startsWith('pnpm@'), 'package.json "packageManager" pins pnpm');
  assert.ok(existsSync(join(ROOT, '.husky/pre-commit')), '.husky/pre-commit');
  assert.match(
    readFileSync(join(ROOT, 'scripts/pack-local.mjs'), 'utf8'),
    /'\.tarballs'/,
    'pack:local writes .tarballs/',
  );
  assert.match(
    readFileSync(join(ROOT, 'packages/web-components-stencil/package.json'), 'utf8'),
    /stencil test[^"]*--runInBand/,
    'jest-crash says the Stencil tests run with --runInBand',
  );
});

test('pnpm run clean:pick offers what the fixes say: the Angular caches, with sizes', () => {
  const clean = readFileSync(join(ROOT, 'scripts/clean.mjs'), 'utf8');
  assert.match(clean, /label: 'Angular caches'/);
  assert.match(clean, /execFile\)\('du'/);
});

/* Messages that were wrong once (found by this file, fixed in recovery.mjs and setup.mjs): kept right from now on. */
const fixOf = (kind) => FAILURES.find((failure) => failure.kind === kind);

test('heap: the manual fix reaches the next command', () => {
  assert.match(fixOf('heap').fix, /export NODE_OPTIONS=|NODE_OPTIONS=\S+ pnpm /);
});

test('no-space: ENOSPC from file watchers is a Linux (inotify) limit', () => {
  assert.doesNotMatch(fixOf('no-space').why, /macOS/);
});

test('push-rejected: the pull works on a branch without an upstream', () => {
  assert.match(fixOf('push-rejected').fix, /git pull --rebase origin /);
});

test('setup: with the wrong Node, the way back is node scripts/setup.mjs (pnpm may not run yet)', () => {
  const setup = readFileSync(join(ROOT, 'scripts/setup.mjs'), 'utf8');
  assert.doesNotMatch(setup, /fix: [`'][^`']*nvm (install|use)[^`']*then pnpm setup/);
});
