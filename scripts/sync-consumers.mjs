/* `pnpm sync [--to bq-tlb-frontend|hltsamen|all]`: get this working copy of Tilburg into the repositories that use
   it, in one go. Builds and packs what each one needs, checks the tarballs, then runs the consumer's OWN sync (they
   know their lockfile and caches best) and ends with a table of what happened.

   - bq-tlb-frontend copies the `pack:dist` tarballs of components-angular and design-tokens, always together:
     components built against newer tokens lose their styling.
   - hltsamen installs everything from `.tarballs/` (`pnpm run pack:local`) and copies the stories.
   The consumers are expected next to this repository (../bq-tlb-frontend, ../hltsamen). */
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { CONSUMERS, ROOT } from './dev-config.mjs';
import { c, capture, fail, installCrashHandler, printBanner, printCheckTable } from './lib/cli-utils.mjs';
import { confirmNoDevRunning } from './lib/lock.mjs';
import { reportStepFailure, runStepWithRecovery } from './lib/recovery.mjs';

installCrashHandler('pnpm sync');
printBanner('Sync to consumers');

const toIndex = process.argv.indexOf('--to');
const wanted = toIndex > -1 ? process.argv[toIndex + 1] : 'all';
const known = CONSUMERS.map((consumer) => consumer.key);
if (wanted !== 'all' && !known.includes(wanted)) {
  fail({
    what: `Unknown consumer '${wanted}'`,
    fix: `pnpm sync --to ${known.join(' | ')} (or leave --to out for all)`,
  });
  process.exit(1);
}

const selected = CONSUMERS.filter((consumer) => wanted === 'all' || consumer.key === wanted);
const present = selected.filter((consumer) => existsSync(consumer.dir));
for (const consumer of selected.filter((consumer) => !present.includes(consumer))) {
  console.log(`  ${c.gray}–  ${consumer.key}: not found at ${consumer.dir}, skipped.${c.reset}`);
}
if (!present.length) {
  fail({
    what: 'No consumer repository found',
    why: `pnpm sync looks for ${selected.map((consumer) => `../${consumer.key}`).join(' and ')} next to this repository.`,
    fix: 'clone it next to tilburg, or copy the tarballs by hand (pnpm run pack:local writes them to .tarballs/)',
  });
  process.exit(1);
}

/** Run a step; on failure explain it and stop, since a half-packed set is worse than none. */
async function step(label, command, options) {
  try {
    await runStepWithRecovery(label, command, options);
  } catch (err) {
    reportStepFailure(label, err);
    process.exit(1);
  }
}

/** Does the tarball hold what the consumer will import? Catches a package packed without its build output. */
async function checkTarball(file, mustContain, what) {
  if (!existsSync(file)) {
    fail({ what: `${what}: no tarball at ${file}`, fix: 'see the build output above' });
    process.exit(1);
  }
  const { stdout } = await capture(`tar tzf "${file}"`, { timeoutMs: 30_000 });
  if (!mustContain.test(stdout)) {
    fail({
      what: `${what}: the tarball is missing its build output`,
      why: `${file} has no file matching ${mustContain}. The package was probably packed before (or without) its build.`,
      fix: 'pnpm build, then pnpm sync again',
    });
    process.exit(1);
  }
}

/* Before packing anything: does each consumer have the script we are about to call? An older checkout may not. */
const usable = [];
for (const consumer of usable) {
  let scripts = {};
  try {
    scripts = JSON.parse(readFileSync(resolve(consumer.dir, 'package.json'), 'utf8')).scripts ?? {};
  } catch (err) {
    rows.push({
      ok: false,
      label: consumer.key,
      detail: `cannot read its package.json (${err.code ?? err.message})`,
      note: consumer.dir,
    });
    continue;
  }
  const missingScripts = (consumer.requires ?? []).filter((name) => !scripts[name]);
  if (missingScripts.length) {
    rows.push({
      ok: false,
      label: consumer.key,
      detail: `has no ${missingScripts.map((name) => `"${name}"`).join(', ')} script`,
      note: `an older checkout? git pull in ${consumer.dir}`,
    });
    continue;
  }
  usable.push(consumer);
}
if (!usable.length) {
  printCheckTable([{ title: 'Result', rows }]);
  process.exit(1);
}
if (!(await confirmNoDevRunning('pnpm sync rebuilds the packages it packs, and'))) process.exit(1);

// ─── Pack ────────────────────────────────────────────────────────────────────

const needs = new Set(usable.flatMap((consumer) => consumer.pack));

if (needs.has('components-angular')) {
  await step('Packing design-tokens', 'pnpm --filter @gemeente-tilburg/design-tokens run pack:dist');
  await step('Packing components-angular', 'pnpm --filter @gemeente-tilburg/components-angular run pack:dist');
  await checkTarball(
    resolve(ROOT, 'packages/components-angular/dist/gemeente-tilburg-components-angular-0.0.0.tgz'),
    /package\/dist\/fesm2022\/.*\.mjs/,
    'components-angular',
  );
  await checkTarball(
    resolve(ROOT, 'proprietary/design-tokens/dist/gemeente-tilburg-design-tokens-0.0.1.tgz'),
    /package\/dist\/tilburg\/theme\.css/,
    'design-tokens',
  );
}
if (needs.has('all')) {
  await step('Packing every package into .tarballs/', 'pnpm run pack:local');
}

// ─── Sync ────────────────────────────────────────────────────────────────────

const rows = [];
for (const consumer of present) {
  try {
    await runStepWithRecovery(`Syncing ${consumer.key}`, consumer.sync, { cwd: consumer.dir });
    rows.push({
      ok: true,
      label: consumer.key,
      detail: 'up to date',
      note: `restart its dev server or Storybook to see the change`,
    });
  } catch (err) {
    reportStepFailure(`Syncing ${consumer.key} (${consumer.sync})`, err);
    rows.push({
      ok: false,
      label: consumer.key,
      detail: 'failed, see above',
      note: `cd ${consumer.dir} && ${consumer.sync}`,
    });
  }
}

console.log('');
const { failed } = printCheckTable([{ title: 'Result', rows }]);
process.exit(failed.length ? 1 : 0);
