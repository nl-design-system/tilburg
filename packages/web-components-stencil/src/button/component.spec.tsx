import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcButton } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcButton], html });

describe('tilburg-wbc-button', () => {
  it('renders a native button in light DOM with the default classes', async () => {
    const page = await render('<tilburg-wbc-button>OK</tilburg-wbc-button>');
    const button = page.root!.querySelector('button')!;
    expect(page.root!.shadowRoot).toBeNull();
    expect(button.textContent).toBe('OK');
    expect(button.getAttribute('type')).toBe('button');
    expect(button).toHaveClasses(['utrecht-button', 'tilburg-medium', 'utrecht-button--primary-action']);
  });

  it('maps appearance and size to classes', async () => {
    const page = await render('<tilburg-wbc-button appearance="subtle-button" size="small">OK</tilburg-wbc-button>');
    const button = page.root!.querySelector('button')!;
    expect(button).toHaveClasses(['utrecht-button--subtle', 'tilburg-small']);
    expect(button).not.toHaveClass('utrecht-button--primary-action');
  });

  it('marks submit buttons', async () => {
    const page = await render('<tilburg-wbc-button type="submit">Send</tilburg-wbc-button>');
    const button = page.root!.querySelector('button')!;
    expect(button.getAttribute('type')).toBe('submit');
    expect(button).toHaveClass('utrecht-button--submit');
  });

  it('disables the inner button', async () => {
    const page = await render('<tilburg-wbc-button disabled>OK</tilburg-wbc-button>');
    const button = page.root!.querySelector('button')!;
    expect(button.hasAttribute('disabled')).toBe(true);
    expect(button).toHaveClass('utrecht-button--disabled');
  });

  it('only sets aria-pressed when pressed is set', async () => {
    const plain = await render('<tilburg-wbc-button>OK</tilburg-wbc-button>');
    expect(plain.root!.querySelector('button')!.hasAttribute('aria-pressed')).toBe(false);
    const pressed = await render('<tilburg-wbc-button pressed="true">OK</tilburg-wbc-button>');
    expect(pressed.root!.querySelector('button')!.getAttribute('aria-pressed')).toBe('true');
    const unpressed = await render('<tilburg-wbc-button pressed="false">OK</tilburg-wbc-button>');
    expect(unpressed.root!.querySelector('button')!.getAttribute('aria-pressed')).toBe('false');
  });

  it('moves title and aria attributes from the host to the inner button', async () => {
    const page = await render('<tilburg-wbc-button title="Sluiten" aria-describedby="hint">×</tilburg-wbc-button>');
    const button = page.root!.querySelector('button')!;
    expect(page.root!.hasAttribute('title')).toBe(false);
    expect(page.root!.hasAttribute('aria-describedby')).toBe(false);
    expect(button.getAttribute('title')).toBe('Sluiten');
    expect(button.getAttribute('aria-label')).toBe('Sluiten');
    expect(button.getAttribute('aria-describedby')).toBe('hint');
  });

  it('prefers an explicit aria-label over the title', async () => {
    const page = await render('<tilburg-wbc-button title="Tip" aria-label="Sluiten">×</tilburg-wbc-button>');
    expect(page.root!.querySelector('button')!.getAttribute('aria-label')).toBe('Sluiten');
  });
});
