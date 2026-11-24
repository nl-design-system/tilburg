/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, Prop, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

/**
 * @slot - The quoted content (paragraphs).
 */
@Component({
  tag: 'tilburg-wbc-blockquote',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcBlockquote {
  @Element() host!: HTMLElement;

  /** Source of the quote; rendered after the content when set. */
  @Prop() attribution = '';

  /* `cite` (the source URL) only means something on `<blockquote>`. */
  @State() inherited: InheritedAttributes = {};
  private inheritor?: AttributeInheritor;

  connectedCallback() {
    this.inheritor = inheritAttributes(this.host, ['cite'], (attributes) => {
      this.inherited = attributes;
    });
  }

  disconnectedCallback() {
    this.inheritor?.disconnect();
  }

  render() {
    return (
      <blockquote {...this.inherited} class="utrecht-blockquote">
        <div class="utrecht-blockquote__content">
          <slot />
        </div>
        {this.attribution && <div class="utrecht-blockquote__attribution">{this.attribution}</div>}
      </blockquote>
    );
  }
}
