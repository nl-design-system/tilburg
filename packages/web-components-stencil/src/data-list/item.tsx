/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, h } from '@stencil/core';

/**
 * @slot - One `<tilburg-webc-data-list-key>` and its `<tilburg-webc-data-list-value>`.
 */
@Component({
  tag: 'tilburg-webc-data-list-item',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWebcDataListItem {
  render() {
    return (
      <div class="tilburg-data-list__item">
        <slot />
      </div>
    );
  }
}
