/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

/* Written on the host and moved onto the inner `<ul>`. */
const ATTRS = ['aria-label', 'aria-labelledby'];

/**
 * @slot - The `<li class="utrecht-list-social__item">` items; they end up as direct children of the `<ul>`.
 */
@Component({
  tag: 'tilburg-wbc-list-social',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcListSocial {
  @Element() host!: HTMLElement;

  @State() inherited: InheritedAttributes = {};
  private inheritor?: AttributeInheritor;

  connectedCallback() {
    this.inheritor = inheritAttributes(this.host, ATTRS, (attributes) => {
      this.inherited = attributes;
    });
  }

  disconnectedCallback() {
    this.inheritor?.disconnect();
  }

  render() {
    return (
      <ul {...this.inherited} class="utrecht-list-social" role="list">
        <slot />
      </ul>
    );
  }
}
