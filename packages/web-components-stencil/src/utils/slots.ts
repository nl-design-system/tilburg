/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

/**
 * Whether the consumer passed light-DOM content for a named slot.
 *
 * Several components-css rules paint a default (icon, glyph) with
 * `:empty::before`. Stencil's light-DOM slot emulation leaves marker nodes
 * behind, so a wrapper that renders an unused `<slot>` is no longer `:empty`.
 * Render the named slot only when it is used; call this from
 * `componentWillLoad` (before Stencil relocates the children).
 *
 * Uses `querySelectorAll` + `parentElement` on purpose: with
 * `experimentalSlotFixes` Stencil patches `host.children` / `childNodes` to
 * return only nodes it has already distributed, which is nothing before the
 * first render.
 */
export function hasSlot(host: HTMLElement, name: string): boolean {
  return Array.from(host.querySelectorAll(`[slot="${name}"]`)).some((child) => child.parentElement === host);
}
