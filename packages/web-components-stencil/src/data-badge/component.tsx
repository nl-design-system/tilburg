/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, Prop, State } from '@stencil/core';
import { dataValue } from '../utils/data-value';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

/**
 * @slot - The visible text.
 */
@Component({
  tag: 'tilburg-wbc-data-badge',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcDataBadge {
  /** Renders a `<time datetime>` (date, time or duration). Wins over `value`. */
  @Prop() dateTime?: string;
  /** Renders a `<data value>` with a machine-readable value. */
  @Prop() value?: string;

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
    if (this.dateTime !== undefined && this.dateTime !== null) {
      return (
        <time {...this.inherited} class="utrecht-data-badge" dateTime={this.dateTime}>
          <slot />
        </time>
      );
    }
    if (this.value !== undefined && this.value !== null) {
      return (
        <data {...this.inherited} class="utrecht-data-badge" {...dataValue(this.value)}>
          <slot />
        </data>
      );
    }
    return (
      <span {...this.inherited} class="utrecht-data-badge">
        <slot />
      </span>
    );
  }
}
