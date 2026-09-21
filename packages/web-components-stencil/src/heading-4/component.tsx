/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, h } from '@stencil/core';

@Component({
  tag: 'tilburg-webc-heading-4',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWebcHeading4 {
  render() {
    return (
      <utrecht-heading-4>
        <h4 class="utrecht-heading-4">
          <slot />
        </h4>
      </utrecht-heading-4>
    );
  }
}
