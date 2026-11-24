import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcLinkSocial } from './component';
import { TilburgWbcListSocial } from './list';

const render = (html: string) => newSpecPage({ components: [TilburgWbcLinkSocial, TilburgWbcListSocial], html });

describe('tilburg-wbc-link-social', () => {
  it('renders an external utrecht-link-social anchor with the name moved from the host', async () => {
    const page = await render(
      '<tilburg-wbc-link-social href="https://www.facebook.com/gemeentetilburg" aria-label="Gemeente Tilburg op Facebook"><svg aria-hidden="true"></svg></tilburg-wbc-link-social>',
    );
    const a = page.root!.querySelector('a')!;
    expect(page.root!.shadowRoot).toBeNull();
    expect(a.className).toBe('utrecht-link-social');
    expect(a.getAttribute('href')).toBe('https://www.facebook.com/gemeentetilburg');
    expect(a.getAttribute('rel')).toBe('external noopener noreferrer');
    expect(a.getAttribute('aria-label')).toBe('Gemeente Tilburg op Facebook');
    expect(page.root!.hasAttribute('aria-label')).toBe(false);
    expect(a.querySelector('svg')).not.toBeNull();
  });

  it('leaves rel off for external="false"', async () => {
    const page = await render(
      '<tilburg-wbc-link-social href="/x" external="false" aria-label="X"></tilburg-wbc-link-social>',
    );
    expect(page.root!.querySelector('a')!.hasAttribute('rel')).toBe(false);
  });
});

describe('tilburg-wbc-list-social', () => {
  it('places slotted <li> items as direct children of the utrecht-list-social <ul>', async () => {
    const page = await render(
      '<tilburg-wbc-list-social aria-label="Sociale media"><li class="utrecht-list-social__item">X</li></tilburg-wbc-list-social>',
    );
    const list = page.root!.querySelector('ul')!;
    expect(list.className).toBe('utrecht-list-social');
    expect(list.getAttribute('role')).toBe('list');
    expect(list.getAttribute('aria-label')).toBe('Sociale media');
    expect(page.root!.hasAttribute('aria-label')).toBe(false);
    expect(page.root!.querySelectorAll('ul > li.utrecht-list-social__item').length).toBe(1);
  });
});
