import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { TilburgWebcCombobox, TilburgWebcComboboxItem } from './component';

const contact: TilburgWebcComboboxItem<string>[] = [
  { value: 'email', label: 'E-mail' },
  { value: 'post', label: 'Per post' },
  { value: 'balie', label: 'Ophalen bij de balie' },
];

const documents: TilburgWebcComboboxItem<string>[] = [
  { value: 'paspoort', label: 'Paspoort' },
  { value: 'geboorteakte', label: 'Geboorteakte' },
  { value: 'rijbewijs', label: 'Rijbewijs', disabled: true },
  { value: 'verblijfsdocument', label: 'Verblijfsdocument' },
];

type ComboboxElement = HTMLElement & { items: TilburgWebcComboboxItem[]; value?: unknown };

const render = async (
  html: string,
  items: TilburgWebcComboboxItem[] = contact,
  value?: unknown,
): Promise<{ page: SpecPage; root: ComboboxElement; input: HTMLInputElement; changes: jest.Mock }> => {
  const page = await newSpecPage({ components: [TilburgWebcCombobox], html });
  const root = page.body.querySelector('tilburg-webc-combobox') as ComboboxElement;
  root.items = items;
  if (value !== undefined) root.value = value;
  await page.waitForChanges();
  const changes = jest.fn();
  root.addEventListener('tilburgChange', (event) => changes((event as CustomEvent).detail));
  return { page, root, input: root.querySelector('input.tilburg-combobox__input')!, changes };
};

const key = async (page: SpecPage, input: HTMLInputElement, name: string) => {
  input.dispatchEvent(new KeyboardEvent('keydown', { key: name, bubbles: true, cancelable: true }));
  await page.waitForChanges();
};

const options = (root: HTMLElement) => Array.from(root.querySelectorAll('li[role="option"]'));
const listbox = (root: HTMLElement) => root.querySelector('ul[role="listbox"]')!;

