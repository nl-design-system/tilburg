/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

/**
 * @slot - The buttons (`<tilburg-wbc-button>`, `<tilburg-wbc-button-link>`, …).
 */
@Component({
  tag: 'tilburg-wbc-button-group',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcButtonGroup {
  @Element() host!: HTMLElement;

  /* `role`, `aria-label` and `aria-labelledby` are written on the host as
     plain HTML attributes and moved onto the inner group `<div>`. `role` is
     not a prop (Angular has it as an input) because a `role` attribute left on
     the host would nest a second group/toolbar around the inner one; it
     defaults to `group`, pass `role="toolbar"` for a toolbar cluster. */
  @State() inherited: InheritedAttributes = {};
  private inheritor?: AttributeInheritor;

  connectedCallback() {
    this.inheritor = inheritAttributes(this.host, ['role', 'aria-label', 'aria-labelledby'], (attributes) => {
      this.inherited = attributes;
    });
  }

  disconnectedCallback() {
    this.inheritor?.disconnect();
  }

  render() {
    return (
      <div {...this.inherited} class="utrecht-button-group" role={this.inherited['role'] || 'group'}>
        <slot />
      </div>
    );
  }
}
