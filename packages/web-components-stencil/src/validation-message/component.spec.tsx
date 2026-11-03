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
    expect(root.getAttribute('aria-live')).toBe('assertive');
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

  it('maps live-region to aria-live and a matching role', async () => {
    const page = await render(
      '<tilburg-wbc-validation-message live-region="polite">X</tilburg-wbc-validation-message>',
    );
    const message = page.root!.querySelector('.tilburg-validation-message')!;
    expect(message.getAttribute('aria-live')).toBe('polite');
    expect(message.getAttribute('role')).toBe('status');
  });

  it('renders the default svg icon of the HTML reference, per type', async () => {
    const page = await render('<tilburg-wbc-validation-message>X</tilburg-wbc-validation-message>');
    const icon = page.root!.querySelector('.tilburg-validation-message__icon')!;
    expect(icon.getAttribute('aria-hidden')).toBe('true');
    const svg = icon.querySelector('svg[aria-hidden="true"]')!;
    expect(svg.getAttribute('viewBox')).toBe('0 0 20 20');
    expect(svg.querySelector('path')!.getAttribute('d')).toMatch(/^M10 1a9 9/);
    const warning = await render('<tilburg-wbc-validation-message type="warning">X</tilburg-wbc-validation-message>');
    expect(warning.root!.querySelector('.tilburg-validation-message__icon path')!.getAttribute('d')).toMatch(
      /^M10 1 1 19h18/,
    );
  });

  it('projects a custom icon into the icon slot', async () => {
    const page = await render(
      '<tilburg-wbc-validation-message><span slot="icon" id="i">!</span>X</tilburg-wbc-validation-message>',
    );
    expect(page.root!.querySelector('.tilburg-validation-message__icon #i')).not.toBeNull();
    expect(page.root!.querySelector('.tilburg-validation-message__icon svg')).toBeNull();
  });
});