describe('tilburg-webc-combobox', () => {
  it('renders the reference combobox markup (closed)', async () => {
    const { root, input } = await render('<tilburg-webc-combobox id="cb" placeholder="Kies"></tilburg-webc-combobox>');
    const shell = root.querySelector('.utrecht-combobox')!;
    expect(shell).not.toHaveClass('tilburg-combobox--multiple');
    expect(shell.querySelector('.tilburg-combobox__value-container > input.tilburg-combobox__input')).toBe(input);
    expect(root.hasAttribute('id')).toBe(false);
    expect(input.id).toBe('cb');
    expect(input.getAttribute('type')).toBe('text');
    expect(input.getAttribute('role')).toBe('combobox');
    expect(input.hasAttribute('readonly')).toBe(true);
    expect(input.getAttribute('aria-expanded')).toBe('false');
    expect(input.getAttribute('aria-controls')).toBe('cb-listbox');
    expect(input.hasAttribute('aria-activedescendant')).toBe(false);
    expect(input.getAttribute('placeholder')).toBe('Kies');
    const chevron = root.querySelector('button.tilburg-combobox__chevron')!;
    expect(chevron.getAttribute('aria-label')).toBe('Toon opties');
    expect(chevron.getAttribute('tabindex')).toBe('-1');
    expect(chevron.querySelector('svg path')!.getAttribute('d')).toBe('M6 9l6 6 6-6');
    expect(root.querySelector('.tilburg-combobox__clear')).toBeNull();
    const list = listbox(root);
    expect(list.id).toBe('cb-listbox');
    expect(list).toHaveClasses([
      'utrecht-listbox',
      'utrecht-combobox__popover',
      'utrecht-combobox__popover--block-end',
      'utrecht-combobox__popover--hidden',
    ]);
    expect(list.hasAttribute('aria-multiselectable')).toBe(false);
    expect(options(root).map((o) => [o.id, o.textContent, o.getAttribute('aria-selected')])).toEqual([
      ['cb-opt-0', 'E-mail', 'false'],
      ['cb-opt-1', 'Per post', 'false'],
      ['cb-opt-2', 'Ophalen bij de balie', 'false'],
    ]);
    expect(options(root)[0]).toHaveClass('utrecht-listbox__option');
  });

  it('generates unique ids when no id is given', async () => {
    const page = await newSpecPage({
      components: [TilburgWebcCombobox],
      html: '<tilburg-webc-combobox></tilburg-webc-combobox><tilburg-webc-combobox></tilburg-webc-combobox>',
    });
    const [a, b] = Array.from(page.body.querySelectorAll('input.tilburg-combobox__input'));
    expect(a.id).toMatch(/^tilburg-webc-combobox-\d+$/);
    expect(a.id).not.toBe(b.id);
    expect(a.getAttribute('aria-controls')).toBe(`${a.id}-listbox`);
  });

  it('moves aria-label / aria-describedby onto the input and maps invalid / required', async () => {
    const { root, input } = await render(
      '<tilburg-webc-combobox aria-label="Contact" aria-describedby="hint" invalid required></tilburg-webc-combobox>',
    );
    expect(root.hasAttribute('aria-label')).toBe(false);
    expect(input.getAttribute('aria-label')).toBe('Contact');
    expect(input.getAttribute('aria-describedby')).toBe('hint');
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-required')).toBe('true');
  });

  it('shows the label of the selected value and marks the option selected', async () => {
    const { root, input } = await render('<tilburg-webc-combobox></tilburg-webc-combobox>', contact, 'post');
    expect(input.value).toBe('Per post');
    expect(options(root)[1].getAttribute('aria-selected')).toBe('true');
  });

  it('toggles the popover from the value container without auto-activating an option', async () => {
    const { page, root, input } = await render('<tilburg-webc-combobox></tilburg-webc-combobox>');
    (root.querySelector('.tilburg-combobox__value-container') as HTMLElement).click();
    await page.waitForChanges();
    expect(input.getAttribute('aria-expanded')).toBe('true');
    expect(listbox(root)).not.toHaveClass('utrecht-combobox__popover--hidden');
    expect(root.querySelector('.tilburg-combobox__chevron')!.getAttribute('aria-label')).toBe('Sluit opties');
    expect(root.querySelector('[data-active]')).toBeNull();
    (root.querySelector('.tilburg-combobox__chevron') as HTMLElement).click();
    await page.waitForChanges();
    expect(input.getAttribute('aria-expanded')).toBe('false');
  });

  it('navigates with the keyboard and selects with Enter (single)', async () => {
    const { page, root, input, changes } = await render('<tilburg-webc-combobox id="cb"></tilburg-webc-combobox>');
    await key(page, input, 'ArrowDown');
    expect(input.getAttribute('aria-expanded')).toBe('true');
    expect(input.hasAttribute('aria-activedescendant')).toBe(false);
    await key(page, input, 'ArrowDown');
    expect(input.getAttribute('aria-activedescendant')).toBe('cb-opt-0');
    expect(options(root)[0].getAttribute('data-active')).toBe('true');
    await key(page, input, 'End');
    expect(input.getAttribute('aria-activedescendant')).toBe('cb-opt-2');
    await key(page, input, 'ArrowDown');
    expect(input.getAttribute('aria-activedescendant')).toBe('cb-opt-2');
    await key(page, input, 'Home');
    expect(input.getAttribute('aria-activedescendant')).toBe('cb-opt-0');
    await key(page, input, 'ArrowUp');
    expect(input.getAttribute('aria-activedescendant')).toBe('cb-opt-0');
    await key(page, input, 'ArrowDown');
    await key(page, input, 'Enter');
    expect(changes).toHaveBeenCalledWith('post');
    expect(root.value).toBe('post');
    expect(input.value).toBe('Per post');
    expect(input.getAttribute('aria-expanded')).toBe('false');
  });

  it('closes with Escape', async () => {
    const { page, input } = await render('<tilburg-webc-combobox></tilburg-webc-combobox>');
    await key(page, input, 'ArrowDown');
    await key(page, input, 'Escape');
    expect(input.getAttribute('aria-expanded')).toBe('false');
  });

  it('selects an option on mousedown and tracks hover as active', async () => {
    const { page, root, changes } = await render('<tilburg-webc-combobox></tilburg-webc-combobox>');
    (root.querySelector('.tilburg-combobox__value-container') as HTMLElement).click();
    await page.waitForChanges();
    const option = options(root)[2];
    option.dispatchEvent(new MouseEvent('mouseenter'));
    await page.waitForChanges();
    expect(option.getAttribute('data-active')).toBe('true');
    option.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
    await page.waitForChanges();
    expect(changes).toHaveBeenCalledWith('balie');
    expect(listbox(root)).toHaveClass('utrecht-combobox__popover--hidden');
  });

  it('closes on a mousedown outside the component', async () => {
    const { page, root, input } = await render('<tilburg-webc-combobox></tilburg-webc-combobox>');
    (root.querySelector('.tilburg-combobox__value-container') as HTMLElement).click();
    await page.waitForChanges();
    root.querySelector('li')!.dispatchEvent(new MouseEvent('mouseenter'));
    page.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    await page.waitForChanges();
    expect(input.getAttribute('aria-expanded')).toBe('false');
  });

  it('clears the single value with the clear button', async () => {
    const { page, root, input, changes } = await render(
      '<tilburg-webc-combobox clearable></tilburg-webc-combobox>',
      contact,
      'email',
    );
    const clear = root.querySelector<HTMLButtonElement>('button.tilburg-combobox__clear')!;
    expect(clear.getAttribute('aria-label')).toBe('Wis selectie');
    clear.click();
    await page.waitForChanges();
    expect(changes).toHaveBeenCalledWith(null);
    expect(input.value).toBe('');
    expect(input.getAttribute('aria-expanded')).toBe('false');
    expect(root.querySelector('.tilburg-combobox__clear')).toBeNull();
  });

  it('renders chips and a multiselectable listbox in multiple mode', async () => {
    const { root, input } = await render(
      '<tilburg-webc-combobox multiple placeholder="Voeg toe"></tilburg-webc-combobox>',
      documents,
      ['paspoort', 'geboorteakte'],
    );
    expect(root.querySelector('.utrecht-combobox')).toHaveClass('tilburg-combobox--multiple');
    expect(listbox(root).getAttribute('aria-multiselectable')).toBe('true');
    const chips = Array.from(root.querySelectorAll('.tilburg-combobox__value-container > .tilburg-combobox__chip'));
    expect(chips.map((c) => c.firstChild!.textContent)).toEqual(['Paspoort', 'Geboorteakte']);
    expect(chips[0].querySelector('button.tilburg-combobox__chip-remove')!.getAttribute('aria-label')).toBe(
      'Verwijder Paspoort',
    );
    expect(input.value).toBe('');
    expect(input.hasAttribute('placeholder')).toBe(false);
  });

  it('toggles options without closing in multiple mode', async () => {
    const { page, root, input, changes } = await render(
      '<tilburg-webc-combobox multiple></tilburg-webc-combobox>',
      documents,
      ['paspoort'],
    );
    await key(page, input, 'ArrowDown');
    await key(page, input, 'ArrowDown');
    await key(page, input, 'ArrowDown');
    await key(page, input, 'Enter');
    expect(changes).toHaveBeenLastCalledWith(['paspoort', 'geboorteakte']);
    expect(input.getAttribute('aria-expanded')).toBe('true');
    await key(page, input, 'Home');
    await key(page, input, 'Enter');
    expect(changes).toHaveBeenLastCalledWith(['geboorteakte']);
    expect(root.querySelectorAll('.tilburg-combobox__chip').length).toBe(1);
  });

  it('skips and ignores disabled options', async () => {
    const { page, root, input, changes } = await render(
      '<tilburg-webc-combobox id="d" multiple></tilburg-webc-combobox>',
      documents,
      [],
    );
    expect(options(root)[2].getAttribute('aria-disabled')).toBe('true');
    await key(page, input, 'ArrowDown');
    await key(page, input, 'ArrowDown');
    await key(page, input, 'ArrowDown');
    await key(page, input, 'ArrowDown');
    expect(input.getAttribute('aria-activedescendant')).toBe('d-opt-3');
    options(root)[2].dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
    await page.waitForChanges();
    expect(changes).not.toHaveBeenCalled();
  });

  it('removes chips via the × button, Backspace and clear-all', async () => {
    const { page, root, input, changes } = await render(
      '<tilburg-webc-combobox multiple clearable placeholder="Voeg toe"></tilburg-webc-combobox>',
      documents,
      ['paspoort', 'geboorteakte', 'verblijfsdocument'],
    );
    root.querySelector<HTMLButtonElement>('.tilburg-combobox__chip-remove')!.click();
    await page.waitForChanges();
    expect(changes).toHaveBeenLastCalledWith(['geboorteakte', 'verblijfsdocument']);
    expect(input.getAttribute('aria-expanded')).toBe('false');
    await key(page, input, 'Backspace');
    expect(changes).toHaveBeenLastCalledWith(['geboorteakte']);
    root.querySelector<HTMLButtonElement>('.tilburg-combobox__clear')!.click();
    await page.waitForChanges();
    expect(changes).toHaveBeenLastCalledWith([]);
    expect(root.querySelectorAll('.tilburg-combobox__chip').length).toBe(0);
    expect(input.getAttribute('placeholder')).toBe('Voeg toe');
  });

  it('does not open or change when disabled', async () => {
    const { page, root, input, changes } = await render(
      '<tilburg-webc-combobox disabled multiple></tilburg-webc-combobox>',
      documents,
      ['paspoort'],
    );
    expect(input.hasAttribute('disabled')).toBe(true);
    expect(root.querySelector('.tilburg-combobox__chevron')!.hasAttribute('disabled')).toBe(true);
    expect(root.querySelector('.tilburg-combobox__chip-remove')!.hasAttribute('disabled')).toBe(true);
    await key(page, input, 'ArrowDown');
    (root.querySelector('.tilburg-combobox__value-container') as HTMLElement).click();
    await page.waitForChanges();
    expect(input.getAttribute('aria-expanded')).toBe('false');
    await key(page, input, 'Backspace');
    expect(changes).not.toHaveBeenCalled();
  });

  it('renders hidden inputs for form submission when a name is set', async () => {
    const { root } = await render('<tilburg-webc-combobox name="docs" multiple></tilburg-webc-combobox>', documents, [
      'paspoort',
      'geboorteakte',
    ]);
    const hidden = Array.from(root.querySelectorAll<HTMLInputElement>('input[type="hidden"][name="docs"]'));
    expect(hidden.map((i) => i.value)).toEqual(['paspoort', 'geboorteakte']);
  });
});
