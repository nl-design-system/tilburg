import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcFormField } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcFormField], html });

describe('tilburg-wbc-form-field', () => {
  it('renders the utrecht form field container around its children', async () => {
    const page = await render(`<tilburg-wbc-form-field>
      <label class="utrecht-form-label" for="ff">E-mail</label>
      <input id="ff" class="utrecht-textbox utrecht-textbox--html-input" />
    </tilburg-wbc-form-field>`);
    const field = page.root!.querySelector('div.utrecht-form-field')!;
    expect(field).not.toBeNull();
    expect(field.className).toBe('utrecht-form-field');
    expect(field.querySelector('label.utrecht-form-label')).not.toBeNull();
    expect(field.querySelector('input#ff')).not.toBeNull();
  });

  it.each(['text', 'checkbox', 'radio'])('adds the %s type modifier', async (type) => {
    const page = await render(`<tilburg-wbc-form-field type="${type}"></tilburg-wbc-form-field>`);
    expect(page.root!.querySelector('.utrecht-form-field')).toHaveClass(`utrecht-form-field--${type}`);
  });

  it('adds the invalid modifier', async () => {
    const page = await render('<tilburg-wbc-form-field invalid></tilburg-wbc-form-field>');
    expect(page.root!.querySelector('.utrecht-form-field')).toHaveClass('utrecht-form-field--invalid');
  });

  it('adds the Tilburg warning modifier on top of invalid', async () => {
    const page = await render('<tilburg-wbc-form-field type="text" invalid warning></tilburg-wbc-form-field>');
    expect(page.root!.querySelector('.utrecht-form-field')).toHaveClasses([
      'utrecht-form-field',
      'utrecht-form-field--text',
      'utrecht-form-field--invalid',
      'tilburg-warning',
    ]);
  });

  it('renders the composed tilburg-wbc-* children in place', async () => {
    const page = await render(`<tilburg-wbc-form-field type="text" invalid>
      <tilburg-wbc-form-label for="x">Naam</tilburg-wbc-form-label>
      <tilburg-wbc-validation-message type="error">Verplicht</tilburg-wbc-validation-message>
    </tilburg-wbc-form-field>`);
    const field = page.root!.querySelector('.utrecht-form-field')!;
    expect(field.querySelector('tilburg-wbc-form-label')).not.toBeNull();
    expect(field.querySelector('tilburg-wbc-validation-message')).not.toBeNull();
  });
});
