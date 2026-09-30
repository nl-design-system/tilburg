/* @license CC0-1.0 */

/**
 * Tilburg accordion enhancement — opt-in JS that wires up the toggle on plain
 * HTML/CSS accordion markup. Mirrors the keyboard + click behavior already
 * implemented in `packages/components-angular/src/accordion/component.ts` and
 * `packages/components-react/src/Accordion.tsx` so consumers using the raw
 * BEM markup get the same UX without writing their own JS.
 *
 * Opt-in via the `data-tilburg-accordion-enhance` attribute on the
 * `.utrecht-accordion` root. The Angular and React wrappers never emit that
 * attribute, so they're untouched.
 *
 * Usage:
 *   <script type="module" src="…/accordion/index.js"></script>   <!-- auto-init -->
 * or:
 *   import { enhanceAccordion } from '@gemeente-tilburg/components-css/accordion';
 *   enhanceAccordion();
 */

const ENHANCED_FLAG = 'data-tilburg-accordion-enhanced';
const OPT_IN_FLAG = 'data-tilburg-accordion-enhance';
const NAV_KEYS = new Set(['ArrowDown', 'ArrowUp', 'Home', 'End']);

/** Toggle a single section open/closed. */
function toggleSection(button) {
  if (button.disabled) return;
  const expanded = button.getAttribute('aria-expanded') === 'true';
  const nextExpanded = !expanded;
  button.setAttribute('aria-expanded', String(nextExpanded));

  const panelId = button.getAttribute('aria-controls');
  if (panelId) {
    const panel = button.ownerDocument.getElementById(panelId);
    if (panel) {
      if (nextExpanded) {
        panel.removeAttribute('hidden');
      } else {
        panel.setAttribute('hidden', '');
      }
    }
  }
  /* The `+` / `−` glyph swap is handled by CSS — see
     `components-css/accordion/index.scss` `:empty::before` rules keyed on
     `[aria-expanded]`. The script just flips the attribute. */
}

/** Handle ArrowUp/Down/Home/End navigation across sibling section buttons. */
function handleKeydown(event, root) {
  if (!NAV_KEYS.has(event.key)) return;
  const target = event.target;
  if (!(target instanceof HTMLButtonElement)) return;
  if (!target.classList.contains('utrecht-accordion__button')) return;
  if (target.closest('.utrecht-accordion') !== root) return;

  const buttons = Array.from(root.querySelectorAll('.utrecht-accordion__button')).filter(
    (b) => !(b instanceof HTMLButtonElement && b.disabled),
  );

  const idx = buttons.indexOf(target);
  if (idx === -1 || buttons.length === 0) return;

  let nextIdx;
  switch (event.key) {
    case 'ArrowDown':
      nextIdx = (idx + 1) % buttons.length;
      break;
    case 'ArrowUp':
      nextIdx = (idx - 1 + buttons.length) % buttons.length;
      break;
    case 'Home':
      nextIdx = 0;
      break;
    case 'End':
      nextIdx = buttons.length - 1;
      break;
  }

  event.preventDefault();
  buttons[nextIdx].focus();
}

/**
 * Enhance every `.utrecht-accordion[data-tilburg-accordion-enhance]` within
 * `root`. Idempotent — already-enhanced accordions are skipped.
 *
 * @param {ParentNode} [root=document] Scope to search within.
 */
export function enhanceAccordion(root = typeof document !== 'undefined' ? document : null) {
  if (!root) return;
  const accordions = root.querySelectorAll(`.utrecht-accordion[${OPT_IN_FLAG}]:not([${ENHANCED_FLAG}])`);
  accordions.forEach((accordion) => {
    accordion.setAttribute(ENHANCED_FLAG, '');

    accordion.addEventListener('click', (event) => {
      const button = event.target instanceof Element ? event.target.closest('.utrecht-accordion__button') : null;
      if (button && accordion.contains(button)) {
        toggleSection(button);
      }
    });

    accordion.addEventListener('keydown', (event) => handleKeydown(event, accordion));
  });
}

/* Auto-init when loaded as a module in the browser. Safe in SSR — guarded
   on `document`. Consumers that want explicit control can ignore this and
   call `enhanceAccordion()` on their own root. */
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => enhanceAccordion());
  } else {
    enhanceAccordion();
  }
}

export default enhanceAccordion;
