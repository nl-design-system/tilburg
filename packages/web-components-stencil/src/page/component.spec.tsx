import { newSpecPage } from '@stencil/core/testing';
import { TilburgWebcPage } from './component';

describe('tilburg-webc-page', () => {
  it('renders a utrecht-page div in light DOM around its content', async () => {
    const page = await newSpecPage({
      components: [TilburgWebcPage],
      html: '<tilburg-webc-page><p id="p">Tekst</p></tilburg-webc-page>',
    });
    expect(page.root!.shadowRoot).toBeNull();
    const div = page.root!.querySelector('div.utrecht-page')!;
    expect(div).not.toBeNull();
    expect(div.querySelector('#p')!.textContent).toBe('Tekst');
  });
});
