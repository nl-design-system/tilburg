import { render } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { CurrencyData } from './CurrencyData';
import { formatCurrency } from './utils/data-format';
import '@testing-library/jest-dom';

describe('CurrencyData', () => {
  it('renders <data> with value, no aria-label and the formatted amount (nl-NL, EUR by default)', () => {
    const { container } = render(<CurrencyData amount={1234.5} className="extra" />);
    const data = container.firstElementChild!;
    expect(data.tagName).toBe('DATA');
    expect(data.className).toBe('utrecht-currency-data utrecht-currency-data--positive extra');
    expect(data).toHaveAttribute('value', 'EUR 1234.5');
    expect(data).not.toHaveAttribute('aria-label');
    expect(data.textContent).toBe('€ 1.234,50');
  });

  it('marks negative amounts and puts the minus before the currency', () => {
    const { container } = render(<CurrencyData amount="-85" />);
    const data = container.firstElementChild!;
    expect(data).toHaveClass('utrecht-currency-data--negative');
    expect(data).toHaveAttribute('value', 'EUR -85');
    expect(data.textContent).toBe('− € 85,00');
  });

  it('adds no modifier for zero, and honours currency and locale', () => {
    const { container, rerender } = render(<CurrencyData amount={0} />);
    expect(container.firstElementChild!.className).toBe('utrecht-currency-data');
    expect(container.firstElementChild).not.toHaveAttribute('lang');
    rerender(<CurrencyData amount={-3} currency="USD" locale="en-US" />);
    expect(container.firstElementChild!.textContent).toBe('−$3.00');
    expect(container.firstElementChild).toHaveAttribute('lang', 'en');
  });

  it('does not throw for an invalid currency or locale, and shows the input as text', () => {
    const { container, rerender } = render(<CurrencyData amount={85} currency="EURO" />);
    expect(container.firstElementChild!.textContent).toBe('EURO 85');
    expect(container.firstElementChild!.className).toBe('utrecht-currency-data');
    rerender(<CurrencyData amount={85} locale="nl_NL" />);
    expect(container.firstElementChild!.textContent).toBe('EUR 85');
  });
});

describe('currency formatting (utils/data-format)', () => {
  it('matches the examples of Utrecht CurrencyData', () => {
    expect(formatCurrency(Number.MIN_SAFE_INTEGER, 'USD', 'en-US').text).toBe('−$9,007,199,254,740,991.00');
    expect(formatCurrency(Number.MIN_SAFE_INTEGER, 'EUR', 'nl-NL').text).toBe('− € 9.007.199.254.740.991,00');
    expect(formatCurrency(Number.MIN_SAFE_INTEGER, 'EUR', 'de-DE').text).toBe('−9.007.199.254.740.991,00 €');
  });

  it('uses the currency’s own number of decimals', () => {
    expect(formatCurrency(1.5, 'JPY', 'en-US').text).toBe('¥2');
    expect(formatCurrency(1.5, 'OMR', 'en-US').text).toContain('1.500');
    expect(formatCurrency(1, 'USD', 'en-US').text).toBe('$1.00');
  });

  it('shows no minus and no negative amount for zero or an amount that rounds to zero', () => {
    expect(formatCurrency(-0, 'USD', 'en-US').text).toBe('$0.00');
    expect(formatCurrency(-0.001, 'EUR', 'nl-NL')).toMatchObject({ text: '€ 0,00', amount: -0 });
    expect(formatCurrency(-0.001, 'EUR', 'nl-NL').amount < 0).toBe(false);
    expect(formatCurrency(-85, 'EUR', 'nl-NL').text).toBe('− € 85,00');
  });

  it('parses strings strictly and falls back to the input text', () => {
    expect(formatCurrency('1234.5', 'EUR', 'nl-NL')).toMatchObject({ value: 'EUR 1234.5', text: '€ 1.234,50' });
    expect(formatCurrency(' 85 ', 'EUR', 'nl-NL').value).toBe('EUR 85');
    for (const amount of ['1.234,50', '1,5', '85abc', '', 'NaN']) {
      expect(formatCurrency(amount, 'EUR', 'nl-NL')).toEqual({ amount: 0, text: `EUR ${amount}` });
    }
    expect(formatCurrency(Infinity, 'EUR', 'nl-NL')).toEqual({ amount: 0, text: 'EUR Infinity' });
    expect(formatCurrency(85, '', 'nl-NL')).toEqual({ amount: 0, value: ' 85', text: ' 85' });
    expect(formatCurrency(85, 'EUR', '').text).toBe('EUR 85');
  });

  it('puts the minus before the currency for every Dutch locale', () => {
    expect(formatCurrency(-85, 'EUR', 'nl-BE').text).toBe('− € 85,00');
    expect(formatCurrency(-85, 'EUR', 'nl-nl').text).toBe('− € 85,00');
  });

  it('gives the language of a non-default locale', () => {
    expect(formatCurrency(1, 'EUR', 'nl-NL').lang).toBeUndefined();
    expect(formatCurrency(1, 'USD', 'en-US').lang).toBe('en');
    expect(formatCurrency(1, 'EUR', 'de-DE').lang).toBe('de');
  });
});

describe('utils/data-format is the same file in every layer', () => {
  it('has identical copies in components-angular and web-components-stencil', () => {
    // eslint-disable-next-line no-undef -- Jest runs this file as CommonJS
    const read = (path: string) => readFileSync(resolve(__dirname, '../..', path), 'utf8');
    const react = read('components-react/src/utils/data-format.ts');
    expect(read('components-angular/src/utils/data-format.ts')).toBe(react);
    expect(read('web-components-stencil/src/utils/data-format.ts')).toBe(react);
  });
});
