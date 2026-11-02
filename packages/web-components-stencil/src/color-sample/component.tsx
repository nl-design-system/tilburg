/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, h, Prop } from '@stencil/core';
import { dataValue } from '../utils/data-value';

@Component({
  tag: 'tilburg-wbc-color-sample',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcColorSample {
  /** Any CSS colour: sets the `value` attribute and the inline `color` that paints the swatch. */
  @Prop() color?: string;

  render() {
    return <data class="utrecht-color-sample" {...dataValue(this.color)} style={{ color: this.color }} />;
  }
}
