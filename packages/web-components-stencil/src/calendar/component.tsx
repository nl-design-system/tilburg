/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, Event, EventEmitter, FunctionalComponent, h, Prop, State, Watch } from '@stencil/core';
import {
  addMonths,
  calendarWeeks,
  clampDate,
  dayLabel,
  isOutOfRange,
  isSameDay,
  isSameMonth,
  keyTarget,
  monthLabel,
  parseIsoDate,
  today,
  toIsoDate,
  weekdayNames,
} from './date';

let nextId = 0;

const icons = {
  previousYear: [
    'M17.59 18 19 16.59 14.42 12 19 7.41 17.59 6l-6 6 6 6Z',
    'm11 18 1.41-1.41L7.83 12l4.58-4.59L11 6l-6 6 6 6Z',
  ],
  previousMonth: ['M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41Z'],
  nextMonth: ['M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41Z'],
  nextYear: ['M6.41 6 5 7.41 9.58 12 5 16.59 6.41 18l6-6-6-6Z', 'm13 6-1.41 1.41L16.17 12l-4.58 4.59L13 18l6-6-6-6Z'],
};

const NavButton: FunctionalComponent<{ label: string; paths: string[]; onClick: () => void }> = ({
  label,
  paths,
  onClick,
}) => (
  <button
    type="button"
    class="utrecht-button utrecht-button--subtle utrecht-calendar__button"
    aria-label={label}
    onClick={onClick}
  >
    <span class="utrecht-calendar__icon">
      <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
        {paths.map((d) => (
          <path d={d}></path>
        ))}
      </svg>
    </span>
  </button>
);

@Component({
  tag: 'tilburg-wbc-calendar',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcCalendar {
  @Element() host!: HTMLElement;

  /** Selected date, `YYYY-MM-DD`. */
  @Prop() value?: string | null;
  /** First selectable date, `YYYY-MM-DD`. */
  @Prop() min?: string | null;
  /** Last selectable date, `YYYY-MM-DD`. */
  @Prop() max?: string | null;
  @Prop() locale = 'nl-NL';
  @Prop() previousYearLabel = 'Vorig jaar';
  @Prop() previousMonthLabel = 'Vorige maand';
  @Prop() nextMonthLabel = 'Volgende maand';
  @Prop() nextYearLabel = 'Volgend jaar';

  /** The chosen date, `YYYY-MM-DD`. */
  @Event() tilburgDateSelect!: EventEmitter<string>;

  @State() selected: Date | null = null;
  /** The roving tab stop; its month is the month shown. */
  @State() focused: Date = today();

  private readonly labelId = `tilburg-wbc-calendar-${nextId++}-label`;
  private moveFocus = false;

  private get minDate() {
    return parseIsoDate(this.min);
  }

  private get maxDate() {
    return parseIsoDate(this.max);
  }

  componentWillLoad() {
    this.onValue();
  }

  /* min/max too: the tab stop must stay on an enabled day (like the Angular `ngOnChanges`). */
  @Watch('value')
  @Watch('min')
  @Watch('max')
  onValue() {
    this.selected = parseIsoDate(this.value);
    this.focused = clampDate(this.selected ?? this.focused, this.minDate, this.maxDate);
  }

  componentDidRender() {
    if (!this.moveFocus) return;
    this.moveFocus = false;
    this.host.querySelector<HTMLButtonElement>('.utrecht-calendar__table button[tabindex="0"]')?.focus();
  }

  private go(months: number) {
    this.focused = clampDate(addMonths(this.focused, months), this.minDate, this.maxDate);
  }

  private select(day: Date) {
    this.selected = day;
    this.focused = day;
    this.tilburgDateSelect.emit(toIsoDate(day));
  }

  private onKeyDown = (event: KeyboardEvent) => {
    const target = keyTarget(this.focused, event.key, event.shiftKey);
    if (!target) return;
    event.preventDefault();
    const next = clampDate(target, this.minDate, this.maxDate);
    if (isSameDay(next, this.focused)) return;
    this.moveFocus = true;
    this.focused = next;
  };

  render() {
    const now = today();
    return (
      <div class="utrecht-calendar">
        <div class="utrecht-calendar__navigation">
          <div class="utrecht-calendar__navigation-buttons">
            <NavButton label={this.previousYearLabel} paths={icons.previousYear} onClick={() => this.go(-12)} />
            <div class="utrecht-calendar__navigation-buttons">
              <NavButton label={this.previousMonthLabel} paths={icons.previousMonth} onClick={() => this.go(-1)} />
              <time
                class="utrecht-calendar__navigation-label"
                id={this.labelId}
                dateTime={toIsoDate(this.focused).slice(0, 7)}
                aria-live="polite"
              >
                {monthLabel(this.focused, this.locale)}
              </time>
              <NavButton label={this.nextMonthLabel} paths={icons.nextMonth} onClick={() => this.go(1)} />
            </div>
            <NavButton label={this.nextYearLabel} paths={icons.nextYear} onClick={() => this.go(12)} />
          </div>
        </div>
        <table class="utrecht-calendar__table" role="grid" aria-labelledby={this.labelId} onKeyDown={this.onKeyDown}>
          <thead class="utrecht-calendar__table-weeks-container">
            <tr class="utrecht-calendar__table-weeks-container-content">
              {weekdayNames(this.locale).map(({ short, long }) => (
                <th class="utrecht-calendar__table-weeks-item" scope="col" abbr={long}>
                  {short}
                </th>
              ))}
            </tr>
          </thead>
          <tbody class="utrecht-calendar__table-days-container">
            {calendarWeeks(this.focused).map((week) => (
              <tr key={toIsoDate(week[0])}>
                {week.map((day) => {
                  const isSelected = isSameDay(day, this.selected);
                  const isToday = isSameDay(day, now);
                  return (
                    <td key={toIsoDate(day)} aria-selected={isSelected ? 'true' : undefined}>
                      <button
                        type="button"
                        class={{
                          'utrecht-button': true,
                          'utrecht-button--subtle': true,
                          'utrecht-calendar__button': true,
                          'utrecht-calendar__table-days-item-day': true,
                          'utrecht-calendar__table-days-item-day--out-of-the-month': !isSameMonth(day, this.focused),
                          'utrecht-calendar__table-days-item-day--is-today': isToday,
                          'utrecht-calendar__table-days-item-day--selected': isSelected,
                        }}
                        tabIndex={isSameDay(day, this.focused) ? 0 : -1}
                        aria-label={dayLabel(day, this.locale)}
                        aria-current={isToday ? 'date' : undefined}
                        disabled={isOutOfRange(day, this.minDate, this.maxDate)}
                        onClick={() => this.select(day)}
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
  }
}
