/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, h } from '@stencil/core';

/**
 * @slot - The pre-heading text.
 */
@Component({
  tag: 'tilburg-wbc-pre-heading',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcPreHeading {
  render() {
    return (
      <p class="utrecht-pre-heading">
        <slot />
      </p>
    );
  }
}
