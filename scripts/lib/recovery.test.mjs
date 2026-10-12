/* `node --test scripts/`: the failure messages people actually hit, and what the scripts should make of them. */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { classifyFailure } from './recovery.mjs';

const cases = [
  ['node-version', 'Error [ERR_UNKNOWN_BUILTIN_MODULE]: No such built-in module: node:sqlite'],
  ['node-version', 'warn: This version of pnpm requires at least Node.js v22.13'],
  [
    'pnpm-version',
    'ERR_PNPM_BAD_PM_VERSION  This project is configured to use v11.15.1 of pnpm. Your current pnpm is v10.2.0',
  ],
  ['command-not-found', '/bin/sh: chokidar: command not found'],
  ['missing-script', '[ERR_PNPM_NO_SCRIPT] Missing script: sync-stories'],
  ['release-age', 'ERR_PNPM_NO_MATURE_MATCHING_VERSION  No matching version found for @angular/cli@20.3.38'],
  ['ignored-builds', '[ERR_PNPM_IGNORED_BUILDS] Ignored build scripts: esbuild'],
  ['outdated-lockfile', 'ERR_PNPM_OUTDATED_LOCKFILE  Cannot install with "frozen-lockfile"'],
  ['audit', '21 vulnerabilities found\nSeverity: 4 low | 10 moderate | 6 high | 1 critical'],
  [
    'jest-crash',
    'Test suite failed to run\n  A jest worker process (pid=123) was terminated by another process: signal=SIGSEGV',
  ],
  ['library-not-built', 'Failed to resolve entry for package "@gemeente-tilburg/components-react".'],
  ['dist-collision', "Error: EEXIST: file already exists, mkdir './dist/sb-manager'"],
  ['tests-failed', 'Tests:       1 failed, 155 passed, 156 total'],
  ['type-error', "src/Tooltip.tsx(3,1): error TS2304: Cannot find name 'foo'."],
  ['lint', 'PULL_REQUEST.md:1 error MD041/first-line-heading/first-line-h1'],
  ['heap', 'FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory'],
  ['port-in-use', 'Error: listen EADDRINUSE: address already in use :::6006'],
  ['integrity', 'ERR_PNPM_TARBALL_INTEGRITY  Got unexpected checksum'],
  ['network', 'request to https://registry.npmjs.org/x failed, reason: getaddrinfo ENOTFOUND registry.npmjs.org'],
];

for (const [kind, output] of cases) {
  test(`recognises ${kind}: ${output.split('\n')[0].slice(0, 60)}`, () => {
    const diagnosis = classifyFailure(output, { exitCode: 1 });
    assert.equal(diagnosis.kind, kind);
    assert.ok(diagnosis.why, 'says why');
  });
}

test('a step that fails without saying anything is called out as such, with the command to rerun', () => {
  const diagnosis = classifyFailure('', { exitCode: 3, command: 'exit 3' });
  assert.equal(diagnosis.kind, 'silent');
  assert.match(diagnosis.fix, /exit 3/);
});

test('a program that cannot start is a spawn failure, not an unknown one', () => {
  const err = Object.assign(new Error('spawn pnpm ENOENT'), { code: 'ENOENT', syscall: 'spawn', path: 'pnpm' });
  assert.equal(classifyFailure('', err).kind, 'spawn');
});

test('anything else is unknown, and the report then shows what the tool said', () => {
  assert.equal(classifyFailure('something went sideways', { exitCode: 1 }).kind, 'unknown');
});

test('"0 errors" in passing output is not mistaken for a type error', () => {
  assert.notEqual(classifyFailure('Found 0 errors. Watching for file changes.', { exitCode: 1 }).kind, 'type-error');
});
