import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcDocument } from './component';

describe('tilburg-wbc-document', () => {
  it('renders a utrecht-document div in light DOM around its content', async () => {
    const page = await newSpecPage({
      components: [TilburgWbcDocument],
      html: '<tilburg-wbc-document><p id="p">Tekst</p></tilburg-wbc-document>',
    });
    expect(page.root!.shadowRoot).toBeNull();
    const div = page.root!.querySelector('div.utrecht-document')!;
    expect(div).not.toBeNull();
    expect(div.querySelector('#p')!.textContent).toBe('Tekst');
  });
});
