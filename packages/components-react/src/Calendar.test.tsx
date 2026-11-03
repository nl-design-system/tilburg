import { fireEvent, render, screen } from '@testing-library/react';
import { Calendar } from './Calendar';
import { addMonths, calendarWeeks, keyTarget, parseIsoDate, toIsoDate, weekdayNames } from './calendar-date';
import '@testing-library/jest-dom';

const day = (label: string) => screen.getByRole('button', { name: label });

describe('calendar-date', () => {
  it('parses and formats ISO dates, rejecting impossible ones', () => {
    expect(toIsoDate(parseIsoDate('2026-11-02')!)).toBe('2026-11-02');
    expect(parseIsoDate('2026-02-31')).toBeNull();
    expect(parseIsoDate('2-11-2026')).toBeNull();
    expect(parseIsoDate(undefined)).toBeNull();
  });

  it('builds six Monday-first weeks', () => {
    const weeks = calendarWeeks(new Date(2026, 10, 15));
    expect(weeks).toHaveLength(6);
    expect(toIsoDate(weeks[0][0])).toBe('2026-10-26');
    expect(toIsoDate(weeks[5][6])).toBe('2026-12-06');
  });

  it('clamps addMonths to the end of the month', () => {
    expect(toIsoDate(addMonths(new Date(2026, 0, 31), 1))).toBe('2026-02-28');
    expect(toIsoDate(addMonths(new Date(2024, 1, 29), 12))).toBe('2025-02-28');
  });

  it('maps the WAI-ARIA date grid keys', () => {
    const wed = new Date(2026, 10, 4);
    expect(toIsoDate(keyTarget(wed, 'ArrowLeft')!)).toBe('2026-11-03');
    expect(toIsoDate(keyTarget(wed, 'ArrowDown')!)).toBe('2026-11-11');
    expect(toIsoDate(keyTarget(wed, 'Home')!)).toBe('2026-11-02');
    expect(toIsoDate(keyTarget(wed, 'End')!)).toBe('2026-11-08');
    expect(toIsoDate(keyTarget(wed, 'PageUp')!)).toBe('2026-10-04');
    expect(toIsoDate(keyTarget(wed, 'PageDown', true)!)).toBe('2027-11-04');
    expect(keyTarget(wed, 'a')).toBeNull();
  });

  it('names the weekdays in Dutch, Monday first', () => {
    expect(weekdayNames('nl-NL')[0]).toEqual({ short: 'ma', long: 'maandag' });
    expect(weekdayNames('nl-NL')[6].long).toBe('zondag');
  });
});

