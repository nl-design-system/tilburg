/* `node --test scripts/`: running tools, reading their output, and never hanging on them. */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';
import { capture, excerpt, newLogFile, runStep, stripAnsi } from './cli-utils.mjs';

test('excerpt keeps the error lines, in order and once, and leaves passing lines out', () => {
  const output = [
    'building module 1',
    '\x1b[31msrc/a.ts(1,1): error TS2304: Cannot find name x.\x1b[39m',
    'Found 0 errors.',
    '✓ renders an error-styled message',
    'src/a.ts(1,1): error TS2304: Cannot find name x.',
    'ERR_PNPM_RECURSIVE_RUN_FIRST_FAIL  build failed',
  ].join('\n');
  const { errors, last } = excerpt(output);
  assert.deepEqual(errors, [
    'src/a.ts(1,1): error TS2304: Cannot find name x.',
    'ERR_PNPM_RECURSIVE_RUN_FIRST_FAIL  build failed',
  ]);
  assert.equal(last.at(-1), 'ERR_PNPM_RECURSIVE_RUN_FIRST_FAIL  build failed');
});

test('excerpt caps a flood of errors and says how many more there are', () => {
  const output = Array.from({ length: 40 }, (_, index) => `error ${index}: broken`).join('\n');
  const { errors } = excerpt(output, { max: 5 });
  assert.equal(errors.length, 5);
  assert.match(errors.at(-1), /and 36 more/);
});

test('stripAnsi removes colours and hyperlinks', () => {
  assert.equal(stripAnsi('\x1b[1m\x1b]8;;https://x\x07link\x1b]8;;\x07\x1b[0m'), 'link');
});

test('runStep resolves on exit 0 and logs the output', async () => {
  await runStep('echo hello-from-step', { label: 'test ok' });
});

test('runStep rejects with the exit code, the output and a log file that holds everything', async () => {
  await assert.rejects(runStep('echo "error: it broke" >&2; exit 4', { label: 'test fail' }), (err) => {
    assert.equal(err.exitCode, 4);
    assert.match(err.output, /it broke/);
    assert.ok(err.log && existsSync(err.log));
    assert.match(readFileSync(err.log, 'utf8'), /it broke[\s\S]*# exit 4/);
    return true;
  });
});

test('runStep gives the tool no stdin: a question fails at once instead of waiting forever', async () => {
  const started = Date.now();
  await assert.rejects(runStep('read -r answer || exit 7', { label: 'test prompt' }), (err) => err.exitCode === 7);
  assert.ok(Date.now() - started < 5000);
});

test('runStep reports a folder that does not exist instead of throwing', async () => {
  await assert.rejects(runStep('true', { cwd: '/definitely/not/here', label: 'test cwd' }));
});

test('capture never rejects, and a timeout stops the whole command', async () => {
  const started = Date.now();
  const result = await capture('sleep 10', { timeoutMs: 300 });
  assert.equal(result.timedOut, true);
  assert.ok(Date.now() - started < 3000);
  assert.equal((await capture('exit 2')).code, 2);
});

test('newLogFile writes to the log folder', () => {
  const path = newLogFile('a label: with / odd characters!');
  assert.ok(path && existsSync(path));
  assert.match(path, /a-label-with-odd-characters\.log$/);
});

test('excerpt skips echoed commands and words that merely start with an e', () => {
  const output = [
    '$ npm-run-all --continue-on-error lint:** lint-workspaces',
    "$ stylelint --allow-empty-input '**/*.{css,scss}'",
    'Warning: React version was set to "detect" in eslint-plugin-react settings.',
    'PULL_REQUEST.md:1 error MD041/first-line-heading',
    'Error: spawn pnpm ENOENT',
  ].join('\n');
  assert.deepEqual(excerpt(output).errors, [
    'PULL_REQUEST.md:1 error MD041/first-line-heading',
    'Error: spawn pnpm ENOENT',
  ]);
});
