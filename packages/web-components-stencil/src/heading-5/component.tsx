/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, h } from '@stencil/core';

@Component({
  tag: 'tilburg-wbc-heading-5',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcHeading5 {
  render() {
    return (
      <utrecht-heading-5>
        <h5 class="utrecht-heading-5">
          <slot />
        </h5>
      </utrecht-heading-5>
    );
  }
}
