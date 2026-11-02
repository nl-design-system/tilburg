/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, Prop, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';
import { hasSlot } from '../utils/slots';

/* Written on the host and moved onto the inner `<a>`. */
const ATTRS = ['aria-label', 'aria-describedby', 'title', 'lang'];

/**
 * @slot - The title.
 * @slot icon - The icon (`aria-hidden`); the icon wrapper is only rendered when this slot is used.
 */
@Component({
  tag: 'tilburg-wbc-toptask-link',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcToptaskLink {
  @Element() host!: HTMLElement;

  @Prop() href?: string;

  private hasIcon = false;

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

  componentWillLoad() {
    this.hasIcon = hasSlot(this.host, 'icon');
  }

  render() {
    return (
      <a {...this.inherited} class="utrecht-toptask-link" href={this.href || undefined}>
        {this.hasIcon && (
          <span class="utrecht-toptask-link__icon">
            <slot name="icon" />
          </span>
        )}
        <span class="utrecht-toptask-link__title">
          <slot />
        </span>
      </a>
    );
  }
}
