/* `pnpm run test:scripts`: pnpm parity must never report parity it did not check. Runs the script read-only against the
   repository, or against a copy of scripts/ in a temp dir with a table of our own. */
import './lib/test-env.mjs';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cpSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, resolve } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { STATUS_FILE } from './lib/components.mjs';

const SCRIPTS = dirname(fileURLToPath(import.meta.url));
const parity = (args, cwd = SCRIPTS, script = resolve(SCRIPTS, 'parity.mjs')) =>
  spawnSync(process.execPath, [script, ...args], {
    cwd,
    encoding: 'utf8',
    timeout: 20_000,
    env: { ...process.env, CI: '1' },
  });

/** A fake repository: scripts/ copied next to a package.json and the given implementation-status table. */
function fakeRepo(table) {
  const root = mkdtempSync(resolve(tmpdir(), 'tilburg-parity-'));
  cpSync(SCRIPTS, resolve(root, 'scripts'), { recursive: true, filter: (path) => !path.includes('node_modules') });
  writeFileSync(resolve(root, 'package.json'), '{}');
  if (table !== undefined) {
    mkdirSync(dirname(resolve(root, STATUS_FILE)), { recursive: true });
    writeFileSync(resolve(root, STATUS_FILE), table);
  }
  return root;
}

test('an unknown name exits 1 instead of "0 components, every layer is there"', () => {
  const { status, stdout } = parity(['no-such-component']);
  assert.equal(status, 1);
  assert.match(stdout, /No component matches "no-such-component"/);
  assert.doesNotMatch(stdout, /every layer the table promises is there/);
});

for (const args of [['PasswordInput'], ['password input'], ['password', 'input']]) {
  test(`pnpm parity ${JSON.stringify(args)} checks Password Input`, () => {
    const { stdout } = parity(args);
    assert.match(stdout, /Password Input/);
    assert.doesNotMatch(stdout, /No component matches/);
  });
}

test('a missing or empty table exits 1 with an explanation', () => {
  for (const table of [undefined, '# no table here\n']) {
    const root = fakeRepo(table);
    try {
      const { status, stdout } = parity([], root, resolve(root, 'scripts/parity.mjs'));
      assert.equal(status, 1);
      assert.match(stdout, /No components found/);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  }
});

test('a promised layer without its files is a problem (exit 1), not parity', () => {
  const root = fakeRepo('| Component | HTML/CSS | React | Angular | Web Components |\n| Ghost | ✅ | ✅ | ✅ | ✅ |\n');
  try {
    const { status, stdout } = parity(['ghost'], root, resolve(root, 'scripts/parity.mjs'));
    assert.equal(status, 1);
    for (const path of [
      'components-css/ghost/index.scss',
      'components-react/src/Ghost.tsx',
      'components-angular/src/ghost/component.ts',
      'web-components-stencil/src/ghost/component.tsx',
    ])
      assert.ok(stdout.includes(`packages/${path} is missing`), path);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
