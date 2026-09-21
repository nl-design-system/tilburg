import { newSpecPage } from '@stencil/core/testing';
import { TilburgWebcPageHeader } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWebcPageHeader], html });

describe('tilburg-webc-page-header', () => {
  it('renders the header structure with logo, title and default href', async () => {
    const page = await render(
      '<tilburg-webc-page-header logo-src="/logo.svg" heading="Gemeente Tilburg"></tilburg-webc-page-header>',
    );
    const header = page.root!.querySelector('header.tilburg-page-header')!;
    const brand = header.querySelector('.tilburg-page-header__container > a.tilburg-page-header__brand')!;
    expect(brand.getAttribute('href')).toBe('/');
    const logo = brand.querySelector('img.tilburg-page-header__logo')!;
    expect(logo.getAttribute('src')).toBe('/logo.svg');
    expect(logo.getAttribute('alt')).toBe('');
    expect(brand.querySelector('span.tilburg-page-header__title')!.textContent).toBe('Gemeente Tilburg');
  });

  it('uses title-href and logo-alt', async () => {
    const page = await render(
      '<tilburg-webc-page-header logo-src="/logo.svg" logo-alt="Tilburg" title-href="/home"></tilburg-webc-page-header>',
    );
    expect(page.root!.querySelector('a')!.getAttribute('href')).toBe('/home');
    expect(page.root!.querySelector('img')!.getAttribute('alt')).toBe('Tilburg');
    expect(page.root!.querySelector('.tilburg-page-header__title')).toBeNull();
  });

  it('omits the brand link without logo and heading', async () => {
    const page = await render('<tilburg-webc-page-header></tilburg-webc-page-header>');
    expect(page.root!.querySelector('.tilburg-page-header__brand')).toBeNull();
    expect(page.root!.querySelector('.tilburg-page-header__actions')).toBeNull();
  });

  it('projects actions into the actions container', async () => {
    const page = await render(
      '<tilburg-webc-page-header heading="T"><span class="tilburg-page-header__user" id="u">Jan</span></tilburg-webc-page-header>',
    );
    expect(page.root!.querySelector('.tilburg-page-header__actions #u')).not.toBeNull();
  });

  it('moves aria-label from the host to the header landmark', async () => {
    const page = await render('<tilburg-webc-page-header aria-label="Kop"></tilburg-webc-page-header>');
    expect(page.root!.hasAttribute('aria-label')).toBe(false);
    expect(page.root!.querySelector('header')!.getAttribute('aria-label')).toBe('Kop');
  });
});
