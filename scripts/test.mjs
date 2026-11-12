/* `pnpm test [component]`.

   Without a name: every test, exactly as before (each package's Jest, then the tests of these scripts); CI runs this.
   With one (`pnpm test tooltip`): only that component's tests, in React, Angular and Web Components, and one table:
   how many passed per layer, and for a failure the test's name and what it expected. Stencil cannot run a single spec
   file, so it runs all of them (about 20 s) and only this component's results are shown. */
import { spawnSync } from 'node:child_process';
import { constants } from 'node:os';
import { existsSync, rmSync } from 'node:fs';
import { relative, resolve, sep } from 'node:path';
import { ROOT } from './dev-config.mjs';
import {
  c,
  exitWith,
  hint,
  installCrashHandler,
  LOG_DIR,
  parseArgsOrExit,
  printBanner,
  printCheckTable,
  readJson,
  stripAnsi,
  warnRow,
} from './lib/cli-utils.mjs';
import { rel, requireComponent } from './lib/components.mjs';
import { reportStepFailure, runStepWithRecovery } from './lib/recovery.mjs';

/**
 * `path` relative to the package in `dir`, with forward slashes: Jest reads it as a regex pattern, in which a Windows
 * path's backslashes would be escapes (\c, \s, \B) and match nothing; Jest itself matches / against either separator.
 */
const inPackage = (dir, path) => relative(resolve(ROOT, dir), path).split(sep).join('/');

installCrashHandler('pnpm test');
/* Strict: an unknown flag (--help, a typo such as --wach) used to be dropped, which left no name and ran everything. */
const { positionals } = parseArgsOrExit(
  { allowPositionals: true, options: {} },
  'pnpm test   (everything, as CI does)   or   pnpm test <component>',
);
const query = positionals.join(' ').trim();
if (positionals.length && !query)
  exitWith({ what: 'The component name is empty', fix: 'pnpm test <component>, or pnpm test for everything' });

if (!query) {
  for (const command of ['pnpm --recursive run test', 'pnpm run test:scripts']) {
    const result = spawnSync(command, { cwd: ROOT, shell: true, stdio: 'inherit' });
    /* Killed by a signal: 128 + its number, as a shell reports it (143 for SIGTERM), so CI sees why. */
    if (result.status !== 0)
      process.exit(result.status ?? (result.signal ? 128 + constants.signals[result.signal] : 1));
  }
  process.exit(0);
}

const component = await requireComponent(query, 'pnpm test');
printBanner(`Test: ${component.name}`);

const { react, angular, wbc } = component.layers;
const LAYERS = [
  {
    layer: react,
    package: '@gemeente-tilburg/components-react',
    dir: 'packages/components-react',
    /* --ci: a new snapshot fails instead of being written. --forceExit: an open handle would keep Jest running forever. */
    command: (out) =>
      `jest --ci --forceExit --json --outputFile="${out}" ${inPackage('packages/components-react', react.test)}${react.suite ? ` -t "^${react.suite} "` : ''}`,
    /* watch:test with the same file, so the watch reruns this component only. */
    watch: inPackage('packages/components-react', react.test),
  },
  {
    layer: angular,
    package: '@gemeente-tilburg/components-angular',
    dir: 'packages/components-angular',
    command: (out) => `jest --ci --forceExit --json --outputFile="${out}" src/${component.names.angular}/`,
    watch: `src/${component.names.angular}/`,
  },
  {
    layer: wbc,
    package: '@gemeente-tilburg/web-components-stencil',
    dir: 'packages/web-components-stencil',
    command: (out) => `stencil test --spec --runInBand --ci --json --outputFile="${out}"`,
    note: 'Stencil runs all its specs; only this one is counted',
  },
];

