import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcUrlData } from './component';

describe('tilburg-wbc-url-data', () => {
  it('renders <bdi class="utrecht-url-data" translate="no">', async () => {
    const page = await newSpecPage({
      components: [TilburgWbcUrlData],
      html: '<tilburg-wbc-url-data>https://www.tilburg.nl/afval</tilburg-wbc-url-data>',
    });
    const bdi = page.root!.querySelector('bdi.utrecht-url-data')!;
    expect(bdi.getAttribute('translate')).toBe('no');
    expect(bdi.textContent).toBe('https://www.tilburg.nl/afval');
  });
});
