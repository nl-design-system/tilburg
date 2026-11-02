import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcSuperscript } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcSuperscript], html });

describe('tilburg-wbc-superscript', () => {
  it('renders <sup class="utrecht-superscript"> without the open-type modifier by default', async () => {
    const page = await render('<tilburg-wbc-superscript>2</tilburg-wbc-superscript>');
    const element = page.root!.querySelector('sup')!;
    expect(element.className).toBe('utrecht-superscript');
    expect(element.textContent).toBe('2');
  });

  it('adds the open-type modifier for open-type', async () => {
    const page = await render('<tilburg-wbc-superscript open-type>2</tilburg-wbc-superscript>');
    expect(page.root!.querySelector('sup')!.classList.contains('utrecht-superscript--open-type')).toBe(true);
  });
});
