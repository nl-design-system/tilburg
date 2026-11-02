/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

/**
 * @slot - The bar content, typically a `<tilburg-wbc-nav-list>`.
 */
@Component({
  tag: 'tilburg-wbc-nav-bar',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcNavBar {
  @Element() host!: HTMLElement;

  /* `aria-label` is written on the host and moved onto the `<nav>`. */
  @State() inherited: InheritedAttributes = {};
  private inheritor?: AttributeInheritor;

  connectedCallback() {
    this.inheritor = inheritAttributes(this.host, ['aria-label'], (attributes) => {
      this.inherited = attributes;
    });
  }

  disconnectedCallback() {
    this.inheritor?.disconnect();
  }

  render() {
    return (
      <nav class="utrecht-nav-bar" aria-label={this.inherited['aria-label'] ?? 'Hoofdmenu'}>
        <div class="utrecht-nav-bar__content">
          <slot />
        </div>
      </nav>
    );
  }
}
