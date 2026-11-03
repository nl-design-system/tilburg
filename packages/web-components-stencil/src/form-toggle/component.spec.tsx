import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcFormToggle } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcFormToggle], html });

describe('tilburg-wbc-form-toggle', () => {
  it('renders the reference DOM in light DOM', async () => {
    const page = await render('<tilburg-wbc-form-toggle id="meldingen" name="meldingen"></tilburg-wbc-form-toggle>');
    expect(page.root!.shadowRoot).toBeNull();
    const wrapper = page.root!.querySelector('div')!;
    expect(wrapper).toHaveClasses(['utrecht-form-toggle', 'utrecht-form-toggle--html-checkbox']);
    const input = wrapper.querySelector('input')!;
    expect(input.getAttribute('type')).toBe('checkbox');
    expect(input.getAttribute('role')).toBe('switch');
    expect(input).toHaveClass('utrecht-form-toggle__checkbox');
    expect(input.getAttribute('name')).toBe('meldingen');
    expect(input.checked).toBe(false);
    const track = wrapper.querySelector('label')!;
    expect(track).toHaveClasses(['utrecht-form-toggle__track', 'utrecht-form-toggle__track--html-label']);
    expect(track.getAttribute('for')).toBe('meldingen');
    expect(track.querySelector('span.utrecht-form-toggle__thumb')).not.toBeNull();
  });

  it('moves id and aria attributes from the host to the input', async () => {
    const page = await render(
      '<tilburg-wbc-form-toggle id="t" aria-label="Meldingen" aria-describedby="hint"></tilburg-wbc-form-toggle>',
    );
    const input = page.root!.querySelector('input')!;
    expect(page.root!.hasAttribute('id')).toBe(false);
    expect(input.getAttribute('id')).toBe('t');
    expect(input.getAttribute('aria-label')).toBe('Meldingen');
    expect(input.getAttribute('aria-describedby')).toBe('hint');
  });

  it('generates an id for the track label when none is given', async () => {
    const page = await render('<tilburg-wbc-form-toggle></tilburg-wbc-form-toggle>');
    const input = page.root!.querySelector('input')!;
    expect(input.id).toMatch(/^tilburg-wbc-form-toggle-\d+$/);
    expect(page.root!.querySelector('label')!.getAttribute('for')).toBe(input.id);
  });

  it('maps state props to attributes, ARIA and modifiers', async () => {
    const page = await render(
      '<tilburg-wbc-form-toggle value="ja" checked invalid required disabled></tilburg-wbc-form-toggle>',
    );
    const wrapper = page.root!.querySelector('div')!;
    const input = wrapper.querySelector('input')!;
    expect(wrapper).toHaveClasses([
      'utrecht-form-toggle--invalid',
      'utrecht-form-toggle--required',
      'utrecht-form-toggle--disabled',
    ]);
    expect(input.checked).toBe(true);
    expect(input.getAttribute('value')).toBe('ja');
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-required')).toBe('true');
    expect(input.hasAttribute('required')).toBe(true);
    expect(input.hasAttribute('disabled')).toBe(true);
  });

  it('keeps checked in sync and lets the native change event bubble', async () => {
    const page = await render('<tilburg-wbc-form-toggle></tilburg-wbc-form-toggle>');
    const input = page.root!.querySelector('input')!;
    const spy = jest.fn();
    page.root!.addEventListener('change', spy);
    input.checked = true;
    input.dispatchEvent(new Event('change', { bubbles: true }));
    await page.waitForChanges();
    expect((page.root as unknown as TilburgWbcFormToggle).checked).toBe(true);
    expect(page.root!.hasAttribute('checked')).toBe(true);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('resyncs checked after its form is reset', async () => {
    const page = await newSpecPage({
      components: [TilburgWbcFormToggle],
      html: '<form><tilburg-wbc-form-toggle></tilburg-wbc-form-toggle></form>',
    });
    const root = page.root as unknown as TilburgWbcFormToggle & HTMLElement;
    const input = root.querySelector('input')!;
    input.checked = true;
    input.dispatchEvent(new Event('change', { bubbles: true }));
    await page.waitForChanges();
    expect(root.checked).toBe(true);
    /* What the browser's reset does after the (cancelable) `reset` event: back to `defaultChecked`. */
    input.checked = false;
    page.body.querySelector('form')!.dispatchEvent(new Event('reset', { bubbles: true }));
    await new Promise((resolve) => setTimeout(resolve));
    await page.waitForChanges();
    expect(root.checked).toBe(false);
    expect(root.hasAttribute('checked')).toBe(false);
  });
});
