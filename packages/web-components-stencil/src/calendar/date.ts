/* Date logic for the calendar, on plain `Date` + `Intl` (date-fns is not a dependency). Every `Date` is a local
   calendar day at midnight; ISO strings are `YYYY-MM-DD`. Three identical copies, keep them in sync:
   components-react `src/calendar-date.ts`, components-angular and web-components-stencil `src/calendar/date.ts`. */

const pad = (n: number) => String(n).padStart(2, '0');

export const toIsoDate = (date: Date): string =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

/** `YYYY-MM-DD` → local date, or `null` for anything else (also for impossible dates such as `2026-02-31`). */
export const parseIsoDate = (value?: string | null): Date | null => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value ?? '');
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return toIsoDate(date) === value ? date : null;
};

export const today = (): Date => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

export const addDays = (date: Date, days: number): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);

/** Same day-of-month `months` later, clamped to the last day (31 januari + 1 → 28 februari). */
export const addMonths = (date: Date, months: number): Date => {
  const lastDay = new Date(date.getFullYear(), date.getMonth() + months + 1, 0).getDate();
  return new Date(date.getFullYear(), date.getMonth() + months, Math.min(date.getDate(), lastDay));
};

export const isSameDay = (a: Date | null, b: Date | null): boolean => !!a && !!b && a.getTime() === b.getTime();

export const isSameMonth = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();

export const isOutOfRange = (date: Date, min: Date | null, max: Date | null): boolean =>
  (!!min && date < min) || (!!max && date > max);

export const clampDate = (date: Date, min: Date | null, max: Date | null): Date =>
  min && date < min ? min : max && date > max ? max : date;

/** Days since Monday (Monday 0 … Sunday 6): Dutch weeks start on Monday. */
const weekdayIndex = (date: Date) => (date.getDay() + 6) % 7;

/** The six Monday-first weeks shown for the month of `month`, including days of the adjacent months. */
export const calendarWeeks = (month: Date): Date[][] => {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const start = addDays(first, -weekdayIndex(first));
  return Array.from({ length: 6 }, (_, week) => Array.from({ length: 7 }, (_, day) => addDays(start, week * 7 + day)));
};

/** Monday-first weekday names, e.g. `{ short: 'ma', long: 'maandag' }`. */
export const weekdayNames = (locale: string): { short: string; long: string }[] =>
  calendarWeeks(new Date(2026, 0, 1))[0].map((date) => ({
    short: new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date),
    long: new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date),
  }));

/** "november 2026" */
export const monthLabel = (date: Date, locale: string): string =>
  new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(date);

/** "maandag 2 november 2026" */
export const dayLabel = (date: Date, locale: string): string =>
  new Intl.DateTimeFormat(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(date);

/** WAI-ARIA date grid keys → the date the focus moves to, or `null` for a key the grid does not handle. */
export const keyTarget = (date: Date, key: string, shiftKey = false): Date | null => {
  switch (key) {
    case 'ArrowLeft':
      return addDays(date, -1);
    case 'ArrowRight':
      return addDays(date, 1);
    case 'ArrowUp':
      return addDays(date, -7);
    case 'ArrowDown':
      return addDays(date, 7);
    case 'Home':
      return addDays(date, -weekdayIndex(date));
    case 'End':
      return addDays(date, 6 - weekdayIndex(date));
    case 'PageUp':
      return addMonths(date, shiftKey ? -12 : -1);
    case 'PageDown':
      return addMonths(date, shiftKey ? 12 : 1);
    default:
      return null;
  }
};
