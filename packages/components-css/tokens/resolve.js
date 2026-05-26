/* @license CC0-1.0 */

/**
 * Tilburg design-token resolver — opt-in JS that fills in the "Resolved value"
 * column of the HTML/CSS token reference tables at runtime. Walks every
 * element with a `data-token="--tilburg-…"` attribute, reads the live
 * computed value via `getComputedStyle()` (which inherits the property from
 * the `.tilburg-theme` ancestor where the tokens are defined), and writes the
 * resolved string into the cell's text content.
 *
 * Usage:
 *   <script type="module" src="…/tokens/resolve.js"></script>   <!-- auto-init -->
 * or:
 *   import { resolveTokens } from '@gemeente-tilburg/components-css/tokens/resolve';
 *   resolveTokens();
 *
 * Idempotent and cheap — re-running on the same root just rewrites the same
 * value into each cell. Safe to invoke on every Storybook canvas re-render.
 */

const FALLBACK_TEXT = '—'; /* em dash — shown when the token is undefined */

/**
 * Resolve every `[data-token]` cell within `root`.
 *
 * @param {ParentNode} [root=document] Scope to search within.
 */
export function resolveTokens(root = typeof document !== 'undefined' ? document : null) {
  if (!root) return;
  const cells = root.querySelectorAll('[data-token]');
  cells.forEach((cell) => {
    if (!(cell instanceof HTMLElement)) return;
    const tokenName = cell.getAttribute('data-token');
    if (!tokenName) return;
    const resolved = getComputedStyle(cell).getPropertyValue(tokenName).trim();
    const display = resolved || FALLBACK_TEXT;
    if (cell.textContent !== display) {
      cell.textContent = display;
    }
  });
}

/* Auto-init when loaded as a module in the browser. SSR-safe — guarded on
   `document`. Consumers that want explicit control can ignore this and call
   `resolveTokens()` on their own root. */
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => resolveTokens());
  } else {
    resolveTokens();
  }
}

export default resolveTokens;
