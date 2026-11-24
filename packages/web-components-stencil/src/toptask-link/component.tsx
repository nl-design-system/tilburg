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

  @State() hasIcon = false;

  @State() inherited: InheritedAttributes = {};
  private inheritor?: AttributeInheritor;
  private observer?: MutationObserver;

  connectedCallback() {
    this.inheritor = inheritAttributes(this.host, ATTRS, (attributes) => {
      this.inherited = attributes;
    });
    if (typeof MutationObserver !== 'undefined') {
      /* An icon added after the first render needs the icon slot, or it ends up outside the `<a>`. */
      this.observer = new MutationObserver(() => {
        if (!this.hasIcon) this.hasIcon = hasSlot(this.host, 'icon');
      });
      this.observer.observe(this.host, { childList: true });
    }
  }

  disconnectedCallback() {
    this.inheritor?.disconnect();
    this.observer?.disconnect();
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
