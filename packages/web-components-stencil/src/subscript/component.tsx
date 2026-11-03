/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, h } from '@stencil/core';

/**
 * @slot - The subscript text.
 */
@Component({
  tag: 'tilburg-wbc-subscript',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcSubscript {
  render() {
    return (
      <sub class="utrecht-subscript">
        <slot />
      </sub>
    );
  }
}
