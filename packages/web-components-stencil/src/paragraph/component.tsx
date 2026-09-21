/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, h, Prop } from '@stencil/core';

/**
 * @slot - The paragraph text.
 */
@Component({
  tag: 'tilburg-webc-paragraph',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWebcParagraph {
  /** Slightly larger intro text (`utrecht-paragraph--lead`). */
  @Prop() lead = false;
  /** Small print (`utrecht-paragraph--small`). */
  @Prop() small = false;

  render() {
    return (
      <p
        class={{
          'utrecht-paragraph': true,
          'utrecht-paragraph--lead': this.lead,
          'utrecht-paragraph--small': this.small,
        }}
      >
        <slot />
      </p>
    );
  }
}
