/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

/**
 * @slot - The text; its newlines are kept.
 */
@Component({
  tag: 'tilburg-wbc-multiline-data',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcMultilineData {
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
      <pre {...this.inherited} class="utrecht-multiline-data utrecht-multiline-data--html-pre">
        <slot />
      </pre>
    );
  }
}
