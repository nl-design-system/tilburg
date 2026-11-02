import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
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

@Component({
  selector: 'tilburg-calendar',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgCalendar implements OnChanges {
  /** Selected date, `YYYY-MM-DD`. */
  @Input() value: string | null | undefined;
  /** First selectable date, `YYYY-MM-DD`. */
  @Input() min: string | null | undefined;
  /** Last selectable date, `YYYY-MM-DD`. */
  @Input() max: string | null | undefined;
  @Input() locale = 'nl-NL';
  @Input() previousYearLabel = 'Vorig jaar';
  @Input() previousMonthLabel = 'Vorige maand';
  @Input() nextMonthLabel = 'Volgende maand';
  @Input() nextYearLabel = 'Volgend jaar';

  /** The chosen date, `YYYY-MM-DD`. */
  @Output() dateSelect = new EventEmitter<string>();

  readonly labelId = `tilburg-calendar-${nextId++}-label`;
  readonly icons = icons;
  selected: Date | null = null;
  /** The roving tab stop; its month is the month shown. */
  focused: Date = today();

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly cdr = inject(ChangeDetectorRef);

  private get minDate() {
    return parseIsoDate(this.min);
  }

  private get maxDate() {
    return parseIsoDate(this.max);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this.selected = parseIsoDate(this.value);
    }
    this.focused = clampDate(this.selected ?? this.focused, this.minDate, this.maxDate);
  }

  get monthLabel(): string {
    return monthLabel(this.focused, this.locale);
  }

  get monthDateTime(): string {
    return toIsoDate(this.focused).slice(0, 7);
  }

  get weekdays() {
    return weekdayNames(this.locale);
  }

  get weeks(): Date[][] {
    return calendarWeeks(this.focused);
  }

  dayClass(day: Date): Record<string, boolean> {
    return {
      'utrecht-calendar__table-days-item-day--out-of-the-month': !isSameMonth(day, this.focused),
      'utrecht-calendar__table-days-item-day--is-today': this.isToday(day),
      'utrecht-calendar__table-days-item-day--selected': this.isSelected(day),
    };
  }

  isSelected(day: Date): boolean {
    return isSameDay(day, this.selected);
  }

  isToday(day: Date): boolean {
    return isSameDay(day, today());
  }

  isFocused(day: Date): boolean {
    return isSameDay(day, this.focused);
  }

  isDisabled(day: Date): boolean {
    return isOutOfRange(day, this.minDate, this.maxDate);
  }

  dayLabel(day: Date): string {
    return dayLabel(day, this.locale);
  }

  trackDay(_: number, day: Date): string {
    return toIsoDate(day);
  }

  trackWeek(_: number, week: Date[]): string {
    return toIsoDate(week[0]);
  }

  move(months: number): void {
    this.focused = clampDate(addMonths(this.focused, months), this.minDate, this.maxDate);
  }

  select(day: Date): void {
    this.selected = day;
    this.focused = day;
    this.dateSelect.emit(toIsoDate(day));
  }

  onKeydown(event: KeyboardEvent): void {
    const target = keyTarget(this.focused, event.key, event.shiftKey);
    if (!target) return;
    event.preventDefault();
    const next = clampDate(target, this.minDate, this.maxDate);
    if (isSameDay(next, this.focused)) return;
    this.focused = next;
    this.cdr.detectChanges();
    this.host.nativeElement.querySelector<HTMLButtonElement>('.utrecht-calendar__table button[tabindex="0"]')?.focus();
  }
}
