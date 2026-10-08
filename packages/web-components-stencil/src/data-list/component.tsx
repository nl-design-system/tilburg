/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, Prop, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

/**
 * Key/value list: `<tilburg-wbc-data-list>` renders the `<dl>`,
 * `<tilburg-wbc-data-list-item>` a row `<div>`, `<tilburg-wbc-data-list-key>`
 * the `<dt>` and `<tilburg-wbc-data-list-value>` the `<dd>`.
 *
 * @slot - `<tilburg-wbc-data-list-item>` rows.
 */
@Component({
  tag: 'tilburg-wbc-data-list',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcDataList {
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
