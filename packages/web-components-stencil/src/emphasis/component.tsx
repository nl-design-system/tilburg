/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, h, Prop } from '@stencil/core';

/**
 * @slot - The emphasised text.
 */
@Component({
  tag: 'tilburg-wbc-emphasis',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcEmphasis {
  /** Renders `<strong>` (importance) instead of `<em>` (stress emphasis). */
  @Prop() strong = false;

  render() {
    return this.strong ? (
      <strong class="utrecht-emphasis utrecht-emphasis--strong">
        <slot />
      </strong>
    ) : (
      <em class="utrecht-emphasis utrecht-emphasis--stressed">
        <slot />
      </em>
    );
  }
}
