/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, h, Prop } from '@stencil/core';

/**
 * @slot - Optional content on the backdrop.
 */
@Component({
  tag: 'tilburg-wbc-backdrop',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcBackdrop {
  /** Cover the whole viewport (`position: fixed`) instead of the nearest positioned ancestor. */
  @Prop() viewport = false;

  render() {
    return (
      <div class={{ 'utrecht-backdrop': true, 'utrecht-backdrop--viewport': this.viewport }}>
        <slot />
      </div>
    );
  }
}
