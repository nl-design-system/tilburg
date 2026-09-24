import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcPage } from './component';

describe('tilburg-wbc-page', () => {
  it('renders a utrecht-page div in light DOM around its content', async () => {
    const page = await newSpecPage({
      components: [TilburgWbcPage],
      html: '<tilburg-wbc-page><p id="p">Tekst</p></tilburg-wbc-page>',
    });
    expect(page.root!.shadowRoot).toBeNull();
    const div = page.root!.querySelector('div.utrecht-page')!;
    expect(div).not.toBeNull();
    expect(div.querySelector('#p')!.textContent).toBe('Tekst');
  });
});
