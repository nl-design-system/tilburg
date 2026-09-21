/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, h } from '@stencil/core';

/**
 * @slot - The value text.
 */
@Component({
  tag: 'tilburg-webc-data-list-value',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWebcDataListValue {
  render() {
    return (
      <dd class="tilburg-data-list__value">
        <slot />
      </dd>
    );
  }
}
