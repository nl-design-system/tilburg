import { newSpecPage } from '@stencil/core/testing';
import { TilburgWebcPagination } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWebcPagination], html });

const pageNumbers = (root: HTMLElement) =>
  Array.from(root.querySelectorAll('.tilburg-pagination__pages li')).map((li) => li.textContent!.trim());

describe('tilburg-webc-pagination', () => {
  it('renders the nav with four labelled step buttons and icons', async () => {
    const page = await render('<tilburg-webc-pagination></tilburg-webc-pagination>');
    const nav = page.root!.querySelector('nav.tilburg-pagination')!;
    expect(page.root!.shadowRoot).toBeNull();
    expect(nav.getAttribute('aria-label')).toBe('Paginering');
    const steps = nav.querySelectorAll('.tilburg-pagination__controls > button.tilburg-pagination__button');
    expect(Array.from(steps).map((b) => b.getAttribute('aria-label'))).toEqual([
      'Eerste pagina',
      'Vorige pagina',
      'Volgende pagina',
      'Laatste pagina',
    ]);
    expect(steps[0].getAttribute('type')).toBe('button');
    const icon = steps[0].querySelector('svg.tilburg-pagination__icon')!;
    expect(icon.getAttribute('aria-hidden')).toBe('true');
    expect(icon.querySelectorAll('polyline').length).toBe(2);
    expect(steps[1].querySelectorAll('polyline').length).toBe(1);
    expect(nav.querySelector('.tilburg-pagination__feedback')).toBeNull();
    expect(nav.querySelector('.tilburg-pagination__pages')).toBeNull();
    expect(nav.querySelector('.tilburg-pagination__range')).toBeNull();
  });

  it('renders every page up to 7 and marks the current page', async () => {
    const page = await render('<tilburg-webc-pagination page-count="5" current-page="3"></tilburg-webc-pagination>');
    expect(pageNumbers(page.root!)).toEqual(['1', '2', '3', '4', '5']);
    const current = page.root!.querySelector('.tilburg-pagination__page--current')!;
    expect(current).toHaveClass('tilburg-pagination__page');
    expect(current.textContent!.trim()).toBe('3');
    expect(current.getAttribute('aria-current')).toBe('page');
    expect(current.getAttribute('aria-label')).toBe('Pagina 3');
    expect(current.hasAttribute('disabled')).toBe(true);
    expect(page.root!.querySelectorAll('[aria-current]').length).toBe(1);
  });

  it('windows long page lists with ellipses', async () => {
    const page = await render('<tilburg-webc-pagination page-count="12" current-page="5"></tilburg-webc-pagination>');
    expect(pageNumbers(page.root!)).toEqual(['1', '…', '4', '5', '6', '…', '12']);
    const ellipsis = page.root!.querySelector('.tilburg-pagination__ellipsis')!;
    expect(ellipsis.getAttribute('aria-hidden')).toBe('true');
    const start = await render('<tilburg-webc-pagination page-count="12" current-page="1"></tilburg-webc-pagination>');
    expect(pageNumbers(start.root!)).toEqual(['1', '2', '…', '12']);
  });

  it('shows feedback, and the range text only without a page list', async () => {
    const page = await render(
      '<tilburg-webc-pagination feedback="Toont 1–10 van 47" range="Pagina 1 van 5"></tilburg-webc-pagination>',
    );
    expect(page.root!.querySelector('.tilburg-pagination__feedback')!.textContent).toBe('Toont 1–10 van 47');
    expect(page.root!.querySelector('.tilburg-pagination__range')!.textContent).toBe('Pagina 1 van 5');
    const withPages = await render(
      '<tilburg-webc-pagination range="Pagina 1 van 5" page-count="5" current-page="1"></tilburg-webc-pagination>',
    );
    expect(withPages.root!.querySelector('.tilburg-pagination__range')).toBeNull();
  });

  it('disables step buttons and applies custom labels', async () => {
    const page = await render(
      '<tilburg-webc-pagination first-disabled previous-disabled next-label="Next" aria-label="Pages"></tilburg-webc-pagination>',
    );
    const steps = page.root!.querySelectorAll('button.tilburg-pagination__button');
    expect(steps[0].hasAttribute('disabled')).toBe(true);
    expect(steps[1].hasAttribute('disabled')).toBe(true);
    expect(steps[2].hasAttribute('disabled')).toBe(false);
    expect(steps[2].getAttribute('aria-label')).toBe('Next');
    expect(page.root!.hasAttribute('aria-label')).toBe(false);
    expect(page.root!.querySelector('nav')!.getAttribute('aria-label')).toBe('Pages');
  });

  it('uses a custom pageLabel function', async () => {
    const page = await render('<tilburg-webc-pagination page-count="2" current-page="1"></tilburg-webc-pagination>');
    // eslint-disable-next-line no-unused-vars
    (page.root as HTMLElement & { pageLabel: (n: number) => string }).pageLabel = (n) => `Page ${n}`;
    await page.waitForChanges();
    expect(page.root!.querySelector('.tilburg-pagination__page')!.getAttribute('aria-label')).toBe('Page 1');
  });

  it('emits tilburgNavigate for steps and other pages, not for the current page', async () => {
    const page = await render('<tilburg-webc-pagination page-count="5" current-page="3"></tilburg-webc-pagination>');
    const spy = jest.fn();
    page.root!.addEventListener('tilburgNavigate', spy);
    const steps = page.root!.querySelectorAll<HTMLButtonElement>('button.tilburg-pagination__button');
    steps[0].click();
    steps[3].click();
    const pages = page.root!.querySelectorAll<HTMLButtonElement>('button.tilburg-pagination__page');
    pages[3].click();
    // The current page button is disabled; call the handler path via a forced click event anyway.
    pages[2].dispatchEvent(new MouseEvent('click'));
    await page.waitForChanges();
    expect(spy.mock.calls.map((c) => c[0].detail)).toEqual([
      { step: 'first' },
      { step: 'last' },
      { step: 'page', page: 4 },
    ]);
  });
});
