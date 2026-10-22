/* `pnpm run test:scripts`: pnpm logs reads runStep's log folder; pnpm ship's pull request link. */
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { after, test } from 'node:test';
import { pickLast, readLogs, tailLines } from './logs.mjs';
import { pullRequestUrl } from './ship.mjs';

const dir = mkdtempSync(join(tmpdir(), 'tilburg-logs-test-'));
after(() => rmSync(dir, { recursive: true, force: true }));

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
});

test('the tail keeps the last lines', () => {
  const path = join(dir, 'long.log');
  writeFileSync(path, `${Array.from({ length: 200 }, (_, i) => `line ${i}`).join('\n')}\n`);
  const lines = tailLines(path, 80);
  assert.equal(lines.length, 80);
  assert.equal(lines[0], 'line 120');
  assert.equal(lines.at(-1), 'line 199');
});

test('pull request URL from every remote form', () => {
  const expected = 'https://github.com/nl-design-system/tilburg/compare/main...feat/x?expand=1';
  for (const remote of [
    'https://github.com/nl-design-system/tilburg.git',
    'https://user:token@github.com/nl-design-system/tilburg',
    'git@github.com:nl-design-system/tilburg.git',
    'ssh://git@github.com:22/nl-design-system/tilburg.git',
  ])
    assert.equal(pullRequestUrl(remote, 'feat/x'), expected, remote);
  assert.equal(pullRequestUrl('/tmp/origin.git', 'b'), null);
});
