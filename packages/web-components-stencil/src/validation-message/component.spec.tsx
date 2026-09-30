import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcValidationMessage } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcValidationMessage], html });

describe('tilburg-wbc-validation-message', () => {
  it('renders the error variant by default', async () => {
    const page = await render('<tilburg-wbc-validation-message>Verplicht</tilburg-wbc-validation-message>');
    const root = page.root!.querySelector('.tilburg-validation-message')!;
    expect(page.root!.shadowRoot).toBeNull();
    expect(root).toHaveClasses(['utrecht-form-field-error-message', 'tilburg-validation-message--error']);
    expect(root).not.toHaveClass('utrecht-form-field-description');
    expect(root.getAttribute('role')).toBe('alert');
    expect(root.getAttribute('aria-live')).toBe('polite');
    expect(root.textContent).toContain('Verplicht');
  });

  it('renders the warning variant', async () => {
    const page = await render('<tilburg-wbc-validation-message type="warning">Let op</tilburg-wbc-validation-message>');
    const root = page.root!.querySelector('.tilburg-validation-message')!;
    expect(root).toHaveClasses([
      'utrecht-form-field-description',
      'utrecht-form-field-description--warning',
      'tilburg-validation-message--warning',
    ]);
    expect(root).not.toHaveClass('utrecht-form-field-error-message');
  });

  it('falls back to error for unknown types', async () => {
    const page = await render('<tilburg-wbc-validation-message type="info">X</tilburg-wbc-validation-message>');
    expect(page.root!.querySelector('.tilburg-validation-message')).toHaveClass('tilburg-validation-message--error');
  });

  it('maps live-region to aria-live', async () => {
    const page = await render(
      '<tilburg-wbc-validation-message live-region="assertive">X</tilburg-wbc-validation-message>',
    );
    expect(page.root!.querySelector('.tilburg-validation-message')!.getAttribute('aria-live')).toBe('assertive');
  });

  it('keeps the icon container empty so the CSS default icon is painted', async () => {
    const page = await render('<tilburg-wbc-validation-message>X</tilburg-wbc-validation-message>');
    const icon = page.root!.querySelector('.tilburg-validation-message__icon')!;
    expect(icon.getAttribute('aria-hidden')).toBe('true');
    expect(icon.childNodes.length).toBe(0);
  });

  it('projects a custom icon into the icon slot', async () => {
    const page = await render(
      '<tilburg-wbc-validation-message><span slot="icon" id="i">!</span>X</tilburg-wbc-validation-message>',
    );
    expect(page.root!.querySelector('.tilburg-validation-message__icon #i')).not.toBeNull();
  });
});
