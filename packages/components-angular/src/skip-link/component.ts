import { Component, Input } from '@angular/core';

/**
 * Modifier controlling when the skip-link is rendered.
 *  - `visible-on-focus` — the production WCAG 2.4.1 pattern: hidden until the
 *    link receives keyboard focus, then slides into the top-left of the viewport.
 *  - `visible` — always rendered in place (useful for demos / non-standard layouts).
 *  - `hidden` — never rendered (kept off-screen unconditionally).
 *  - `focus` — force the focused appearance regardless of `:focus`; intended for
 *    storybook screenshots.
 */
export type SkipLinkVisibility = 'visible-on-focus' | 'visible' | 'hidden' | 'focus';

@Component({
  selector: 'tilburg-skip-link',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgSkipLink {
  @Input() href?: string;
  @Input() visibility: SkipLinkVisibility = 'visible-on-focus';
  @Input() ariaLabel?: string;
}
