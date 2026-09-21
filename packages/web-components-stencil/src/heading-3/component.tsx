/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, h } from '@stencil/core';

@Component({
  tag: 'tilburg-webc-heading-3',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWebcHeading3 {
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
