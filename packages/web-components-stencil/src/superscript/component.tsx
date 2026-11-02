/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, h, Prop } from '@stencil/core';

/**
 * @slot - The superscript text.
 */
@Component({
  tag: 'tilburg-wbc-superscript',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcSuperscript {
  /** Uses the font's OpenType superscript glyphs (`utrecht-superscript--open-type`). */
  @Prop() openType = false;

  render() {
    return (
      <sup class={{ 'utrecht-superscript': true, 'utrecht-superscript--open-type': this.openType }}>
        <slot />
      </sup>
    );
  }
}
