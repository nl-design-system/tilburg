import { newSpecPage } from '@stencil/core/testing';
import { TilburgWebcDocument } from './component';

describe('tilburg-webc-document', () => {
  it('renders a utrecht-document div in light DOM around its content', async () => {
    const page = await newSpecPage({
      components: [TilburgWebcDocument],
      html: '<tilburg-webc-document><p id="p">Tekst</p></tilburg-webc-document>',
    });
    expect(page.root!.shadowRoot).toBeNull();
    const div = page.root!.querySelector('div.utrecht-document')!;
    expect(div).not.toBeNull();
    expect(div.querySelector('#p')!.textContent).toBe('Tekst');
  });
});
