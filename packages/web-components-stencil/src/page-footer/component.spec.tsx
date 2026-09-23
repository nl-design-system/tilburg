import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcPageFooter } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcPageFooter], html });

const LINKS = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Cookies', href: '/cookies' },
];

describe('tilburg-wbc-page-footer', () => {
  it('renders an empty footer container without lists by default', async () => {
    const page = await render('<tilburg-wbc-page-footer></tilburg-wbc-page-footer>');
    expect(page.root!.querySelector('footer.tilburg-page-footer > .tilburg-page-footer__container')).not.toBeNull();
    expect(page.root!.querySelector('ul')).toBeNull();
  });

  it('renders links set as a property', async () => {
    const page = await render('<tilburg-wbc-page-footer></tilburg-wbc-page-footer>');
    (page.root as HTMLElement & { links: unknown }).links = LINKS;
    await page.waitForChanges();
    const anchors = page.root!.querySelectorAll('ul.tilburg-page-footer__list > li > a.tilburg-page-footer__link');
    expect(anchors.length).toBe(2);
    expect(anchors[1].getAttribute('href')).toBe('/cookies');
    expect(anchors[1].textContent).toBe('Cookies');
  });

  it('parses links and primary-link from JSON attributes', async () => {
    const page = await render(
      `<tilburg-wbc-page-footer links='${JSON.stringify(LINKS)}' primary-link='{"label":"Contact","href":"/contact"}'></tilburg-wbc-page-footer>`,
    );
    const primary = page.root!.querySelector('ul.tilburg-page-footer__primary a.tilburg-page-footer__primary-link')!;
    expect(primary.getAttribute('href')).toBe('/contact');
    expect(primary.textContent).toBe('Contact');
    expect(page.root!.querySelectorAll('.tilburg-page-footer__link').length).toBe(2);
    /* The primary row comes before the list, as in the HTML reference. */
    const lists = page.root!.querySelectorAll('ul');
    expect(lists[0]).toHaveClass('tilburg-page-footer__primary');
    expect(lists[1]).toHaveClass('tilburg-page-footer__list');
  });

  it('ignores invalid JSON', async () => {
    const page = await render('<tilburg-wbc-page-footer links="nope"></tilburg-wbc-page-footer>');
    expect(page.root!.querySelector('ul')).toBeNull();
  });

  it('projects extra content before the lists', async () => {
    const page = await render(
      `<tilburg-wbc-page-footer links='${JSON.stringify(LINKS)}'><p id="extra">Extra</p></tilburg-wbc-page-footer>`,
    );
    const container = page.root!.querySelector('.tilburg-page-footer__container')!;
    const extra = container.querySelector('#extra')!;
    expect(extra).not.toBeNull();
    expect(extra.compareDocumentPosition(container.querySelector('ul')!) & 4).toBeTruthy();
  });

  it('moves aria-label from the host to the footer landmark', async () => {
    const page = await render('<tilburg-wbc-page-footer aria-label="Voettekst"></tilburg-wbc-page-footer>');
    expect(page.root!.hasAttribute('aria-label')).toBe(false);
    expect(page.root!.querySelector('footer')!.getAttribute('aria-label')).toBe('Voettekst');
  });
});
