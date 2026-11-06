/* Every entry point end to end in a sandbox copy of scripts/, with fake pnpm, git and corepack first on PATH that fail
   in scripted ways: exit 1 silently, hang, or die by SIGKILL. A run must stop with a non-zero exit and a clear
   message, never with a raw crash, never hang past Ctrl-C, and never leave a child running. The scripts run in child
   processes only: their output never reaches this file's stdout (see the Node 24 note in recovery.test.mjs). */
import './lib/test-env.mjs';
import assert from 'node:assert/strict';
import { execFileSync, spawn } from 'node:child_process';
import { cpSync, mkdirSync, mkdtempSync, readdirSync, statSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, relative, resolve } from 'node:path';
import { after, before, test } from 'node:test';
import { ROOT } from './dev-config.mjs';

/* The fakes put this in their command line, so a leftover one shows up in ps. */
const MARKER = `TLBCHAOS${process.pid}`;
const ENTRIES = {
  setup: ['setup.mjs'],
  check: ['check.mjs'],
  dev: ['dev.mjs'],
  test: ['test.mjs'],
  verify: ['verify.mjs'],
  ship: ['ship.mjs', '--dry-run'],
  sync: ['sync-consumers.mjs'],
  'clean:pick': ['clean.mjs', '--yes'],
  logs: ['logs.mjs'],
  where: ['where.mjs'],
  parity: ['parity.mjs'],
  commands: ['help.mjs'],
  menu: ['hub.mjs'],
};
/* These run pnpm or git; with every one of those failing, exit 0 would be a lie. */
const NEEDS_TOOLS = ['setup', 'check', 'dev', 'test', 'verify', 'ship', 'sync'];

let parent;
let base;

/** A repo copy with node_modules installed (stub) and, unless `lock` is false, a pnpm-lock.yaml. */
function sandbox(name, { installed = false, lock = true } = {}) {
  const root = join(parent, name);
  mkdirSync(root);
  for (const file of ['package.json', 'pnpm-workspace.yaml', '.nvmrc']) cpSync(resolve(ROOT, file), join(root, file));
  cpSync(resolve(ROOT, 'scripts'), join(root, 'scripts'), { recursive: true });
  /* Only the package.json files of packages/ and proprietary/: enough for the scripts to find the workspaces. */
  const walk = (dir) => {
    for (const entry of readdirSync(dir)) {
      if (['node_modules', 'dist'].includes(entry) || entry.startsWith('.')) continue;
      const path = join(dir, entry);
      if (statSync(path).isDirectory() && relative(ROOT, path).split('/').length < 4) walk(path);
      else if (entry === 'package.json') {
        mkdirSync(dirname(join(root, relative(ROOT, path))), { recursive: true });
        cpSync(path, join(root, relative(ROOT, path)));
      }
    }
  };
  for (const top of ['packages', 'proprietary']) walk(resolve(ROOT, top));
  if (installed) {
    mkdirSync(join(root, 'node_modules/.pnpm'), { recursive: true });
    writeFileSync(join(root, 'node_modules/.modules.yaml'), '');
    writeFileSync(join(root, 'node_modules/.pnpm/lock.yaml'), 'lockfileVersion: 9\n');
    if (lock) writeFileSync(join(root, 'pnpm-lock.yaml'), 'lockfileVersion: 9\n');
  }
  return root;
}

