/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, h } from '@stencil/core';

/**
 * @slot - The heading, followed by a pre-heading or subtitle paragraph.
 */
@Component({
  tag: 'tilburg-wbc-heading-group',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcHeadingGroup {
  render() {
    return (
      <hgroup class="utrecht-heading-group">
        <slot />
      </hgroup>
    );
  }
}
