import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcNumberData } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcNumberData], html });

describe('tilburg-wbc-number-data', () => {
  it('renders <data class="utrecht-number-data"> with the number as value', async () => {
    const page = await render('<tilburg-wbc-number-data value="226000">226.000</tilburg-wbc-number-data>');
    const data = page.root!.querySelector('data')!;
    expect(data.className).toBe('utrecht-number-data');
    expect(data.getAttribute('value')).toBe('226000');
    expect(data.textContent).toBe('226.000');
  });

  it('maps variant to the modifier and leaves value off when unset', async () => {
    const page = await render('<tilburg-wbc-number-data variant="negative">−1,5</tilburg-wbc-number-data>');
    const data = page.root!.querySelector('data')!;
    expect(data.classList.contains('utrecht-number-data--negative')).toBe(true);
    expect(data.hasAttribute('value')).toBe(false);
  });

  it('drops value when the attribute is removed (prop becomes null)', async () => {
    const page = await render('<tilburg-wbc-number-data value="1">1</tilburg-wbc-number-data>');
    page.root!.removeAttribute('value');
    await page.waitForChanges();
    expect(page.root!.querySelector('data')!.hasAttribute('value')).toBe(false);
  });
});
