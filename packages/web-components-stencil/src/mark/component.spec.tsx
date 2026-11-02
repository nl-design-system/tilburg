import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcMark } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcMark], html });

describe('tilburg-wbc-mark', () => {
  it('renders mark.utrecht-mark around its content', async () => {
    const page = await render('<tilburg-wbc-mark>Stadswinkel</tilburg-wbc-mark>');
    const element = page.root!.querySelector('mark.utrecht-mark')!;
    expect(element).not.toBeNull();
    expect(element.textContent).toBe('Stadswinkel');
  });
});
