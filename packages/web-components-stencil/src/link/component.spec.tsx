import { newSpecPage } from '@stencil/core/testing';
import { TilburgWebcLink } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWebcLink], html });

describe('tilburg-webc-link', () => {
  it('renders an anchor in light DOM with the utrecht link classes', async () => {
    const page = await render('<tilburg-webc-link href="/parkeren">Parkeren</tilburg-webc-link>');
    const a = page.root!.querySelector('a')!;
    expect(page.root!.shadowRoot).toBeNull();
    expect(a).toHaveClasses(['utrecht-link', 'utrecht-link--html-a']);
    expect(a.getAttribute('href')).toBe('/parkeren');
    expect(a.textContent).toBe('Parkeren');
    expect(a.hasAttribute('rel')).toBe(false);
    expect(a.hasAttribute('target')).toBe(false);
    expect(a.hasAttribute('aria-current')).toBe(false);
  });

  it('forwards target and rel', async () => {
    const page = await render('<tilburg-webc-link href="/x" target="_blank" rel="noopener">X</tilburg-webc-link>');
    const a = page.root!.querySelector('a')!;
    expect(a.getAttribute('target')).toBe('_blank');
    expect(a.getAttribute('rel')).toBe('noopener');
  });

  it('adds the external rel tokens, keeping a custom rel as prefix', async () => {
    const plain = await render('<tilburg-webc-link href="https://x.nl" external>X</tilburg-webc-link>');
    expect(plain.root!.querySelector('a')!.getAttribute('rel')).toBe('external noopener noreferrer');
    const prefixed = await render(
      '<tilburg-webc-link href="https://x.nl" rel="nofollow" external>X</tilburg-webc-link>',
    );
    expect(prefixed.root!.querySelector('a')!.getAttribute('rel')).toBe('nofollow external noopener noreferrer');
  });

  it('maps current to aria-current', async () => {
    const page = await render('<tilburg-webc-link href="#" current="page">X</tilburg-webc-link>');
    expect(page.root!.querySelector('a')!.getAttribute('aria-current')).toBe('page');
    const bare = await render('<tilburg-webc-link href="#" current>X</tilburg-webc-link>');
    expect(bare.root!.querySelector('a')!.getAttribute('aria-current')).toBe('true');
  });

  it('accepts a boolean current property', async () => {
    const page = await render('<tilburg-webc-link href="#">X</tilburg-webc-link>');
    (page.root as HTMLElement & { current?: boolean }).current = false;
    await page.waitForChanges();
    expect(page.root!.querySelector('a')!.getAttribute('aria-current')).toBe('false');
  });

  it('moves aria attributes, title and lang from the host to the anchor', async () => {
    const page = await render(
      '<tilburg-webc-link href="#" aria-label="Lees meer" aria-describedby="hint" title="Tip" lang="en">X</tilburg-webc-link>',
    );
    const a = page.root!.querySelector('a')!;
    for (const name of ['aria-label', 'aria-describedby', 'title', 'lang']) {
      expect(page.root!.hasAttribute(name)).toBe(false);
    }
    expect(a.getAttribute('aria-label')).toBe('Lees meer');
    expect(a.getAttribute('aria-describedby')).toBe('hint');
    expect(a.getAttribute('title')).toBe('Tip');
    expect(a.getAttribute('lang')).toBe('en');
  });
});
