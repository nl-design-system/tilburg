/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, Prop, State } from '@stencil/core';
import { formatCurrency } from '../utils/data-format';
import { dataValue } from '../utils/data-value';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

@Component({
  tag: 'tilburg-wbc-currency-data',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcCurrencyData {
  @Prop() amount!: number | string;
  /** ISO 4217 currency code. */
  @Prop() currency = 'EUR';
  /** BCP 47 locale for the notation. */
  @Prop() locale = 'nl-NL';

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
    const formatted = formatCurrency(this.amount, this.currency, this.locale);
    return (
      <data
        {...this.inherited}
        class={{
          'utrecht-currency-data': true,
          'utrecht-currency-data--negative': formatted.amount < 0,
          'utrecht-currency-data--positive': formatted.amount > 0,
        }}
        {...dataValue(formatted.value)}
        lang={formatted.lang}
      >
        {formatted.text}
      </data>
    );
  }
}
