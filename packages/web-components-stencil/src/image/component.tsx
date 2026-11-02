/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, Prop, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

@Component({
  tag: 'tilburg-wbc-image',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcImage {
  @Element() host!: HTMLElement;

  @Prop() src?: string;
  /** Describe the image; `""` for a decorative image. */
  @Prop() alt?: string;
  @Prop() width?: number | string;
  @Prop() height?: number | string;
  /** Adds `utrecht-img--photo`: scales the image down to fit its container. */
  @Prop() photo = false;

  /* `id` belongs on the `<img>`, not on the host. */
  @State() inherited: InheritedAttributes = {};
  private inheritor?: AttributeInheritor;

  connectedCallback() {
    this.inheritor = inheritAttributes(this.host, ['id'], (attributes) => {
      this.inherited = attributes;
    });
  }

  disconnectedCallback() {
    this.inheritor?.disconnect();
  }

  render() {
    return (
      <img
        {...this.inherited}
        class={{ 'utrecht-img': true, 'utrecht-img--photo': this.photo }}
        src={this.src}
        alt={this.alt}
        width={this.width}
        height={this.height}
      />
    );
  }
}
