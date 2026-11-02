/* @license CC0-1.0 */

/**
 * Tilburg listbox enhancement: opt-in JS that gives the plain HTML/CSS listbox the keyboard and pointer behaviour of
 * the React, Angular and Web Component versions (which never carry the opt-in attribute).
 *
 * Opt-in via `data-tilburg-listbox-enhance` on the `.utrecht-listbox--html-div[role="listbox"]` element. State lives
 * in the DOM: `aria-activedescendant` + `data-active` for the active option, `aria-selected` for the selection,
 * `aria-multiselectable="true"` for multiple select, `aria-disabled="true"` to switch it all off. A `change` event
 * bubbles from the listbox after every selection change.
 *
 * Usage:
 *   <script type="module" src="…/listbox/index.js"></script>   <!-- auto-init -->
 * or:
 *   import { enhanceListbox } from '@gemeente-tilburg/components-css/listbox/index.js';
 *   enhanceListbox();
 */

const OPT_IN_FLAG = 'data-tilburg-listbox-enhance';
const ENHANCED_FLAG = 'data-tilburg-listbox-enhanced';

const getOptions = (listbox) => Array.from(listbox.querySelectorAll('[role="option"]'));
const isDisabled = (listbox) => listbox.getAttribute('aria-disabled') === 'true';

function setActive(listbox, option) {
  getOptions(listbox).forEach((opt) => opt.removeAttribute('data-active'));
  if (!option) {
    listbox.removeAttribute('aria-activedescendant');
    return;
  }
  option.setAttribute('data-active', 'true');
  listbox.setAttribute('aria-activedescendant', option.id);
  if (option.scrollIntoView) option.scrollIntoView({ block: 'nearest' });
}

function select(listbox, option) {
  const multiple = listbox.getAttribute('aria-multiselectable') === 'true';
  getOptions(listbox).forEach((opt) => {
    const was = opt.getAttribute('aria-selected') === 'true';
    /* Multiple: toggle the chosen option, keep the rest. Single: only the chosen option. */
    const selected = multiple ? (opt === option) !== was : opt === option;
    opt.setAttribute('aria-selected', String(selected));
    opt.classList.toggle('utrecht-listbox__option--selected', selected);
  });
  listbox.dispatchEvent(new Event('change', { bubbles: true }));
}

/**
 * Enhance every `.utrecht-listbox--html-div[data-tilburg-listbox-enhance]` within `root`: Arrow Up/Down, Home and End
 * move the active option, Space and Enter select it (toggle with `aria-multiselectable`), a click selects. Focus stays
 * on the listbox (WAI-ARIA listbox pattern with `aria-activedescendant`). Idempotent.
 *
 * @param {ParentNode} [root=document] Scope to search within.
 */
export function enhanceListbox(root = typeof document !== 'undefined' ? document : null) {
  if (!root) return;
  root.querySelectorAll(`.utrecht-listbox--html-div[${OPT_IN_FLAG}]:not([${ENHANCED_FLAG}])`).forEach((listbox) => {
    listbox.setAttribute(ENHANCED_FLAG, '');
    const active = () => listbox.ownerDocument.getElementById(listbox.getAttribute('aria-activedescendant') || '');

    listbox.addEventListener('focus', () => {
      if (isDisabled(listbox) || active()) return;
      /* WAI-ARIA: focus lands on the first selected option, or the first option. */
      const options = getOptions(listbox);
      setActive(listbox, options.find((opt) => opt.getAttribute('aria-selected') === 'true') || options[0]);
    });
    listbox.addEventListener('blur', () => setActive(listbox, null));

    listbox.addEventListener('keydown', (event) => {
      const options = getOptions(listbox);
      if (isDisabled(listbox) || options.length === 0) return;
      const index = options.indexOf(active());
      const moves = {
        ArrowDown: Math.min(index + 1, options.length - 1),
        ArrowUp: Math.max(index - 1, 0),
        Home: 0,
        End: options.length - 1,
      };
      if (event.key in moves) {
        event.preventDefault();
        setActive(listbox, options[moves[event.key]]);
      } else if ((event.key === ' ' || event.key === 'Enter') && index >= 0) {
        event.preventDefault();
        select(listbox, options[index]);
      }
    });

    listbox.addEventListener('click', (event) => {
      const option = event.target instanceof Element ? event.target.closest('[role="option"]') : null;
      if (!option || isDisabled(listbox)) return;
      setActive(listbox, option);
      select(listbox, option);
    });
  });
}

/* Auto-init when loaded as a module in the browser. Safe in SSR — guarded on `document`. */
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => enhanceListbox());
  } else {
    enhanceListbox();
  }
}

export default enhanceListbox;
