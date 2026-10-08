/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

export type InheritedAttributes = Record<string, string>;

export interface AttributeInheritor {
  disconnect(): void;
}

/**
 * Moves attributes that belong on the inner native element (`aria-label`,
 * `title`, `id`, …) from the custom-element host to component state.
 *
 * The components render into light DOM, so an attribute left on the host is a
 * real attribute on a real element: `aria-label` on a generic `<tilburg-wbc-…>`
 * is prohibited by ARIA, a duplicated `id` breaks `<label for>`, and a `title`
 * shows a tooltip over the whole component. Removing them from the host and
 * spreading them on the inner element keeps the DOM identical to the HTML/CSS
 * layer while consumers keep writing plain HTML attributes.
 *
 * Changes after the first render are picked up by a MutationObserver. Because
 * the host attribute is removed after every read, removing it later is not
 * observable — set a new value instead.
 */
export function inheritAttributes(
  host: HTMLElement,
  names: readonly string[],
  onChange: (attributes: InheritedAttributes) => void,
): AttributeInheritor {
  let current: InheritedAttributes = {};

  const sync = () => {
    let changed = false;
    const next = { ...current };
    for (const name of names) {
      const value = host.getAttribute(name);
      if (value !== null) {
        host.removeAttribute(name);
        if (next[name] !== value) {
          next[name] = value;
          changed = true;
        }
      }
    }
    if (changed) {
      current = next;
      onChange(current);
    }
  };

  sync();

  const observer = typeof MutationObserver === 'undefined' ? undefined : new MutationObserver(sync);
  observer?.observe(host, { attributes: true, attributeFilter: [...names] });

  return {
    disconnect: () => observer?.disconnect(),
  };
}
