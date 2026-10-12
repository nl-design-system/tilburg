/* `pnpm test [component]`.

   Without a name: every test, exactly as before (each package's Jest, then the tests of these scripts); CI runs this.
   With one (`pnpm test tooltip`): only that component's tests, in React, Angular and Web Components, and one table:
   how many passed per layer, and for a failure the test's name and what it expected. Stencil cannot run a single spec
   file, so it runs all of them (about 20 s) and only this component's results are shown. */
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { ROOT } from './dev-config.mjs';
import { c, installCrashHandler, LOG_DIR, printBanner, printCheckTable, stripAnsi } from './lib/cli-utils.mjs';
import { rel, requireComponent } from './lib/components.mjs';
import { reportStepFailure, runStepWithRecovery } from './lib/recovery.mjs';

installCrashHandler('pnpm test');
const query = process.argv
  .slice(2)
  .filter((arg) => !arg.startsWith('-'))
  .join(' ');

// ─── Everything ──────────────────────────────────────────────────────────────

if (!query) {
  for (const command of ['pnpm --recursive run test', 'pnpm run test:scripts']) {
    const result = spawnSync(command, { cwd: ROOT, shell: true, stdio: 'inherit' });
    if (result.status !== 0) process.exit(result.status ?? 1);
  }
  process.exit(0);
}

// ─── One component ───────────────────────────────────────────────────────────

const component = await requireComponent(query, 'pnpm test');
printBanner(`Test: ${component.name}`);

const { react, angular, wbc } = component.layers;
const LAYERS = [
  {
    layer: react,
    package: '@gemeente-tilburg/components-react',
    dir: 'packages/components-react',
    command: (out) => `jest --json --outputFile="${out}" ${rel(react.test).replace('packages/components-react/', '')}`,
  },
  {
    layer: angular,
    package: '@gemeente-tilburg/components-angular',
    dir: 'packages/components-angular',
    command: (out) => `jest --json --outputFile="${out}" src/${component.names.angular}/`,
  },
  {
    layer: wbc,
    package: '@gemeente-tilburg/web-components-stencil',
    dir: 'packages/web-components-stencil',
    command: (out) => `stencil test --spec --runInBand --json --outputFile="${out}"`,
    note: 'Stencil runs all its specs; only this one is counted',
  },
];

const rows = [];
const failures = [];
for (const { layer, package: name, dir, command, note } of LAYERS) {
  if (!layer.promised) continue;
  if (!existsSync(layer.test)) {
    rows.push({
      ok: true,
      warn: true,
      label: layer.label,
      detail: 'no tests yet',
      note: `${rel(layer.test)} does not exist`,
    });
    continue;
  }
  const out = resolve(LOG_DIR, `test-${component.slug}-${layer.label.replace(/\W/g, '')}.json`);
  rmSync(out, { force: true });
  let runError = null;
  try {
    await runStepWithRecovery(`${layer.label} tests`, `pnpm --filter ${name} exec ${command(out)}`);
  } catch (err) {
    /* Failing tests also land here (Jest exits 1): the JSON says which. Without JSON it did not get that far. */
    runError = err;
  }
  let report = null;
  try {
    report = JSON.parse(readFileSync(out, 'utf8'));
  } catch {
    /* no report: a crash or a compile error before the tests ran */
  }
  const file = report?.testResults?.find(
    (result) =>
      resolve(result.name) === resolve(ROOT, rel(layer.test)) ||
      result.name.endsWith(rel(layer.test).replace(`${dir}/`, '')),
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
  const tests = file.assertionResults ?? [];
  const failed = tests.filter((test) => test.status === 'failed');
  const passed = tests.filter((test) => test.status === 'passed');
  if (file.status === 'failed' && !tests.length) {
    /* The file itself failed to load (a syntax or import error): Jest puts that in the file's message. */
    failures.push({ layer: layer.label, title: `${rel(layer.test)} could not run`, message: file.message });
  }
  for (const test of failed) {
    failures.push({
      layer: layer.label,
      title: [...(test.ancestorTitles ?? []), test.title].join(' › '),
      message: (test.failureMessages ?? []).join('\n'),
    });
  }
  rows.push({
    ok: failed.length === 0 && file.status !== 'failed',
    label: layer.label,
    detail: failed.length ? `${failed.length} of ${tests.length} failed` : `${passed.length} passed`,
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

const { failed } = printCheckTable([{ title: `${component.name} tests`, rows }]);
if (!rows.length) {
  console.log(
    `  ${c.gray}${component.name} has no wrapper in any layer, so there is nothing to test here.${c.reset}\n`,
  );
} else if (failed.length) {
  const watch = LAYERS.filter(({ layer }) => failed.some((row) => row.label === layer.label)).map(
    ({ package: name }) => `pnpm --filter ${name} run watch:test`,
  );
  console.log(`  ${c.red}Not green.${c.reset} ${c.gray}Rerun on every save while you fix it:${c.reset}`);
  for (const command of watch) console.log(`    ${c.cyan}${command}${c.reset}`);
  console.log('');
  process.exit(1);
} else {
  console.log(`  ${c.green}All ${component.name} tests pass.${c.reset}\n`);
}
