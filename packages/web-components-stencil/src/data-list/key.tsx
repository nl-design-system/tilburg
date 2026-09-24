/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

/**
 * @slot - The key (label) text.
 */
@Component({
  tag: 'tilburg-wbc-data-list-key',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcDataListKey {
  @Element() host!: HTMLElement;

  /* Angular's `id` input: the plain `id` attribute is moved from the host onto
     the `<dt>`, so an external `aria-labelledby` points at the key itself. */
  @State() inherited: InheritedAttributes = {};
  private inheritor?: AttributeInheritor;

  connectedCallback() {
    this.inheritor = inheritAttributes(this.host, ['id'], (attributes) => {
      this.inherited = attributes;
    });
  }

  disconnectedCallback() {
    this.inheritor?.disconnect();
  }

  render() {
    return (
      <dt {...this.inherited} class="tilburg-data-list__key">
        <slot />
      </dt>
    );
  }
}
