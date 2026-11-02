import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcEmphasis } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcEmphasis], html });

describe('tilburg-wbc-emphasis', () => {
  it('renders a stressed <em> by default', async () => {
    const page = await render('<tilburg-wbc-emphasis>niet</tilburg-wbc-emphasis>');
    const em = page.root!.querySelector('em')!;
    expect(em.className).toBe('utrecht-emphasis utrecht-emphasis--stressed');
    expect(em.textContent).toBe('niet');
  });

  it('renders <strong> with the strong modifier when strong is set', async () => {
    const page = await render('<tilburg-wbc-emphasis strong>belangrijk</tilburg-wbc-emphasis>');
    expect(page.root!.querySelector('em')).toBeNull();
    const strong = page.root!.querySelector('strong')!;
    expect(strong.className).toBe('utrecht-emphasis utrecht-emphasis--strong');
    expect(strong.textContent).toBe('belangrijk');
  });
});
