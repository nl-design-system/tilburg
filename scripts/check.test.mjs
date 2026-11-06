/* `node --test scripts/`: pnpm check end to end, in a child process (its table would confuse node:test's reporter). */
import './lib/test-env.mjs';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { test } from 'node:test';
import { SCRIPTS } from './lib/test-fakes.mjs';

test('pnpm check prints every row without a check crashing', () => {
  const script = resolve(SCRIPTS, 'check.mjs');
  const { stdout, stderr } = spawnSync(process.execPath, [script], { encoding: 'utf8', timeout: 30_000 });
  for (const label of ['Node', 'pnpm', 'CPU', 'corepack', 'Disk space', 'Folder'])
    assert.match(stdout, new RegExp(label));
  assert.doesNotMatch(stdout + stderr, /the check crashed/);
});
