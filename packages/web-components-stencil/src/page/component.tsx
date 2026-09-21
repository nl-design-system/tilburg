/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, h } from '@stencil/core';

/**
 * @slot - The page layout: `<tilburg-webc-page-header>`, `<tilburg-webc-page-content>`, `<tilburg-webc-page-footer>`.
 */
@Component({
  tag: 'tilburg-webc-page',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWebcPage {
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
