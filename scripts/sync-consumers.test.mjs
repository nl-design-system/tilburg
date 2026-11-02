/* `node --test scripts/`: sync-consumers.mjs in a sandbox. The scripts are copied into a temporary "tilburg" whose
   sibling consumers are fakes, and `pnpm`/`npm` on PATH are shell stubs: no real repository, build or install. */
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import {
  chmodSync,
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  realpathSync,
  rmSync,
  utimesSync,
  writeFileSync,
} from 'node:fs';
import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

const here = import.meta.dirname;

/* pack:dist writes a tarball per TARBALL: good (holds the build output), garbage (unreadable) or none. */
const fakePnpm = `#!/bin/sh
echo "pnpm $* @ $PWD" >> "$LOG"
case "$*" in
  *design-tokens*pack:dist*) d="$REPO/proprietary/design-tokens/dist"; f=gemeente-tilburg-design-tokens-0.0.1.tgz; inner=package/dist/tilburg/theme.css;;
  *components-angular*pack:dist*) d="$REPO/packages/components-angular/dist"; f=gemeente-tilburg-components-angular-0.0.0.tgz; inner=package/dist/fesm2022/x.mjs;;
  *) exit 0;;
esac
mkdir -p "$d"
case "$TARBALL" in
  none) ;;
  garbage) echo junk > "$d/$f";;
  *) w=$(mktemp -d); mkdir -p "$w/$(dirname "$inner")"; touch "$w/$inner"; tar czf "$d/$f" -C "$w" package; rm -rf "$w";;
esac
`;
const fakeNpm = `#!/bin/sh
echo "npm $* @ $PWD" >> "$LOG"
[ -n "$NPM_DO" ] && sh -c "$NPM_DO"
exit \${NPM_EXIT:-0}
`;

/**
 * Sets up the sandbox and runs `node scripts/sync-consumers.mjs ...args`. `consumers` maps a consumer key to the
 * text of its package.json (an object is stringified); a key left out has no folder at all.
 */
function sync(args = [], { consumers = {}, env = {}, before } = {}) {
  const sandbox = realpathSync(mkdtempSync(join(tmpdir(), 'sync consumers ')));
  const repo = join(sandbox, 'tilburg');
  const bin = join(sandbox, 'bin');
  mkdirSync(join(repo, 'scripts', 'lib'), { recursive: true });
  mkdirSync(bin);
  mkdirSync(join(sandbox, 'tmp'));
  for (const file of ['sync-consumers.mjs', 'dev-config.mjs']) cpSync(join(here, file), join(repo, 'scripts', file));
  cpSync(join(here, 'lib'), join(repo, 'scripts', 'lib'), { recursive: true });
  cpSync(join(here, '..', 'package.json'), join(repo, 'package.json'));
  for (const [key, pkg] of Object.entries(consumers)) {
    mkdirSync(join(sandbox, key));
    writeFileSync(join(sandbox, key, 'package.json'), typeof pkg === 'string' ? pkg : JSON.stringify(pkg));
  }
  writeFileSync(join(bin, 'pnpm'), fakePnpm);
  writeFileSync(join(bin, 'npm'), fakeNpm);
  chmodSync(join(bin, 'pnpm'), 0o755);
  chmodSync(join(bin, 'npm'), 0o755);
  before?.(repo);
  const log = join(sandbox, 'calls.log');
  const result = spawnSync(process.execPath, [join(repo, 'scripts', 'sync-consumers.mjs'), ...args], {
    cwd: sandbox,
    encoding: 'utf8',
    timeout: 30_000,
    env: {
      ...process.env,
      CI: '1',
      PATH: `${bin}:${process.env.PATH}`,
      TMPDIR: join(sandbox, 'tmp'),
      LOG: log,
      REPO: repo,
      ...env,
    },
  });
  const calls = existsSync(log) ? readFileSync(log, 'utf8').replaceAll(sandbox, '<sandbox>') : '';
  rmSync(sandbox, { recursive: true, force: true });
  return { ...result, output: result.stdout + result.stderr, calls };
}

const bq = { scripts: { 'sync:tilburg-nlds': 'x' } };
const hlt = { scripts: { 'sync-stories': 'x' } };
const old = new Date(Date.now() - 3_600_000);

