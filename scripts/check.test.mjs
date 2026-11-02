/* `node --test scripts/`: pnpm check end to end, in a child process (its table would confuse node:test's reporter). */
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

test('pnpm check prints every row without a check crashing', () => {
  const script = resolve(fileURLToPath(new URL('.', import.meta.url)), 'check.mjs');
  const { stdout, stderr } = spawnSync(process.execPath, [script], { encoding: 'utf8', timeout: 30_000 });
  for (const label of ['Node', 'pnpm', 'CPU', 'corepack', 'Disk space', 'Folder'])
    assert.match(stdout, new RegExp(label));
  assert.doesNotMatch(stdout + stderr, /the check crashed/);
});
