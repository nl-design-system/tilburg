import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcTopNav, TilburgWbcTopNavItem } from './component';

const ITEMS: TilburgWbcTopNavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Aanvragen', href: '/aanvragen', current: true },
];

const render = async (items: TilburgWbcTopNavItem[] | null, attrs = '') => {
  const page = await newSpecPage({
    components: [TilburgWbcTopNav],
    html: `<tilburg-wbc-top-nav ${attrs}></tilburg-wbc-top-nav>`,
  });
  (page.root as HTMLElement & { items: unknown }).items = items;
  await page.waitForChanges();
  return page;
};

describe('tilburg-wbc-top-nav', () => {
  it('renders the utrecht topnav with the current page', async () => {
    const page = await render(ITEMS);
    const nav = page.root!.querySelector('nav')!;
    expect(nav.className).toBe('utrecht-topnav');
    expect(nav.getAttribute('aria-label')).toBe('Hoofdmenu');
    expect(nav.querySelector('ul')!.className).toBe('utrecht-topnav__list');
    const links = nav.querySelectorAll('li.utrecht-topnav__item > a');
    expect(links[0].className).toBe('utrecht-topnav__link');
    expect(links[1]).toHaveClasses(['utrecht-topnav__link', 'utrecht-topnav__link--current']);
    expect(links[1].getAttribute('aria-current')).toBe('page');
  });

  it('moves aria-label to the nav, renders nothing without items and emits tilburgItemClick', async () => {
    const page = await render(ITEMS, 'aria-label="Menu"');
    expect(page.root!.hasAttribute('aria-label')).toBe(false);
    expect(page.root!.querySelector('nav')!.getAttribute('aria-label')).toBe('Menu');
    const spy = jest.fn();
    page.root!.addEventListener('tilburgItemClick', spy);
    page.root!.querySelector<HTMLAnchorElement>('a')!.click();
    expect(spy.mock.calls[0][0].detail.item).toBe(ITEMS[0]);
    expect((await render([])).root!.querySelector('nav')).toBeNull();
  });
});
