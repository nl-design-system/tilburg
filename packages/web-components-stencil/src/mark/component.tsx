/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, h } from '@stencil/core';

/**
 * @slot - The highlighted text.
 */
@Component({
  tag: 'tilburg-wbc-mark',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcMark {
  render() {
    return (
      <mark class="utrecht-mark">
        <slot />
      </mark>
    );
  }
}
