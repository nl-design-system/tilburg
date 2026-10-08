/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, h } from '@stencil/core';

@Component({
  tag: 'tilburg-wbc-heading-3',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcHeading3 {
  render() {
    return (
      <utrecht-heading-3>
        <h3 class="utrecht-heading-3">
          <slot />
        </h3>
      </utrecht-heading-3>
    );
  }
}
