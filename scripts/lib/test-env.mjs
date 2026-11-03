/* Loaded before every script test (`node --test --import`, see test:scripts in package.json). Each test process gets
   its own empty temp folder and an empty global git config, so the tests never prune the developer's real logs
   (tilburg-logs keeps only 40), never see a real pnpm dev lock, and do not depend on their git settings (signed
   commits, hooks, identity). Child processes the tests start inherit both. Every test file also imports it first, so
   `node --test scripts/lib/lock.test.mjs` on its own is just as isolated (a module runs once, whichever loads it). */
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const dir = mkdtempSync(join(tmpdir(), 'tilburg-test-env-'));
writeFileSync(join(dir, 'gitconfig'), '');
Object.assign(process.env, {
  TMPDIR: dir,
  TMP: dir,
  TEMP: dir,
  GIT_CONFIG_GLOBAL: join(dir, 'gitconfig'),
  GIT_CONFIG_NOSYSTEM: '1',
});
process.on('exit', () => rmSync(dir, { recursive: true, force: true }));
