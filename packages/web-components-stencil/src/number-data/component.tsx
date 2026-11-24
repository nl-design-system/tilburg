/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, Prop, State } from '@stencil/core';
import { dataValue } from '../utils/data-value';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

export type TilburgWbcNumberDataVariant = 'positive' | 'negative';

/**
 * @slot - The formatted number.
 */
@Component({
  tag: 'tilburg-wbc-number-data',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcNumberData {
  /** The machine-readable number (valid floating-point number notation). */
  @Prop() value?: number | string;
  /** Colours the number; still write the sign in the text. */
  @Prop() variant?: TilburgWbcNumberDataVariant;

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
      <data
        {...this.inherited}
        class={{
          'utrecht-number-data': true,
          [`utrecht-number-data--${this.variant}`]: Boolean(this.variant),
        }}
        {...dataValue(this.value?.toString())}
      >
        <slot />
      </data>
    );
  }
}