test('an unknown --to stops with exit 1 and names the choices', () => {
  const run = sync(['--to', 'nope']);
  assert.equal(run.status, 1);
  assert.match(run.output, /Unknown consumer 'nope'/);
  assert.match(run.output, /bq-tlb-frontend \| hltsamen/);
});

test('no consumer folder next to the repository: exit 1, nothing packed', () => {
  const run = sync();
  assert.equal(run.status, 1);
  assert.match(run.output, /not found at .*bq-tlb-frontend, skipped/);
  assert.match(run.output, /No consumer repository found/);
  assert.equal(run.calls, '');
});

test('consumers without the script, or with a broken package.json, are reported in the table, not a crash', () => {
  const run = sync([], { consumers: { 'bq-tlb-frontend': { scripts: {} }, hltsamen: '{ not json' } });
  assert.equal(run.status, 1);
  assert.doesNotMatch(run.output, /unexpected error|ReferenceError/);
  assert.match(run.output, /bq-tlb-frontend\s+has no "sync:tilburg-nlds" script/);
  assert.match(run.output, /hltsamen\s+cannot read its package.json/);
  assert.equal(run.calls, '', 'nothing packed or synced');
});

test('a consumer that failed the script check is not synced; the other one still is', () => {
  const run = sync([], { consumers: { 'bq-tlb-frontend': { scripts: {} }, hltsamen: hlt } });
  assert.equal(run.status, 1);
  assert.match(run.calls, /pnpm run pack:local @ <sandbox>\/tilburg/);
  assert.match(run.calls, /pnpm run sync-stories @ <sandbox>\/hltsamen/);
  assert.doesNotMatch(run.calls, /npm run sync:tilburg-nlds/);
  assert.doesNotMatch(run.calls, /pack:dist/, 'bq-tlb-frontend is not usable, so its tarballs are not packed');
});

test('all consumers synced: exit 0', () => {
  const run = sync([], { consumers: { 'bq-tlb-frontend': bq, hltsamen: hlt } });
  assert.equal(run.status, 0, run.output);
  assert.match(run.calls, /npm run sync:tilburg-nlds @ <sandbox>\/bq-tlb-frontend/);
  assert.match(run.output, /✅\s+bq-tlb-frontend\s+up to date/);
  assert.match(run.output, /✅\s+hltsamen\s+up to date/);
});

test('one consumer of two fails its sync: the other is still synced, the table shows both, exit 1', () => {
  const run = sync([], { consumers: { 'bq-tlb-frontend': bq, hltsamen: hlt }, env: { NPM_EXIT: '1' } });
  assert.equal(run.status, 1);
  assert.match(run.output, /❌\s+bq-tlb-frontend\s+failed, see above/);
  assert.match(run.output, /✅\s+hltsamen\s+up to date/);
});

test('a pack that wrote no tarball stops before any consumer is touched', () => {
  const run = sync(['--to', 'bq-tlb-frontend'], { consumers: { 'bq-tlb-frontend': bq }, env: { TARBALL: 'none' } });
  assert.equal(run.status, 1);
  assert.match(run.output, /components-angular: no tarball at/);
  assert.doesNotMatch(run.calls, /npm run/);
});

test('a stale tarball from an earlier pack is refused', () => {
  const run = sync(['--to', 'bq-tlb-frontend'], {
    consumers: { 'bq-tlb-frontend': bq },
    env: { TARBALL: 'none' },
    before: (repo) => {
      const dir = join(repo, 'packages/components-angular/dist');
      mkdirSync(dir, { recursive: true });
      writeFileSync(join(dir, 'gemeente-tilburg-components-angular-0.0.0.tgz'), '');
      utimesSync(join(dir, 'gemeente-tilburg-components-angular-0.0.0.tgz'), old, old);
    },
  });
  assert.equal(run.status, 1);
  assert.match(run.output, /components-angular: the tarball at .* is stale/);
  assert.doesNotMatch(run.calls, /npm run/);
});

test('an unreadable tarball is reported as unreadable, not as missing its build output', () => {
  const run = sync(['--to', 'bq-tlb-frontend'], { consumers: { 'bq-tlb-frontend': bq }, env: { TARBALL: 'garbage' } });
  assert.equal(run.status, 1);
  assert.match(run.output, /components-angular: cannot read the tarball/);
  assert.doesNotMatch(run.calls, /npm run/);
});

