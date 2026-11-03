/* `node --test scripts/`: what `pnpm dev` makes of its watchers and Storybooks. The lifecycle tests run a copy of
   dev.mjs in a temp folder, with a dev-config whose "watchers" and "Storybooks" are tiny node scripts. */
import './lib/test-env.mjs';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import http from 'node:http';
import net from 'node:net';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { after, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { LIBRARIES, STORYBOOKS } from './dev-config.mjs';
import { isAlive } from './lib/lock.mjs';

const HERE = fileURLToPath(new URL('.', import.meta.url));

test('both Storybooks run without prompts or a browser of their own, reachable from the network', () => {
  for (const storybook of Object.values(STORYBOOKS)) {
    const command = storybook.command(6123);
    assert.match(command, /--port 6123\b/, storybook.name);
    assert.match(command, /--ci\b/, storybook.name);
    assert.match(command, /--host 0\.0\.0\.0\b/, storybook.name);
  }
});

/* Lines the watchers really print: [library key, line, 'done' | 'failed' | null]. */
const lines = [
  ['tokens', 'Build process finished!', 'done'],
  ['tokens', "Error: Reference doesn't exist: tries to reference color.x", 'failed'],
  ['tokens', 'Token: tlb-color has an unresolved reference: {x}', null],
  ['react', '✓ built in 2.31s', 'done'],
  ['react', 'error during build:', 'failed'],
  ['react', '[vite:esbuild] Transform failed with 1 error:', 'failed'],
  ['react', '(!) [plugin vite:reporter] dynamic import will not move module into another chunk', null],
  ['react', '[vite:css] [sass] Undefined variable.', 'failed'],
  ['react', '[vite:css] warning: nested CSS was detected', null],
  ['stencil', '[12:00.1]  build finished, watching for changes... in 5.21 s', 'done'],
  ['stencil', '[ ERROR ]  TypeScript: src/components/tooltip.tsx:3:1', 'failed'],
  ['wc-react', '[12:00:00] Found 0 errors. Watching for file changes.', 'done'],
  ['wc-react', '[12:00:00] Found 1 error. Watching for file changes.', 'failed'],
  ['wc-react', "src/index.ts(1,1): error TS2307: Cannot find module './components'.", 'failed'],
  ['angular', 'Built @gemeente-tilburg/components-angular', 'done'],
  ['angular', '✖ Compiling with Angular sources in partial compilation mode.', 'failed'],
  ['angular', 'WARNING: some deprecation', null],
];
for (const [key, line, expected] of lines) {
  test(`${key} watcher: "${line}" reads as ${expected ?? 'neither done nor failed'}`, () => {
    const library = LIBRARIES.find((entry) => entry.key === key);
    /* dev.mjs reads "Found 0 errors" as done even though `failed` would match it */
    const failed = library.failed.test(line) && !/Found 0 errors/.test(line);
    const done = !failed && library.done.test(line);
    assert.equal(failed ? 'failed' : done ? 'done' : null, expected);
  });
}

// ─── Lifecycle ───────────────────────────────────────────────────────────────

const temps = [];
after(() => temps.forEach((dir) => rmSync(dir, { recursive: true, force: true })));

async function freePort() {
  const server = net.createServer();
  await new Promise((done) => server.listen(0, '127.0.0.1', done));
  const { port } = server.address();
  await new Promise((done) => server.close(done));
  return port;
}

/**
 * A temp repo with a copy of dev.mjs and lib/, one library (no dist/) whose watcher runs `watcher`, and a React
 * Storybook that runs `storybook` (both node scripts; the Storybook gets its port as argv[2]).
 */
async function fakeRepo({
  watcher,
  storybook,
  nodeMajor = Number(process.versions.node.split('.')[0]),
  libraries = '',
}) {
  const root = mkdtempSync(join(tmpdir(), 'tilburg-dev-test-'));
  temps.push(root);
  mkdirSync(join(root, 'scripts/lib'), { recursive: true });
  mkdirSync(join(root, 'node_modules'), { recursive: true });
  writeFileSync(join(root, 'node_modules/.modules.yaml'), '');
  copyFileSync(join(HERE, 'dev.mjs'), join(root, 'scripts/dev.mjs'));
  for (const name of readdirSync(join(HERE, 'lib')).filter(
    (file) => file.endsWith('.mjs') && !file.endsWith('.test.mjs'),
  ))
    copyFileSync(join(HERE, 'lib', name), join(root, 'scripts/lib', name));
  writeFileSync(join(root, 'watcher.mjs'), watcher);
  writeFileSync(join(root, 'storybook.mjs'), storybook);
  const port = await freePort();
  writeFileSync(
    join(root, 'scripts/dev-config.mjs'),
    `export const ROOT = ${JSON.stringify(root)};
export const NODE_MAJOR = ${nodeMajor};
export const PNPM_VERSION = null;
export const CONSUMERS = [];
export const STORYBOOKS = {
  react: { name: 'React Storybook', port: ${port}, command: (port) => \`node storybook.mjs \${port}\` },
  angular: { name: 'Angular Storybook', port: ${port + 1}, command: () => 'node -e ""' },
};
export const LIBRARIES = [
  { key: 'react', name: 'components-react', dir: 'lib', src: ['src'], built: 'dist/index.js', watch: 'node watcher.mjs',
    keepsDist: true, done: /built in \\d/, failed: /Build failed/, for: ['react'] },${libraries}
];
`,
  );
  return root;
}

/** Run the copy of `pnpm dev react`; `whenOutput(text, child)` sees the output so far. Resolves { code, output }. */
function runDev(root, whenOutput = () => {}, env = {}, cwd = root, args = ['react']) {
  return new Promise((done, reject) => {
    /* TMPDIR: the lock file and the logs go to the temp repo, not the real ones */
    const child = spawn(process.execPath, [join(root, 'scripts/dev.mjs'), ...args], {
      cwd,
      env: { ...process.env, TMPDIR: root, CI: '1', ...env },
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let output = '';
    const onData = (data) => {
      output += data;
      whenOutput(output, child);
    };
    child.stdout.on('data', onData);
    child.stderr.on('data', onData);
    const timer = setTimeout(() => {
      child.kill('SIGKILL');
      reject(new Error(`pnpm dev did not stop in time:\n${output}`));
    }, 20_000);
    child.on('close', (code) => {
      clearTimeout(timer);
      done({ code, output });
    });
  });
}

/** Wait for a pid file to appear, then for that process to be gone (killed with its process group). */
async function watcherGone(root) {
  const file = join(root, 'watcher.pid');
  assert.ok(existsSync(file), 'the watcher started');
  const pid = Number(readFileSync(file, 'utf8'));
  for (let i = 0; i < 30 && isAlive(pid); i++) await new Promise((done) => setTimeout(done, 100));
  return !isAlive(pid);
}

const WATCHER = `import { writeFileSync } from 'node:fs';
writeFileSync('watcher.pid', String(process.pid));
console.log('Build failed: src/index.ts');
setInterval(() => {}, 1000);
`;

test('a Storybook that stops on its own stops pnpm dev with exit code 1, watchers included', async () => {
  const root = await fakeRepo({
    watcher: WATCHER,
    storybook: `console.log('Error: listen EADDRINUSE: address already in use :::' + process.argv[2]); process.exit(1);`,
  });
  const { code, output } = await runDev(root);
  assert.equal(code, 1, output);
  assert.match(output, /React Storybook stopped/);
  /* there is no dist/: do not promise a previous build */
  assert.match(output, /components-react did not build: it has no build yet/);
  assert.ok(await watcherGone(root), 'the watcher was stopped');
});

test('SIGINT once the Storybook answers (on 0.0.0.0) stops everything with exit code 0 and removes the lock', async () => {
  const root = await fakeRepo({
    watcher: WATCHER,
    storybook: `import http from 'node:http';
http.createServer((q, r) => r.end('{"entries":{"x":{}}}')).listen(Number(process.argv[2]), '0.0.0.0');`,
  });
  let sent = false;
  const { code, output } = await runDev(root, (text, child) => {
    if (!sent && /Watching\./.test(text)) {
      sent = true;
      child.kill('SIGINT');
    }
  });
  assert.equal(sent, true, output);
  assert.equal(code, 0, output);
  assert.ok(await watcherGone(root), 'the watcher was stopped');
  assert.deepEqual(
    readdirSync(root).filter((name) => name.startsWith('tilburg-dev-')),
    [],
    'the lock file is gone',
  );
});

test('a closed terminal (SIGHUP, output gone) still stops a watcher that ignores SIGTERM', async () => {
  const root = await fakeRepo({
    watcher: `import { writeFileSync } from 'node:fs';
writeFileSync('watcher.pid', String(process.pid));
process.on('SIGTERM', () => {});
console.log('built in 1s');
setInterval(() => {}, 1000);
`,
    storybook: `import http from 'node:http';
http.createServer((q, r) => r.end('{"entries":{"x":{}}}')).listen(Number(process.argv[2]), '0.0.0.0');`,
  });
  let sent = false;
  /* A pipe nobody reads any more fails every write, like a closed terminal does (EPIPE there, EIO here). */
  const { output } = await runDev(root, (text, child) => {
    if (!sent && /Watching\./.test(text)) {
      sent = true;
      child.stdout.destroy();
      child.stderr.destroy();
      child.kill('SIGHUP');
    }
  });
  assert.equal(sent, true, output);
  assert.ok(await watcherGone(root), 'the watcher was killed');
});

test('the wrong Node without nvm says to install it, not `nvm use`', async () => {
  const root = await fakeRepo({ watcher: WATCHER, storybook: '', nodeMajor: 1 });
  const { code, output } = await runDev(root, () => {}, { NVM_DIR: '' });
  assert.equal(code, 1, output);
  assert.match(output, /install Node 1 \(nvm is easiest/);
  assert.doesNotMatch(output, /Fix:\S*\s+\S*nvm use/);
});

test('a pnpm-lock.yaml that changes while pnpm dev runs (a git checkout) says to reinstall', async () => {
  const root = await fakeRepo({
    watcher: WATCHER,
    storybook: `import http from 'node:http';
http.createServer((q, r) => r.end('{"entries":{"x":{}}}')).listen(Number(process.argv[2]), '0.0.0.0');`,
  });
  mkdirSync(join(root, 'node_modules/.pnpm'));
  writeFileSync(join(root, 'node_modules/.pnpm/lock.yaml'), 'lockfileVersion: 9\n');
  writeFileSync(join(root, 'pnpm-lock.yaml'), 'lockfileVersion: 9\n');
  let changed = false;
  let sent = false;
  const { output } = await runDev(root, (text, child) => {
    if (!changed && /Watching\./.test(text)) {
      changed = true;
      /* after watchFile's first look, or the change is its starting point */
      setTimeout(() => writeFileSync(join(root, 'pnpm-lock.yaml'), 'lockfileVersion: 9\npackages: {}\n'), 1000);
    }
    if (!sent && /no longer matches node_modules/.test(text)) {
      sent = true;
      child.kill('SIGINT');
    }
  });
  assert.equal(sent, true, output);
  assert.match(output, /pnpm install/);
});

test('started from another folder, the design-tokens build still runs in the repository root', async () => {
  const root = await fakeRepo({
    watcher: WATCHER,
    storybook: 'process.exit(1);',
    libraries: `
  { key: 'tokens', name: 'design-tokens', dir: 'tokens', src: ['src'], built: 'dist/theme.css',
    build: 'node -e "require(\\'fs\\').writeFileSync(\\'built.txt\\', \\'\\')"', watch: 'node -e "setInterval(() => {}, 1000)"',
    done: /finished/, failed: /Error:/, for: ['react'] },`,
  });
  const elsewhere = join(root, 'elsewhere');
  mkdirSync(elsewhere);
  const { output } = await runDev(root, () => {}, {}, elsewhere);
  assert.ok(existsSync(join(root, 'built.txt')), output);
  assert.ok(!existsSync(join(elsewhere, 'built.txt')), 'not in the folder it was started from');
});

test('unknown flags and a second Storybook name stop pnpm dev with a clear message', async () => {
  const root = await fakeRepo({ watcher: WATCHER, storybook: '' });
  const flag = await runDev(root, () => {}, {}, root, ['--port', '7000']);
  assert.equal(flag.code, 1, flag.output);
  assert.match(flag.output, /Unknown option '--port'/);
  const two = await runDev(root, () => {}, {}, root, ['react', 'angular']);
  assert.equal(two.code, 1, two.output);
  assert.match(two.output, /One Storybook at a time, not react and angular/);
});

test('SIGTERM stops everything with exit code 143', async () => {
  const root = await fakeRepo({
    watcher: WATCHER,
    storybook: `import http from 'node:http';
http.createServer((q, r) => r.end('{"entries":{"x":{}}}')).listen(Number(process.argv[2]), '0.0.0.0');`,
  });
  let sent = false;
  const { code, output } = await runDev(root, (text, child) => {
    if (!sent && /Watching\./.test(text)) {
      sent = true;
      child.kill('SIGTERM');
    }
  });
  assert.equal(code, 143, output);
  assert.ok(await watcherGone(root), 'the watcher was stopped');
});

test('a port taken by another Storybook while the libraries built is not taken for ours', async () => {
  const root = await fakeRepo({ watcher: WATCHER, storybook: 'setInterval(() => {}, 1000);' });
  const port = Number(readFileSync(join(root, 'scripts/dev-config.mjs'), 'utf8').match(/port: (\d+)/)[1]);
  /* This test's process runs from another folder than the temp repo: not "ours". */
  let other;
  try {
    const { code, output } = await runDev(root, (text) => {
      if (!other && /Building 1 libraries/.test(text)) {
        other = http.createServer((q, r) => r.end('{"entries":{"x":{}}}')).listen(port, '0.0.0.0');
      }
    });
    assert.equal(code, 1, output);
    assert.match(output, new RegExp(`Port ${port} now serves a Storybook from`));
  } finally {
    other?.closeAllConnections();
    other?.close();
  }
});
