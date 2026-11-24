import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcBackdrop } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcBackdrop], html });

describe('tilburg-wbc-backdrop', () => {
  it('renders the HTML/CSS reference markup in light DOM', async () => {
    const page = await render('<tilburg-wbc-backdrop><span>x</span></tilburg-wbc-backdrop>');
    expect(page.root!.shadowRoot).toBeNull();
    const backdrop = page.root!.querySelector('div')!;
    expect(backdrop.className).toBe('utrecht-backdrop');
    expect(backdrop.querySelector('span')!.textContent).toBe('x');
  });

  it('covers the viewport with viewport', async () => {
    const page = await render('<tilburg-wbc-backdrop viewport></tilburg-wbc-backdrop>');
    expect(page.root!.querySelector('div')).toHaveClasses(['utrecht-backdrop', 'utrecht-backdrop--viewport']);
  });
});
