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
   visible text reads fine. */

/** Strips white space and separators (spaces, dashes) and upper-cases: the `value` of the `<data>`. */
export const normalizeIban = (iban: string): string => iban.replace(/[\s+\W]+/g, '').toUpperCase();

/** Groups a normalized IBAN in blocks of four characters: the visible text. */
export const formatIban = (normalizedIban: string): string => normalizedIban.replace(/(.{4})(?!$)/g, '$1 ');

export interface FormattedCurrency {
  /** The amount as a number, for the positive/negative modifier. */
  amount: number;
  /** `value` of the `<data>`: currency code and amount ("EUR 1234.5"). */
  value: string;
  /** Visible text: grouping, non-breaking spaces, U+2212 minus before the currency in Dutch ("− € 85,00"). */
  text: string;
}

export function formatCurrency(amount: number | string, currency: string, locale: string): FormattedCurrency {
  const number = typeof amount === 'string' ? parseFloat(amount) : amount;

  let text = new Intl.NumberFormat(locale, { style: 'currency', currency }).format(number).replace(/-/, '−');
  if ((locale === 'nl' || locale === 'nl-NL') && /−/.test(text)) {
    text = text.replace(/(.+)−(.+)/, '− $1$2');
  }
  text = text.replace(/ /g, ' ');

  return { amount: number, value: `${currency} ${amount}`, text };
}
