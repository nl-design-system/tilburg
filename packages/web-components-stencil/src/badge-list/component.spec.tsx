import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcBadgeList } from './component';

describe('tilburg-wbc-badge-list', () => {
  it('renders a div.utrecht-badge-list around its badges', async () => {
    const page = await newSpecPage({
      components: [TilburgWbcBadgeList],
      html: '<tilburg-wbc-badge-list id="l"><span class="utrecht-data-badge">Parkeren</span></tilburg-wbc-badge-list>',
    });
    const list = page.root!.querySelector('div.utrecht-badge-list')!;
    expect(list.getAttribute('id')).toBe('l');
    expect(list.querySelector('.utrecht-data-badge')!.textContent).toBe('Parkeren');
  });
});
