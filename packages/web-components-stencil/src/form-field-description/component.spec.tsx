import { newSpecPage } from '@stencil/core/testing';
import { TilburgWebcFormFieldDescription } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWebcFormFieldDescription], html });

describe('tilburg-webc-form-field-description', () => {
  it('renders the utrecht description markup', async () => {
    const page = await render('<tilburg-webc-form-field-description>Hint</tilburg-webc-form-field-description>');
    const div = page.root!.querySelector('div')!;
    expect(page.root!.shadowRoot).toBeNull();
    expect(div.className).toBe('utrecht-form-field-description');
    expect(div.hasAttribute('role')).toBe(false);
    expect(div.textContent).toBe('Hint');
  });

  it('maps invalid to the modifier and role="alert"', async () => {
    const page = await render(
      '<tilburg-webc-form-field-description invalid>Fout</tilburg-webc-form-field-description>',
    );
    const div = page.root!.querySelector('div')!;
    expect(div).toHaveClass('utrecht-form-field-description--invalid');
    expect(div.getAttribute('role')).toBe('alert');
  });

  it('maps valid and warning to modifiers', async () => {
    const page = await render(
      '<tilburg-webc-form-field-description valid warning>X</tilburg-webc-form-field-description>',
    );
    expect(page.root!.querySelector('div')).toHaveClasses([
      'utrecht-form-field-description--valid',
      'utrecht-form-field-description--warning',
    ]);
  });

  it('moves the id from the host to the description', async () => {
    const page = await render(
      '<tilburg-webc-form-field-description id="email-desc">X</tilburg-webc-form-field-description>',
    );
    expect(page.root!.hasAttribute('id')).toBe(false);
    expect(page.root!.querySelector('div')!.getAttribute('id')).toBe('email-desc');
  });
});
