/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, Prop, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

export type TilburgWbcActionGroupDirection = 'row' | 'column' | 'column-stretch';

/* `role`, `aria-label` and `aria-labelledby` are written on the host and moved onto the inner `<p>`; `role` is not
   a prop for the same reason as Button Group (a role left on the host would nest a second group). Default `group`. */
const ATTRS = ['role', 'aria-label', 'aria-labelledby'];

/**
 * @slot - The actions (buttons, link buttons, button links).
 */
@Component({
  tag: 'tilburg-wbc-action-group',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcActionGroup {
  @Element() host!: HTMLElement;

  @Prop() direction: TilburgWbcActionGroupDirection = 'row';

  @State() inherited: InheritedAttributes = {};
  private inheritor?: AttributeInheritor;

  connectedCallback() {
    this.inheritor = inheritAttributes(this.host, ATTRS, (attributes) => {
      this.inherited = attributes;
    });
  }

  disconnectedCallback() {
    this.inheritor?.disconnect();
  }

  render() {
    return (
      <p
        {...this.inherited}
        class={`utrecht-action-group utrecht-action-group--${this.direction}`}
        role={this.inherited['role'] || 'group'}
      >
        <slot />
      </p>
    );
  }
}
