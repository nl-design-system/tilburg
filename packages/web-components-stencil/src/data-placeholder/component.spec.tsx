import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcDataPlaceholder } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcDataPlaceholder], html });

describe('tilburg-wbc-data-placeholder', () => {
  it('renders an empty utrecht-data-placeholder span', async () => {
    const page = await render('<tilburg-wbc-data-placeholder></tilburg-wbc-data-placeholder>');
    const span = page.root!.querySelector('span')!;
    expect(span.className).toBe('utrecht-data-placeholder');
    expect(span.childNodes).toHaveLength(0);
  });

  it('adds the loading modifier', async () => {
    const page = await render('<tilburg-wbc-data-placeholder loading></tilburg-wbc-data-placeholder>');
    expect(page.root!.querySelector('span')!.classList.contains('utrecht-data-placeholder--loading')).toBe(true);
  });
});
