import { newSpecPage } from '@stencil/core/testing';
import { TilburgWebcFieldset } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWebcFieldset], html });

describe('tilburg-webc-fieldset', () => {
  it('renders a native utrecht fieldset with the legend and fields inside', async () => {
    const page = await render(`<tilburg-webc-fieldset>
      <legend class="utrecht-form-label">Persoonsgegevens</legend>
      <input name="naam" />
    </tilburg-webc-fieldset>`);
    const fieldset = page.root!.querySelector('fieldset')!;
    expect(fieldset.className).toBe('utrecht-fieldset');
    expect(fieldset.hasAttribute('disabled')).toBe(false);
    expect(fieldset.hasAttribute('aria-invalid')).toBe(false);
    expect(fieldset.querySelector('legend.utrecht-form-label')!.textContent).toBe('Persoonsgegevens');
    expect(fieldset.querySelector('input[name="naam"]')).not.toBeNull();
  });

  it('disables the native fieldset', async () => {
    const page = await render('<tilburg-webc-fieldset disabled></tilburg-webc-fieldset>');
    const fieldset = page.root!.querySelector('fieldset')!;
    expect(fieldset).toHaveClass('utrecht-fieldset--disabled');
    expect(fieldset.hasAttribute('disabled')).toBe(true);
  });

  it('marks the group invalid', async () => {
    const page = await render('<tilburg-webc-fieldset invalid></tilburg-webc-fieldset>');
    const fieldset = page.root!.querySelector('fieldset')!;
    expect(fieldset).toHaveClass('utrecht-fieldset--invalid');
    expect(fieldset.getAttribute('aria-invalid')).toBe('true');
  });

  it('moves id and ARIA labelling attributes from the host to the fieldset', async () => {
    const page = await render(
      '<tilburg-webc-fieldset id="fs" aria-label="Groep" aria-labelledby="l" aria-describedby="d"></tilburg-webc-fieldset>',
    );
    const fieldset = page.root!.querySelector('fieldset')!;
    for (const name of ['id', 'aria-label', 'aria-labelledby', 'aria-describedby']) {
      expect(page.root!.hasAttribute(name)).toBe(false);
    }
    expect(fieldset.id).toBe('fs');
    expect(fieldset.getAttribute('aria-label')).toBe('Groep');
    expect(fieldset.getAttribute('aria-labelledby')).toBe('l');
    expect(fieldset.getAttribute('aria-describedby')).toBe('d');
  });
});
