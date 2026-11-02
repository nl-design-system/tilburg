import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcNavBar } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcNavBar], html });

describe('tilburg-wbc-nav-bar', () => {
  it('renders a named nav with the content wrapper around the slotted content', async () => {
    const page = await render('<tilburg-wbc-nav-bar><ul id="list"></ul></tilburg-wbc-nav-bar>');
    const nav = page.root!.querySelector('nav')!;
    expect(page.root!.shadowRoot).toBeNull();
    expect(nav).toHaveClass('utrecht-nav-bar');
    expect(nav.getAttribute('aria-label')).toBe('Hoofdmenu');
    expect(nav.querySelector('.utrecht-nav-bar__content #list')).not.toBeNull();
  });

  it('moves aria-label from the host to the nav', async () => {
    const page = await render('<tilburg-wbc-nav-bar aria-label="Menu"></tilburg-wbc-nav-bar>');
    expect(page.root!.hasAttribute('aria-label')).toBe(false);
    expect(page.root!.querySelector('nav')!.getAttribute('aria-label')).toBe('Menu');
  });
});
