/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, h } from '@stencil/core';

@Component({
  tag: 'tilburg-webc-heading-6',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWebcHeading6 {
  render() {
    return (
      <utrecht-heading-6>
        <h6 class="utrecht-heading-6">
          <slot />
        </h6>
      </utrecht-heading-6>
    );
  }
}
