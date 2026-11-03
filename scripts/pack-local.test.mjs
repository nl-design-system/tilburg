/* `node --test scripts/`: pack-local.mjs in a sandbox repository (a path with spaces) with a fake `pnpm` on PATH,
   so nothing is built or packed for real. */
import './lib/test-env.mjs';
import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import {
  chmodSync,
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  realpathSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

/** Runs pack-local.mjs; the fake pnpm logs its arguments, creates the tarball, and exits 1 when FAIL_ON matches. */
function packLocal({ failOn = '', previous = [], args = [], env = {}, before } = {}) {
  const sandbox = realpathSync(mkdtempSync(join(tmpdir(), 'pack-local ')));
  const repo = join(sandbox, 'my repo');
  const bin = join(sandbox, 'bin');
  mkdirSync(join(repo, 'scripts'), { recursive: true });
  mkdirSync(bin);
  copyFileSync(join(import.meta.dirname, 'pack-local.mjs'), join(repo, 'scripts', 'pack-local.mjs'));
  /* It asks lock.mjs whether pnpm dev is running (in this sandbox it is not). */
  copyFileSync(join(import.meta.dirname, 'dev-config.mjs'), join(repo, 'scripts', 'dev-config.mjs'));
  mkdirSync(join(repo, 'scripts', 'lib'));
  for (const file of readdirSync(join(import.meta.dirname, 'lib')).filter(
    (name) => name.endsWith('.mjs') && !name.endsWith('.test.mjs'),
  ))
    copyFileSync(join(import.meta.dirname, 'lib', file), join(repo, 'scripts', 'lib', file));
  for (const file of previous) {
    mkdirSync(join(repo, '.tarballs'), { recursive: true });
    writeFileSync(join(repo, '.tarballs', file), 'previous');
  }
  for (const dir of [
    'proprietary/design-tokens',
    'packages/components-css',
    'packages/components-react',
    'packages/web-components-stencil',
    'packages/web-components-react',
    'packages/components-angular',
    'packages/storybook-shared',
  ])
    mkdirSync(join(repo, dir), { recursive: true });
  mkdirSync(join(sandbox, 'tmp'));
  before?.(repo, join(sandbox, 'tmp'));
  const log = join(sandbox, 'pnpm.log');
  writeFileSync(
    join(bin, 'pnpm'),
    `#!/bin/sh
printf '%s|' "$@" >> "$LOG"; echo >> "$LOG"
case "$PWD $*" in *"$FAIL_ON"*) [ -n "$FAIL_ON" ] && exit 1;; esac
if [ "$1" = pack ]; then touch "$3/$(basename "$PWD").tgz"; fi
`,
  );
  chmodSync(join(bin, 'pnpm'), 0o755);
  const result = spawnSync(process.execPath, [join(repo, 'scripts', 'pack-local.mjs'), ...args], {
    encoding: 'utf8',
    timeout: 20_000,
    env: {
      ...process.env,
      PATH: `${bin}:${process.env.PATH}`,
      LOG: log,
      FAIL_ON: failOn,
      TMPDIR: join(sandbox, 'tmp'),
      ...env,
    },
  });
  const calls = existsSync(log) ? readFileSync(log, 'utf8').trim().split('\n') : [];
  return {
    ...result,
    calls,
    out: join(repo, '.tarballs'),
    cleanup: () => rmSync(sandbox, { recursive: true, force: true }),
  };
}

test('packs every package into .tarballs/, also when the repository path has spaces', (t) => {
  const run = packLocal();
  t.after(run.cleanup);
  assert.equal(run.status, 0, run.stderr);
  const packs = run.calls.filter((call) => call.startsWith('pack|'));
  assert.equal(packs.length, 7);
  assert.ok(
    packs.every((call) => /^pack\|--pack-destination\|.*\/\.partial-\d+\|$/.test(call) && call.includes(run.out)),
    packs[0],
  );
  assert.match(run.stdout, /components-angular\.tgz/);
  assert.equal(existsSync(join(run.out, 'components-angular.tgz')), true);
  assert.deepEqual(
    readdirSync(run.out).filter((file) => file.startsWith('.partial')),
    [],
  );
});

test('a run stopped half-way (Ctrl-C) leaves no tarball in .tarballs/ for a consumer to install', async (t) => {
  /* A real signal mid-run: the dry run only sets up the sandbox, then a slow pnpm gives time to stop it. */
  const dry = packLocal({ failOn: 'design-tokens run build' });
  t.after(dry.cleanup);
  const repo = join(dry.out, '..');
  const bin = join(repo, '..', 'bin');
  writeFileSync(
    join(bin, 'pnpm'),
    `#!/bin/sh\nif [ "$1" = pack ]; then touch "$3/$(basename "$PWD").tgz"; echo packed >> "$LOG"; fi\nsleep 0.2\n`,
  );
  const log = join(repo, '..', 'slow.log');
  const child = spawn(process.execPath, [join(repo, 'scripts', 'pack-local.mjs')], {
    stdio: 'ignore',
    env: { ...process.env, PATH: `${bin}:${process.env.PATH}`, LOG: log },
  });
  while (!(existsSync(log) && readFileSync(log, 'utf8').split('\n').length > 3))
    await new Promise((resolveWait) => setTimeout(resolveWait, 50));
  child.kill('SIGINT');
  await new Promise((resolveExit) => child.on('exit', resolveExit));
  assert.deepEqual(
    readdirSync(dry.out).filter((file) => file.endsWith('.tgz')),
    [],
    'the packed ones wait in .tarballs/.partial/',
  );
});

const tarballs = (out) => (existsSync(out) ? readdirSync(out).filter((file) => file.endsWith('.tgz')) : []);

test('a failed build stops with exit 1, adds no half set, and keeps the previous set for the consumers', (t) => {
  const run = packLocal({ failOn: 'components-react run build', previous: ['old.tgz'] });
  t.after(run.cleanup);
  assert.equal(run.status, 1);
  assert.match(run.stderr, /@gemeente-tilburg\/components-react failed/);
  assert.deepEqual(tarballs(run.out), ['old.tgz']);
  assert.deepEqual(
    readdirSync(run.out).filter((file) => file.startsWith('.partial')),
    [],
  );
  assert.ok(!run.calls.some((call) => call.includes('web-components-stencil')), 'stopped at the first failure');
});

test('a failed pack stops with exit 1 and removes the tarballs packed before it', (t) => {
  const run = packLocal({ failOn: 'storybook-shared pack' });
  t.after(run.cleanup);
  assert.equal(run.status, 1);
  assert.match(run.stderr, /storybook-shared failed/);
  assert.deepEqual(tarballs(run.out), []);
});

test('a complete run replaces the previous set', (t) => {
  const run = packLocal({ previous: ['gone.tgz'] });
  t.after(run.cleanup);
  assert.equal(run.status, 0, run.stderr);
  assert.equal(tarballs(run.out).includes('gone.tgz'), false);
  assert.equal(tarballs(run.out).length, 7);
});

test('--help prints the usage and builds nothing; an unknown option is refused', (t) => {
  const help = packLocal({ args: ['--help'] });
  t.after(help.cleanup);
  assert.equal(help.status, 0);
  assert.match(help.stdout, /pnpm pack:local/);
  assert.deepEqual(help.calls, []);
  const typo = packLocal({ args: ['--dry-run'] });
  t.after(typo.cleanup);
  assert.equal(typo.status, 1);
  assert.match(typo.stdout, /Unknown option '--dry-run'/);
  assert.deepEqual(typo.calls, []);
});

/** Writes the shared build lock as if `pid` held it; the name follows lock.mjs (user, then a hash of the repo). */
const holdLock = (pid) => (repo, tmp) => {
  const uid = process.getuid ? `${process.getuid()}-` : '';
  const hash = createHash('sha1').update(repo).digest('hex').slice(0, 10);
  writeFileSync(
    join(tmp, `tilburg-sync-${uid}${hash}.json`),
    JSON.stringify({ pid, started: new Date().toISOString(), what: 'pnpm verify' }),
  );
};

test('while another build holds the lock (verify, sync), pack:local stops before building', (t) => {
  const run = packLocal({ before: holdLock(process.pid) });
  t.after(run.cleanup);
  assert.equal(run.status, 1);
  assert.match(run.stdout, new RegExp(`pnpm verify is running \\(process ${process.pid}`));
  assert.deepEqual(run.calls, []);
});

test('started by the pnpm sync that holds the lock, pack:local goes ahead', (t) => {
  const run = packLocal({ before: holdLock(process.pid), env: { TILBURG_SYNC_PID: String(process.pid) } });
  t.after(run.cleanup);
  assert.equal(run.status, 0, run.stdout + run.stderr);
});

test('dist/ is emptied before each build, so output from another branch is not packed', (t) => {
  const run = packLocal({
    before: (repo) => {
      mkdirSync(join(repo, 'packages/storybook-shared/dist'));
      writeFileSync(join(repo, 'packages/storybook-shared/dist/gone.examples.js'), '');
    },
  });
  t.after(run.cleanup);
  assert.equal(run.status, 0, run.stderr);
  assert.equal(existsSync(join(run.out, '..', 'packages/storybook-shared/dist/gone.examples.js')), false);
});
