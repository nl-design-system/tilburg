import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcBreadcrumb, TilburgWbcBreadcrumbItem } from './component';

const ITEMS: TilburgWbcBreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Parkeren', href: '/parkeren', data: 42 },
  { label: 'Bewonersvergunning' },
];

const render = async (items: TilburgWbcBreadcrumbItem[] | null, attrs = '') => {
  const page = await newSpecPage({
    components: [TilburgWbcBreadcrumb],
    html: `<tilburg-wbc-breadcrumb ${attrs}></tilburg-wbc-breadcrumb>`,
  });
  (page.root as HTMLElement & { items: unknown }).items = items;
  await page.waitForChanges();
  return page;
};

describe('tilburg-wbc-breadcrumb', () => {
  it('renders the utrecht breadcrumb nav with the default aria-label', async () => {
    const page = await render(ITEMS);
    const nav = page.root!.querySelector('nav')!;
    expect(page.root!.shadowRoot).toBeNull();
    expect(nav).toHaveClasses(['utrecht-breadcrumb-nav', 'tilburg-breadcrumb']);
    expect(nav.getAttribute('aria-label')).toBe('Kruimelpad');
    expect(nav.querySelector('ol')).toHaveClasses([
      'utrecht-breadcrumb-nav__list',
      'utrecht-breadcrumb-nav__list--html-ol',
    ]);
    expect(nav.querySelectorAll('li.utrecht-breadcrumb-nav__item').length).toBe(3);
  });

  it('renders trail links with separators and the last item as current page', async () => {
    const page = await render(ITEMS);
    const links = page.root!.querySelectorAll('a.utrecht-breadcrumb-nav__link');
    expect(links.length).toBe(2);
    expect(links[0].getAttribute('href')).toBe('/');
    expect(links[1].textContent).toBe('Parkeren');
    const separators = page.root!.querySelectorAll('.utrecht-breadcrumb-nav__separator');
    expect(separators.length).toBe(2);
    expect(separators[0].getAttribute('aria-hidden')).toBe('true');
    expect(separators[0].textContent!.trim()).toBe('›');
    const current = page.root!.querySelector('span[aria-current="page"]')!;
    expect(current).toHaveClasses(['utrecht-breadcrumb-nav__link', 'utrecht-breadcrumb-nav__link--current']);
    expect(current.textContent).toBe('Bewonersvergunning');
  });

  it('treats an item with current: true as the current page and falls back to href #', async () => {
    const page = await render([{ label: 'Home' }, { label: 'Nu', current: true }, { label: 'Later', href: '/x' }]);
    expect(page.root!.querySelector('a')!.getAttribute('href')).toBe('#');
    expect(page.root!.querySelectorAll('[aria-current="page"]').length).toBe(2);
  });

  it('renders nothing for empty or missing items', async () => {
    expect((await render([])).root!.querySelector('nav')).toBeNull();
    expect((await render(null)).root!.querySelector('nav')).toBeNull();
  });

  it('moves aria-label from the host to the nav', async () => {
    const page = await render(ITEMS, 'aria-label="Breadcrumb"');
    expect(page.root!.hasAttribute('aria-label')).toBe(false);
    expect(page.root!.querySelector('nav')!.getAttribute('aria-label')).toBe('Breadcrumb');
  });

  it('emits tilburgItemClick with the item and the native event', async () => {
    const page = await render(ITEMS);
    const spy = jest.fn();
    page.root!.addEventListener('tilburgItemClick', spy);
    page.root!.querySelectorAll<HTMLAnchorElement>('a')[1].click();
    await page.waitForChanges();
    expect(spy).toHaveBeenCalledTimes(1);
    const detail = spy.mock.calls[0][0].detail;
    expect(detail.item).toBe(ITEMS[1]);
    expect(detail.event.type).toBe('click');
  });
});
