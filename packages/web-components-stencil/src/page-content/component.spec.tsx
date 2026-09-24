import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcPageContent } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcPageContent], html });

describe('tilburg-wbc-page-content', () => {
  it('renders the main landmark around its content', async () => {
    const page = await render('<tilburg-wbc-page-content><p id="p">Tekst</p></tilburg-wbc-page-content>');
    const main = page.root!.querySelector('main.utrecht-page-content')!;
    expect(main).not.toBeNull();
    expect(main.querySelector('#p')).not.toBeNull();
  });

  it('moves id and tabindex to <main> so it can be the skip-link target', async () => {
    const page = await render('<tilburg-wbc-page-content id="main" tabindex="-1">Tekst</tilburg-wbc-page-content>');
    expect(page.root!.hasAttribute('id')).toBe(false);
    expect(page.root!.hasAttribute('tabindex')).toBe(false);
    const main = page.root!.querySelector('main')!;
    expect(main.getAttribute('id')).toBe('main');
    expect(main.getAttribute('tabindex')).toBe('-1');
  });

  it('moves aria-label from the host to <main>', async () => {
    const page = await render('<tilburg-wbc-page-content aria-label="Inhoud">Tekst</tilburg-wbc-page-content>');
    expect(page.root!.hasAttribute('aria-label')).toBe(false);
    expect(page.root!.querySelector('main')!.getAttribute('aria-label')).toBe('Inhoud');
  });
});
