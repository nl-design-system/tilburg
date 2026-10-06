/* @license CC0-1.0 */

/**
 * Tilburg tooltip enhancement: opt-in JS that opens and closes the plain HTML/CSS tooltip. The React, Angular and Web
 * Component versions do the same themselves, so they never carry the opt-in attribute.
 *
 * Behaviour (WCAG 1.4.13, bq-tlb-frontend TIL-53/54):
 *  - hover opens after a short delay; leaving closes after a short delay, so the pointer can move onto the popup;
 *  - focus opens at once, and moving focus out of the tooltip closes it;
 *  - Escape closes it without moving the pointer or focus;
 *  - on devices without hover (touch), a tap on the trigger toggles it and a tap elsewhere closes it.
 *
 * Placement: while open it stays inside the visible area (the viewport, minus anything an `overflow` ancestor cuts
 * off). It flips to the other side of the trigger when the preferred side has no room, and shifts sideways when it would
 * stick out past the left or right edge. See `placeTooltip`.
 *
 * Opt-in via `data-tilburg-tooltip-enhance` on the `.tilburg-tooltip` root.
 *
 * Usage:
 *   <script type="module" src="…/tooltip/index.js"></script>   <!-- auto-init -->
 * or:
 *   import { enhanceTooltip } from '@gemeente-tilburg/components-css/tooltip/index.js';
 *   enhanceTooltip();
 */

const OPT_IN_FLAG = 'data-tilburg-tooltip-enhance';
const ENHANCED_FLAG = 'data-tilburg-tooltip-enhanced';
const OPEN_CLASS = 'tilburg-tooltip--open';
const BELOW_CLASS = 'tilburg-tooltip--below';
const PLACEMENT_ATTR = 'data-tilburg-tooltip-placement';
const SHIFT_PROPERTY = '--_tilburg-tooltip-shift';
/* Room kept between the tooltip and the left or right edge of the visible area. */
const EDGE_MARGIN_PX = 8;
/* `overflow` values that cut off what sticks out of the element. */
const CLIPPING = /^(auto|clip|hidden|scroll)$/;

/* Short enough to feel responsive, long enough to move the pointer from the trigger onto the popup. */
export const TOOLTIP_SHOW_DELAY_MS = 150;
export const TOOLTIP_HIDE_DELAY_MS = 150;

const canHover = () => typeof matchMedia !== 'function' || !matchMedia('(hover: none)').matches;

/**
 * The part of the viewport that is not cut off by an ancestor that clips its content (`overflow` hidden, clip, scroll or auto).
 */
function visibleArea(element) {
  const viewport = document.documentElement;
  const area = { top: 0, left: 0, right: viewport.clientWidth, bottom: viewport.clientHeight };
  for (let parent = element.parentElement; parent && parent !== document.body; parent = parent.parentElement) {
    const { overflowX, overflowY } = getComputedStyle(parent);
    const clipsX = CLIPPING.test(overflowX);
    const clipsY = CLIPPING.test(overflowY);
    if (!clipsX && !clipsY) continue;
    const rect = parent.getBoundingClientRect();
    if (clipsY) {
      area.top = Math.max(area.top, rect.top);
      area.bottom = Math.min(area.bottom, rect.bottom);
    }
    if (clipsX) {
      area.left = Math.max(area.left, rect.left);
      area.right = Math.min(area.right, rect.right);
    }
  }
  return area;
}

/**
 * Keep an open tooltip inside the visible area: flip it to the other side of the trigger when the preferred side
 * (`tilburg-tooltip--below`, or above by default) has less room, and shift it sideways when it would stick out past the
 * left or right edge. The result is written to `data-tilburg-tooltip-placement` and `--_tilburg-tooltip-shift`, never
 * to the classes, so a framework re-render cannot undo it.
 */
