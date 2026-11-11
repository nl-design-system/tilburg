/* `pnpm run test:scripts`: pnpm parity must never report parity it did not check. Runs the script read-only against the
   repository, or against a copy of scripts/ in a temp dir with a table of our own. */
import './lib/test-env.mjs';
import assert from 'node:assert/strict';
import { cpSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { test } from 'node:test';
import { STATUS_FILE } from './lib/components.mjs';
import { runScript, SCRIPTS, tempDir, writeFile } from './lib/test-fakes.mjs';

const parity = (args, cwd = SCRIPTS, script = resolve(SCRIPTS, 'parity.mjs')) =>
  runScript(script, args, { cwd, env: { ...process.env, CI: '1' } });

/** A fake repository: scripts/ copied next to a package.json and the given implementation-status table. */
function fakeRepo(table) {
  const root = tempDir('tilburg-parity-');
  cpSync(SCRIPTS, resolve(root, 'scripts'), { recursive: true, filter: (path) => !path.includes('node_modules') });
  writeFileSync(resolve(root, 'package.json'), '{}');
  if (table !== undefined) writeFile(resolve(root, STATUS_FILE), table);
  return root;
}

test('a complete component passes (exit 0) and names its layers', () => {
  const { status, stdout, output } = parity(['tooltip']);
  assert.equal(status, 0, output);
  assert.match(stdout, /Tooltip\s+✓\s+✓\s+✓\s+✓/);
});

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
    const { status, stdout } = parity([], root, resolve(root, 'scripts/parity.mjs'));
    assert.equal(status, 1);
    assert.match(stdout, /No components found/);
  }
});

test('a promised layer without its files is a problem (exit 1), not parity', () => {
  const root = fakeRepo('| Component | HTML/CSS | React | Angular | Web Components |\n| Ghost | ✅ | ✅ | ✅ | ✅ |\n');
  const { status, stdout } = parity(['ghost'], root, resolve(root, 'scripts/parity.mjs'));
  assert.equal(status, 1);
  for (const path of [
    'components-css/ghost/index.scss',
    'components-react/src/Ghost.tsx',
    'components-angular/src/ghost/component.ts',
    'web-components-stencil/src/ghost/component.tsx',
  ])
    assert.ok(stdout.includes(`packages/${path} is missing`), path);
});

test('a near miss suggests a runnable command', () => {
  const { status, stdout } = parity(['tooltp']);
  assert.equal(status, 1);
  assert.match(stdout, /pnpm parity tooltip/);
});

test('a leftover folder without its main file is no orphan; a story without a row is', () => {
  const root = fakeRepo(
    '| Component | HTML/CSS | React | Angular | Web Components |\n| Real | utrecht | — | — | — |\n',
  );
  writeFile(resolve(root, 'packages/components-css/ghost/.DS_Store'), '');
  writeFile(resolve(root, 'packages/storybook/src/tilburg-ghost-react.stories.tsx'), '');
  const { stdout } = parity([], root, resolve(root, 'scripts/parity.mjs'));
  assert.doesNotMatch(stdout, /components-css\/ghost/);
  assert.match(stdout, /tilburg-ghost-react\.stories\.tsx, but/);
});