/** Run one entry; Ctrl-C (SIGINT to its process group, as a terminal does) after `ctrlC` ms. Never prints. */
function run(root, name, { env = base, cwd = root, ctrlC, limit = 25_000 } = {}) {
  const [file, ...args] = ENTRIES[name];
  const started = Date.now();
  const child = spawn(process.execPath, [join(root, 'scripts', file), ...args], {
    cwd,
    env,
    stdio: ['ignore', 'pipe', 'pipe'],
    detached: true,
  });
  let output = '';
  for (const stream of [child.stdout, child.stderr]) stream.on('data', (data) => (output += data));
  const signal = (sig) => {
    try {
      process.kill(-child.pid, sig);
    } catch {}
  };
  const timers = [setTimeout(() => signal('SIGKILL'), limit)];
  if (ctrlC) timers.push(setTimeout(() => signal('SIGINT'), ctrlC));
  return new Promise((resolvePromise) =>
    child.on('close', (code, sig) => {
      timers.forEach(clearTimeout);
      resolvePromise({ name, code, signal: sig, seconds: (Date.now() - started) / 1000, output });
    }),
  );
}

/** Fakes still running, killed so the next test starts clean. */
function orphans() {
  const found = execFileSync('ps', ['-axo', 'pid,command'], { encoding: 'utf8' })
    .split('\n')
    .filter((line) => line.includes(MARKER) && !line.includes('ps -axo'));
  if (found.length) execFileSync('pkill', ['-9', '-f', MARKER]);
  return found;
}

/* A crash the scripts did not catch: Node's own trace, or installCrashHandler's "unexpected error" report. */
const CRASH = /unexpected error|^\s+at .+:\d+:\d+\)?$/m;

/* Every test here is skipped on Windows, and so are the hooks: ps, pkill and a symlink to node are POSIX. */
const skip = process.platform === 'win32' && 'the fakes are shell scripts';

before(() => {
  if (skip) return;
  parent = mkdtempSync(join(tmpdir(), 'tilburg-chaos-'));
  const bin = join(parent, 'bin');
  mkdirSync(bin);
  const fake = `#!/bin/sh
case "$CHAOS_MODE" in
  hang) exec "${process.execPath}" -e 'setTimeout(() => {}, 1e9)' ${MARKER} ;;
  kill) kill -9 $$ ;;
esac
exit 1
`;
  for (const name of ['pnpm', 'git', 'corepack', 'npm', 'npx', 'tar', 'lsof'])
    writeFileSync(join(bin, name), fake, { mode: 0o755 });
  mkdirSync(join(parent, 'home'));
  mkdirSync(join(parent, 'tmp'));
  mkdirSync(join(parent, 'elsewhere'));
  mkdirSync(join(parent, 'onlynode'));
  symlinkSync(process.execPath, join(parent, 'onlynode', 'node'));
  /* HOME, TMPDIR (the logs and the dev lock) and NVM_DIR in the sandbox: nothing may touch the real machine. */
  base = {
    PATH: `${bin}:/usr/bin:/bin:/usr/sbin:/sbin:${dirname(process.execPath)}`,
    HOME: join(parent, 'home'),
    TMPDIR: join(parent, 'tmp'),
    NVM_DIR: join(parent, 'no-nvm'),
    CHAOS_MODE: 'fail',
  };
});

after(() => {
  if (skip) return;
  orphans();
});

for (const [condition, change] of Object.entries({
  'every tool exits 1 without output': {},
  'every tool is killed by SIGKILL': { env: { CHAOS_MODE: 'kill' } },
  'PATH holds only node': { env: { PATH: 'onlynode' } },
  'HOME is unset': { env: { HOME: undefined } },
  'the current directory is another folder': { cwd: 'elsewhere' },
})) {
  test(
    `${condition}: every entry stops with a clear message, no crash, nothing left running`,
    { skip, timeout: 60_000 },
    async () => {
      const root = sandbox(condition.replace(/\W+/g, '-'));
      const env = { ...base, ...change.env };
      if (env.PATH === 'onlynode') env.PATH = join(parent, 'onlynode');
      for (const key of Object.keys(env)) if (env[key] === undefined) delete env[key];
      const cwd = change.cwd ? join(parent, change.cwd) : root;
      const results = await Promise.all(
        Object.keys(ENTRIES)
          /* verify from another folder: its own test below. */
          .filter((name) => !(cwd !== root && name === 'verify'))
          .map((name) => run(root, name, { env, cwd })),
      );
      for (const result of results) {
        const where = `${result.name}:\n${result.output}`;
        assert.ok(result.seconds < 20, `took ${result.seconds} s: ${where}`);
        if (NEEDS_TOOLS.includes(result.name)) assert.notEqual(result.code, 0, `exit 0 after a failure: ${where}`);
        assert.equal(result.signal, null, where);
        assert.doesNotMatch(result.output, CRASH, where);
      }
      assert.deepEqual(orphans(), []);
    },
  );
}

