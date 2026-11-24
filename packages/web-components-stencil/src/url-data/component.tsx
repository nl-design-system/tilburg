/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';
import { noTranslate } from '../utils/no-translate';

/**
 * @slot - The URL.
 */
@Component({
  tag: 'tilburg-wbc-url-data',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcUrlData {
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
      <bdi {...this.inherited} class="utrecht-url-data" {...noTranslate}>
        <slot />
      </bdi>
    );
  }
}
