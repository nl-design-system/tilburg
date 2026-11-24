/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, h } from '@stencil/core';

/**
 * @slot - The code fragment.
 */
@Component({
  tag: 'tilburg-wbc-code',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcCode {
  render() {
    return (
      <code class="utrecht-code">
        <slot />
      </code>
    );
  }
}