test(
  'every tool hangs: Ctrl-C stops each entry at once and leaves no child behind',
  { skip, timeout: 60_000 },
  async () => {
    const root = sandbox('hang');
    const env = { ...base, CHAOS_MODE: 'hang' };
    /* ship: its own test below. */
    const names = ['setup', 'check', 'dev', 'test', 'verify'];
    const results = await Promise.all(names.map((name) => run(root, name, { env, ctrlC: 3000, limit: 15_000 })));
    for (const result of results) {
      assert.ok(result.seconds < 8, `${result.name} still ran ${result.seconds} s after Ctrl-C:\n${result.output}`);
      assert.doesNotMatch(result.output, CRASH, `${result.name}:\n${result.output}`);
    }
    assert.deepEqual(orphans(), []);
  },
);

test(
  'node_modules installed but pnpm-lock.yaml deleted: dev says what is wrong instead of crashing',
  { skip, timeout: 30_000 },
  async () => {
    const root = sandbox('no-lockfile', { installed: true, lock: false });
    for (const name of ['dev', 'check']) {
      const result = await run(root, name);
      assert.notEqual(result.code, 0);
      assert.doesNotMatch(result.output, /unexpected error|the check crashed/, `${name}:\n${result.output}`);
    }
  },
);

test(
  'ship: Ctrl-C while git fetch hangs stops ship, instead of running verify and exiting 0',
  { skip, timeout: 30_000 },
  async () => {
    const root = sandbox('ship');
    const bin = join(parent, 'ship-bin');
    mkdirSync(bin);
    const realGit = execFileSync('/bin/sh', ['-c', 'command -v git'], { encoding: 'utf8' }).trim();
    writeFileSync(
      join(bin, 'git'),
      `#!/bin/sh\ncase "$1" in fetch) exec "${process.execPath}" -e 'setTimeout(() => {}, 1e9)' ${MARKER} ;; esac\nexec "${realGit}" "$@"\n`,
      { mode: 0o755 },
    );
    writeFileSync(join(bin, 'pnpm'), '#!/bin/sh\necho VERIFY-RAN\nexit 0\n', { mode: 0o755 });
    const git = (...args) =>
      execFileSync(realGit, ['-c', 'user.email=a@b', '-c', 'user.name=a', ...args], { cwd: root, stdio: 'ignore' });
    git('init', '-q', '-b', 'feature');
    git('add', '-A');
    git('commit', '-q', '-m', 'x');
    git('remote', 'add', 'origin', 'https://example.invalid/x.git');
    const env = { ...base, PATH: `${bin}:/usr/bin:/bin:${dirname(process.execPath)}`, GIT_CONFIG_NOSYSTEM: '1' };
    const result = await run(root, 'ship', { env, ctrlC: 3000, limit: 15_000 });
    orphans();
    assert.doesNotMatch(result.output, /VERIFY-RAN/, result.output);
    assert.notEqual(result.code, 0, result.output);
  },
);

test(
  'verify started from another folder still runs its steps in the repository',
  { skip, timeout: 30_000 },
  async () => {
    const root = sandbox('elsewhere-verify');
    const result = await run(root, 'verify', { cwd: join(parent, 'elsewhere') });
    assert.notEqual(result.code, 0);
    assert.doesNotMatch(result.output, /Cannot find module|Fixing it automatically: pnpm install/, result.output);
  },
);
