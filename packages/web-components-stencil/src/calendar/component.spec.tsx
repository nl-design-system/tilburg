import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcCalendar } from './component';
import { addMonths, parseIsoDate, toIsoDate } from './date';

const render = (html: string) => newSpecPage({ components: [TilburgWbcCalendar], html });
const day = (root: HTMLElement, label: string) =>
  root.querySelector<HTMLButtonElement>(`button[aria-label="${label}"]`)!;
const label = (root: HTMLElement) => root.querySelector('.utrecht-calendar__navigation-label')!;

describe('tilburg-wbc-calendar', () => {
  beforeEach(() => {
    /* Fake only `Date` ("today"): Stencil's render scheduling needs the real timers. */
    jest.useFakeTimers({
      now: new Date(2026, 10, 2, 10),
      doNotFake: [
        'hrtime',
        'nextTick',
        'performance',
        'queueMicrotask',
        'requestAnimationFrame',
        'cancelAnimationFrame',
        'requestIdleCallback',
        'cancelIdleCallback',
        'setImmediate',
        'clearImmediate',
        'setInterval',
        'clearInterval',
        'setTimeout',
        'clearTimeout',
      ],
    });
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it('shares the date helper with React and Angular', () => {
    expect(parseIsoDate('2026-02-31')).toBeNull();
    expect(toIsoDate(addMonths(new Date(2026, 0, 31), 1))).toBe('2026-02-28');
  });

  it('renders the reference DOM in light DOM', async () => {
    const page = await render('<tilburg-wbc-calendar></tilburg-wbc-calendar>');
    const root = page.root!;
    expect(root.shadowRoot).toBeNull();
    expect(label(root).textContent).toBe('november 2026');
    expect(label(root).getAttribute('datetime')).toBe('2026-11');
    const table = root.querySelector('table.utrecht-calendar__table')!;
    expect(table.getAttribute('role')).toBe('grid');
    expect(table.getAttribute('aria-labelledby')).toBe(label(root).id);
    expect(root.querySelector('th')!.getAttribute('abbr')).toBe('maandag');
    expect(root.querySelectorAll('.utrecht-calendar__table-days-item-day').length).toBe(42);
    const today = day(root, 'maandag 2 november 2026');
    expect(today).toHaveClasses([
      'utrecht-button',
      'utrecht-button--subtle',
      'utrecht-calendar__button',
      'utrecht-calendar__table-days-item-day--is-today',
    ]);
    expect(today.getAttribute('aria-current')).toBe('date');
    expect(today.getAttribute('tabindex')).toBe('0');
    expect(day(root, 'maandag 26 oktober 2026')).toHaveClass('utrecht-calendar__table-days-item-day--out-of-the-month');
  });

  it('shows the value, emits tilburgDateSelect and disables days outside min/max', async () => {
    const page = await render(
      '<tilburg-wbc-calendar value="2026-11-12" min="2026-11-09" max="2026-11-27"></tilburg-wbc-calendar>',
    );
    const root = page.root!;
    const selected = day(root, 'donderdag 12 november 2026');
    expect(selected).toHaveClass('utrecht-calendar__table-days-item-day--selected');
    expect(selected.parentElement!.getAttribute('aria-selected')).toBe('true');
    expect(selected.getAttribute('aria-pressed')).toBe('true');
    expect(day(root, 'vrijdag 13 november 2026').hasAttribute('aria-pressed')).toBe(false);
    expect(day(root, 'zondag 8 november 2026').hasAttribute('disabled')).toBe(true);
    expect(day(root, 'zaterdag 28 november 2026').hasAttribute('disabled')).toBe(true);

    const spy = jest.fn();
    root.addEventListener('tilburgDateSelect', (event) => spy((event as CustomEvent<string>).detail));
    day(root, 'vrijdag 20 november 2026').click();
    await page.waitForChanges();
    expect(spy).toHaveBeenCalledWith('2026-11-20');
    expect(day(root, 'vrijdag 20 november 2026')).toHaveClass('utrecht-calendar__table-days-item-day--selected');
  });

  it('moves the tab stop back inside when min changes', async () => {
    const page = await render('<tilburg-wbc-calendar min="2026-11-09"></tilburg-wbc-calendar>');
    const root = page.root!;
    root.setAttribute('min', '2026-11-16');
    await page.waitForChanges();
    expect(day(root, 'maandag 16 november 2026').getAttribute('tabindex')).toBe('0');
  });

  it('keeps the selection when min or max changes', async () => {
    const page = await render('<tilburg-wbc-calendar min="2026-11-09"></tilburg-wbc-calendar>');
    const root = page.root!;
    day(root, 'vrijdag 20 november 2026').click();
    await page.waitForChanges();
    root.setAttribute('min', '2026-11-16');
    await page.waitForChanges();
    expect(day(root, 'vrijdag 20 november 2026')).toHaveClass('utrecht-calendar__table-days-item-day--selected');
  });

  it('moves the focus to the new tab stop when a day outside the shown month is clicked', async () => {
    const page = await render('<tilburg-wbc-calendar></tilburg-wbc-calendar>');
    const root = page.root!;
    /* The mock document has no activeElement: check which button focus() was called on. */
    const focus = jest.spyOn(Object.getPrototypeOf(day(root, 'dinsdag 1 december 2026')), 'focus');
    day(root, 'dinsdag 1 december 2026').click();
    await page.waitForChanges();
    expect(label(root).textContent).toBe('december 2026');
    expect((focus.mock.contexts.at(-1) as HTMLElement).getAttribute('aria-label')).toBe('dinsdag 1 december 2026');
  });

  it('navigates months and years', async () => {
    const page = await render('<tilburg-wbc-calendar next-month-label="Next month"></tilburg-wbc-calendar>');
    const root = page.root!;
    root.querySelector<HTMLButtonElement>('button[aria-label="Next month"]')!.click();
    await page.waitForChanges();
    expect(label(root).textContent).toBe('december 2026');
    root.querySelector<HTMLButtonElement>('button[aria-label="Volgend jaar"]')!.click();
    await page.waitForChanges();
    expect(label(root).textContent).toBe('december 2027');
  });

  it('moves the tab stop with the keyboard', async () => {
    const page = await render('<tilburg-wbc-calendar value="2026-11-30"></tilburg-wbc-calendar>');
    const root = page.root!;
    root.querySelector('table')!.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await page.waitForChanges();
    expect(label(root).textContent).toBe('december 2026');
    expect(day(root, 'dinsdag 1 december 2026').getAttribute('tabindex')).toBe('0');
  });
});
