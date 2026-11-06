/* `node --test scripts/`: the install hooks, run on a copy of the scripts against a fake repo. preflight may only stop
   `pnpm install` for a wrong Node; welcome may never stop it. */
import './lib/test-env.mjs';
import assert from 'node:assert/strict';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { test } from 'node:test';
import { copyScripts, runScript, tempDir } from './lib/test-fakes.mjs';

const temp = tempDir('tilburg-preflight-test-');

const major = Number(process.versions.node.split('.')[0]);
let count = 0;

/** Run `script` in a fake repo; `files` are its root files (null leaves one out). */
function run(script, { files = {}, env = {}, detached = false } = {}) {
  const root = resolve(temp, `repo-${count++}`);
  copyScripts(root, script);
  const all = { 'package.json': JSON.stringify({ packageManager: 'pnpm@11.15.1' }), '.nvmrc': `${major}\n`, ...files };
  for (const [name, content] of Object.entries(all)) if (content !== null) writeFileSync(resolve(root, name), content);
  const { CI, npm_config_user_agent, TILBURG_QUIET, ...rest } = process.env;
  const result = runScript(resolve(root, 'scripts', script), [], {
    cwd: root,
    env: { ...rest, ...env },
    stdio: ['ignore', 'pipe', 'pipe'],
    detached,
  });
  return { status: result.status, output: result.output };
}

test('preflight: the right Node passes silently', () => {
  assert.deepEqual(run('preflight.mjs'), { status: 0, output: '' });
});

test('preflight: a wrong Node stops the install with exit 1 and the fix', () => {
  const { status, output } = run('preflight.mjs', { files: { '.nvmrc': `${major + 1}\n` } });
  assert.equal(status, 1);
  assert.match(output, new RegExp(`is not the Node this repo uses \\(${major + 1}\\)`));
  assert.match(output, /Fix:/);
});

for (const [name, files] of [
  ['an alias in .nvmrc', { '.nvmrc': 'lts/*\n' }],
  ['no .nvmrc', { '.nvmrc': null }],
  ['a broken package.json', { 'package.json': '{ not json' }],
  ['no package.json', { 'package.json': null }],
]) {
  test(`preflight: ${name} warns and lets the install carry on`, () => {
    const { status, output } = run('preflight.mjs', { files });
    assert.equal(status, 0);
    assert.match(output, /The preinstall check \(scripts\/preflight\.mjs\) could not run/);
  });
}

test('preflight: another pnpm than the pinned one warns outside CI, but passes', () => {
  const env = { npm_config_user_agent: 'pnpm/10.2.0 npm/? node/v24.0.0 darwin arm64' };
  const local = run('preflight.mjs', { env });
  assert.equal(local.status, 0);
  assert.match(local.output, /pnpm 10\.2\.0 is installing, but package\.json pins 11\.15\.1/);
  assert.deepEqual(run('preflight.mjs', { env: { ...env, CI: '1' } }), { status: 0, output: '' });
});

test('welcome: quiet and exit 0 in CI, inside the other scripts, and without a terminal', () => {
  assert.deepEqual(run('welcome.mjs', { env: { CI: '1' } }), { status: 0, output: '' });
  assert.deepEqual(run('welcome.mjs', { env: { TILBURG_QUIET: '1' } }), { status: 0, output: '' });
  /* detached: a new session, so there is no /dev/tty to open (and nothing reaches the terminal running the tests). */
  if (process.platform !== 'win32') assert.deepEqual(run('welcome.mjs', { detached: true }), { status: 0, output: '' });
});
