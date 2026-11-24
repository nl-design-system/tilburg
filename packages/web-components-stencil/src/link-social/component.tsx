/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, Prop, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

/* Written on the host and moved onto the inner `<a>`. `aria-label` is the accessible name: the link only holds an icon. */
const ATTRS = ['aria-label', 'title', 'lang'];

/**
 * @slot - The icon.
 */
@Component({
  tag: 'tilburg-wbc-link-social',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcLinkSocial {
  @Element() host!: HTMLElement;

  @Prop() href?: string;
  /** Social links are external: `rel="external noopener noreferrer"` unless `external="false"`. */
  @Prop() external = true;

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
      <a
        {...this.inherited}
        class="utrecht-link-social"
        href={this.href || undefined}
        rel={this.external ? 'external noopener noreferrer' : undefined}
      >
        <slot />
      </a>
    );
  }
}
