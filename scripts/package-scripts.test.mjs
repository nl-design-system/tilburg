/* `node --test scripts/`: package scripts and CI workflows that would fail quietly. Each check below exists because
   the tool exits 0 in that situation (measured with pnpm 11 / Jest 29), so CI would go green on a broken setup. */
import './lib/test-env.mjs';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { ROOT } from './dev-config.mjs';

const readJson = (file) => JSON.parse(readFileSync(join(ROOT, file), 'utf8'));
const packageFiles = ['package.json'];
for (const dir of ['packages', 'proprietary']) {
  for (const name of readdirSync(join(ROOT, dir))) {
    try {
      readJson(`${dir}/${name}/package.json`);
      packageFiles.push(`${dir}/${name}/package.json`);
    } catch {
      /* not a package */
    }
  }
}
const packages = packageFiles.map((file) => ({ file, ...readJson(file) }));
const names = new Set(packages.map((pkg) => pkg.name));
const scripts = packages.flatMap(({ file, scripts = {} }) =>
  Object.entries(scripts).map(([name, command]) => ({ where: `${file} "${name}"`, command })),
);
const workflowDir = join(ROOT, '.github/workflows');
const workflows = readdirSync(workflowDir)
  .filter((file) => file.endsWith('.yml'))
  .map((file) => ({ file, text: readFileSync(join(workflowDir, file), 'utf8') }));
const commands = [...scripts, ...workflows.map(({ file, text }) => ({ where: file, command: text }))];

test('every pnpm --filter names a real workspace package (a filter that matches nothing exits 0)', () => {
  for (const { where, command } of commands) {
    for (const [, name] of command.matchAll(/--filter[= ]['"]?([^\s'"]+)/g)) {
      assert.ok(names.has(name), `${where}: --filter ${name} matches no workspace package`);
    }
  }
});

test('no --passWithNoTests (a broken Jest config would find 0 tests and pass)', () => {
  for (const { where, command } of commands) assert.doesNotMatch(command, /passWithNoTests/, where);
});

test('no --if-present (a renamed script would be skipped silently)', () => {
  for (const { where, command } of commands) assert.doesNotMatch(command, /--if-present/, where);
});

test('workflow steps do not hide their failure', () => {
  for (const { file, text } of workflows) {
    assert.doesNotMatch(text, /continue-on-error/, file);
    assert.doesNotMatch(text, /\|\|\s*true/, file);
  }
});

test('every workflow job has timeout-minutes (a hang otherwise burns 6 hours)', () => {
  for (const { file, text } of workflows) {
    const jobs = text
      .split(/^jobs:\n/m)[1]
      .split(/^ {2}(?=[\w-]+:)/m)
      .filter(Boolean);
    assert.ok(jobs.length > 0, `${file}: no jobs found`);
    for (const job of jobs) {
      assert.match(job, /^ {4}timeout-minutes: \d+$/m, `${file}: job ${job.split(':')[0]} has no timeout-minutes`);
    }
  }
});
