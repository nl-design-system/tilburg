import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcCheckbox } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcCheckbox], html });

describe('tilburg-wbc-checkbox', () => {
  it('renders a custom utrecht checkbox in light DOM', async () => {
    const page = await render('<tilburg-wbc-checkbox></tilburg-wbc-checkbox>');
    const input = page.root!.querySelector('input')!;
    expect(page.root!.shadowRoot).toBeNull();
    expect(input.getAttribute('type')).toBe('checkbox');
    expect(input).toHaveClasses(['utrecht-checkbox', 'utrecht-checkbox--html-input', 'utrecht-checkbox--custom']);
    expect(input.checked).toBe(false);
    expect(input.hasAttribute('name')).toBe(false);
  });

  it('maps state props to attributes, ARIA and classes', async () => {
    const page = await render(
      '<tilburg-wbc-checkbox name="consent" value="ja" checked invalid required disabled></tilburg-wbc-checkbox>',
    );
    const input = page.root!.querySelector('input')!;
    expect(input.checked).toBe(true);
    expect(input.getAttribute('name')).toBe('consent');
    expect(input.getAttribute('value')).toBe('ja');
    expect(input).toHaveClass('utrecht-checkbox--invalid');
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-required')).toBe('true');
    expect(input.hasAttribute('required')).toBe(true);
    expect(input.hasAttribute('disabled')).toBe(true);
  });

  it('renders the indeterminate state', async () => {
    const page = await render('<tilburg-wbc-checkbox indeterminate></tilburg-wbc-checkbox>');
    const input = page.root!.querySelector('input')!;
    expect(input).toHaveClass('utrecht-checkbox--indeterminate');
    expect(input.getAttribute('aria-checked')).toBe('mixed');
  });

  it('moves id and aria attributes from the host to the input', async () => {
    const page = await render(
      '<tilburg-wbc-checkbox id="consent" aria-label="Akkoord" aria-describedby="hint"></tilburg-wbc-checkbox>',
    );
    const input = page.root!.querySelector('input')!;
    expect(page.root!.hasAttribute('id')).toBe(false);
    expect(input.getAttribute('id')).toBe('consent');
    expect(input.getAttribute('aria-label')).toBe('Akkoord');
    expect(input.getAttribute('aria-describedby')).toBe('hint');
  });

  it('keeps checked in sync and lets the native change event bubble', async () => {
    const page = await render('<tilburg-wbc-checkbox></tilburg-wbc-checkbox>');
    const input = page.root!.querySelector('input')!;
    const spy = jest.fn();
    page.root!.addEventListener('change', spy);
    input.checked = true;
    input.dispatchEvent(new Event('change', { bubbles: true }));
    await page.waitForChanges();
    expect((page.root as unknown as TilburgWbcCheckbox).checked).toBe(true);
    expect(page.root!.hasAttribute('checked')).toBe(true);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('resyncs checked after its form is reset', async () => {
    const page = await newSpecPage({
      components: [TilburgWbcCheckbox],
      html: '<form><tilburg-wbc-checkbox></tilburg-wbc-checkbox></form>',
    });
    const root = page.root as unknown as TilburgWbcCheckbox & HTMLElement;
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
