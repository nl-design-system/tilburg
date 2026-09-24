/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, h } from '@stencil/core';

/**
 * @slot - The whole page; everything inside inherits the Tilburg body font and colour.
 */
@Component({
  tag: 'tilburg-wbc-document',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcDocument {
  render() {
    /* Angular renders `<div utrecht-document>`, whose directive only adds the
       `utrecht-document` class — the HTML/React reference is the plain div. */
    return (
      <div class="utrecht-document">
        <slot />
      </div>
    );
  }
}
