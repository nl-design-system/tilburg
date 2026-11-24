/* `pnpm run test:scripts`: pnpm logs reads runStep's log folder. */
import './test-env.mjs';
import assert from 'node:assert/strict';
import { mkdirSync, symlinkSync, writeFileSync } from 'node:fs';
import { basename, join, resolve } from 'node:path';
import { test } from 'node:test';
import { LOG_DIR } from './cli-utils.mjs';
import { pickLast, readLogs, tailLines } from './logs.mjs';
import { runScript, tempDir, tempEnv } from './test-fakes.mjs';

const dir = tempDir('tilburg-logs-test-');

const log = (name, body) => writeFileSync(join(dir, name), body);
log('2026-10-19T10-00-00-lint.log', '$ pnpm run lint\n\nfine\n# exit 0\n');
log('2026-10-19T11-00-00-tests.log', '$ pnpm run test\n\nboom\n# exit 1\n');
log('2026-10-19T12-00-00-dev-react.log', '');
log('test-tooltip-React.json', '{}');

test('a missing folder is no logs', () => {
  assert.deepEqual(readLogs(join(dir, 'nope')), []);
});

test('logs newest first, with step name and exit status; other files are left out', () => {
  assert.deepEqual(
    readLogs(dir).map((entry) => [entry.step, entry.exit]),
    [
      ['dev-react', null],
      ['tests', '1'],
      ['lint', '0'],
    ],
  );
});

test('a log that vanishes while it is read (pruned by a step starting meanwhile) is skipped, not a crash', () => {
  const pruned = tempDir('tilburg-logs-pruned-');
  writeFileSync(join(pruned, '2026-10-19T10-00-00-lint.log'), '# exit 0\n');
  symlinkSync(join(pruned, 'gone'), join(pruned, '2026-10-19T11-00-00-gone.log'));
  assert.deepEqual(
    readLogs(pruned).map((entry) => entry.step),
    ['lint'],
  );
});

test('--last picks the newest failure, else the newest log', () => {
  assert.equal(pickLast(readLogs(dir)).step, 'tests');
  assert.equal(
    pickLast([
      { step: 'a', exit: '0' },
      { step: 'b', exit: '0' },
    ]).step,
    'a',
  );
  assert.equal(pickLast([]), null);
  /* A watcher pnpm dev stopped (q) is not a failure. */
  assert.equal(
    pickLast([
      { step: 'dev-tokens', exit: 'stopped' },
      { step: 'tests', exit: '1' },
    ]).step,
    'tests',
  );
});

test('the tail keeps the last lines', () => {
  const path = join(dir, 'long.log');
  writeFileSync(path, `${Array.from({ length: 200 }, (_, i) => `line ${i}`).join('\n')}\n`);
  const lines = tailLines(path, 80);
  assert.equal(lines.length, 80);
  assert.equal(lines[0], 'line 120');
  assert.equal(lines.at(-1), 'line 199');
});

/** `pnpm logs` itself, with its temp folder (TMPDIR; TEMP on Windows) pointing at ours, so LOG_DIR is ours. */
function logsCli(args, logs = {}) {
  const tmp = tempDir('tilburg-logs-cli-');
  const folder = join(tmp, basename(LOG_DIR));
  mkdirSync(folder);
  for (const [name, body] of Object.entries(logs)) writeFileSync(join(folder, name), body);
  return runScript(resolve(import.meta.dirname, '..', 'logs.mjs'), args, {
    timeout: 10_000,
    env: { ...process.env, ...tempEnv(tmp), CI: '1' },
  });
}

test('pnpm logs with an unknown option exits 1 and says how to call it', () => {
  const result = logsCli(['--lats']);
  assert.equal(result.status, 1);
  assert.match(result.output, /--lats/);
  assert.match(result.output, /pnpm logs --last/);
});

test('pnpm logs without logs says so and exits 0', () => {
  const result = logsCli([]);
  assert.equal(result.status, 0);
  assert.match(result.output, /No step logs yet/);
});

test('pnpm logs --last prints the end of the newest failure', () => {
  const result = logsCli(['--last'], {
    '2026-10-19T10-00-00-tests.log': '$ jest\n\nboom\n# exit 1\n',
    '2026-10-19T11-00-00-lint.log': '$ eslint\n\nfine\n# exit 0\n',
  });
  assert.equal(result.status, 0);
  assert.match(result.output, /tests {2}exit 1/);
  assert.match(result.output, /│ boom/);
});
