/* `pnpm run test:scripts`: the component lookup behind pnpm where, dev <name>, test <name> and parity. */
import assert from 'node:assert/strict';
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
