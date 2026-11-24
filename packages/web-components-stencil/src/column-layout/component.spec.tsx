import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcColumnLayout } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcColumnLayout], html });

describe('tilburg-wbc-column-layout', () => {
  it('renders the HTML/CSS reference markup in light DOM', async () => {
    const page = await render('<tilburg-wbc-column-layout><p>Tekst</p></tilburg-wbc-column-layout>');
    const layout = page.root!.querySelector('div')!;
    expect(layout.className).toBe('utrecht-column-layout');
    expect(layout.querySelector('p')!.textContent).toBe('Tekst');
  });

  it('draws a rule with rule', async () => {
    const page = await render('<tilburg-wbc-column-layout rule></tilburg-wbc-column-layout>');
    expect(page.root!.querySelector('div')).toHaveClass('utrecht-column-layout--rule');
  });
});
