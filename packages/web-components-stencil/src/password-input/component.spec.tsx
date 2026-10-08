import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcPasswordInput } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcPasswordInput], html });

describe('tilburg-wbc-password-input', () => {
  it('renders a password textbox in light DOM with a labelled, unpressed toggle and an empty status line', async () => {
    const page = await render(
      '<tilburg-wbc-password-input id="pw" autocomplete="current-password"></tilburg-wbc-password-input>',
    );
    const input = page.root!.querySelector('input')!;
    const toggle = page.root!.querySelector('button')!;
    expect(page.root!.shadowRoot).toBeNull();
    expect(page.root!.hasAttribute('id')).toBe(false);
    expect(input.getAttribute('id')).toBe('pw');
    expect(input.getAttribute('type')).toBe('password');
    expect(input.getAttribute('autocomplete')).toBe('current-password');
    expect(input).toHaveClasses(['utrecht-textbox', 'utrecht-textbox--password']);
    expect(toggle.getAttribute('aria-label')).toBe('Wachtwoord tonen');
    expect(toggle.getAttribute('aria-pressed')).toBe('false');
    expect(toggle.getAttribute('aria-controls')).toBe('pw');
    expect(page.root!.querySelector('.tilburg-password-input__status')!.textContent).toBe('');
  });

  it('shows and hides the password, keeping the label and reporting the state', async () => {
    const page = await render('<tilburg-wbc-password-input id="pw"></tilburg-wbc-password-input>');
    const toggle = page.root!.querySelector('button')!;
    toggle.click();
    await page.waitForChanges();
    expect(page.root!.querySelector('input')!.getAttribute('type')).toBe('text');
    expect(toggle.getAttribute('aria-pressed')).toBe('true');
    expect(toggle.getAttribute('aria-label')).toBe('Wachtwoord tonen');
    expect(page.root!.querySelector('.tilburg-password-input__status')!.textContent).toBe('Wachtwoord is zichtbaar.');
    toggle.click();
    await page.waitForChanges();
    expect(page.root!.querySelector('input')!.getAttribute('type')).toBe('password');
    expect(page.root!.querySelector('.tilburg-password-input__status')!.textContent).toBe('Wachtwoord is verborgen.');
  });

  it('maps invalid and disabled, and takes other texts', async () => {
    const page = await render(
      '<tilburg-wbc-password-input invalid disabled toggle-label="Show password"></tilburg-wbc-password-input>',
    );
    const input = page.root!.querySelector('input')!;
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.hasAttribute('disabled')).toBe(true);
    expect(page.root!.querySelector('button')!.hasAttribute('disabled')).toBe(true);
    expect(page.root!.querySelector('button')!.getAttribute('aria-label')).toBe('Show password');
  });
});
