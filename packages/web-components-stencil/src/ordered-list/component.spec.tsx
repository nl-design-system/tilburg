import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcOrderedList } from './component';

const components = [TilburgWbcOrderedList];
const render = (html: string) => newSpecPage({ components, html });

describe('tilburg-wbc-ordered-list', () => {
  it('renders the ordered list classes from the HTML reference', async () => {
    const page = await render('<tilburg-wbc-ordered-list><li>Een</li></tilburg-wbc-ordered-list>');
    const ol = page.root!.querySelector('ol')!;
    expect(page.root!.shadowRoot).toBeNull();
    expect(ol).toHaveClasses(['tilburg-ordered-list', 'utrecht-ordered-list', 'utrecht-ordered-list--html-ol']);
    expect(ol).not.toHaveClass('tilburg-ordered-list--by-letter');
  });

  it('adds the by-letter modifier', async () => {
    const page = await render('<tilburg-wbc-ordered-list by-letter><li>Een</li></tilburg-wbc-ordered-list>');
    expect(page.root!.querySelector('ol')).toHaveClass('tilburg-ordered-list--by-letter');
  });

  it('places slotted <li> items as direct children of the <ol>', async () => {
    const page = await render(
      '<tilburg-wbc-ordered-list><li>Een</li><li>Twee</li><li>Drie</li></tilburg-wbc-ordered-list>',
    );
    const items = page.root!.querySelectorAll('ol > li');
    expect(items.length).toBe(3);
    expect(Array.from(items).map((li) => li.textContent)).toEqual(['Een', 'Twee', 'Drie']);
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
    const inner = doc.createElement('tilburg-wbc-ordered-list');
    inner.append(li('Genest 1'), li('Genest 2'));
    const outer = doc.createElement('tilburg-wbc-ordered-list');
    outer.append(li('Boven', inner), li('Volgende'));
    page.body.appendChild(outer);
    await page.waitForChanges();
    const outerList = outer.querySelector('ol')!;
    expect(Array.from(outerList.children).filter((child) => child.tagName === 'LI').length).toBe(2);
    const nested = outerList.querySelector('li > tilburg-wbc-ordered-list > ol')!;
    expect(Array.from(nested.children).map((child) => child.textContent)).toEqual(['Genest 1', 'Genest 2']);
  });

  it('moves aria-label from the host to the <ol>', async () => {
    const page = await render('<tilburg-wbc-ordered-list aria-label="Stappen"><li>Een</li></tilburg-wbc-ordered-list>');
    expect(page.root!.hasAttribute('aria-label')).toBe(false);
    expect(page.root!.querySelector('ol')!.getAttribute('aria-label')).toBe('Stappen');
  });
});
