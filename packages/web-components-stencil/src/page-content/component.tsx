/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

/**
 * @slot - The main content of the page.
 */
@Component({
  tag: 'tilburg-webc-page-content',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWebcPageContent {
  @Element() host!: HTMLElement;

  /* `id` + `tabindex` make `<main>` the skip-link target (`href="#main"`); they,
     and the landmark's `aria-label(ledby)`, belong on `<main>`, not the host. */
  @State() inherited: InheritedAttributes = {};
  private inheritor?: AttributeInheritor;

  connectedCallback() {
    this.inheritor = inheritAttributes(this.host, ['id', 'tabindex', 'aria-label', 'aria-labelledby'], (attributes) => {
      this.inherited = attributes;
    });
  }

  disconnectedCallback() {
    this.inheritor?.disconnect();
  }

  render() {
    return (
      <main {...this.inherited} class="utrecht-page-content">
        <slot />
      </main>
    );
  }
}
