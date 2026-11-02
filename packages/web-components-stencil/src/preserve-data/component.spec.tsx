import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcPreserveData } from './component';

const render = async (html: string) =>
  (await newSpecPage({ components: [TilburgWbcPreserveData], html })).root!.querySelector('.utrecht-preserve-data')!;

describe('tilburg-wbc-preserve-data', () => {
  it('renders a bdi with translate="no"', async () => {
    const el = await render('<tilburg-wbc-preserve-data>J. de Vries</tilburg-wbc-preserve-data>');
    expect(el.tagName).toBe('BDI');
    expect(el.getAttribute('translate')).toBe('no');
    expect(el.textContent).toContain('J. de Vries');
    expect(el.querySelector('bdi')).toBeNull();
  });

  it('renders a data element with value around the bdi', async () => {
    const el = await render('<tilburg-wbc-preserve-data value="5038 AB">5038 AB</tilburg-wbc-preserve-data>');
    expect(el.tagName).toBe('DATA');
    expect(el.getAttribute('value')).toBe('5038 AB');
    expect(el.querySelector('bdi')!.getAttribute('translate')).toBe('no');
    expect(el.querySelector('bdi')!.textContent).toContain('5038 AB');
  });

  it('renders a time element when date-time is set, also with a value', async () => {
    const el = await render(
      '<tilburg-wbc-preserve-data date-time="2026-05-19" value="x">19 mei 2026</tilburg-wbc-preserve-data>',
    );
    expect(el.tagName).toBe('TIME');
    expect(el.getAttribute('datetime')).toBe('2026-05-19');
    expect(el.hasAttribute('value')).toBe(false);
    expect(el.querySelector('bdi')).not.toBeNull();
  });
});
