import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcToptaskLink } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcToptaskLink], html });

describe('tilburg-wbc-toptask-link', () => {
  it('renders the icon and title spans of the HTML reference', async () => {
    const page = await render(
      '<tilburg-wbc-toptask-link href="/afval"><svg slot="icon" aria-hidden="true"></svg>Afval</tilburg-wbc-toptask-link>',
    );
    const a = page.root!.querySelector('a')!;
    expect(page.root!.shadowRoot).toBeNull();
    expect(a.className).toBe('utrecht-toptask-link');
    expect(a.getAttribute('href')).toBe('/afval');
    expect(a.querySelector('.utrecht-toptask-link__icon svg')).not.toBeNull();
    expect(a.querySelector('.utrecht-toptask-link__title')!.textContent).toBe('Afval');
  });

  it('leaves the icon wrapper out without an icon slot', async () => {
    const page = await render('<tilburg-wbc-toptask-link href="/afspraak">Afspraak maken</tilburg-wbc-toptask-link>');
    expect(page.root!.querySelector('.utrecht-toptask-link__icon')).toBeNull();
  });

  it('moves aria-describedby from the host to the <a>', async () => {
    const page = await render(
      '<tilburg-wbc-toptask-link href="/x" aria-describedby="hint">X</tilburg-wbc-toptask-link>',
    );
    expect(page.root!.hasAttribute('aria-describedby')).toBe(false);
    expect(page.root!.querySelector('a')!.getAttribute('aria-describedby')).toBe('hint');
  });
});