const rows = [];
const failures = [];
for (const { layer, package: name, dir, command, note } of LAYERS) {
  if (!layer.promised) continue;
  if (!existsSync(layer.test)) {
    rows.push(warnRow('no tests yet', `${rel(layer.test)} does not exist`, { label: layer.label }));
    continue;
  }
  /* The pid: two `pnpm test tooltip` at once must not read each other's report. */
  const out = resolve(LOG_DIR, `test-${component.slug}-${layer.label.replace(/\W/g, '')}-${process.pid}.json`);
  let runError = null;
  try {
    await runStepWithRecovery(`${layer.label} tests`, `pnpm --filter ${name} exec ${command(out)}`, { cwd: ROOT });
  } catch (err) {
    /* Failing tests also land here (Jest exits 1): the JSON says which. Without JSON it did not get that far. */
    runError = err;
  }
  /* No report: a crash or a compile error before the tests ran. Read once; the step log keeps the output. */
  const report = readJson(out);
  rmSync(out, { force: true });
  const file = report?.testResults?.find(
    (result) =>
      resolve(result.name) === resolve(ROOT, rel(layer.test)) ||
      result.name.endsWith(relative(resolve(ROOT, dir), layer.test)),
  );
  if (!file) {
    if (runError) reportStepFailure(`${layer.label} tests`, runError);
    rows.push({
      ok: false,
      label: layer.label,
      detail: runError ? 'did not run (see above)' : 'the test file did not run',
      note: rel(layer.test),
    });
    continue;
  }
  /* A shared test file: only this component's describe() counts (the others are skipped by -t). */
  const tests = (file.assertionResults ?? []).filter(
    (test) => !layer.suite || test.ancestorTitles?.[0] === layer.suite,
  );
  const failed = tests.filter((test) => test.status === 'failed');
  const passed = tests.filter((test) => test.status === 'passed');
  if (file.status === 'failed' && !failed.length) {
    /* The file failed to load (a syntax or import error) or a hook threw: Jest puts that in the file's message. */
    failures.push({ layer: layer.label, title: `${rel(layer.test)} could not run`, message: file.message });
  }
  for (const test of failed) {
    failures.push({
      layer: layer.label,
      title: [...(test.ancestorTitles ?? []), test.title].join(' › '),
      message: (test.failureMessages ?? []).join('\n'),
    });
  }
  /* Only Stencil runs other specs too; for React and Angular a non-zero exit with this file green is still a failure. */
  const exitFailed = Boolean(runError && !note);
  if (exitFailed && !failed.length && file.status !== 'failed') reportStepFailure(`${layer.label} tests`, runError);
  /* test.skip / test.todo: Jest reports them as pending / todo and exits 0. */
  const skipped = tests.length - failed.length - passed.length;
  rows.push({
    ok: failed.length === 0 && file.status !== 'failed' && !exitFailed,
    warn: !passed.length,
    label: layer.label,
    detail: failed.length
      ? `${failed.length} of ${tests.length} failed`
      : `${passed.length} passed${skipped ? `, ${skipped} skipped` : ''}`,
    note: note ?? rel(layer.test),
  });
}

console.log('');
for (const { layer, title, message } of failures) {
  console.log(`  ${c.red}✗${c.reset}  ${c.bold}${layer}: ${title}${c.reset}`);
  const lines = stripAnsi(message ?? '')
    .split('\n')
    .map((line) => line.replace(/\s+$/, ''))
    .filter((line) => line.trim() && !/^\s+at /.test(line))
    .slice(0, 12);
  for (const line of lines) console.log(`     ${c.red}│${c.reset} ${line}`);
  console.log('');
}

const { failed, warned } = printCheckTable([{ title: `${component.name} tests`, rows }]);
if (!rows.length) {
  console.log(`  ${hint(`${component.name} has no wrapper in any layer, so there is nothing to test here.`)}\n`);
} else if (failed.length) {
  const watch = LAYERS.filter(({ layer }) => failed.some((row) => row.label === layer.label)).map(
    ({ package: name, watch }) => `pnpm --filter ${name} run watch:test${watch ? ` ${watch}` : ''}`,
  );
  console.log(`  ${c.red}Not green.${c.reset} ${c.gray}Rerun on every save while you fix it:${c.reset}`);
  for (const command of watch) console.log(`    ${c.cyan}${command}${c.reset}`);
  console.log('');
  process.exit(1);
} else if (warned.length) {
  console.log(`  ${c.yellow}Nothing failed, but not every layer ran a test (⚠️  above).${c.reset}\n`);
} else {
  console.log(`  ${c.green}All ${component.name} tests pass.${c.reset}\n`);
}
