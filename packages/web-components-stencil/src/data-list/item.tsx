/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, h } from '@stencil/core';

/**
 * @slot - One `<tilburg-wbc-data-list-key>` and its `<tilburg-wbc-data-list-value>`.
 */
@Component({
  tag: 'tilburg-wbc-data-list-item',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcDataListItem {
  render() {
    return (
      <div class="tilburg-data-list__item">
        <slot />
      </div>
    );
  }
}
