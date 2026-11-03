import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcIbanData } from './component';

describe('tilburg-wbc-iban-data', () => {
  it('renders the normalized IBAN as value and groups of four as text (same as React and Angular)', async () => {
    const page = await newSpecPage({
      components: [TilburgWbcIbanData],
      html: '<tilburg-wbc-iban-data value=" nl91 abna-0417 1643 00 "></tilburg-wbc-iban-data>',
    });
    const data = page.root!.querySelector('data')!;
    expect(data.className).toBe('utrecht-iban-data');
    expect(data.getAttribute('value')).toBe('NL91ABNA0417164300');
    expect(data.getAttribute('translate')).toBe('no');
    expect(data.textContent).toBe('NL91 ABNA 0417 1643 00');

    page.root!.setAttribute('value', 'MU43BOMM0101123456789101000MUR');
    await page.waitForChanges();
    expect(page.root!.querySelector('data')!.textContent).toBe('MU43 BOMM 0101 1234 5678 9101 000M UR');
    const groups = Array.from(
      page.root!.querySelectorAll('data > span.tilburg-iban-data__group'),
      (s) => s.textContent,
    );
    expect(groups).toEqual(['MU43', 'BOMM', '0101', '1234', '5678', '9101', '000M', 'UR']);
  });
});
