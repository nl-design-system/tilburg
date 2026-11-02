/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, h, Prop } from '@stencil/core';

/**
 * @slot - The content that flows into columns.
 */
@Component({
  tag: 'tilburg-wbc-column-layout',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcColumnLayout {
  /** Draw a line between the columns. */
  @Prop() rule = false;

  render() {
    return (
      <div class={{ 'utrecht-column-layout': true, 'utrecht-column-layout--rule': this.rule }}>
        <slot />
      </div>
    );
  }
}
