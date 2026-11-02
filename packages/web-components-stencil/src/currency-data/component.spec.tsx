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
  });
});
