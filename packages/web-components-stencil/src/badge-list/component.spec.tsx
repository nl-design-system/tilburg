import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcBadgeList } from './component';

describe('tilburg-wbc-badge-list', () => {
  it('renders a ul[role=list] with the slotted li items, like the HTML reference', async () => {
    const page = await newSpecPage({
      components: [TilburgWbcBadgeList],
      html: `<tilburg-wbc-badge-list id="l">
        <li><span class="utrecht-data-badge">Parkeren</span></li>
        <li><span class="utrecht-data-badge">Afval</span></li>
      </tilburg-wbc-badge-list>`,
    });
    const list = page.root!.querySelector('ul.utrecht-badge-list')!;
    expect(list.getAttribute('role')).toBe('list');
    expect(list.getAttribute('id')).toBe('l');
    const items = page.root!.querySelectorAll('ul.utrecht-badge-list > li');
    expect(items.length).toBe(2);
    expect(items[0].querySelector('.utrecht-data-badge')!.textContent).toBe('Parkeren');
  });
});
