import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcSelect } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcSelect], html });

const OPTIONS = `[{"value":"centrum","label":"Tilburg-Centrum"},{"value":"noord","label":"Tilburg-Noord","disabled":true}]`;

describe('tilburg-wbc-select', () => {
  it('renders a native select in light DOM with the utrecht classes and the options from JSON', async () => {
    const page = await render(
      `<tilburg-wbc-select options='${OPTIONS}' placeholder="Maak een keuze"></tilburg-wbc-select>`,
    );
    const select = page.root!.querySelector('select')!;
    expect(page.root!.shadowRoot).toBeNull();
    expect(select).toHaveClasses(['utrecht-select', 'utrecht-select--html-select']);
    const options = Array.from(select.querySelectorAll('option'));
    expect(options.map((option) => option.textContent)).toEqual(['Maak een keuze', 'Tilburg-Centrum', 'Tilburg-Noord']);
    expect(options[0].getAttribute('value')).toBe('');
    expect(options[2].hasAttribute('disabled')).toBe(true);
    expect(select.hasAttribute('aria-invalid')).toBe(false);
  });

  it('maps state props to attributes, ARIA and modifier classes', async () => {
    const page = await render(
      `<tilburg-wbc-select invalid required disabled name="stadsdeel" options='${OPTIONS}'></tilburg-wbc-select>`,
    );
    const select = page.root!.querySelector('select')!;
    expect(select).toHaveClasses(['utrecht-select--invalid', 'utrecht-select--disabled']);
    expect(select.getAttribute('aria-invalid')).toBe('true');
    expect(select.getAttribute('aria-required')).toBe('true');
    expect(select.hasAttribute('required')).toBe(true);
    expect(select.hasAttribute('disabled')).toBe(true);
    expect(select.getAttribute('name')).toBe('stadsdeel');
  });

  it('moves id and ARIA attributes from the host to the select', async () => {
    const page = await render(
      `<tilburg-wbc-select id="stadsdeel" aria-describedby="hint" options='${OPTIONS}'></tilburg-wbc-select>`,
    );
    const select = page.root!.querySelector('select')!;
    expect(page.root!.hasAttribute('id')).toBe(false);
    expect(page.root!.hasAttribute('aria-describedby')).toBe(false);
    expect(select.getAttribute('id')).toBe('stadsdeel');
    expect(select.getAttribute('aria-describedby')).toBe('hint');
  });

  it('selects the value, accepts an options array and keeps value in sync with a change', async () => {
    const page = await render('<tilburg-wbc-select></tilburg-wbc-select>');
    page.root!.options = [
      { value: 'centrum', label: 'Tilburg-Centrum' },
      { value: 'noord', label: 'Tilburg-Noord' },
    ];
    page.root!.value = 'noord';
    await page.waitForChanges();
    const select = page.root!.querySelector('select')!;
    expect(select.querySelector('option[value="noord"]')!.hasAttribute('selected')).toBe(true);
    select.value = 'centrum';
    select.dispatchEvent(new Event('change'));
    await page.waitForChanges();
    expect(page.root!.value).toBe('centrum');
  });

  it('ignores options that are not valid JSON', async () => {
    const page = await render(`<tilburg-wbc-select options="not json"></tilburg-wbc-select>`);
    expect(page.root!.querySelectorAll('option')).toHaveLength(0);
  });
});
