import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcCurrencyData } from './component';

const render = async (attributes: string) => {
  const page = await newSpecPage({
    components: [TilburgWbcCurrencyData],
    html: `<tilburg-wbc-currency-data ${attributes}></tilburg-wbc-currency-data>`,
  });
  return page.root!.querySelector('data')!;
};

describe('tilburg-wbc-currency-data', () => {
  it('renders value, no aria-label and the formatted amount (same as React and Angular)', async () => {
    const data = await render('amount="1234.5"');
    expect(data.className).toBe('utrecht-currency-data utrecht-currency-data--positive');
    expect(data.getAttribute('value')).toBe('EUR 1234.5');
    expect(data.hasAttribute('aria-label')).toBe(false);
    expect(data.textContent).toBe('€ 1.234,50');
  });

  it('marks negative amounts and puts the minus before the currency', async () => {
    const data = await render('amount="-85"');
    expect(data.className).toBe('utrecht-currency-data utrecht-currency-data--negative');
    expect(data.getAttribute('value')).toBe('EUR -85');
    expect(data.textContent).toBe('− € 85,00');
  });

  it('adds no modifier for zero, and honours currency and locale', async () => {
    expect((await render('amount="0"')).className).toBe('utrecht-currency-data');
    const data = await render('amount="-3" currency="USD" locale="en-US"');
    expect(data.textContent).toBe('−$3.00');
    expect(data.getAttribute('lang')).toBe('en');
  });

  it('does not throw for an invalid currency or a Dutch-notation amount, and shows the input as text', async () => {
    const data = await render('amount="85" currency="EURO"');
    expect(data.className).toBe('utrecht-currency-data');
    expect(data.textContent).toBe('EURO 85');
    const dutch = await render('amount="1.234,50"');
    expect(dutch.textContent).toBe('EUR 1.234,50');
    expect(dutch.hasAttribute('value')).toBe(false);
  });

  it('shows no minus and no negative modifier for an amount that rounds to zero', async () => {
    const data = await render('amount="-0.001"');
    expect(data.className).toBe('utrecht-currency-data');
    expect(data.textContent).toBe('€ 0,00');
  });
});
