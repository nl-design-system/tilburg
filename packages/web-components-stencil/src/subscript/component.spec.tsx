import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcSubscript } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcSubscript], html });

describe('tilburg-wbc-subscript', () => {
  it('renders <sub class="utrecht-subscript"> without the open-type modifier by default', async () => {
    const page = await render('<tilburg-wbc-subscript>2</tilburg-wbc-subscript>');
    const element = page.root!.querySelector('sub')!;
    expect(element.className).toBe('utrecht-subscript');
    expect(element.textContent).toBe('2');
  });

  it('adds the open-type modifier for open-type', async () => {
    const page = await render('<tilburg-wbc-subscript open-type>2</tilburg-wbc-subscript>');
    expect(page.root!.querySelector('sub')!.classList.contains('utrecht-subscript--open-type')).toBe(true);
  });
});
