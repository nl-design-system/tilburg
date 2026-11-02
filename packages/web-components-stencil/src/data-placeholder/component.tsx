/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'tilburg-wbc-data-placeholder',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcDataPlaceholder {
  /** Adds `utrecht-data-placeholder--loading` (busy cursor). */
  @Prop() loading = false;

  render() {
    return (
      <span class={{ 'utrecht-data-placeholder': true, 'utrecht-data-placeholder--loading': this.loading }}></span>
    );
  }
}
