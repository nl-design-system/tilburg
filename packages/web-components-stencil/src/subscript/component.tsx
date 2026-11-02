/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, h, Prop } from '@stencil/core';

/**
 * @slot - The subscript text.
 */
@Component({
  tag: 'tilburg-wbc-subscript',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcSubscript {
  /** Uses the font's OpenType subscript glyphs (`utrecht-subscript--open-type`). */
  @Prop() openType = false;

  render() {
    return (
      <sub class={{ 'utrecht-subscript': true, 'utrecht-subscript--open-type': this.openType }}>
        <slot />
      </sub>
    );
  }
}
