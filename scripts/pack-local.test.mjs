/* `node --test scripts/`: pack-local.mjs in a sandbox repository (a path with spaces) with a fake `pnpm` on PATH,
   so nothing is built or packed for real. */
import './lib/test-env.mjs';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, realpathSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { lockName } from './lib/lock.mjs';
import {
  copyScripts,
  noSignals,
  prependPath,
  runScript,
  tempDir,
  tempEnv,
  writeFake,
  writeFile,
  writeLock,
} from './lib/test-fakes.mjs';

/** Runs pack-local.mjs; the fake pnpm logs its arguments, creates the tarball, and exits 1 when FAIL_ON matches. */
function packLocal({ failOn = '', previous = [], args = [], env = {}, before } = {}) {
  const sandbox = realpathSync(tempDir('pack-local '));
  const repo = join(sandbox, 'my repo');
  const bin = join(sandbox, 'bin');
  mkdirSync(bin);
  copyScripts(repo, 'pack-local.mjs');
  for (const file of previous) writeFile(join(repo, '.tarballs', file), 'previous');
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
  writeFake(
    bin,
    'pnpm',
    `#!/bin/sh
printf '%s|' "$@" >> "$LOG"; echo >> "$LOG"
case "$PWD $*" in *"$FAIL_ON"*) [ -n "$FAIL_ON" ] && exit 1;; esac
if [ "$1" = pack ]; then touch "$3/$(basename "$PWD").tgz"; fi
`,
  );
  const result = runScript(join(repo, 'scripts', 'pack-local.mjs'), args, {
    /* ...env last, as before: a caller's PATH would replace ours. */
    env: {
      ...prependPath({ ...process.env, LOG: log, FAIL_ON: failOn, ...tempEnv(join(sandbox, 'tmp')) }, bin),
      ...env,
    },
  });
  const calls = existsSync(log) ? readFileSync(log, 'utf8').trim().split('\n') : [];
  return {
    ...result,
    calls,
    out: join(repo, '.tarballs'),
  };
}

/* The pack destination, as the fake pnpm logs it: a Windows path has backslashes. */
const PARTIAL =
  process.platform === 'win32'
    ? /^pack\|--pack-destination\|.*\\\.partial-\d+\|$/
    : /^pack\|--pack-destination\|.*\/\.partial-\d+\|$/;

test('packs every package into .tarballs/, also when the repository path has spaces', () => {
  const run = packLocal();
  assert.equal(run.status, 0, run.stderr);
  const packs = run.calls.filter((call) => call.startsWith('pack|'));
  assert.equal(packs.length, 7);
  assert.ok(
    packs.every((call) => PARTIAL.test(call) && call.includes(run.out)),
    packs[0],
  );
  assert.match(run.stdout, /components-angular\.tgz/);
  assert.equal(existsSync(join(run.out, 'components-angular.tgz')), true);
  assert.deepEqual(
    readdirSync(run.out).filter((file) => file.startsWith('.partial')),
    [],
  );
});

test(
  'a run stopped half-way (Ctrl-C) leaves no tarball in .tarballs/ for a consumer to install',
  { skip: noSignals },
  async () => {
    /* A real signal mid-run: the dry run only sets up the sandbox, then a slow pnpm gives time to stop it. */
    const dry = packLocal({ failOn: 'design-tokens run build' });
    const repo = join(dry.out, '..');
    const bin = join(repo, '..', 'bin');
    writeFake(
      bin,
      'pnpm',
      `#!/bin/sh\nif [ "$1" = pack ]; then touch "$3/$(basename "$PWD").tgz"; echo packed >> "$LOG"; fi\nsleep 0.2\n`,
    );
    const log = join(repo, '..', 'slow.log');
    const child = spawn(process.execPath, [join(repo, 'scripts', 'pack-local.mjs')], {
      stdio: 'ignore',
      env: prependPath({ ...process.env, LOG: log }, bin),
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
  },
);

const tarballs = (out) => (existsSync(out) ? readdirSync(out).filter((file) => file.endsWith('.tgz')) : []);

test('a failed build stops with exit 1, adds no half set, and keeps the previous set for the consumers', () => {
  const run = packLocal({ failOn: 'components-react run build', previous: ['old.tgz'] });
  assert.equal(run.status, 1);
  assert.match(run.stderr, /@gemeente-tilburg\/components-react failed/);
  assert.deepEqual(tarballs(run.out), ['old.tgz']);
  assert.deepEqual(
    readdirSync(run.out).filter((file) => file.startsWith('.partial')),
    [],
  );
  assert.ok(!run.calls.some((call) => call.includes('web-components-stencil')), 'stopped at the first failure');
});

test('a failed pack stops with exit 1 and removes the tarballs packed before it', () => {
  const run = packLocal({ failOn: 'storybook-shared pack' });
  assert.equal(run.status, 1);
  assert.match(run.stderr, /storybook-shared failed/);
  assert.deepEqual(tarballs(run.out), []);
});

test('a complete run replaces the previous set', () => {
  const run = packLocal({ previous: ['gone.tgz'] });
  assert.equal(run.status, 0, run.stderr);
  assert.equal(tarballs(run.out).includes('gone.tgz'), false);
  assert.equal(tarballs(run.out).length, 7);
});

test('--help prints the usage and builds nothing; an unknown option is refused', () => {
  const help = packLocal({ args: ['--help'] });
  assert.equal(help.status, 0);
  assert.match(help.stdout, /pnpm pack:local/);
  assert.deepEqual(help.calls, []);
  const typo = packLocal({ args: ['--dry-run'] });
  assert.equal(typo.status, 1);
  assert.match(typo.stdout, /Unknown option '--dry-run'/);
  assert.deepEqual(typo.calls, []);
});

/** Writes the shared build lock as if `pid` held it, under the name lock.mjs gives it. */
const holdLock = (pid) => (repo, tmp) => writeLock(join(tmp, lockName(repo, 'sync')), { what: 'pnpm verify' }, pid);

test('while another build holds the lock (verify, sync), pack:local stops before building', () => {
  const run = packLocal({ before: holdLock(process.pid) });
  assert.equal(run.status, 1);
  assert.match(run.stdout, new RegExp(`pnpm verify is running \\(process ${process.pid}`));
  assert.deepEqual(run.calls, []);
});

test('started by the pnpm sync that holds the lock, pack:local goes ahead', () => {
  const run = packLocal({ before: holdLock(process.pid), env: { TILBURG_SYNC_PID: String(process.pid) } });
  assert.equal(run.status, 0, run.output);
});

test('dist/ is emptied before each build, so output from another branch is not packed', () => {
  const run = packLocal({
    before: (repo) => writeFile(join(repo, 'packages/storybook-shared/dist/gone.examples.js'), ''),
  });
  assert.equal(run.status, 0, run.stderr);
  assert.equal(existsSync(join(run.out, '..', 'packages/storybook-shared/dist/gone.examples.js')), false);
});
