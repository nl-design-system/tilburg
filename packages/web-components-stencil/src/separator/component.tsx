/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'tilburg-webc-separator',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWebcSeparator {
  /** Purely visual divider: sets `aria-hidden="true"` so screen readers skip it. */
  @Prop() decorative = false;

  render() {
    return <hr class="utrecht-separator" aria-hidden={this.decorative ? 'true' : undefined} />;
  }
}
