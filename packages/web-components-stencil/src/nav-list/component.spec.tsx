import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcNavList, TilburgWbcNavListItem } from './component';

const ITEMS: TilburgWbcNavListItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Wonen', href: '/wonen', current: true },
  { label: 'Afval' },
];

const render = async (items: TilburgWbcNavListItem[] | null, attrs = '') => {
  const page = await newSpecPage({
    components: [TilburgWbcNavList],
    html: `<tilburg-wbc-nav-list ${attrs}></tilburg-wbc-nav-list>`,
  });
  (page.root as HTMLElement & { items: unknown }).items = items;
  await page.waitForChanges();
  return page;
};

describe('tilburg-wbc-nav-list', () => {
  it('renders the HTML reference list with the current page', async () => {
    const page = await render(ITEMS);
    const list = page.root!.querySelector('ul')!;
    expect(list.className).toBe('utrecht-nav-list');
    expect(list.getAttribute('role')).toBe('list');
    const links = page.root!.querySelectorAll('li.utrecht-nav-list__item > a');
    expect(links.length).toBe(3);
    expect(links[0]).toHaveClasses(['utrecht-link', 'utrecht-link--html-a', 'utrecht-nav-list__link']);
    expect(links[0].hasAttribute('aria-current')).toBe(false);
    expect(links[1]).toHaveClass('utrecht-link--current');
    expect(links[1].getAttribute('aria-current')).toBe('page');
    expect(links[2].getAttribute('href')).toBe('#');
  });

  it('adds the center modifier and renders nothing without items', async () => {
    expect((await render(ITEMS, 'center')).root!.querySelector('ul')).toHaveClass('utrecht-nav-list--center');
    expect((await render([])).root!.querySelector('ul')).toBeNull();
    expect((await render(null)).root!.querySelector('ul')).toBeNull();
  });

  it('emits tilburgItemClick with the item and the native event', async () => {
    const page = await render(ITEMS);
    const spy = jest.fn();
    page.root!.addEventListener('tilburgItemClick', spy);
    page.root!.querySelector<HTMLAnchorElement>('a')!.click();
    await page.waitForChanges();
    expect(spy.mock.calls[0][0].detail.item).toBe(ITEMS[0]);
    expect(spy.mock.calls[0][0].detail.event.type).toBe('click');
  });
});
