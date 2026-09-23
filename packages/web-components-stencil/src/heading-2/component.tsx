/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, h } from '@stencil/core';

@Component({
  tag: 'tilburg-wbc-heading-2',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcHeading2 {
  render() {
    return (
      <utrecht-heading-2>
        <h2 class="utrecht-heading-2">
          <slot />
        </h2>
      </utrecht-heading-2>
    );
  }
}
