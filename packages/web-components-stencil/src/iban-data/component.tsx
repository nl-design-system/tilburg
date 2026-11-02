/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, Prop, State } from '@stencil/core';
import { formatIban, normalizeIban } from '../utils/data-format';
import { dataValue } from '../utils/data-value';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';
import { noTranslate } from '../utils/no-translate';

@Component({
  tag: 'tilburg-wbc-iban-data',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcIbanData {
  /** The IBAN, in any spacing or case. */
  @Prop() value!: string;

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
    const normalized = normalizeIban(this.value ?? '');
    return (
      <data {...this.inherited} class="utrecht-iban-data" {...dataValue(normalized)} {...noTranslate}>
        {formatIban(normalized)}
      </data>
    );
  }
}
