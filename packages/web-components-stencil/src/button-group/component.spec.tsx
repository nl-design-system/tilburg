import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcButtonGroup } from './component';
import { TilburgWbcButton } from '../button/component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcButtonGroup, TilburgWbcButton], html });

describe('tilburg-wbc-button-group', () => {
  it('renders the utrecht button group with role group', async () => {
    const page = await render('<tilburg-wbc-button-group></tilburg-wbc-button-group>');
    const group = page.root!.querySelector('div')!;
    expect(page.root!.shadowRoot).toBeNull();
    expect(group).toHaveClass('utrecht-button-group');
    expect(group.getAttribute('role')).toBe('group');
  });

  it('keeps role on the inner div (not on the host) and accepts toolbar', async () => {
    const page = await render('<tilburg-wbc-button-group role="toolbar"></tilburg-wbc-button-group>');
    expect(page.root!.hasAttribute('role')).toBe(false);
    expect(page.root!.querySelector('.utrecht-button-group')!.getAttribute('role')).toBe('toolbar');
  });

  it('projects buttons through the default slot', async () => {
    const page = await render(`<tilburg-wbc-button-group>
      <tilburg-wbc-button appearance="primary-action-button">Bevestigen</tilburg-wbc-button>
      <tilburg-wbc-button appearance="secondary-action-button">Annuleren</tilburg-wbc-button>
    </tilburg-wbc-button-group>`);
    const buttons = page.root!.querySelectorAll('.utrecht-button-group tilburg-wbc-button button.utrecht-button');
    expect(buttons.length).toBe(2);
    expect(buttons[0].textContent).toBe('Bevestigen');
  });

  it('moves aria-label and aria-labelledby from the host to the group', async () => {
    const page = await render(
      '<tilburg-wbc-button-group aria-label="Acties" aria-labelledby="kop"></tilburg-wbc-button-group>',
    );
    const group = page.root!.querySelector('.utrecht-button-group')!;
    expect(page.root!.hasAttribute('aria-label')).toBe(false);
    expect(page.root!.hasAttribute('aria-labelledby')).toBe(false);
    expect(group.getAttribute('aria-label')).toBe('Acties');
    expect(group.getAttribute('aria-labelledby')).toBe('kop');
  });
});
