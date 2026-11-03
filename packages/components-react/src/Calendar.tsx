import '@gemeente-tilburg/components-css/calendar/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, KeyboardEvent, useEffect, useId, useRef, useState } from 'react';
import {
  addMonths,
  calendarWeeks,
  clampDate,
  dayLabel,
  today as getToday,
  isOutOfRange,
  isSameDay,
  isSameMonth,
  keyTarget,
  monthLabel,
  parseIsoDate,
  toIsoDate,
  weekdayNames,
} from './calendar-date';

export interface CalendarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Selected date, `YYYY-MM-DD`. */
  value?: string | null;
  /** First selectable date, `YYYY-MM-DD`. */
  min?: string | null;
  /** Last selectable date, `YYYY-MM-DD`. */
  max?: string | null;
  locale?: string;
  previousYearLabel?: string;
  previousMonthLabel?: string;
  nextMonthLabel?: string;
  nextYearLabel?: string;
  /** Called with the chosen date as `YYYY-MM-DD`. */
  onDateSelect?: (date: string) => void;
}

const icons = {
  previousYear: [
    'M17.59 18 19 16.59 14.42 12 19 7.41 17.59 6l-6 6 6 6Z',
    'm11 18 1.41-1.41L7.83 12l4.58-4.59L11 6l-6 6 6 6Z',
  ],
  previousMonth: ['M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41Z'],
  nextMonth: ['M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41Z'],
  nextYear: ['M6.41 6 5 7.41 9.58 12 5 16.59 6.41 18l6-6-6-6Z', 'm13 6-1.41 1.41L16.17 12l-4.58 4.59L13 18l6-6-6-6Z'],
};

const NavButton = ({ label, paths, onClick }: { label: string; paths: string[]; onClick: () => void }) => (
  <button
    type="button"
    className="utrecht-button utrecht-button--subtle utrecht-calendar__button"
    aria-label={label}
    onClick={onClick}
  >
    <span className="utrecht-calendar__icon">
      <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
        {paths.map((d) => (
          <path key={d} d={d} />
        ))}
      </svg>
    </span>
  </button>
);

export const Calendar = forwardRef(
  (
    {
      value,
      min,
      max,
      locale = 'nl-NL',
      previousYearLabel = 'Vorig jaar',
      previousMonthLabel = 'Vorige maand',
      nextMonthLabel = 'Volgende maand',
      nextYearLabel = 'Volgend jaar',
      onDateSelect,
      className,
      ...restProps
    }: CalendarProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const minDate = parseIsoDate(min);
    const maxDate = parseIsoDate(max);
    const [selected, setSelected] = useState(() => parseIsoDate(value));
    /* The roving tab stop; its month is the month shown. */
    const [focused, setFocused] = useState(() => clampDate(parseIsoDate(value) ?? getToday(), minDate, maxDate));
    const moveFocus = useRef(false);
    const tableRef = useRef<HTMLTableElement>(null);
    const labelId = useId();

    /* Like the Angular `ngOnChanges`: only `value` resets the selection; `min` / `max` keep the user's selection and
       only move the tab stop onto an enabled day. */
    useEffect(() => {
      setSelected(parseIsoDate(value));
    }, [value]);

    useEffect(() => {
      setFocused((current) => clampDate(parseIsoDate(value) ?? current, parseIsoDate(min), parseIsoDate(max)));
    }, [value, min, max]);

    useEffect(() => {
      if (!moveFocus.current) return;
      moveFocus.current = false;
      tableRef.current?.querySelector<HTMLButtonElement>('button[tabindex="0"]')?.focus();
    }, [focused]);

    const go = (date: Date) => setFocused(clampDate(date, minDate, maxDate));

    const select = (date: Date) => {
      setSelected(date);
      setFocused(date);
      onDateSelect?.(toIsoDate(date));
    };

    const onKeyDown = (event: KeyboardEvent<HTMLTableElement>) => {
      const target = keyTarget(focused, event.key, event.shiftKey);
      if (!target) return;
      event.preventDefault();
      const next = clampDate(target, minDate, maxDate);
      if (isSameDay(next, focused)) return;
      moveFocus.current = true;
      setFocused(next);
    };

    const today = getToday();

    return (
      <div ref={ref} className={clsx('utrecht-calendar', className)} {...restProps}>
        <div className="utrecht-calendar__navigation">
          <div className="utrecht-calendar__navigation-buttons">
            <NavButton
              label={previousYearLabel}
              paths={icons.previousYear}
              onClick={() => go(addMonths(focused, -12))}
            />
            <div className="utrecht-calendar__navigation-buttons">
              <NavButton
                label={previousMonthLabel}
                paths={icons.previousMonth}
                onClick={() => go(addMonths(focused, -1))}
              />
              <time
                className="utrecht-calendar__navigation-label"
                id={labelId}
                dateTime={toIsoDate(focused).slice(0, 7)}
                aria-live="polite"
              >
                {monthLabel(focused, locale)}
              </time>
              <NavButton label={nextMonthLabel} paths={icons.nextMonth} onClick={() => go(addMonths(focused, 1))} />
            </div>
            <NavButton label={nextYearLabel} paths={icons.nextYear} onClick={() => go(addMonths(focused, 12))} />
          </div>
        </div>
        <table
          ref={tableRef}
          className="utrecht-calendar__table"
          role="grid"
          aria-labelledby={labelId}
          onKeyDown={onKeyDown}
        >
          <thead className="utrecht-calendar__table-weeks-container">
            <tr className="utrecht-calendar__table-weeks-container-content">
              {weekdayNames(locale).map(({ short, long }) => (
                <th key={long} className="utrecht-calendar__table-weeks-item" scope="col" abbr={long}>
                  {short}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="utrecht-calendar__table-days-container">
            {calendarWeeks(focused).map((week) => (
              <tr key={toIsoDate(week[0])}>
                {week.map((day) => {
                  const isSelected = isSameDay(day, selected);
                  const isToday = isSameDay(day, today);
                  return (
                    <td key={toIsoDate(day)} aria-selected={isSelected ? 'true' : undefined}>
                      <button
                        type="button"
                        className={clsx(
                          'utrecht-button utrecht-button--subtle utrecht-calendar__button utrecht-calendar__table-days-item-day',
                          {
                            'utrecht-calendar__table-days-item-day--out-of-the-month': !isSameMonth(day, focused),
                            'utrecht-calendar__table-days-item-day--is-today': isToday,
                            'utrecht-calendar__table-days-item-day--selected': isSelected,
                          },
                        )}
                        tabIndex={isSameDay(day, focused) ? 0 : -1}
                        aria-label={dayLabel(day, locale)}
                        aria-pressed={isSelected ? 'true' : undefined}
                        aria-current={isToday ? 'date' : undefined}
                        disabled={isOutOfRange(day, minDate, maxDate)}
                        onClick={() => select(day)}
                      >
                        {day.getDate()}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
);

Calendar.displayName = 'Calendar';
