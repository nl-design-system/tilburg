/* Every `pnpm <script>` / `pnpm run <script>` in the docs must exist in the root package.json. Only code (fenced blocks
   and `inline`) is checked, so prose like "every pnpm command" is ignored. */
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { ROOT } from './dev-config.mjs';
import { FILE as TROUBLESHOOTING_FILE, withTable } from './troubleshooting.mjs';

/* pnpm's own commands, and the bins it runs without a script (`pnpm changeset`). */
const BUILTINS = new Set([
  'add',
  'audit',
  'changeset',
  'dlx',
  'exec',
  'i',
  'install',
  'link',
  'ls',
  'outdated',
  'pack',
  'publish',
  'remove',
  'run',
  'update',
  'why',
]);
const scripts = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')).scripts;
const DOCUMENTATION = 'packages/storybook-shared/src/documentation';
const docFiles = [
  'README.md',
  'CONTRIBUTING.md',
  ...readdirSync(join(ROOT, DOCUMENTATION), { recursive: true })
    .filter((file) => file.endsWith('.md'))
    .map((file) => join(DOCUMENTATION, file)),
];

/** Script names referenced in a markdown text's code. */
export function pnpmScripts(markdown) {
  const code = [...markdown.matchAll(/```[\s\S]*?```|`[^`\n]+`/g)]
    .map((match) => match[0].replace(/(^|\s)#\s.*$/gm, '')) // shell comments are prose
    .join('\n');
  return [...code.matchAll(/\bpnpm[ \t]+(run[ \t]+)?([a-z][\w:.-]*)/g)]
    .filter(([, run, name]) => run || !BUILTINS.has(name))
    .map(([, , name]) => name);
}

test('pnpmScripts finds run and shorthand scripts, skips built-ins and prose', () => {
  assert.deepEqual(
    pnpmScripts(
      '`pnpm run build` `pnpm install` `pnpm verify` pnpm command ```\npnpm run\npnpm exec husky # pnpm al\n```',
    ),
    ['build', 'verify'],
  );
});

for (const file of docFiles) {
  test(`${file}: every pnpm script it mentions exists`, () => {
    const missing = pnpmScripts(readFileSync(join(ROOT, file), 'utf8')).filter((name) => !(name in scripts));
    assert.deepEqual(missing, [], `unknown scripts in ${file}`);
  });
}

test('the troubleshooting table in CONTRIBUTING.md matches recovery.mjs', () => {
  const markdown = readFileSync(TROUBLESHOOTING_FILE, 'utf8');
  assert.equal(withTable(markdown), markdown, 'out of date: run node scripts/troubleshooting.mjs');
});
