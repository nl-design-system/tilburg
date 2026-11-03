import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcListbox } from './component';

const items = [
  { value: 'centrum', label: 'Centrum' },
  { value: 'noord', label: 'Noord' },
  { value: 'reeshof', label: 'Reeshof' },
];

const setup = async (attrs = '', props: Partial<TilburgWbcListbox> = {}) => {
  const page = await newSpecPage({
    components: [TilburgWbcListbox],
    html: `<tilburg-wbc-listbox ${attrs}></tilburg-wbc-listbox>`,
  });
  Object.assign(page.root as unknown as TilburgWbcListbox, { items, ...props });
  await page.waitForChanges();
  const listbox = page.root!.querySelector<HTMLElement>('[role="listbox"]')!;
  const options = () => Array.from(page.root!.querySelectorAll('li'));
  const key = async (k: string) => {
    listbox.dispatchEvent(new KeyboardEvent('keydown', { key: k }));
    await page.waitForChanges();
  };
  return { page, listbox, options, key };
};

describe('tilburg-wbc-listbox', () => {
  it('renders the reference DOM in light DOM and moves id and aria attributes onto the listbox', async () => {
    const { page, listbox, options } = await setup('id="sd" aria-label="Stadsdeel"', { value: 'noord' });
    expect(page.root!.shadowRoot).toBeNull();
    expect(page.root!.hasAttribute('id')).toBe(false);
    expect(listbox).toHaveClasses(['utrecht-listbox', 'utrecht-listbox--html-div']);
    expect(listbox.getAttribute('id')).toBe('sd');
    expect(listbox.getAttribute('aria-label')).toBe('Stadsdeel');
    expect(listbox.getAttribute('tabindex')).toBe('0');
    expect(listbox.querySelector('ul')!.getAttribute('role')).toBe('presentation');
    const [first, second] = options();
    expect(first).toHaveClasses(['utrecht-listbox__option', 'utrecht-listbox__option--html-li']);
    expect(first.getAttribute('id')).toBe('sd-opt-0');
    expect(first.getAttribute('aria-selected')).toBe('false');
    expect(second.getAttribute('aria-selected')).toBe('true');
    expect(second).toHaveClass('utrecht-listbox__option--selected');
  });

  it('maps multiple, invalid, required and disabled', async () => {
    const { listbox, options } = await setup('multiple invalid required disabled');
    expect(listbox.getAttribute('aria-multiselectable')).toBe('true');
    expect(listbox.getAttribute('aria-invalid')).toBe('true');
    expect(listbox.getAttribute('aria-required')).toBe('true');
    expect(listbox.getAttribute('aria-disabled')).toBe('true');
    expect(listbox).toHaveClasses(['utrecht-listbox--invalid', 'utrecht-listbox--disabled']);
    options()[0].click();
    expect(options()[0].getAttribute('aria-selected')).toBe('false');
  });

  it('moves the active option with the keyboard and emits tilburgChange on Space/Enter', async () => {
    const { page, listbox, options, key } = await setup('id="kb"');
    const spy = jest.fn();
    page.root!.addEventListener('tilburgChange', (event) => spy((event as CustomEvent).detail));
    listbox.dispatchEvent(new Event('focus'));
    await page.waitForChanges();
    expect(listbox.getAttribute('aria-activedescendant')).toBe('kb-opt-0');
    await key('ArrowDown');
    expect(listbox.getAttribute('aria-activedescendant')).toBe('kb-opt-1');
    expect(options()[1].getAttribute('data-active')).toBe('true');
    await key(' ');
    expect(spy).toHaveBeenLastCalledWith('noord');
    expect((page.root as unknown as TilburgWbcListbox).value).toBe('noord');
    await key('End');
    await key('Enter');
    expect(spy).toHaveBeenLastCalledWith('reeshof');
    await key('Home');
    expect(listbox.getAttribute('aria-activedescendant')).toBe('kb-opt-0');
  });

  it('toggles in multiple mode and renders hidden inputs for the form when named', async () => {
    const { page, options } = await setup('multiple name="stadsdeel"', { value: ['noord'] });
    options()[0].click();
    await page.waitForChanges();
    expect((page.root as unknown as TilburgWbcListbox).value).toEqual(['noord', 'centrum']);
    const hidden = Array.from(page.root!.querySelectorAll<HTMLInputElement>('input[type="hidden"]'));
    expect(hidden.map((input) => input.getAttribute('value'))).toEqual(['noord', 'centrum']);
    expect(hidden.every((input) => input.getAttribute('name') === 'stadsdeel')).toBe(true);
  });

  it('does not submit the hidden inputs when disabled', async () => {
    const { page } = await setup('name="stadsdeel" disabled', { value: 'noord' });
    const hidden = page.root!.querySelector<HTMLInputElement>('input[type="hidden"]')!;
    expect(hidden.disabled).toBe(true);
  });

  it('clamps the active option when items shrink', async () => {
    const { page, listbox, key } = await setup('id="cl"');
    listbox.dispatchEvent(new Event('focus'));
    await page.waitForChanges();
    await key('End');
    expect(listbox.getAttribute('aria-activedescendant')).toBe('cl-opt-2');
    (page.root as unknown as TilburgWbcListbox).items = items.slice(0, 1);
    await page.waitForChanges();
    expect(listbox.getAttribute('aria-activedescendant')).toBe('cl-opt-0');
  });
});
