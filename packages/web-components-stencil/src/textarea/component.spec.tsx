import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcTextarea } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcTextarea], html });

describe('tilburg-wbc-textarea', () => {
  it('renders a native textarea in light DOM with the utrecht classes', async () => {
    const page = await render('<tilburg-wbc-textarea></tilburg-wbc-textarea>');
    const textarea = page.root!.querySelector('textarea')!;
    expect(page.root!.shadowRoot).toBeNull();
    expect(textarea).toHaveClasses(['utrecht-textarea', 'utrecht-textarea--html-textarea']);
    expect(textarea.getAttribute('dir')).toBe('auto');
    expect(textarea.hasAttribute('aria-invalid')).toBe(false);
  });

  it('maps state props to attributes, ARIA and modifier classes', async () => {
    const page = await render(
      '<tilburg-wbc-textarea invalid required readonly disabled rows="4" cols="20" placeholder="Toelichting" name="msg"></tilburg-wbc-textarea>',
    );
    const textarea = page.root!.querySelector('textarea')!;
    expect(textarea).toHaveClasses([
      'utrecht-textarea--invalid',
      'utrecht-textarea--required',
      'utrecht-textarea--read-only',
      'utrecht-textarea--disabled',
    ]);
    expect(textarea.getAttribute('aria-invalid')).toBe('true');
    expect(textarea.getAttribute('aria-required')).toBe('true');
    expect(textarea.hasAttribute('required')).toBe(true);
    expect(textarea.hasAttribute('readonly')).toBe(true);
    expect(textarea.hasAttribute('disabled')).toBe(true);
    expect(textarea.getAttribute('rows')).toBe('4');
    expect(textarea.getAttribute('cols')).toBe('20');
    expect(textarea.getAttribute('placeholder')).toBe('Toelichting');
    expect(textarea.getAttribute('name')).toBe('msg');
  });

  it('moves id and aria attributes from the host to the textarea', async () => {
    const page = await render('<tilburg-wbc-textarea id="explanation" aria-describedby="hint"></tilburg-wbc-textarea>');
    const textarea = page.root!.querySelector('textarea')!;
    expect(page.root!.hasAttribute('id')).toBe(false);
    expect(page.root!.hasAttribute('aria-describedby')).toBe(false);
    expect(textarea.getAttribute('id')).toBe('explanation');
    expect(textarea.getAttribute('aria-describedby')).toBe('hint');
  });

  it('sets the initial value and keeps the value prop in sync with input', async () => {
    const page = await render('<tilburg-wbc-textarea value="Hallo"></tilburg-wbc-textarea>');
    const textarea = page.root!.querySelector('textarea')!;
    /* mock-doc's <textarea> has no `value` property, so Stencil falls back to
       the attribute there; browsers get the property. */
    expect(textarea.value ?? textarea.getAttribute('value')).toBe('Hallo');
    Object.defineProperty(textarea, 'value', { value: 'Hallo wereld', configurable: true });
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
    await page.waitForChanges();
    expect((page.root as unknown as TilburgWbcTextarea).value).toBe('Hallo wereld');
  });
});
