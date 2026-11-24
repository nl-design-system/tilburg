/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, h } from '@stencil/core';

/**
 * @slot - The superscript text.
 */
@Component({
  tag: 'tilburg-wbc-superscript',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcSuperscript {
  render() {
    return (
      <sup class="utrecht-superscript">
        <slot />
      </sup>
    );
  }
}
