/* `node --test scripts/`: pack-local.mjs in a sandbox repository (a path with spaces) with a fake `pnpm` on PATH,
   so nothing is built or packed for real. */
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
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

/** Runs pack-local.mjs; the fake pnpm logs its arguments, creates the tarball, and exits 1 when FAIL_ON matches. */
function packLocal({ failOn = '' } = {}) {
  const sandbox = realpathSync(mkdtempSync(join(tmpdir(), 'pack-local ')));
  const repo = join(sandbox, 'my repo');
  const bin = join(sandbox, 'bin');
  mkdirSync(join(repo, 'scripts'), { recursive: true });
  mkdirSync(bin);
  copyFileSync(join(import.meta.dirname, 'pack-local.mjs'), join(repo, 'scripts', 'pack-local.mjs'));
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
  const result = spawnSync(process.execPath, [join(repo, 'scripts', 'pack-local.mjs')], {
    encoding: 'utf8',
    timeout: 20_000,
    env: { ...process.env, PATH: `${bin}:${process.env.PATH}`, LOG: log, FAIL_ON: failOn },
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
    packs.every((call) => call === `pack|--pack-destination|${run.out}/.partial|`),
    packs[0],
  );
  assert.match(run.stdout, /components-angular\.tgz/);
  assert.equal(existsSync(join(run.out, 'components-angular.tgz')), true);
  assert.equal(existsSync(join(run.out, '.partial')), false);
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

test('a failed build stops with exit 1 and leaves no half-filled .tarballs/', (t) => {
  const run = packLocal({ failOn: 'components-react run build' });
  t.after(run.cleanup);
  assert.equal(run.status, 1);
  assert.match(run.stderr, /@gemeente-tilburg\/components-react failed/);
  assert.equal(existsSync(run.out), false);
  assert.ok(!run.calls.some((call) => call.includes('web-components-stencil')), 'stopped at the first failure');
});

test('a failed pack stops with exit 1 and removes the tarballs packed before it', (t) => {
  const run = packLocal({ failOn: 'storybook-shared pack' });
  t.after(run.cleanup);
  assert.equal(run.status, 1);
  assert.match(run.stderr, /storybook-shared failed/);
  assert.equal(existsSync(run.out), false);
});
