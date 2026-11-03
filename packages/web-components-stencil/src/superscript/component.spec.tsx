import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcSuperscript } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcSuperscript], html });

describe('tilburg-wbc-superscript', () => {
  it('renders <sup class="utrecht-superscript">', async () => {
    const page = await render('<tilburg-wbc-superscript>2</tilburg-wbc-superscript>');
    const element = page.root!.querySelector('sup')!;
    expect(element.className).toBe('utrecht-superscript');
    expect(element.textContent).toBe('2');
  });
});
