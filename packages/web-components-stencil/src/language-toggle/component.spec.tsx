import { newSpecPage } from '@stencil/core/testing';
import { TilburgWebcLanguageToggle } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWebcLanguageToggle], html });

const optionState = (root: HTMLElement) =>
  Array.from(root.querySelectorAll('.tilburg-language-toggle__option')).map(
    (el) => `${el.textContent}${el.classList.contains('tilburg-language-toggle__option--active') ? '*' : ''}`,
  );

describe('tilburg-webc-language-toggle', () => {
  it('renders the switch button with the default options, NL active', async () => {
    const page = await render('<tilburg-webc-language-toggle></tilburg-webc-language-toggle>');
    const button = page.root!.querySelector('button')!;
    expect(page.root!.shadowRoot).toBeNull();
    expect(button).toHaveClasses([
      'tilburg-language-toggle',
      'utrecht-button',
      'utrecht-button--html-button',
      'utrecht-button--secondary-action',
    ]);
    expect(button.getAttribute('type')).toBe('button');
    expect(button.getAttribute('role')).toBe('switch');
    expect(button.getAttribute('aria-label')).toBe('Switch language');
    expect(button.getAttribute('aria-checked')).toBe('false');
    expect(optionState(page.root!)).toEqual(['NL*', 'EN']);
  });

  it('is checked when the last option is active', async () => {
    const page = await render('<tilburg-webc-language-toggle active="EN"></tilburg-webc-language-toggle>');
    expect(page.root!.querySelector('button')!.getAttribute('aria-checked')).toBe('true');
    expect(optionState(page.root!)).toEqual(['NL', 'EN*']);
  });

  it('accepts custom options as a property', async () => {
    const page = await render('<tilburg-webc-language-toggle active="DE"></tilburg-webc-language-toggle>');
    (page.root as HTMLElement & { options: unknown }).options = [
      { code: 'NL', label: 'Nederlands' },
      { code: 'DE', label: 'Deutsch' },
    ];
    await page.waitForChanges();
    expect(optionState(page.root!)).toEqual(['Nederlands', 'Deutsch*']);
  });

  it('moves aria-label from the host to the button', async () => {
    const page = await render(
      '<tilburg-webc-language-toggle aria-label="Schakel taal"></tilburg-webc-language-toggle>',
    );
    expect(page.root!.hasAttribute('aria-label')).toBe(false);
    expect(page.root!.querySelector('button')!.getAttribute('aria-label')).toBe('Schakel taal');
  });

  it('emits the next code on click and wraps around', async () => {
    const page = await render('<tilburg-webc-language-toggle></tilburg-webc-language-toggle>');
    const spy = jest.fn();
    page.root!.addEventListener('tilburgToggle', spy);
    page.root!.querySelector('button')!.click();
    (page.root as HTMLElement & { active: string }).active = 'EN';
    await page.waitForChanges();
    page.root!.querySelector('button')!.click();
    expect(spy.mock.calls.map((c) => c[0].detail)).toEqual(['EN', 'NL']);
  });

  it('emits on Enter and Space and prevents the native activation', async () => {
    const page = await render('<tilburg-webc-language-toggle></tilburg-webc-language-toggle>');
    const spy = jest.fn();
    page.root!.addEventListener('tilburgToggle', spy);
    const button = page.root!.querySelector('button')!;
    for (const key of ['Enter', ' ', 'a']) {
      const event = new KeyboardEvent('keydown', { key, cancelable: true, bubbles: true });
      button.dispatchEvent(event);
      expect(event.defaultPrevented).toBe(key !== 'a');
    }
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
