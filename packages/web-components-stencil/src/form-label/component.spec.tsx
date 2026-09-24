import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcFormLabel } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcFormLabel], html });

describe('tilburg-wbc-form-label', () => {
  it('renders a utrecht label pointing at the control', async () => {
    const page = await render(
      '<tilburg-wbc-form-label for="email">E-mailadres <span class="tilburg-form-label__optional">(optioneel)</span></tilburg-wbc-form-label>',
    );
    const label = page.root!.querySelector('label')!;
    expect(page.root!.shadowRoot).toBeNull();
    expect(label.className).toBe('utrecht-form-label');
    expect(label.getAttribute('for')).toBe('email');
    expect(label.textContent).toContain('E-mailadres');
    expect(label.querySelector('.tilburg-form-label__optional')).not.toBeNull();
  });

  it('adds no modifier for type text', async () => {
    const page = await render('<tilburg-wbc-form-label type="text">Naam</tilburg-wbc-form-label>');
    expect(page.root!.querySelector('label')!.className).toBe('utrecht-form-label');
  });

  it('maps type, checked and disabled to modifier classes', async () => {
    const checkbox = await render(
      '<tilburg-wbc-form-label type="checkbox" checked disabled>X</tilburg-wbc-form-label>',
    );
    expect(checkbox.root!.querySelector('label')).toHaveClasses([
      'utrecht-form-label--checkbox',
      'utrecht-form-label--checked',
      'utrecht-form-label--disabled',
    ]);
    const radio = await render('<tilburg-wbc-form-label type="radio">X</tilburg-wbc-form-label>');
    expect(radio.root!.querySelector('label')).toHaveClass('utrecht-form-label--radio');
  });
});
