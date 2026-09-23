import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcRadioButton } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcRadioButton], html });

describe('tilburg-wbc-radio-button', () => {
  it('renders a utrecht radio button in light DOM', async () => {
    const page = await render('<tilburg-wbc-radio-button name="g" value="a"></tilburg-wbc-radio-button>');
    const input = page.root!.querySelector('input')!;
    expect(page.root!.shadowRoot).toBeNull();
    expect(input.getAttribute('type')).toBe('radio');
    expect(input).toHaveClasses(['utrecht-radio-button', 'utrecht-radio-button--html-input']);
    expect(input.getAttribute('name')).toBe('g');
    expect(input.getAttribute('value')).toBe('a');
    expect(input.checked).toBe(false);
  });

  it('maps state props to attributes, ARIA and classes', async () => {
    const page = await render(
      '<tilburg-wbc-radio-button checked invalid required disabled></tilburg-wbc-radio-button>',
    );
    const input = page.root!.querySelector('input')!;
    expect(input.checked).toBe(true);
    expect(input).toHaveClass('utrecht-radio-button--invalid');
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-required')).toBe('true');
    expect(input.getAttribute('aria-disabled')).toBe('true');
    expect(input.hasAttribute('required')).toBe(true);
    expect(input.hasAttribute('disabled')).toBe(true);
  });

  it('moves id and aria attributes from the host to the input', async () => {
    const page = await render(
      '<tilburg-wbc-radio-button id="rb-email" aria-describedby="hint"></tilburg-wbc-radio-button>',
    );
    const input = page.root!.querySelector('input')!;
    expect(page.root!.hasAttribute('id')).toBe(false);
    expect(input.getAttribute('id')).toBe('rb-email');
    expect(input.getAttribute('aria-describedby')).toBe('hint');
  });

  it('resyncs checked across the group on change', async () => {
    const page = await render(`
      <tilburg-wbc-radio-button name="g" value="a" checked></tilburg-wbc-radio-button>
      <tilburg-wbc-radio-button name="g" value="b"></tilburg-wbc-radio-button>`);
    const [a, b] = Array.from(page.body.querySelectorAll('tilburg-wbc-radio-button')) as unknown as Array<
      HTMLElement & TilburgWbcRadioButton
    >;
    const inputA = a.querySelector('input')!;
    const inputB = b.querySelector('input')!;
    /* The browser unchecks the sibling; mock-doc does not, so emulate it. */
    inputA.checked = false;
    inputB.checked = true;
    inputB.dispatchEvent(new Event('change', { bubbles: true }));
    await page.waitForChanges();
    expect(b.checked).toBe(true);
    expect(a.checked).toBe(false);
  });
});
