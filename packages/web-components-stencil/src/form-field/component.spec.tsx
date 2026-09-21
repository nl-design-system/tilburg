import { newSpecPage } from '@stencil/core/testing';
import { TilburgWebcFormField } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWebcFormField], html });

describe('tilburg-webc-form-field', () => {
  it('renders the utrecht form field container around its children', async () => {
    const page = await render(`<tilburg-webc-form-field>
      <label class="utrecht-form-label" for="ff">E-mail</label>
      <input id="ff" class="utrecht-textbox utrecht-textbox--html-input" />
    </tilburg-webc-form-field>`);
    const field = page.root!.querySelector('div.utrecht-form-field')!;
    expect(field).not.toBeNull();
    expect(field.className).toBe('utrecht-form-field');
    expect(field.querySelector('label.utrecht-form-label')).not.toBeNull();
    expect(field.querySelector('input#ff')).not.toBeNull();
  });

  it.each(['text', 'checkbox', 'radio'])('adds the %s type modifier', async (type) => {
    const page = await render(`<tilburg-webc-form-field type="${type}"></tilburg-webc-form-field>`);
    expect(page.root!.querySelector('.utrecht-form-field')).toHaveClass(`utrecht-form-field--${type}`);
  });

  it('adds the invalid modifier', async () => {
    const page = await render('<tilburg-webc-form-field invalid></tilburg-webc-form-field>');
    expect(page.root!.querySelector('.utrecht-form-field')).toHaveClass('utrecht-form-field--invalid');
  });

  it('adds the Tilburg warning modifier on top of invalid', async () => {
    const page = await render('<tilburg-webc-form-field type="text" invalid warning></tilburg-webc-form-field>');
    expect(page.root!.querySelector('.utrecht-form-field')).toHaveClasses([
      'utrecht-form-field',
      'utrecht-form-field--text',
      'utrecht-form-field--invalid',
      'tilburg-warning',
    ]);
  });

  it('renders the composed tilburg-webc-* children in place', async () => {
    const page = await render(`<tilburg-webc-form-field type="text" invalid>
      <tilburg-webc-form-label for="x">Naam</tilburg-webc-form-label>
      <tilburg-webc-validation-message type="error">Verplicht</tilburg-webc-validation-message>
    </tilburg-webc-form-field>`);
    const field = page.root!.querySelector('.utrecht-form-field')!;
    expect(field.querySelector('tilburg-webc-form-label')).not.toBeNull();
    expect(field.querySelector('tilburg-webc-validation-message')).not.toBeNull();
  });
});
