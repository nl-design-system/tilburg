/* `pnpm run test:scripts`: `pnpm test` (scripts/test.mjs) is what CI runs, so every failed sub-run has to end in a
   non-zero exit. A fake `pnpm` on PATH stands in for Jest and Stencil: it exits as told and writes fixture JSON to the
   --outputFile, so nothing real runs and nothing in the repository is touched. */
import './lib/test-env.mjs';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { chmodSync, existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { after, test } from 'node:test';
import { loadComponents } from './lib/components.mjs';

const dir = mkdtempSync(join(tmpdir(), 'tilburg-test-runner-'));
after(() => rmSync(dir, { recursive: true, force: true }));

const calls = join(dir, 'calls.txt');
writeFileSync(
  join(dir, 'pnpm'),
  `#!/usr/bin/env node
const { appendFileSync, writeFileSync } = require('node:fs');
const args = process.argv.slice(2).join(' ');
appendFileSync(${JSON.stringify(calls)}, args + '\\n');
const plan = JSON.parse(process.env.FAKE_PNPM);
const { exit = 0, signal, report } = plan[Object.keys(plan).find((key) => args.includes(key))] ?? {};
const out = /--outputFile=(\\S+)/.exec(args)?.[1];
if (out && report !== undefined) writeFileSync(out, typeof report === 'string' ? report : JSON.stringify(report));
if (signal) process.kill(process.pid, signal);
else process.exit(exit);
`,
);
chmodSync(join(dir, 'pnpm'), 0o755);

function run(args, plan) {
  writeFileSync(calls, '');
  const result = spawnSync(process.execPath, [resolve(import.meta.dirname, 'test.mjs'), ...args], {
    encoding: 'utf8',
    timeout: 30_000,
    env: { ...process.env, PATH: `${dir}:${process.env.PATH}`, TMPDIR: dir, CI: '1', FAKE_PNPM: JSON.stringify(plan) },
  });
  return { ...result, output: result.stdout + result.stderr, calls: readFileSync(calls, 'utf8') };
}

// ─── Everything (CI) ─────────────────────────────────────────────────────────

test('everything: a failing package run stops there and exits with its code', () => {
  const result = run([], { '--recursive': { exit: 3 } });
  assert.equal(result.status, 3);
  assert.doesNotMatch(result.calls, /test:scripts/);
});

test('everything: a run killed by a signal is a failure, not a pass', () => {
  const result = run([], { '--recursive': { signal: 'SIGTERM' } });
  assert.notEqual(result.status, 0);
  assert.doesNotMatch(result.calls, /test:scripts/);
});

test('everything: a failing test:scripts run fails the whole', () => {
  assert.equal(run([], { 'test:scripts': { exit: 1 } }).status, 1);
});

test('everything: both green is exit 0', () => {
  const result = run([], {});
  assert.equal(result.status, 0);
  assert.match(result.calls, /--recursive run test\nrun test:scripts\n/);
});

// ─── One component ───────────────────────────────────────────────────────────

/* A component with tests in all three layers, so each layer is run. */
const component = loadComponents().find((entry) =>
  ['react', 'angular', 'wbc'].every((key) => entry.layers[key].promised && existsSync(entry.layers[key].test)),
);
const PACKAGES = { react: 'components-react', angular: 'components-angular', wbc: 'web-components-stencil' };

/** A Jest --json report with one file. */
const report = (path, assertionResults, extra = {}) => ({
  testResults: [
    {
      name: path,
      status: assertionResults.some((t) => t.status === 'failed') ? 'failed' : 'passed',
      assertionResults,
      ...extra,
    },
  ],
});
const pass = (title = 'renders') => ({ title, ancestorTitles: ['Suite'], status: 'passed', failureMessages: [] });
const green = (key) => ({ report: report(component.layers[key].test, [pass()]) });

function runComponent(overrides) {
  const plan = Object.fromEntries(Object.keys(PACKAGES).map((key) => [PACKAGES[key], overrides[key] ?? green(key)]));
  return run([component.slug], plan);
}

test('component: there is one with tests in every layer to try this on', () => {
  assert.ok(component, 'no component has React, Angular and Web Component tests');
});

test('component: all green is exit 0', { skip: !component }, () => {
  const result = runComponent({});
  assert.equal(result.status, 0, result.output);
  assert.match(result.output, /All .* tests pass/);
});

test('component: a failing test exits 1 and shows its name and message', { skip: !component }, () => {
  const failing = {
    title: 'closes on Escape',
    ancestorTitles: ['Suite'],
    status: 'failed',
    failureMessages: ['Expected: true\n    at x (y.ts:1:1)'],
  };
  const result = runComponent({
    angular: { exit: 1, report: report(component.layers.angular.test, [pass(), failing]) },
  });
  assert.equal(result.status, 1);
  assert.match(result.output, /Angular: Suite › closes on Escape/);
  assert.match(result.output, /Expected: true/);
  assert.doesNotMatch(result.output, /at x \(y\.ts/, 'stack lines are left out');
  assert.match(result.output, /1 of 2 failed/);
});

test('component: a JSON report that was never written is a failure', { skip: !component }, () => {
  const result = runComponent({ react: { exit: 1 } });
  assert.equal(result.status, 1);
  assert.match(result.output, /React tests failed/);
  assert.match(result.output, /did not run/);
});

test('component: unreadable JSON is a failure', { skip: !component }, () => {
  assert.equal(runComponent({ react: { exit: 1, report: '{"testResults": [' } }).status, 1);
});

test('component: a run that matched no tests (a typo, --passWithNoTests) is a failure', { skip: !component }, () => {
  const result = runComponent({ angular: { report: { testResults: [] } } });
  assert.equal(result.status, 1);
  assert.match(result.output, /the test file did not run/);
});

test("component: a file that failed to load shows Jest's message", { skip: !component }, () => {
  const broken = {
    exit: 1,
    report: report(component.layers.react.test, [], { status: 'failed', message: 'SyntaxError: Unexpected token' }),
  };
  const result = runComponent({ react: broken });
  assert.equal(result.status, 1);
  assert.match(result.output, /could not run/);
  assert.match(result.output, /SyntaxError: Unexpected token/);
});

test(
  'component: a hook that threw fails the file although every test passed, and says why',
  { skip: !component },
  () => {
    const hook = {
      exit: 1,
      report: report(component.layers.react.test, [pass()], { status: 'failed', message: 'afterAll: cleanup threw' }),
    };
    const result = runComponent({ react: hook });
    assert.equal(result.status, 1);
    assert.match(result.output, /afterAll: cleanup threw/);
  },
);

test('component: Jest exiting non-zero with this file green is still a failure', { skip: !component }, () => {
  const result = runComponent({ react: { ...green('react'), exit: 1 } });
  assert.equal(result.status, 1);
  assert.match(result.output, /React tests failed/);
});

test('component: Stencil runs every spec; another component failing does not count', { skip: !component }, () => {
  const other = {
    name: '/elsewhere/src/other/component.spec.tsx',
    status: 'failed',
    assertionResults: [{ title: 'x', status: 'failed' }],
  };
  const stencil = report(component.layers.wbc.test, [pass(), pass('hydrates')]);
  stencil.testResults.unshift(other);
  const result = runComponent({ wbc: { exit: 1, report: stencil } });
  assert.equal(result.status, 0, result.output);
  assert.match(result.output, /2 passed/);
});

test(
  'component: Jest runs with --ci (no new snapshots written) and --forceExit (open handles)',
  { skip: !component },
  () => {
    const { calls } = runComponent({});
    assert.match(calls, /components-react exec jest --ci --forceExit /);
    assert.match(calls, /components-angular exec jest --ci --forceExit /);
    assert.match(calls, /stencil test --spec --runInBand --ci /);
  },
);

test('component: a layer whose tests are all skipped is a warning, not "all pass"', { skip: !component }, () => {
  const skip = { title: 'later', ancestorTitles: ['Suite'], status: 'pending', failureMessages: [] };
  const todo = { ...skip, title: 'someday', status: 'todo' };
  const result = runComponent({ react: { report: report(component.layers.react.test, [skip, todo]) } });
  assert.equal(result.status, 0, result.output);
  assert.match(result.output, /0 passed, 2 skipped/);
  assert.match(result.output, /not every layer ran a test/);
  assert.doesNotMatch(result.output, /All .* tests pass/);
});

test('component: skipped tests next to passing ones are counted', { skip: !component }, () => {
  const skip = { title: 'later', ancestorTitles: ['Suite'], status: 'pending', failureMessages: [] };
  const result = runComponent({ react: { report: report(component.layers.react.test, [pass(), skip]) } });
  assert.equal(result.status, 0, result.output);
  assert.match(result.output, /1 passed, 1 skipped/);
  assert.match(result.output, /All .* tests pass/);
});

test('component: in a shared React test file only its own describe() runs and counts', () => {
  const shared = loadComponents().find((entry) => entry.layers.react.suite && existsSync(entry.layers.react.test));
  assert.ok(shared, 'no component has its React tests in a shared file');
  const { suite, test: path } = shared.layers.react;
  const other = { title: 'x', ancestorTitles: ['Other'], status: 'pending', failureMessages: [] };
  const own = { title: 'renders', ancestorTitles: [suite], status: 'passed', failureMessages: [] };
  const plan = { [PACKAGES.react]: { report: report(path, [own, other, other]) } };
  for (const key of ['angular', 'wbc']) plan[PACKAGES[key]] = { report: report(shared.layers[key].test, [pass()]) };
  const result = run([shared.slug], plan);
  /* The calls file has the arguments after the shell: "^Alert " arrives without its quotes. */
  assert.ok(result.calls.includes(`-t ^${suite} \n`), result.calls);
  assert.match(result.output, /React\s+1 passed\s/);
  assert.doesNotMatch(result.output, /skipped/);
});

test('component: an unknown name exits 1 with a hint', () => {
  const result = run(['no-such-component-xyz'], {});
  assert.equal(result.status, 1);
  assert.match(result.output, /No component called "no-such-component-xyz"/);
  assert.equal(result.calls, '', 'nothing was run');
});
