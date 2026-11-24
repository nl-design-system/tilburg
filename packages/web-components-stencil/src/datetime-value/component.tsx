/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, Prop, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

/**
 * @slot - The written-out date or time.
 */
@Component({
  tag: 'tilburg-wbc-datetime-value',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcDatetimeValue {
  /** The machine-readable date, time or date and time (`2026-11-02T09:30`). */
  @Prop() dateTime?: string;

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
      <time {...this.inherited} class="utrecht-value-datetime" dateTime={this.dateTime}>
        <slot />
      </time>
    );
  }
}
