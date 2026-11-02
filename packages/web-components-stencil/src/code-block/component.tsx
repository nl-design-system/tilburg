/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, h } from '@stencil/core';

/**
 * @slot - The code; whitespace and line breaks are kept.
 */
@Component({
  tag: 'tilburg-wbc-code-block',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcCodeBlock {
  render() {
    return (
      <pre class="utrecht-code-block">
        <code class="utrecht-code-block__content">
          <slot />
        </code>
      </pre>
    );
  }
}
