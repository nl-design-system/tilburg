import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcLinkButton } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcLinkButton], html });

describe('tilburg-wbc-link-button', () => {
  it('renders a type="button" <button> with the link-button classes', async () => {
    const page = await render('<tilburg-wbc-link-button>Vorige stap</tilburg-wbc-link-button>');
    const button = page.root!.querySelector('button')!;
    expect(page.root!.shadowRoot).toBeNull();
    expect(button.className).toBe('utrecht-link-button utrecht-link-button--html-button');
    expect(button.getAttribute('type')).toBe('button');
    expect(button.hasAttribute('aria-pressed')).toBe(false);
    expect(button.textContent).toBe('Vorige stap');
  });

  it('maps inline, pressed, disabled and type', async () => {
    const page = await render(
      '<tilburg-wbc-link-button inline pressed disabled type="submit">X</tilburg-wbc-link-button>',
    );
    const button = page.root!.querySelector('button')!;
    expect(button).toHaveClasses([
      'utrecht-link-button--inline',
      'utrecht-link-button--pressed',
      'utrecht-link-button--disabled',
    ]);
    expect(button.getAttribute('aria-pressed')).toBe('true');
    expect(button.hasAttribute('disabled')).toBe(true);
    expect(button.getAttribute('type')).toBe('submit');
  });

  it('renders aria-pressed="false" for pressed="false"', async () => {
    const page = await render('<tilburg-wbc-link-button pressed="false">X</tilburg-wbc-link-button>');
    const button = page.root!.querySelector('button')!;
    expect(button.getAttribute('aria-pressed')).toBe('false');
    expect(button).not.toHaveClass('utrecht-link-button--pressed');
  });

  it('moves aria-label from the host to the <button>', async () => {
    const page = await render('<tilburg-wbc-link-button aria-label="Terug">X</tilburg-wbc-link-button>');
    expect(page.root!.hasAttribute('aria-label')).toBe(false);
    expect(page.root!.querySelector('button')!.getAttribute('aria-label')).toBe('Terug');
  });
});
