/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, h } from '@stencil/core';

/**
 * @slot - The page layout: `<tilburg-wbc-page-header>`, `<tilburg-wbc-page-content>`, `<tilburg-wbc-page-footer>`.
 */
@Component({
  tag: 'tilburg-wbc-page',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcPage {
  render() {
    /* Angular wraps this div in utrecht's `<utrecht-page>` component host; that
       unstyled inline element is an Angular artefact, so the Stencil layer
       renders the HTML/React reference (`<div class="utrecht-page">`) only. */
    return (
      <div class="utrecht-page">
        <slot />
      </div>
    );
  }
}
