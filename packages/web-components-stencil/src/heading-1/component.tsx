/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, h } from '@stencil/core';

@Component({
  tag: 'tilburg-wbc-heading-1',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcHeading1 {
  render() {
    return (
      <utrecht-heading-1>
        <h1 class="utrecht-heading-1">
          <slot />
        </h1>
      </utrecht-heading-1>
    );
  }
}
