/* `node --test scripts/`: package scripts and CI workflows that would fail quietly. Each check below exists because
   the tool exits 0 in that situation (measured with pnpm 11 / Jest 29), so CI would go green on a broken setup. */
import './lib/test-env.mjs';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { ROOT } from './dev-config.mjs';

const readJson = (file) => JSON.parse(readFileSync(join(ROOT, file), 'utf8'));
const packageFiles = [
  'package.json',
  ...['packages', 'proprietary'].flatMap((dir) =>
    readdirSync(join(ROOT, dir)).map((name) => `${dir}/${name}/package.json`),
  ),
].filter((file) => existsSync(join(ROOT, file)));
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
    for (const [, name] of command.matchAll(/--filter[= ]['"]?([^\s'"]+)/g))
      assert.ok(names.has(name), `${where}: --filter ${name} matches no workspace package`);
  }
});

/* pnpm runs package scripts in cmd.exe on Windows. There single quotes reach the program as part of the argument
   (a quoted glob then matches no file, and stylelint --allow-empty-input passes), ^ is an escape character (outside
   double quotes), `NAME=value command` is not a command, and rm, cp and friends do not exist. */
test('package scripts run in cmd.exe too (Windows): no single quotes, VAR=value prefixes or Unix file commands', () => {
  for (const { where, command } of scripts) {
    assert.doesNotMatch(command, /'/, `${where}: use \\"…\\" instead of '…'`);
    assert.doesNotMatch(command, /(^|&&|\|\|)\s*[A-Za-z_]\w*=\S/, `${where}: cmd.exe has no NAME=value prefix`);
    assert.doesNotMatch(
      command,
      /(^|&&|\|\||;)\s*(rm|cp|mv|mkdir|cat|ln|chmod|touch)\s/,
      `${where}: no such command in cmd.exe`,
    );
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
    for (const job of jobs)
      assert.match(job, /^ {4}timeout-minutes: \d+$/m, `${file}: job ${job.split(':')[0]} has no timeout-minutes`);
  }
});
