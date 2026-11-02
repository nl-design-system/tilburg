/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, h } from '@stencil/core';

/**
 * @slot - The SVG icon (use `fill="currentColor"` so it takes the text colour).
 */
@Component({
  tag: 'tilburg-wbc-icon',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcIcon {
  render() {
    return (
      <span class="utrecht-icon" aria-hidden="true">
        <slot />
      </span>
    );
  }
}
