import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcSideNav, TilburgWbcSideNavItem } from './component';

const ITEMS: TilburgWbcSideNavItem[] = [
  { label: 'Afval', href: '/afval' },
  {
    label: 'Parkeren',
    href: '/parkeren',
    children: [
      { label: 'Bewonersvergunning', href: '/b', current: true },
      { label: 'Bezoekersvergunning', href: '/v' },
    ],
  },
  { label: 'Paspoort', current: true },
];

const render = async (items: TilburgWbcSideNavItem[] | null, attrs = '') => {
  const page = await newSpecPage({
    components: [TilburgWbcSideNav],
    html: `<tilburg-wbc-side-nav ${attrs}></tilburg-wbc-side-nav>`,
  });
  (page.root as HTMLElement & { items: unknown }).items = items;
  await page.waitForChanges();
  return page;
};

describe('tilburg-wbc-side-nav', () => {
  it('renders the HTML reference: modifiers for last, parent, child and current', async () => {
    const page = await render(ITEMS);
    const nav = page.root!.querySelector('nav')!;
    expect(nav).toHaveClasses(['utrecht-sidenav', 'utrecht-sidenav--pseudo-elements']);
    expect(nav.getAttribute('aria-label')).toBe('Submenu');
    const top = Array.from(nav.querySelector('ul.utrecht-sidenav__list')!.children);
    expect(top.length).toBe(3);
    expect(top[0].className).toBe('utrecht-sidenav__item');
    expect(top[2]).toHaveClasses(['utrecht-sidenav__item', 'utrecht-sidenav__item--last']);
    expect(top[1].querySelector('a')).toHaveClasses(['utrecht-sidenav__link', 'utrecht-sidenav__link--parent']);
    expect(top[2].querySelector('a')).toHaveClasses(['utrecht-sidenav__link', 'utrecht-sidenav__link--current']);
    expect(top[2].querySelector('a')!.getAttribute('href')).toBe('#');
    expect(top[1].querySelector('ul')).toHaveClasses(['utrecht-sidenav__list', 'utrecht-sidenav__list--child']);
    const children = top[1].querySelectorAll('li.utrecht-sidenav__item.utrecht-sidenav__item--child > a');
    expect(children[0]).toHaveClasses([
      'utrecht-sidenav__link',
      'utrecht-sidenav__link--child',
      'utrecht-sidenav__link--current',
      'utrecht-sidenav__link--current-child',
    ]);
    expect(children[0].getAttribute('aria-current')).toBe('page');
    expect(children[1]).not.toHaveClass('utrecht-sidenav__link--current');
    expect(nav.querySelectorAll('.utrecht-sidenav__item-separator').length).toBe(3);
  });

  it('moves aria-label to the nav, emits tilburgItemClick for child links and renders nothing without items', async () => {
    const page = await render(ITEMS, 'aria-label="In dit onderdeel"');
    expect(page.root!.hasAttribute('aria-label')).toBe(false);
    expect(page.root!.querySelector('nav')!.getAttribute('aria-label')).toBe('In dit onderdeel');
    const spy = jest.fn();
    page.root!.addEventListener('tilburgItemClick', spy);
    page.root!.querySelectorAll<HTMLAnchorElement>('.utrecht-sidenav__link--child')[1].click();
    expect(spy.mock.calls[0][0].detail.item).toBe(ITEMS[1].children![1]);
    expect((await render([])).root!.querySelector('nav')).toBeNull();
  });
});
