import { newSpecPage } from '@stencil/core/testing';
import { TilburgWebcUnorderedList } from './component';

const components = [TilburgWebcUnorderedList];
const render = (html: string) => newSpecPage({ components, html });

describe('tilburg-webc-unordered-list', () => {
  it('renders the unordered list classes from the HTML reference', async () => {
    const page = await render('<tilburg-webc-unordered-list><li>Een</li></tilburg-webc-unordered-list>');
    expect(page.root!.shadowRoot).toBeNull();
    expect(page.root!.querySelector('ul')).toHaveClasses([
      'tilburg-unordered-list',
      'utrecht-unordered-list',
      'utrecht-unordered-list--html-ul',
    ]);
  });

  it('places slotted <li> items as direct children of the <ul>', async () => {
    const page = await render(
      '<tilburg-webc-unordered-list><li>Een</li><li class="utrecht-unordered-list__item">Twee</li></tilburg-webc-unordered-list>',
    );
    const items = page.root!.querySelectorAll('ul > li');
    expect(items.length).toBe(2);
    expect(items[1]).toHaveClass('utrecht-unordered-list__item');
  });

  /* Built with DOM APIs (as React/Angular do): the HTML parser closes an open
     `<li>` when it meets a nested `<li>` inside a custom element, so a nested
     list written as static HTML would have its items hoisted out. */
  it('supports nesting inside an item', async () => {
    const page = await newSpecPage({ components, html: '<div></div>' });
    const doc = page.doc;
    const li = (text: string, ...children: Node[]) => {
      const item = doc.createElement('li');
      item.append(text, ...children);
      return item;
    };
    const inner = doc.createElement('tilburg-webc-unordered-list');
    inner.append(li('Genest 1'), li('Genest 2'));
    const outer = doc.createElement('tilburg-webc-unordered-list');
    outer.append(li('Boven', inner), li('Volgende'));
    page.body.appendChild(outer);
    await page.waitForChanges();
    const outerList = outer.querySelector('ul')!;
    expect(Array.from(outerList.children).filter((child) => child.tagName === 'LI').length).toBe(2);
    const nested = outerList.querySelector('li > tilburg-webc-unordered-list > ul')!;
    expect(Array.from(nested.children).map((child) => child.textContent)).toEqual(['Genest 1', 'Genest 2']);
  });

  it('moves aria-label from the host to the <ul>', async () => {
    const page = await render(
      '<tilburg-webc-unordered-list aria-label="Opties"><li>Een</li></tilburg-webc-unordered-list>',
    );
    expect(page.root!.hasAttribute('aria-label')).toBe(false);
    expect(page.root!.querySelector('ul')!.getAttribute('aria-label')).toBe('Opties');
  });
});
