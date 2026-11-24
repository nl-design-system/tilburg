import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcToptaskNav } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcToptaskNav], html });

describe('tilburg-wbc-toptask-nav', () => {
  it('renders a <nav> named "Veelgevraagd" around the links', async () => {
    const page = await render(
      '<tilburg-wbc-toptask-nav><a class="utrecht-toptask-link" href="/afval">Afval</a></tilburg-wbc-toptask-nav>',
    );
    const nav = page.root!.querySelector('nav')!;
    expect(page.root!.shadowRoot).toBeNull();
    expect(nav.className).toBe('utrecht-toptask-nav');
    expect(nav.getAttribute('aria-label')).toBe('Veelgevraagd');
    expect(nav.querySelector('a.utrecht-toptask-link')).not.toBeNull();
  });

  it('maps grid and moves aria-label from the host', async () => {
    const page = await render('<tilburg-wbc-toptask-nav grid aria-label="Snel naar">x</tilburg-wbc-toptask-nav>');
    const nav = page.root!.querySelector('nav')!;
    expect(nav).toHaveClass('utrecht-toptask-nav--grid');
    expect(nav.getAttribute('aria-label')).toBe('Snel naar');
    expect(page.root!.hasAttribute('aria-label')).toBe(false);
  });
});
