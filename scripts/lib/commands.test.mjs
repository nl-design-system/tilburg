/* `node --test scripts/`: the command list behind `pnpm commands` and `pnpm menu` must match package.json. */
import './test-env.mjs';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { test } from 'node:test';
import { ROOT } from '../dev-config.mjs';
import { SECTIONS } from './commands.mjs';

const { scripts } = JSON.parse(readFileSync(resolve(ROOT, 'package.json'), 'utf8'));
const items = SECTIONS.flatMap((section) => section.items);

for (const { script } of items) {
  test(`pnpm ${script} is a script in package.json, and its node file exists`, () => {
    assert.ok(scripts[script], `package.json has no "${script}" script`);
    for (const [, file] of scripts[script].matchAll(/\bnode (scripts\/\S+\.mjs)/g)) {
      assert.ok(existsSync(resolve(ROOT, file)), `"${script}" runs ${file}, which does not exist`);
    }
  });
}

test('the menu can always run its own help and setup', () => {
  assert.ok(scripts.help, 'H in the menu runs pnpm run help');
  assert.ok(
    items.some(({ script }) => script === 'setup'),
    'the menu puts the cursor on setup after a fresh clone',
  );
});

test('every command is listed once, with a description', () => {
  const names = items.map(({ script }) => script);
  assert.deepEqual(names, [...new Set(names)]);
  for (const { script, what } of items) assert.ok(what, `${script} has no description`);
});
