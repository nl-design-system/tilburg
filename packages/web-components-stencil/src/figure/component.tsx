/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, Prop, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

/**
 * @slot - The content of the figure (an image, map, chart, code sample, …).
 */
@Component({
  tag: 'tilburg-wbc-figure',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcFigure {
  @Element() host!: HTMLElement;

  /** Text of the `<figcaption>`; without it no caption is rendered. */
  @Prop() caption?: string;

  @State() inherited: InheritedAttributes = {};
  private inheritor?: AttributeInheritor;

  connectedCallback() {
    this.inheritor = inheritAttributes(this.host, ['id', 'aria-label', 'aria-labelledby'], (attributes) => {
      this.inherited = attributes;
    });
  }

  disconnectedCallback() {
    this.inheritor?.disconnect();
  }

  render() {
    return (
      <figure {...this.inherited} class="utrecht-figure">
        <slot />
        {this.caption && <figcaption class="utrecht-figure__caption">{this.caption}</figcaption>}
      </figure>
    );
  }
}
