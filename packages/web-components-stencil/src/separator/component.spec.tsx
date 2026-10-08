import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcSeparator } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcSeparator], html });

describe('tilburg-wbc-separator', () => {
  it('renders an <hr> that stays exposed to assistive technology by default', async () => {
    const page = await render('<tilburg-wbc-separator></tilburg-wbc-separator>');
    const hr = page.root!.querySelector('hr.utrecht-separator')!;
    expect(hr).not.toBeNull();
    expect(hr.hasAttribute('aria-hidden')).toBe(false);
  });

  it('hides a decorative separator from assistive technology', async () => {
    const page = await render('<tilburg-wbc-separator decorative></tilburg-wbc-separator>');
    expect(page.root!.querySelector('hr')!.getAttribute('aria-hidden')).toBe('true');
  });
});
