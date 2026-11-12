/* `node --test scripts/`: the HTML → wrapper-template conversion `pnpm new` builds on. */
import '../lib/test-env.mjs';
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { angularTemplate, parseRoot, reactTemplate, stencilTemplate, toJsx } from './markup.mjs';

test('parseRoot reads one root element: tag, attributes, content, and whether the content holds elements', () => {
  assert.deepEqual(parseRoot('  <div class="utrecht-note" aria-live="polite" hidden>Inhoud</div>\n'), {
    tag: 'div',
    attrs: [
      ['class', 'utrecht-note'],
      ['aria-live', 'polite'],
      ['hidden', null],
    ],
    inner: 'Inhoud',
    hasElements: false,
    void: false,
  });
  assert.equal(parseRoot('<ul class="a"><li>x</li></ul>').hasElements, true);
  assert.deepEqual(parseRoot('<hr class="utrecht-separator" />'), {
    tag: 'hr',
    attrs: [['class', 'utrecht-separator']],
    inner: '',
    hasElements: false,
    void: true,
  });
  assert.throws(() => parseRoot('tekst <p>x</p>'), /one element/);
  assert.throws(() => parseRoot('<p>x</p><p>y</p>'), /one root element/);
  assert.throws(() => parseRoot('<hr /> na'), /one root element/);
});

test('toJsx renames the attributes React spells differently, self-closes void elements, keeps aria and data', () => {
  assert.equal(
    toJsx('<label for="a" class="x" tabindex="0" aria-label="L" data-id="1">T<br><input disabled></label>'),
    '<label htmlFor="a" className="x" tabIndex="0" aria-label="L" data-id="1">T<br /><input disabled /></label>',
  );
  assert.equal(
    toJsx('<p style="margin-block-end: 0; color: red">x</p>'),
    "<p style={{ marginBlockEnd: '0', color: 'red' }}>x</p>",
  );
  assert.equal(toJsx('<!-- a --><b class="c">d</b>', { react: false }), '{/* a */}<b class="c">d</b>');
});

test('the three templates render the same markup, with the children slot of each framework', () => {
  const root = parseRoot('<span class="utrecht-badge" role="status">Nieuw</span>');
  assert.equal(
    reactTemplate(root),
    `<span ref={ref} className={clsx('utrecht-badge', className)} role="status" {...restProps}>\n  {children}\n</span>`,
  );
  assert.equal(angularTemplate(root), '<span class="utrecht-badge" role="status"><ng-content></ng-content></span>');
  assert.equal(stencilTemplate(root), '<span class="utrecht-badge" role="status">\n  <slot />\n</span>');

  const nested = parseRoot('<div class="utrecht-card">\n  <h2 class="utrecht-heading-2">Titel</h2>\n</div>');
  assert.equal(
    reactTemplate(nested),
    `<div ref={ref} className={clsx('utrecht-card', className)} {...restProps}>\n  <h2 className="utrecht-heading-2">Titel</h2>\n</div>`,
  );
  assert.equal(
    angularTemplate(nested),
    '<div class="utrecht-card">\n  <h2 class="utrecht-heading-2">Titel</h2>\n</div>',
  );
  assert.equal(
    stencilTemplate(nested),
    '<div class="utrecht-card">\n  <h2 class="utrecht-heading-2">Titel</h2>\n</div>',
  );

  const hr = parseRoot('<hr class="utrecht-separator" aria-hidden="true" />');
  assert.equal(
    reactTemplate(hr),
    `<hr ref={ref} className={clsx('utrecht-separator', className)} aria-hidden="true" {...restProps} />`,
  );
  assert.equal(angularTemplate(hr), '<hr class="utrecht-separator" aria-hidden="true" />');
  assert.equal(stencilTemplate(hr), '<hr class="utrecht-separator" aria-hidden="true" />');
});
