/* `pnpm verify`: what CI checks on a pull request (.github/workflows/continuous-integration.yml), run locally, so a
   red pull request is not the first you hear of it. Runs every step even when one fails (like CI's separate jobs),
   skips the ones that need a build when the build fails, and ends with a table saying why and what to do.

   Two checks CI does not do (yet) come last: `pnpm parity` (fails like a CI step), and whether a change to a published
   package comes with a changeset (only a warning: not every change needs a release). */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { ROOT } from './dev-config.mjs';
import { c, capture, installCrashHandler, printBanner, printCheckTable, stepSkip } from './lib/cli-utils.mjs';
import { confirmNoDevRunning } from './lib/lock.mjs';
import { classifyFailure, reportStepFailure, runStepWithRecovery } from './lib/recovery.mjs';

installCrashHandler('pnpm verify');
printBanner('Verify (what CI checks)');

const STEPS = [
  {
    label: 'Security audit',
    command: 'pnpm audit --audit-level critical',
    why: 'CI runs this before installing and stops on a critical advisory.',
  },
  {
    label: 'Lint',
    command: 'pnpm run lint',
    why: 'eslint, stylelint, markdownlint, package.json and every workspace.',
  },
  { label: 'Build', command: 'pnpm run build', why: 'every package, as CI builds it.' },
  {
    label: 'Storybook type check',
    command: 'pnpm --filter @gemeente-tilburg/storybook run lint-build',
    needsBuild: true,
    why: 'type-checks the stories against the built packages.',
  },
  {
    label: 'Angular package exports',
    command: 'pnpm --filter @gemeente-tilburg/components-angular run test-build',
    needsBuild: true,
    why: 'checks every component is exported from the built package.',
  },
  { label: 'Tests', command: 'pnpm run test', needsBuild: true, why: 'Jest in React, Angular and Stencil.' },
  {
    label: 'Parity (not in CI)',
    command: 'node scripts/parity.mjs',
    why: 'every layer implementation-status.md promises has its files and stories.',
  },
];

if (!(await confirmNoDevRunning('pnpm verify builds every package and'))) process.exit(1);

const rows = [];
let built = true;
for (const step of STEPS) {
  if (step.needsBuild && !built) {
    stepSkip(step.label, 'skipped: the build failed');
    rows.push({ skip: true, ok: true, label: step.label, detail: 'skipped, the build failed' });
    continue;
  }
  try {
    await runStepWithRecovery(step.label, step.command, { env: { ...process.env, TILBURG_QUIET: '1' } });
    rows.push({ ok: true, label: step.label, detail: 'passed', note: step.why });
  } catch (err) {
    reportStepFailure(step.label, err);
    const diagnosis = classifyFailure(err.output ?? '', err);
    if (step.label === 'Build') built = false;
    rows.push({
      ok: false,
      label: step.label,
      detail: 'failed',
      note: diagnosis.fix ?? `run ${step.command} on its own and read the first error`,
    });
  }
}

rows.push(await changesetRow());

console.log('');
const { failed, total } = printCheckTable([{ title: 'Result', rows }]);
if (failed.length) {
  console.log(`  ${c.red}${failed.length} of ${total} failed.${c.reset} CI would fail the same way.\n`);
  process.exit(1);
}
console.log(`  ${c.green}Everything CI checks passes.${c.reset}\n`);

/**
 * Does this branch change a published package without a changeset? Compared with where it left origin/main, including
 * uncommitted and new files. A warning, not a failure: a refactor or a test needs no release.
 */
async function changesetRow() {
  const label = 'Changeset (not in CI)';
  const git = async (command) => (await capture(`git ${command}`, { cwd: ROOT, timeoutMs: 15_000 })).stdout.trim();
  const base = await git('merge-base HEAD origin/main');
  if (!base) return { skip: true, ok: true, label, detail: 'no origin/main to compare with' };
  const changed = [
    ...(await git(`diff --name-only ${base}`)).split('\n'),
    ...(await git('ls-files --others --exclude-standard')).split('\n'),
  ].filter(Boolean);
  const published = ['packages', 'proprietary']
    .flatMap((group) => readdirSync(resolve(ROOT, group)).map((name) => `${group}/${name}`))
    .filter((dir) => existsSync(resolve(ROOT, dir, 'package.json')))
    .filter((dir) => !JSON.parse(readFileSync(resolve(ROOT, dir, 'package.json'), 'utf8')).private);
  const touched = published.filter((dir) =>
    changed.some((file) => file.startsWith(`${dir}/`) && !/\.(test|spec)\.tsx?$|\.md$/.test(file)),
  );
  const changesets = changed.filter((file) => /^\.changeset\/(?!README).*\.md$/.test(file));
  if (!touched.length) return { ok: true, label, detail: 'no published package changed' };
  if (changesets.length)
    return { ok: true, label, detail: `${changesets.length} on this branch`, note: changesets.join(', ') };
  return {
    ok: true,
    warn: true,
    label,
    detail: `${touched.map((dir) => dir.split('/')[1]).join(', ')} changed, but this branch has no changeset`,
    note: `${c.cyan}pnpm changeset${c.reset} describes the change for the release (skip it for refactors and tests)`,
  };
}