describe('Calendar', () => {
  beforeEach(() => {
    jest.useFakeTimers({ now: new Date(2026, 10, 2, 10) });
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the reference DOM for the month of today', () => {
    const { container } = render(<Calendar />);
    expect(container.firstElementChild).toHaveClass('utrecht-calendar');
    const label = container.querySelector('.utrecht-calendar__navigation-label')!;
    expect(label).toHaveTextContent('november 2026');
    expect(label).toHaveAttribute('datetime', '2026-11');
    expect(label).toHaveAttribute('aria-live', 'polite');
    const grid = screen.getByRole('grid');
    expect(grid).toHaveAttribute('aria-labelledby', label.id);
    expect(container.querySelectorAll('th.utrecht-calendar__table-weeks-item')[0]).toHaveAttribute('abbr', 'maandag');
    expect(container.querySelectorAll('.utrecht-calendar__table-days-item-day')).toHaveLength(42);
    expect(day('maandag 26 oktober 2026')).toHaveClass('utrecht-calendar__table-days-item-day--out-of-the-month');
    const today = day('maandag 2 november 2026');
    expect(today).toHaveClass(
      'utrecht-button',
      'utrecht-button--subtle',
      'utrecht-calendar__button',
      'utrecht-calendar__table-days-item-day--is-today',
    );
    expect(today).toHaveAttribute('aria-current', 'date');
    expect(today).toHaveAttribute('tabindex', '0');
    expect(container.querySelectorAll('[tabindex="0"]')).toHaveLength(1);
    expect(screen.getByRole('button', { name: 'Vorig jaar' })).toHaveClass('utrecht-calendar__button');
  });

  it('shows the selected value and reports a new selection', () => {
    const onDateSelect = jest.fn();
    render(<Calendar value="2026-12-12" onDateSelect={onDateSelect} />);
    const selected = day('zaterdag 12 december 2026');
    expect(selected).toHaveClass('utrecht-calendar__table-days-item-day--selected');
    expect(selected.parentElement).toHaveAttribute('aria-selected', 'true');
    expect(selected).toHaveAttribute('aria-pressed', 'true');
    expect(day('vrijdag 11 december 2026')).not.toHaveAttribute('aria-pressed');
    fireEvent.click(day('vrijdag 18 december 2026'));
    expect(onDateSelect).toHaveBeenCalledWith('2026-12-18');
    expect(day('vrijdag 18 december 2026')).toHaveClass('utrecht-calendar__table-days-item-day--selected');
  });

  it('disables days outside min and max and keeps the tab stop inside', () => {
    render(<Calendar min="2026-11-09" max="2026-11-27" />);
    expect(day('zondag 8 november 2026')).toBeDisabled();
    expect(day('maandag 9 november 2026')).toBeEnabled();
    expect(day('zaterdag 28 november 2026')).toBeDisabled();
    expect(day('maandag 9 november 2026')).toHaveAttribute('tabindex', '0');
  });

  it('moves the tab stop back inside when min changes', () => {
    const { rerender } = render(<Calendar min="2026-11-09" />);
    rerender(<Calendar min="2026-11-16" />);
    expect(day('maandag 16 november 2026')).toHaveAttribute('tabindex', '0');
  });

  it('keeps the selection when min or max changes', () => {
    const { rerender } = render(<Calendar min="2026-11-09" />);
    fireEvent.click(day('vrijdag 20 november 2026'));
    rerender(<Calendar min="2026-11-16" />);
    expect(day('vrijdag 20 november 2026')).toHaveClass('utrecht-calendar__table-days-item-day--selected');
  });

  it('keeps the focus when a day outside the shown month is clicked', () => {
    render(<Calendar />);
    const next = day('dinsdag 1 december 2026');
    next.focus();
    fireEvent.click(next);
    expect(day('dinsdag 1 december 2026')).toHaveFocus();
  });

  it('navigates months and years with the buttons', () => {
    const { container } = render(<Calendar previousMonthLabel="Previous month" />);
    const label = () => container.querySelector('.utrecht-calendar__navigation-label')!;
    fireEvent.click(screen.getByRole('button', { name: 'Volgende maand' }));
    expect(label()).toHaveTextContent('december 2026');
    fireEvent.click(screen.getByRole('button', { name: 'Volgend jaar' }));
    expect(label()).toHaveTextContent('december 2027');
    fireEvent.click(screen.getByRole('button', { name: 'Previous month' }));
    fireEvent.click(screen.getByRole('button', { name: 'Vorig jaar' }));
    expect(label()).toHaveTextContent('november 2026');
  });

  it('moves the focus with the keyboard, across months', () => {
    render(<Calendar value="2026-11-30" />);
    day('maandag 30 november 2026').focus();
    fireEvent.keyDown(screen.getByRole('grid'), { key: 'ArrowRight' });
    const next = day('dinsdag 1 december 2026');
    expect(next).toHaveFocus();
    expect(next).toHaveAttribute('tabindex', '0');
    expect(next).not.toHaveClass('utrecht-calendar__table-days-item-day--out-of-the-month');
  });

  it('passes className and other attributes to the root', () => {
    const { container } = render(<Calendar className="extra" data-testid="kalender" />);
    expect(container.firstElementChild).toHaveClass('utrecht-calendar', 'extra');
    expect(screen.getByTestId('kalender')).toBe(container.firstElementChild);
  });
});
