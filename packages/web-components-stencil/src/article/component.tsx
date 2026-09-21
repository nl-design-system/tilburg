/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

/**
 * @slot - The self-contained content (heading, paragraphs, …).
 */
@Component({
  tag: 'tilburg-webc-article',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWebcArticle {
  @Element() host!: HTMLElement;

  /* `id` and the landmark name (`aria-labelledby` pointing at the heading)
     belong on `<article>`, not on the host. */
  @State() inherited: InheritedAttributes = {};
  private inheritor?: AttributeInheritor;

  connectedCallback() {
    this.inheritor = inheritAttributes(this.host, ['id', 'aria-label', 'aria-labelledby'], (attributes) => {
      this.inherited = attributes;
    });
  }

  disconnectedCallback() {
    this.inheritor?.disconnect();
  }

  render() {
    return (
      <article {...this.inherited} class="utrecht-article">
        <slot />
      </article>
    );
  }
}
