/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

/**
 * @slot - The `<li>` items. They end up as direct children of the `<ul>`, so
 *   plain `<li>` elements are styled via `.utrecht-unordered-list--html-ul > li`.
 */
@Component({
  tag: 'tilburg-webc-unordered-list',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWebcUnorderedList {
  @Element() host!: HTMLElement;

  /* `aria-label` / `aria-labelledby` belong on the `<ul>`, not on the generic host. */
  @State() inherited: InheritedAttributes = {};
  private inheritor?: AttributeInheritor;

  connectedCallback() {
    this.inheritor = inheritAttributes(this.host, ['aria-label', 'aria-labelledby'], (attributes) => {
      this.inherited = attributes;
    });
  }

  disconnectedCallback() {
    this.inheritor?.disconnect();
  }

  render() {
    return (
      <ul {...this.inherited} class="tilburg-unordered-list utrecht-unordered-list utrecht-unordered-list--html-ul">
        <slot />
      </ul>
    );
  }
}
