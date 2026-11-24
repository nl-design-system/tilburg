import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcLinkList } from './component';

const links = [
  { label: 'Afvalkalender', href: '/afval/afvalkalender', current: 'page' as const },
  { label: 'Afvalscheiding', href: 'https://www.milieucentraal.nl', external: true },
];

const render = async (html = '<tilburg-wbc-link-list aria-label="Meer over afval"></tilburg-wbc-link-list>') => {
  const page = await newSpecPage({ components: [TilburgWbcLinkList], html });
  (page.root as HTMLElement & { links: typeof links }).links = links;
  await page.waitForChanges();
  return page;
};

describe('tilburg-wbc-link-list', () => {
  it('renders the HTML reference structure', async () => {
    const page = await render();
    const list = page.root!.querySelector('ul')!;
    expect(list.className).toBe('utrecht-link-list utrecht-link-list--html-ul');
    expect(list.getAttribute('role')).toBe('list');
    expect(list.getAttribute('aria-label')).toBe('Meer over afval');
    expect(page.root!.hasAttribute('aria-label')).toBe(false);
    const items = page.root!.querySelectorAll('ul > li.utrecht-link-list__item');
    expect(items.length).toBe(2);
    const link = items[0].querySelector('a')!;
    expect(link.className).toBe('utrecht-link utrecht-link--html-a utrecht-link-list__link');
    expect(link.getAttribute('href')).toBe('/afval/afvalkalender');
    expect(link.querySelector('svg.utrecht-icon')!.getAttribute('aria-hidden')).toBe('true');
    expect(link.querySelector('.utrecht-link-list__link-text')!.textContent).toBe('Afvalkalender');
  });

  it('maps current and external per link', async () => {
    const page = await render();
    const [first, second] = Array.from(page.root!.querySelectorAll('a'));
    expect(first.getAttribute('aria-current')).toBe('page');
    expect(first.hasAttribute('rel')).toBe(false);
    expect(second.getAttribute('rel')).toBe('external noopener noreferrer');
  });

  it('renders nothing without links', async () => {
    const page = await newSpecPage({
      components: [TilburgWbcLinkList],
      html: '<tilburg-wbc-link-list></tilburg-wbc-link-list>',
    });
    expect(page.root!.querySelector('ul')).toBeNull();
  });
});
