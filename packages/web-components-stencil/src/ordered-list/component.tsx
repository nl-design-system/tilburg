/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, Prop, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

/**
 * @slot - The `<li>` items. They end up as direct children of the `<ol>`, so
 *   plain `<li>` elements are styled via `.utrecht-ordered-list--html-ol > li`.
 */
@Component({
  tag: 'tilburg-webc-ordered-list',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWebcOrderedList {
  @Element() host!: HTMLElement;

  /** Switches the markers from decimal to lower-alpha (`a, b, c, …`). */
  @Prop() byLetter = false;

  /* `aria-label` / `aria-labelledby` belong on the `<ol>`, not on the generic host. */
  @State() inherited: InheritedAttributes = {};
  private inheritor?: AttributeInheritor;

  connectedCallback() {
    this.inheritor = inheritAttributes(this.host, ['aria-label', 'aria-labelledby'], (attributes) => {
      this.inherited = attributes;
    });
  }

  disconnectedCallback() {
    this.inheritor?.disconnect();
  }

  render() {
    return (
      <ol
        {...this.inherited}
        class={{
          'tilburg-ordered-list': true,
          'utrecht-ordered-list': true,
          'utrecht-ordered-list--html-ol': true,
          'tilburg-ordered-list--by-letter': this.byLetter,
        }}
      >
        <slot />
      </ol>
    );
  }
}
