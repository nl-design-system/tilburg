/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, h, Prop } from '@stencil/core';
import { dataValue } from '../utils/data-value';
import { noTranslate } from '../utils/no-translate';

/**
 * @slot - The data to show as entered.
 */
@Component({
  tag: 'tilburg-wbc-preserve-data',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcPreserveData {
  /** Renders a `<data value>` around the text. */
  @Prop() value?: string;
  /** Renders a `<time datetime>` around the text; wins over `value`. */
  @Prop() dateTime?: string;

  render() {
    if (this.dateTime !== undefined && this.dateTime !== null)
      return (
        <time class="utrecht-preserve-data" dateTime={this.dateTime}>
          <bdi {...noTranslate}>
            <slot />
          </bdi>
        </time>
      );
    if (this.value !== undefined && this.value !== null)
      return (
        <data class="utrecht-preserve-data" {...dataValue(this.value)}>
          <bdi {...noTranslate}>
            <slot />
          </bdi>
        </data>
      );
    return (
      <bdi class="utrecht-preserve-data" {...noTranslate}>
        <slot />
      </bdi>
    );
  }
}
