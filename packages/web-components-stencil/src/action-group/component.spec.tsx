import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcActionGroup } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcActionGroup], html });

describe('tilburg-wbc-action-group', () => {
  it('renders a <p role="group"> with the row modifier in light DOM', async () => {
    const page = await render('<tilburg-wbc-action-group><button>Volgende stap</button></tilburg-wbc-action-group>');
    expect(page.root!.shadowRoot).toBeNull();
    const group = page.root!.querySelector('p')!;
    expect(group.className).toBe('utrecht-action-group utrecht-action-group--row');
    expect(group.getAttribute('role')).toBe('group');
    expect(group.querySelector('button')!.textContent).toBe('Volgende stap');
  });

  it.each(['column', 'column-stretch'])('maps direction="%s" to its modifier', async (direction) => {
    const page = await render(`<tilburg-wbc-action-group direction="${direction}">x</tilburg-wbc-action-group>`);
    expect(page.root!.querySelector('p')!.className).toBe(`utrecht-action-group utrecht-action-group--${direction}`);
  });

  it('moves role and aria-label from the host to the <p>', async () => {
    const page = await render(
      '<tilburg-wbc-action-group role="toolbar" aria-label="Stappen">x</tilburg-wbc-action-group>',
    );
    expect(page.root!.hasAttribute('role')).toBe(false);
    expect(page.root!.hasAttribute('aria-label')).toBe(false);
    const group = page.root!.querySelector('p')!;
    expect(group.getAttribute('role')).toBe('toolbar');
    expect(group.getAttribute('aria-label')).toBe('Stappen');
  });
});
