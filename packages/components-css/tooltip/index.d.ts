/** Delay before a hovered tooltip opens, and before it closes after the pointer left. */
export const TOOLTIP_SHOW_DELAY_MS: number;
export const TOOLTIP_HIDE_DELAY_MS: number;

/**
 * Wire up one `.tilburg-tooltip` root: hover (with a short delay) and focus open it, Escape and leaving close it, a tap
 * toggles it on touch devices, and `placeTooltip` keeps it in view. Returns a function that removes the listeners again.
 */
export function attachTooltip(root: HTMLElement): () => void;

/**
 * Keep an open tooltip inside the visible area: flip it to the other side of the trigger when the preferred side has
 * less room, and shift it sideways when it would stick out past the left or right edge. `attachTooltip` calls this on
 * open, scroll and resize.
 */
export function placeTooltip(root: HTMLElement): void;

/** Enhance every `.tilburg-tooltip[data-tilburg-tooltip-enhance]` within `root`. Idempotent. */
export function enhanceTooltip(root?: ParentNode): void;

export default enhanceTooltip;
