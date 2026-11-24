/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

/**
 * @slot - The `<li>` items, each holding one badge. They end up as direct
 *   children of the `<ul>`, like the HTML/CSS reference.
 */
@Component({
  tag: 'tilburg-wbc-badge-list',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcBadgeList {
  @Element() host!: HTMLElement;

  /* `id` and `title` belong on the inner element, not on the host. */
  @State() inherited: InheritedAttributes = {};
  private inheritor?: AttributeInheritor;

  connectedCallback() {
    this.inheritor = inheritAttributes(this.host, ['id', 'title'], (attributes) => {
      this.inherited = attributes;
    });
  }

  disconnectedCallback() {
    this.inheritor?.disconnect();
  }

  render() {
    return (
      <ul {...this.inherited} class="utrecht-badge-list" role="list">
        <slot />
      </ul>
    );
  }
}
