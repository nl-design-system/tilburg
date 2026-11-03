/* global globalThis -- the spec swaps the MutationObserver the component reads as a global. */
import { inheritAttributes, InheritedAttributes } from './inherit-attributes';

describe('inheritAttributes', () => {
  const original = globalThis.MutationObserver;
  let notify: () => void = () => {};
  beforeEach(() => {
    globalThis.MutationObserver = class {
      constructor(callback: () => void) {
        notify = callback;
      }
      observe() {}
      disconnect() {}
    } as unknown as typeof MutationObserver;
  });
  afterEach(() => {
    globalThis.MutationObserver = original;
  });

  it('drops an attribute the consumer removes and picks up a new value', () => {
    const host = document.createElement('div');
    host.setAttribute('aria-label', 'Sluiten');
    let inherited: InheritedAttributes = {};
    const inheritor = inheritAttributes(host, ['aria-label', 'title'], (attributes) => (inherited = attributes));
    expect(inherited).toEqual({ 'aria-label': 'Sluiten' });
    expect(host.hasAttribute('aria-label')).toBe(false);

    host.removeAttribute('aria-label');
    expect(inherited).toEqual({});

    host.setAttribute('aria-label', 'Openen');
    notify();
    expect(inherited).toEqual({ 'aria-label': 'Openen' });
    expect(host.hasAttribute('aria-label')).toBe(false);

    host.removeAttribute('class');
    expect(inherited).toEqual({ 'aria-label': 'Openen' });

    inheritor.disconnect();
    host.removeAttribute('aria-label');
    expect(inherited).toEqual({ 'aria-label': 'Openen' });
  });
});
