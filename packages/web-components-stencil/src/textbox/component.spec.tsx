import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcTextbox } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcTextbox], html });

describe('tilburg-wbc-textbox', () => {
  it('renders a native text input in light DOM with the utrecht classes', async () => {
    const page = await render('<tilburg-wbc-textbox></tilburg-wbc-textbox>');
    const input = page.root!.querySelector('input')!;
    expect(page.root!.shadowRoot).toBeNull();
    expect(input.getAttribute('type')).toBe('text');
    expect(input.getAttribute('dir')).toBe('auto');
    expect(input).toHaveClasses(['utrecht-textbox', 'utrecht-textbox--html-input']);
    expect(input.hasAttribute('aria-invalid')).toBe(false);
    expect(input.hasAttribute('aria-required')).toBe(false);
  });

  it('maps state props to attributes, ARIA and modifier classes', async () => {
    const page = await render(
      '<tilburg-wbc-textbox invalid required readonly disabled placeholder="naam" name="email" autocomplete="email"></tilburg-wbc-textbox>',
    );
    const input = page.root!.querySelector('input')!;
    expect(input).toHaveClasses([
      'utrecht-textbox--invalid',
      'utrecht-textbox--required',
      'utrecht-textbox--read-only',
      'utrecht-textbox--disabled',
    ]);
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-required')).toBe('true');
    expect(input.hasAttribute('required')).toBe(true);
    expect(input.hasAttribute('readonly')).toBe(true);
    expect(input.hasAttribute('disabled')).toBe(true);
    expect(input.getAttribute('placeholder')).toBe('naam');
    expect(input.getAttribute('name')).toBe('email');
    expect(input.getAttribute('autocomplete')).toBe('email');
  });

  it('derives the type modifiers like the utrecht directive', async () => {
    const number = await render('<tilburg-wbc-textbox type="number"></tilburg-wbc-textbox>');
    const numberInput = number.root!.querySelector('input')!;
    expect(numberInput).toHaveClass('utrecht-textbox--numeric');
    expect(numberInput.getAttribute('inputmode')).toBe('numeric');
    const email = await render('<tilburg-wbc-textbox type="email"></tilburg-wbc-textbox>');
    expect(email.root!.querySelector('input')).toHaveClass('utrecht-textbox--url');
    const password = await render('<tilburg-wbc-textbox type="password"></tilburg-wbc-textbox>');
    expect(password.root!.querySelector('input')).toHaveClass('utrecht-textbox--password');
  });

  it('moves id, dir, inputmode and aria attributes from the host to the input', async () => {
    const page = await render(
      '<tilburg-wbc-textbox id="email" dir="ltr" inputmode="email" aria-describedby="hint" aria-label="E-mail"></tilburg-wbc-textbox>',
    );
    const input = page.root!.querySelector('input')!;
    for (const name of ['id', 'dir', 'inputmode', 'aria-describedby', 'aria-label']) {
      expect(page.root!.hasAttribute(name)).toBe(false);
    }
    expect(input.getAttribute('id')).toBe('email');
    expect(input.getAttribute('dir')).toBe('ltr');
    expect(input.getAttribute('inputmode')).toBe('email');
    expect(input.getAttribute('aria-describedby')).toBe('hint');
    expect(input.getAttribute('aria-label')).toBe('E-mail');
  });

  it('sets the initial value and keeps the value prop in sync with input', async () => {
    const page = await render('<tilburg-wbc-textbox value="Jan"></tilburg-wbc-textbox>');
    const input = page.root!.querySelector('input')!;
    expect(input.value).toBe('Jan');
    const spy = jest.fn();
    page.root!.addEventListener('input', spy);
    input.value = 'Piet';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await page.waitForChanges();
    expect((page.root as unknown as TilburgWbcTextbox).value).toBe('Piet');
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
