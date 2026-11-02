/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, Prop, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

/* Written on the host and moved onto the inner `<nav>` (default `Veelgevraagd`). */
const ATTRS = ['aria-label'];

/**
 * @slot - The toptask links.
 */
@Component({
  tag: 'tilburg-wbc-toptask-nav',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcToptaskNav {
  @Element() host!: HTMLElement;

  /** Places the links side by side, wrapping onto new rows. */
  @Prop() grid = false;

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
      <nav
        aria-label={this.inherited['aria-label'] ?? 'Veelgevraagd'}
        class={{ 'utrecht-toptask-nav': true, 'utrecht-toptask-nav--grid': this.grid }}
      >
        <slot />
      </nav>
    );
  }
}
