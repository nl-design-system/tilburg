import { newSpecPage } from '@stencil/core/testing';
import { TilburgWebcSeparator } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWebcSeparator], html });

describe('tilburg-webc-separator', () => {
  it('renders an <hr> that stays exposed to assistive technology by default', async () => {
    const page = await render('<tilburg-webc-separator></tilburg-webc-separator>');
    const hr = page.root!.querySelector('hr.utrecht-separator')!;
    expect(hr).not.toBeNull();
    expect(hr.hasAttribute('aria-hidden')).toBe(false);
  });

  it('hides a decorative separator from assistive technology', async () => {
    const page = await render('<tilburg-webc-separator decorative></tilburg-webc-separator>');
    expect(page.root!.querySelector('hr')!.getAttribute('aria-hidden')).toBe('true');
  });
});
