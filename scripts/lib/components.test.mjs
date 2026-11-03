/* `pnpm run test:scripts`: the component lookup behind pnpm where, dev <name>, test <name> and parity. */
import './test-env.mjs';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';
import { findComponent, isTlb, loadComponents, storyUrl } from './components.mjs';

const components = loadComponents();

test('reads every row of the implementation-status table', () => {
  assert.ok(components.length >= 40);
  assert.ok(components.some((component) => component.slug === 'tooltip'));
});

for (const [query, slug] of [
  ['tooltip', 'tooltip'],
  ['Tooltip', 'tooltip'],
  ['password input', 'password-input'],
  ['PasswordInput', 'password-input'],
  ['tilburg-wbc-tooltip', 'tooltip'],
  ['<tilburg-tooltip>', 'tooltip'],
  ['fieldset', 'form-fieldset'],
  ['Heading1', 'heading'],
  ['button', 'button'],
  ['heading-1', 'heading'],
  ['Form Field Description', 'form-field-description'],
  ['HTML Content', 'html-content'],
]) {
  test(`"${query}" finds ${slug}`, () => {
    assert.equal(findComponent(query, components).component?.slug, slug);
  });
}

test('a name that fits several lists them all', () => {
  assert.ok(findComponent('form', components).matches.length >= 4);
});

test('a typo gets a suggestion', () => {
  assert.equal(findComponent('tooltp', components).suggestions[0]?.slug, 'tooltip');
});

test('nothing to look up, or nothing close: no match and no suggestions, not a crash', () => {
  for (const query of ['', '-', '<>', 'tilburg-', undefined])
    assert.deepEqual(findComponent(query, components).suggestions, []);
  assert.deepEqual(findComponent('zzzzzzzzzzzz', components).suggestions, []);
  assert.deepEqual(findComponent('tooltip', []).suggestions, []);
});

/** requireComponent in a child process: it ends with process.exit, so it cannot run in this one. */
const requireIn = (query) =>
  spawnSync(
    process.execPath,
    [
      '--input-type=module',
      '-e',
      `const { requireComponent } = await import(${JSON.stringify(new URL('./components.mjs', import.meta.url).href)});
       const component = await requireComponent(${JSON.stringify(query)}, 'pnpm where');
       console.log('FOUND ' + component.slug);`,
    ],
    { encoding: 'utf8', timeout: 20_000, env: { ...process.env, CI: '1' } },
  );

test('requireComponent returns the one match', () => {
  const { status, stdout } = requireIn('tooltip');
  assert.equal(status, 0);
  assert.match(stdout, /FOUND tooltip/);
});

test('requireComponent exits 1 on an unknown name, with a suggestion', () => {
  const { status, stdout } = requireIn('tooltp');
  assert.equal(status, 1);
  assert.match(stdout, /No component called "tooltp"/);
  assert.match(stdout, /Did you mean Tooltip\?/);
  assert.match(stdout, /pnpm where tooltip/);
  assert.doesNotMatch(stdout, /FOUND/);
});

test('requireComponent exits 1 on a name that fits several, listing each', () => {
  const { status, stdout } = requireIn('form');
  assert.equal(status, 1);
  assert.match(stdout, /"form" fits \d+ components/);
  assert.match(stdout, /pnpm where form-label/);
  assert.doesNotMatch(stdout, /FOUND/);
});

test('requireComponent exits 1 on nothing close, pointing at the list', () => {
  const { status, stdout } = requireIn('zzzzzzzzzzzz');
  assert.equal(status, 1);
  assert.match(stdout, /pnpm where --list/);
});

test("a React test in a shared file points at that file and at the component's describe()", () => {
  assert.match(findComponent('checkbox', components).component.layers.react.test, /Form\.test\.tsx$/);
  for (const { layers } of components.filter((entry) => entry.layers.react.suite)) {
    const { test: path, suite } = layers.react;
    assert.ok(existsSync(path), path);
    assert.ok(readFileSync(path, 'utf8').includes(`describe('${suite}'`), `${path} has no describe('${suite}')`);
  }
});

test('story ids and the TLB tag are read from the story files', () => {
  const tooltip = findComponent('tooltip', components).component;
  assert.equal(tooltip.layers.react.stories[0].id, 'tilburg-tooltip-react');
  assert.equal(isTlb(tooltip), true);
  assert.equal(isTlb(findComponent('select', components).component), false);
  assert.equal(
    storyUrl('http://localhost:6006', 'tilburg-tooltip'),
    'http://localhost:6006/?path=/docs/tilburg-tooltip--docs',
  );
});

/* pnpm runs its own built-in instead of a package script with the same name as soon as there are arguments
   (`pnpm find tooltip` searched npm; `pnpm help` is always pnpm's help). Keep our commands clear of them. */
const PNPM_BUILTINS = new Set(
  'add audit bin cat-file cat-index config create dedupe deploy dlx doctor env exec fetch find find-hash help import info init install install-test licenses link list ls outdated pack patch patch-commit patch-remove prune publish rebuild remove root search self-update server setup show store unlink update upgrade view why'.split(
    ' ',
  ),
);
test('no command in pnpm commands / pnpm menu collides with a pnpm built-in (setup only works without options)', async () => {
  const { SECTIONS } = await import('./commands.mjs');
  const clashes = SECTIONS.flatMap((section) => section.items.map((item) => item.script)).filter(
    (name) => PNPM_BUILTINS.has(name) && name !== 'setup',
  );
  assert.deepEqual(clashes, []);
});