export function placeTooltip(root) {
  const popup = root.querySelector('.tilburg-tooltip__popup');
  if (!popup || typeof getComputedStyle !== 'function') return;
  const area = visibleArea(root);
  /* Nothing to measure against (no layout, e.g. in a test DOM). */
  if (area.right <= area.left || area.bottom <= area.top) return;

  popup.style.removeProperty(SHIFT_PROPERTY);
  const preferred = root.classList.contains(BELOW_CLASS) ? 'below' : 'above';
  const other = preferred === 'above' ? 'below' : 'above';
  const overflowAt = (placement) => {
    root.setAttribute(PLACEMENT_ATTR, placement);
    const rect = popup.getBoundingClientRect();
    return Math.max(0, area.top - rect.top) + Math.max(0, rect.bottom - area.bottom);
  };
  const preferredOverflow = overflowAt(preferred);
  if (preferredOverflow > 0 && overflowAt(other) >= preferredOverflow) root.setAttribute(PLACEMENT_ATTR, preferred);

  /* The left edge wins when the tooltip is wider than the area, so the start of the text stays readable. */
  const rect = popup.getBoundingClientRect();
  let shift = 0;
  if (rect.left < area.left + EDGE_MARGIN_PX) shift = area.left + EDGE_MARGIN_PX - rect.left;
  else if (rect.right > area.right - EDGE_MARGIN_PX) shift = area.right - EDGE_MARGIN_PX - rect.right;
  if (shift) popup.style.setProperty(SHIFT_PROPERTY, `${Math.round(shift)}px`);
}

/**
 * Wire up one tooltip root. Returns a function that removes the listeners again.
 */
export function attachTooltip(root) {
  let showTimer;
  let hideTimer;

  const clearTimers = () => {
    clearTimeout(showTimer);
    clearTimeout(hideTimer);
  };
  const isOpen = () => root.classList.contains(OPEN_CLASS);
  const onDocumentKeydown = (event) => {
    if (event.key === 'Escape') close();
  };
  const onDocumentClick = (event) => {
    if (!root.contains(event.target)) close();
  };
  const onReflow = () => placeTooltip(root);
  function open() {
    clearTimers();
    if (isOpen()) return;
    root.classList.add(OPEN_CLASS);
    placeTooltip(root);
    document.addEventListener('keydown', onDocumentKeydown);
    /* Capture, so scrolling any container (not only the page) moves the tooltip along. */
    document.addEventListener('scroll', onReflow, { capture: true, passive: true });
    window.addEventListener('resize', onReflow);
    if (!canHover()) document.addEventListener('click', onDocumentClick);
  }
  function close() {
    clearTimers();
    if (!isOpen()) return;
    root.classList.remove(OPEN_CLASS);
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('scroll', onReflow, { capture: true });
    window.removeEventListener('resize', onReflow);
    document.removeEventListener('click', onDocumentClick);
  }

  const onMouseEnter = () => {
    if (!canHover()) return;
    clearTimeout(hideTimer);
    showTimer = setTimeout(open, TOOLTIP_SHOW_DELAY_MS);
  };
  const onMouseLeave = () => {
    if (!canHover()) return;
    clearTimeout(showTimer);
    hideTimer = setTimeout(close, TOOLTIP_HIDE_DELAY_MS);
  };
  const onFocusIn = () => open();
  const onFocusOut = (event) => {
    if (!root.contains(event.relatedTarget)) close();
  };
  const onClick = (event) => {
    if (canHover() || event.target.closest('.tilburg-tooltip__popup')) return;
    if (isOpen()) close();
    else open();
  };

  root.addEventListener('mouseenter', onMouseEnter);
  root.addEventListener('mouseleave', onMouseLeave);
  root.addEventListener('focusin', onFocusIn);
  root.addEventListener('focusout', onFocusOut);
  root.addEventListener('click', onClick);

  return () => {
    close();
    root.removeEventListener('mouseenter', onMouseEnter);
    root.removeEventListener('mouseleave', onMouseLeave);
    root.removeEventListener('focusin', onFocusIn);
    root.removeEventListener('focusout', onFocusOut);
    root.removeEventListener('click', onClick);
  };
}

/**
 * Enhance every `.tilburg-tooltip[data-tilburg-tooltip-enhance]` within `root`. Idempotent.
 */
export function enhanceTooltip(root = typeof document !== 'undefined' ? document : null) {
  if (!root) return;
  root.querySelectorAll(`.tilburg-tooltip[${OPT_IN_FLAG}]:not([${ENHANCED_FLAG}])`).forEach((tooltip) => {
    tooltip.setAttribute(ENHANCED_FLAG, '');
    attachTooltip(tooltip);
  });
}

/* Auto-init when loaded as a module in the browser. Safe in SSR — guarded on `document`. */
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => enhanceTooltip());
  } else {
    enhanceTooltip();
  }
}

export default enhanceTooltip;
