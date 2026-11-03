/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

/**
 * Build-time fix for an XSS hole in Stencil's light-DOM slot patches (`experimentalSlotFixes`, Stencil 4.45).
 *
 * Stencil patches each slotted host's `textContent` setter and `insertAdjacentText` to call
 * `this.insertAdjacentHTML(...)`, so text is parsed as HTML. React writes a single string child via
 * `textContent`, which made `<TilburgWbcCode>{userInput}</TilburgWbcCode>` run `<img onerror>` payloads.
 * The patched `textContent` is non-configurable, so it cannot be replaced at runtime; this rollup plugin
 * rewrites the two calls in Stencil's client runtime instead. The value then goes in as a text node via
 * Stencil's patched `append`/`prepend`, which still relocate it into the light-DOM `<slot>`.
 *
 * The build fails when a Stencil upgrade changes this code: re-check whether the hole is still there.
 */
const RUNTIME = /[\\/]@stencil[\\/]core[\\/]internal[\\/]client[\\/]index\.js(\?|$)/; // lazy builds append `?app-data=conditional`

const REPLACEMENTS: [string, string][] = [
  // patchTextContent setter
  [
    'this.insertAdjacentHTML("beforeend", value);',
    'if (value !== null && value !== undefined && value !== "") this.append(String(value));',
  ],
  // patchSlotInsertAdjacentText
  [
    'this.insertAdjacentHTML(position, text);',
    'if (position === "afterbegin") this.prepend(text); else if (position === "beforeend") this.append(text); else HTMLElement.prototype.insertAdjacentText.call(this, position, text);',
  ],
];

export function patchStencilRuntime(code: string): string {
  return REPLACEMENTS.reduce((result, [unsafe, safe]) => {
    if (result.split(unsafe).length !== 2) {
      throw new Error(`safe-text-content: expected exactly one \`${unsafe}\` in the Stencil runtime`);
    }
    return result.replace(unsafe, safe);
  }, code);
}

export const safeTextContent = () => ({
  name: 'tilburg-safe-text-content',
  transform: (code: string, id: string) => (RUNTIME.test(id) ? { code: patchStencilRuntime(code), map: null } : null),
});
