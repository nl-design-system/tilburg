/* `node --test scripts/`: sync-consumers.mjs in a sandbox. The scripts are copied into a temporary "tilburg" whose
   sibling consumers are fakes, and `pnpm`/`npm` on PATH are shell stubs: no real repository, build or install. */
import './lib/test-env.mjs';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  realpathSync,
  symlinkSync,
  utimesSync,
  writeFileSync,
} from 'node:fs';
import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test as nodeTest } from 'node:test';
import { lockName } from './lib/lock.mjs';
import { copyScripts, runScript, writeFake, writeLock } from './lib/test-fakes.mjs';

/* The fakes lean on POSIX: $PWD in the call log (the tests compare it with the sandbox path), tar -C with a drive
   letter, mktemp, and pkill for Ctrl-C. On Windows, pnpm pack:local and pnpm sync are checked by hand instead. */
const posixOnly = process.platform === 'win32' && 'the fakes need POSIX paths, tar and pkill';
const test = (name, options, fn) =>
  typeof options === 'function'
    ? nodeTest(name, { skip: posixOnly }, options)
    : nodeTest(name, { ...options, skip: posixOnly || options.skip }, fn);

const here = import.meta.dirname;

/* pack:dist writes a tarball per TARBALL: good (holds the build output), garbage (unreadable) or none. */
const fakePnpm = `#!/bin/sh
echo "pnpm $* @ $PWD\${TILBURG_REPO:+ repo=$TILBURG_REPO}" >> "$LOG"
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
 * text of its package.json (an object is stringified); a key left out has no folder at all. `env` may be a function
 * of the repo path.
 */
function sync(args = [], { consumers = {}, env = {}, before } = {}) {
  const sandbox = realpathSync(mkdtempSync(join(tmpdir(), 'sync consumers ')));
  const repo = join(sandbox, 'tilburg');
  const bin = join(sandbox, 'bin');
  mkdirSync(bin);
  mkdirSync(join(sandbox, 'tmp'));
  copyScripts(repo, 'sync-consumers.mjs');
  cpSync(join(here, '..', 'package.json'), join(repo, 'package.json'));
  /* The tarball names come from these versions. */
  for (const [dir, name, version] of [
    ['packages/components-angular', '@gemeente-tilburg/components-angular', '0.0.0'],
    ['proprietary/design-tokens', '@gemeente-tilburg/design-tokens', '0.0.1'],
  ]) {
    mkdirSync(join(repo, dir), { recursive: true });
    writeFileSync(join(repo, dir, 'package.json'), JSON.stringify({ name, version }));
  }
  for (const [key, pkg] of Object.entries(consumers)) {
    mkdirSync(join(sandbox, key));
    writeFileSync(join(sandbox, key, 'package.json'), typeof pkg === 'string' ? pkg : JSON.stringify(pkg));
  }
  writeFake(bin, 'pnpm', fakePnpm);
  writeFake(bin, 'npm', fakeNpm);
  before?.(repo);
  const log = join(sandbox, 'calls.log');
  const result = runScript(join(repo, 'scripts', 'sync-consumers.mjs'), args, {
    cwd: sandbox,
    timeout: 30_000,
    env: {
      ...process.env,
      CI: '1',
      PATH: `${bin}:${process.env.PATH}`,
      TMPDIR: join(sandbox, 'tmp'),
      LOG: log,
      REPO: repo,
      ...(typeof env === 'function' ? env(repo) : env),
    },
  });
  const calls = existsSync(log) ? readFileSync(log, 'utf8').replaceAll(sandbox, '<sandbox>') : '';
  return { ...result, calls };
}

const bq = { scripts: { 'sync:tilburg-nlds': 'x' } };
const hlt = { scripts: { 'sync-stories': 'x' } };
const old = new Date(Date.now() - 3_600_000);
/* The lock names carry the user (lock.mjs). */
const uid = process.getuid ? `${process.getuid()}-` : '';

test('an unknown --to stops with exit 1 and names the choices', () => {
  const run = sync(['--to', 'nope']);
  assert.equal(run.status, 1);
  assert.match(run.output, /Unknown consumer 'nope'/);
  assert.match(run.output, /pnpm sync --to bq-tlb-frontend   or   pnpm sync --to hltsamen/);
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
  /* By hand it needs the tarball paths too, or it installs the hard-coded 0.0.0 names. */
  assert.match(run.output, /TILBURG_NLDS_TARBALL=".*components-angular-0\.0\.0\.tgz"/);
  assert.match(run.output, /TILBURG_NLDS_TOKENS_TARBALL=/);
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
      writeLock(join(repo, '..', 'tmp', lockName(repo, 'sync')));
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
  assert.match(
    run.output,
    /To undo: git -C ".*bq-tlb-frontend" restore -- "package-lock\.json" && cd .* && npm install/,
  );
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

test('run from a git hook (GIT_DIR set to tilburg mid-merge), the consumer is still read as itself', () => {
  const run = sync(['--to', 'hltsamen'], {
    consumers: { hltsamen: hlt },
    before: (repo) => {
      gitInit(join(repo, '..', 'hltsamen'));
      const git = gitInit(repo);
      writeFileSync(join(repo, '.git', 'MERGE_HEAD'), git('rev-parse', 'HEAD'));
    },
    env: (repo) => ({ GIT_DIR: join(repo, '.git'), GIT_WORK_TREE: repo }),
  });
  assert.doesNotMatch(run.output, /in the middle of a merge/);
  assert.match(run.calls, /pnpm run sync-stories @ <sandbox>\/hltsamen/);
});

test('a checkout reached through a symlink finds the consumers next to the link', () => {
  const run = sync(['--to', 'hltsamen'], {
    before: (repo) => {
      const linked = join(repo, '..', 'code');
      mkdirSync(join(linked, 'hltsamen'), { recursive: true });
      writeFileSync(join(linked, 'hltsamen', 'package.json'), JSON.stringify(hlt));
      symlinkSync(repo, join(linked, 'tilburg'));
    },
    env: (repo) => ({ PWD: join(repo, '..', 'code', 'tilburg') }),
  });
  assert.doesNotMatch(run.output, /No consumer repository found/);
  assert.match(run.calls, /pnpm run sync-stories @ <sandbox>\/code\/hltsamen/);
});

/** hltsamen with one `file:` dependency on `<tilburg>/.tarballs/<file>`, written relative to its storybook package. */
const hltWith = (tilburg, file) => ({
  ...hlt,
  setup: (repo) => {
    const dir = join(repo, '..', 'hltsamen', 'packages', 'storybook');
    mkdirSync(dir, { recursive: true });
    writeFileSync(
      join(dir, 'package.json'),
      JSON.stringify({ dependencies: { x: `file:../../../${tilburg}/.tarballs/${file}` } }),
    );
  },
});

test("hltsamen installs from its tarballs only when they are this checkout's, and gets TILBURG_REPO", () => {
  const ok = hltWith('tilburg', 'x-1.0.0.tgz');
  const run = sync(['--to', 'hltsamen'], {
    consumers: { hltsamen: hlt },
    before: (repo) => {
      ok.setup(repo);
      mkdirSync(join(repo, '.tarballs'));
      writeFileSync(join(repo, '.tarballs', 'x-1.0.0.tgz'), '');
    },
  });
  assert.equal(run.status, 0, run.output);
  assert.match(run.calls, /pnpm run sync-stories @ <sandbox>\/hltsamen repo=<sandbox>\/tilburg/);
});

test('hltsamen whose file: dependencies point at another checkout is not synced', () => {
  const other = hltWith('tilburg-main', 'x-1.0.0.tgz');
  const run = sync(['--to', 'hltsamen'], { consumers: { hltsamen: hlt }, before: other.setup });
  assert.equal(run.status, 1);
  assert.match(run.output, /hltsamen\s+installs from .*tilburg-main\/\.tarballs, not from this checkout/);
  assert.equal(run.calls, '', 'nothing packed');
});

test('after a version bump, hltsamen naming a tarball .tarballs/ lacks is not synced, and the names are given', () => {
  const run = sync(['--to', 'hltsamen'], {
    consumers: { hltsamen: hlt },
    before: (repo) => {
      hltWith('tilburg', 'x-0.0.0.tgz').setup(repo);
      mkdirSync(join(repo, '.tarballs'));
      writeFileSync(join(repo, '.tarballs', 'x-0.1.0.tgz'), '');
    },
  });
  assert.equal(run.status, 1);
  assert.match(run.output, /name x-0\.0\.0\.tgz, which \.tarballs\/ does not have/);
  assert.match(run.output, /\.tarballs\/ has x-0\.1\.0\.tgz/);
  assert.doesNotMatch(run.calls, /sync-stories/);
});

test('a consumer in the middle of a bisect is not synced', () => {
  const run = sync(['--to', 'hltsamen'], {
    consumers: { hltsamen: hlt },
    before: (repo) => gitInit(join(repo, '..', 'hltsamen'))('bisect', 'start'),
  });
  assert.equal(run.status, 1);
  assert.match(run.output, /hltsamen\s+is in the middle of a bisect/);
  assert.doesNotMatch(run.calls, /sync-stories/);
});

test('a consumer another checkout is syncing right now is left alone', () => {
  const run = sync(['--to', 'hltsamen'], {
    consumers: { hltsamen: hlt },
    before: (repo) => {
      const dir = realpathSync(join(repo, '..', 'hltsamen'));
      const hash = createHash('sha1').update(dir).digest('hex').slice(0, 10);
      writeLock(join(repo, '..', 'tmp', `tilburg-sync-${uid}to-${hash}.json`));
    },
  });
  assert.equal(run.status, 1);
  assert.match(run.output, /Another pnpm sync is syncing hltsamen/);
  assert.equal(run.calls, '');
});