/** Makes `dir` a git checkout with one commit of everything in it. */
function gitInit(dir) {
  const git = (...args) => execFileSync('git', ['-c', 'user.name=t', '-c', 'user.email=t@t', ...args], { cwd: dir });
  git('init', '-q', '-b', 'main');
  git('add', '.');
  git('commit', '-qm', 'init');
  return git;
}

test('a consumer in the middle of a merge is not synced, and the table says so', () => {
  const run = sync([], {
    consumers: { 'bq-tlb-frontend': bq, hltsamen: hlt },
    before: (repo) => {
      const dir = join(repo, '..', 'bq-tlb-frontend');
      const git = gitInit(dir);
      git('checkout', '-qb', 'other');
      writeFileSync(join(dir, 'a.txt'), 'other');
      git('add', '.');
      git('commit', '-qm', 'other');
      git('checkout', '-q', 'main');
      writeFileSync(join(dir, 'a.txt'), 'main');
      git('add', '.');
      git('commit', '-qm', 'main');
      assert.throws(() => git('merge', '-q', 'other'), 'a real conflict leaves MERGE_HEAD');
    },
  });
  assert.equal(run.status, 1);
  assert.match(run.output, /bq-tlb-frontend\s+is in the middle of a merge/);
  assert.doesNotMatch(run.calls, /npm run sync:tilburg-nlds/);
  assert.match(run.calls, /pnpm run sync-stories @ <sandbox>\/hltsamen/);
});

test('a second pnpm sync while one is running stops before packing anything', () => {
  const run = sync([], {
    consumers: { hltsamen: hlt },
    before: (repo) => {
      const hash = createHash('sha1').update(repo).digest('hex').slice(0, 10);
      const lock = { pid: process.pid, started: 'earlier' };
      writeFileSync(join(repo, '..', 'tmp', `tilburg-sync-${hash}.json`), JSON.stringify(lock));
    },
  });
  assert.equal(run.status, 1);
  assert.match(run.output, new RegExp(`Another pnpm sync is running \\(process ${process.pid}`));
  assert.equal(run.calls, '');
});

test('a consumer sync that fails half-way: the files it changed are listed with how to undo them', () => {
  const run = sync(['--to', 'bq-tlb-frontend'], {
    consumers: { 'bq-tlb-frontend': bq },
    env: { NPM_EXIT: '1', NPM_DO: 'echo changed > package-lock.json; mkdir -p nlds; echo x > nlds/new.tgz' },
    before: (repo) => {
      const dir = join(repo, '..', 'bq-tlb-frontend');
      writeFileSync(join(dir, 'package-lock.json'), '{}');
      gitInit(dir);
      writeFileSync(join(dir, 'package.json'), JSON.stringify({ ...bq, mine: 'uncommitted' }));
    },
  });
  assert.equal(run.status, 1);
  assert.match(
    run.output,
    /bq-tlb-frontend may be half-updated\. Changed by this sync: package-lock\.json, nlds\/new\.tgz/,
  );
  assert.match(run.output, /To undo: git -C ".*bq-tlb-frontend" restore -- package-lock\.json && cd .* && npm install/);
  assert.match(run.output, /New files \(delete them to undo\): nlds\/new\.tgz/);
  assert.match(run.output, /Already changed before this sync, left alone: package\.json/);
});

test('Ctrl-C during a consumer sync still says what that consumer was left with', () => {
  const run = sync(['--to', 'bq-tlb-frontend'], {
    consumers: { 'bq-tlb-frontend': bq },
    env: {
      /* Ctrl-C reaches the sync itself (the stub's ancestor; macOS pkill skips ancestors, so walk up by hand). */
      NPM_DO: `echo changed > package-lock.json; p=$PPID
        until ps -o command= -p $p | grep -qF "$REPO/scripts/sync-consumers.mjs"; do p=$(ps -o ppid= -p $p); done
        kill -INT $p; sleep 5`,
    },
    before: (repo) => {
      writeFileSync(join(repo, '..', 'bq-tlb-frontend', 'package-lock.json'), '{}');
      gitInit(join(repo, '..', 'bq-tlb-frontend'));
    },
  });
  assert.equal(run.status, 130, run.output);
  assert.match(run.output, /Stopped \(Ctrl-C\)/);
  assert.match(run.output, /bq-tlb-frontend may be half-updated\. Changed by this sync: package-lock\.json/);
});
