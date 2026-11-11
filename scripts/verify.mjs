/* `pnpm verify`: what CI checks on a pull request (.github/workflows/continuous-integration.yml), run locally, so a
   red pull request is not the first you hear of it. Runs every step even when one fails (like CI's separate jobs),
   skips the ones that need a build when the build fails, and ends with a table saying why and what to do.

   Two checks CI does not do (yet) come last: `pnpm parity` (fails like a CI step), and whether a change to a published
   package comes with a changeset (only a warning: not every change needs a release). */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { ROOT } from './dev-config.mjs';
import { checkInstallFresh } from './lib/checks.mjs';
import {
  c,
  capture,
  exitAfter,
  installCrashHandler,
  parseArgsOrExit,
  printBanner,
  printCheckTable,
  stepSkip,
  warnRow,
} from './lib/cli-utils.mjs';
import { confirmNoDevRunningOrExit, takeBuildLock } from './lib/lock.mjs';
import { classifyFailure, reportStepFailure, runStepWithRecovery } from './lib/recovery.mjs';
import { treeChangedRow, treeState } from './lib/ship.mjs';

installCrashHandler('pnpm verify');
/* Strict: `pnpm verify tooltip` or a typo must not start the full CI-length run while you wait for something else. */
if (parseArgsOrExit({ options: { help: { type: 'boolean', short: 'h' } } }, 'pnpm verify').values.help)
  exitAfter('pnpm verify: runs what CI checks (audit, lockfile, lint, build, tests, parity), no options.');
printBanner('Verify (what CI checks)');

const STEPS = [
  {
    label: 'Security audit',
    command: 'pnpm audit --audit-level critical',
    why: 'CI runs this before installing and stops on a critical advisory.',
  },
  {
    label: 'Lockfile',
    command: 'pnpm install --frozen-lockfile --lockfile-only',
    why: 'CI installs with --frozen-lockfile: a package.json change without its pnpm-lock.yaml update fails there.',
    /* No automatic pnpm install: it would update the lockfile, pass here, and leave CI failing on the uncommitted file. */
    recoveries: {},
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

/* One build at a time: pnpm sync and pack:local build and pack the same dist/ folders (this lock is theirs too). */
takeBuildLock(
  'pnpm verify',
  'it builds the same dist/ folders; two builds at once fail with EEXIST or test a half-written build.',
);
await confirmNoDevRunningOrExit('pnpm verify builds every package and');
const treeAtStart = await treeState(ROOT);

/* An install that lags the lockfile gives other results than CI's fresh one. */
const fresh = checkInstallFresh();
if (fresh.warn || !fresh.ok) console.log(`  ${c.yellow}⚠${c.reset}  ${fresh.detail}: ${fresh.note}.\n`);

const rows = [];
let built = true;
for (const step of STEPS) {
  if (step.needsBuild && !built) {
    stepSkip(step.label, 'skipped: the build failed');
    rows.push({ skip: true, ok: true, label: step.label, detail: 'skipped, the build failed' });
    continue;
  }
  try {
    /* cwd: run from the repository root also when started as node scripts/verify.mjs from another folder. */
    await runStepWithRecovery(step.label, step.command, {
      cwd: ROOT,
      env: { ...process.env, TILBURG_QUIET: '1' },
      ...(step.recoveries && { recoveries: step.recoveries }),
    });
    rows.push({ ok: true, label: step.label, detail: 'passed', note: step.why });
  } catch (err) {
    reportStepFailure(step.label, err);
    const diagnosis = classifyFailure(err.output ?? '', err);
    if (step.label === 'Build') built = false;
    /* Offline, the audit says nothing about the code: CI (online) decides that one. */
    if (step.label === 'Security audit' && diagnosis.kind === 'network') {
      rows.push(warnRow('could not check: no network', diagnosis.fix, { label: step.label }));
      continue;
    }
    rows.push({
      ok: false,
      label: step.label,
      detail: 'failed',
      note: diagnosis.fix ?? `run ${step.command} on its own and read the first error`,
    });
  }
}

/* Only a warning: a crash in it (a broken package.json) must not throw away the table of the steps above. */
rows.push(
  await changesetRow().catch((error) =>
    warnRow('could not check', undefined, { label: 'Changeset (not in CI)', error }),
  ),
);

/* A checkout, pull or stash meanwhile: the steps ran on a mix of two trees. */
const treeChanged = treeChangedRow(
  treeAtStart,
  await treeState(ROOT),
  'Working tree',
  'the steps saw a mix of two trees, so pnpm verify again',
);
if (treeChanged) rows.push(treeChanged);

console.log('');
const { failed, total } = printCheckTable([{ title: 'Result', rows }]);
if (failed.length)
  exitAfter(`  ${c.red}${failed.length} of ${total} failed.${c.reset} CI would fail the same way.\n`, 1);
console.log(`  ${c.green}Everything CI checks passes.${c.reset}\n`);

/**
 * Does this branch change a published package without a changeset? Compared with where it left origin/main, including
 * uncommitted and new files. A warning, not a failure: a refactor or a test needs no release.
 */
async function changesetRow() {
  const label = 'Changeset (not in CI)';
  /* A git that fails or times out throws (the row then says "could not check"); quotePath=false: with the default,
     a non-ASCII name comes out as "packages/caf\303\251/…" and matches no package folder. */
  const git = async (command) => {
    const result = await capture(`git -c core.quotePath=false ${command}`, { cwd: ROOT, timeoutMs: 15_000 });
    if (result.code !== 0)
      throw new Error(`git ${command} ${result.timedOut ? 'timed out' : `failed: ${result.stderr.trim()}`}`);
    return result.stdout.trim();
  };
  if ((await capture('git rev-parse --verify --quiet origin/main', { cwd: ROOT })).code !== 0)
    return { skip: true, ok: true, label, detail: 'no origin/main to compare with' };
  /* Fails without a shared commit: a shallow clone (CI's checkout) has cut the history off before it. */
  const base = await git('merge-base HEAD origin/main').catch(() => '');
  if (!base)
    return warnRow(
      'could not check: no common history with origin/main',
      `a shallow clone? ${c.cyan}git fetch --unshallow origin${c.reset}`,
      { label },
    );
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
  return warnRow(
    `${touched.map((dir) => dir.split('/')[1]).join(', ')} changed, but this branch has no changeset`,
    `${c.cyan}pnpm changeset${c.reset} describes the change for the release (skip it for refactors and tests)`,
    { label },
  );
}
