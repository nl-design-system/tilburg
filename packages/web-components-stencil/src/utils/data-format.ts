/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

/* IBAN and currency formatting, ported from `IBANData` and `CurrencyData` in
   @utrecht/component-library-react 4.2.0. The same file lives in
   components-react, components-angular and web-components-stencil
   (`src/utils/data-format.ts`) so every layer renders the same text; keep the
   three copies identical (a React test compares them). Unlike Utrecht there is
   no compact `aria-label`: ARIA prohibits it on `<data>` (role generic), and the
   visible text reads fine. Also unlike Utrecht: amounts are parsed strictly, an
   invalid currency or locale shows the input as text instead of throwing, zero
   gets no minus, and IBAN groups are separate so they can wrap between them. */

/** Keeps letters A–Z and digits only, upper-cased: the `value` of the `<data>`. */
export const normalizeIban = (iban: string): string => iban.replace(/[^A-Za-z0-9]+/g, '').toUpperCase();

/** Splits a normalized IBAN in groups of four characters: each group is a `nowrap` span, so a long IBAN wraps
    between groups only. */
export const ibanGroups = (normalizedIban: string): string[] => normalizedIban.match(/.{1,4}/g) ?? [];

export interface FormattedCurrency {
  /** The amount rounded as shown, for the positive/negative modifier (0 when it cannot be formatted). */
  amount: number;
  /** `value` of the `<data>`: currency code and amount ("EUR 1234.5"); undefined when the amount is not a number. */
  value?: string;
  /** Visible text: grouping, non-breaking spaces, U+2212 minus before the currency in Dutch ("− € 85,00"). */
  text: string;
  /** Language of the text, for `lang` on the `<data>`; only set when the locale is not the default `nl-NL`. */
  lang?: string;
}

export function formatCurrency(amount: number | string, currency: string, locale: string): FormattedCurrency {
  // Strict: "1.234,50", "1,5" and "85abc" are not numbers (parseFloat would read 1.234, 1 and 85).
  const number = typeof amount === 'string' ? (amount.trim() === '' ? NaN : Number(amount)) : amount;
  const fallback = { amount: 0, text: `${currency} ${amount}` };
  if (!Number.isFinite(number)) return fallback;

  // `signDisplay: 'negative'` (no minus for zero) is ES2023; not every layer's TypeScript `lib` knows it yet.
  const options = { style: 'currency', currency, signDisplay: 'negative' };
  let format: Intl.NumberFormat;
  try {
    format = new Intl.NumberFormat(locale, options as Intl.NumberFormatOptions);
  } catch {
    // RangeError for an unknown currency ("EURO") or a malformed locale ("nl_NL"): show the input as text.
    return { ...fallback, value: `${currency} ${number}` };
  }
  const { locale: resolvedLocale, maximumFractionDigits } = format.resolvedOptions();

  let text = format.format(number).replace(/-/, '−');
  if (/^nl\b/i.test(locale) && /−/.test(text)) {
    text = text.replace(/(.+)−(.+)/, '− $1$2');
  }
  text = text.replace(/ /g, ' ');

  return {
    amount: Number(number.toFixed(maximumFractionDigits ?? 2)),
    value: `${currency} ${number}`,
    text,
    lang: locale === 'nl-NL' ? undefined : resolvedLocale.split('-')[0],
  };
}
