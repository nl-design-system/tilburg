/* @license CC0-1.0 */

/**
 * Tilburg password input enhancement: opt-in JS that makes the show/hide toggle of the plain HTML/CSS password input
 * work. The React, Angular and Web Component versions do the same themselves, so they never carry the opt-in
 * attribute.
 *
 * Opt-in via `data-tilburg-password-input-enhance` on the `.tilburg-password-input` root. The status texts can be set
 * per field with `data-status-shown` / `data-status-hidden` (defaults: "Wachtwoord is zichtbaar." /
 * "Wachtwoord is verborgen.").
 *
 * Usage:
 *   <script type="module" src="…/password-input/index.js"></script>   <!-- auto-init -->
 * or:
 *   import { enhancePasswordInput } from '@gemeente-tilburg/components-css/password-input/index.js';
 *   enhancePasswordInput();
 */

const OPT_IN_FLAG = 'data-tilburg-password-input-enhance';
const ENHANCED_FLAG = 'data-tilburg-password-input-enhanced';

const DEFAULT_STATUS_SHOWN = 'Wachtwoord is zichtbaar.';
const DEFAULT_STATUS_HIDDEN = 'Wachtwoord is verborgen.';

/**
 * Enhance every `.tilburg-password-input[data-tilburg-password-input-enhance]` within `root`: the toggle switches the
 * input between `password` and `text`, updates `aria-pressed` and writes the status line. Idempotent.
 */
export function enhancePasswordInput(root = typeof document !== 'undefined' ? document : null) {
  if (!root) return;
  root.querySelectorAll(`.tilburg-password-input[${OPT_IN_FLAG}]:not([${ENHANCED_FLAG}])`).forEach((wrapper) => {
    const input = wrapper.querySelector('input');
    const toggle = wrapper.querySelector('.tilburg-password-input__toggle');
    const status = wrapper.querySelector('.tilburg-password-input__status');
    if (!input || !toggle) return;
    wrapper.setAttribute(ENHANCED_FLAG, '');

    toggle.addEventListener('click', () => {
      const visible = toggle.getAttribute('aria-pressed') !== 'true';
      input.type = visible ? 'text' : 'password';
      toggle.setAttribute('aria-pressed', String(visible));
      if (status) {
        status.textContent = visible
          ? wrapper.getAttribute('data-status-shown') || DEFAULT_STATUS_SHOWN
          : wrapper.getAttribute('data-status-hidden') || DEFAULT_STATUS_HIDDEN;
      }
    });
  });
}

/* Auto-init when loaded as a module in the browser. Safe in SSR — guarded on `document`. */
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => enhancePasswordInput());
  } else {
    enhancePasswordInput();
  }
}

export default enhancePasswordInput;
