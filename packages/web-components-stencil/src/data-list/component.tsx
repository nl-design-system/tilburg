/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, Prop, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

/**
 * Key/value list: `<tilburg-webc-data-list>` renders the `<dl>`,
 * `<tilburg-webc-data-list-item>` a row `<div>`, `<tilburg-webc-data-list-key>`
 * the `<dt>` and `<tilburg-webc-data-list-value>` the `<dd>`.
 *
 * @slot - `<tilburg-webc-data-list-item>` rows.
 */
@Component({
  tag: 'tilburg-webc-data-list',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWebcDataList {
  @Element() host!: HTMLElement;

  /**
   * Lays each row out as a three-column grid. Angular binds the modifier on
   * its host; here it goes on the `<dl>` like the HTML reference and React.
   */
  @Prop() large = false;

  /* `aria-label` / `aria-labelledby` belong on the `<dl>`, not on the generic host. */
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
      <dl {...this.inherited} class={{ 'tilburg-data-list': true, 'tilburg-data-list--large': this.large }}>
        <slot />
      </dl>
    );
  }
}
