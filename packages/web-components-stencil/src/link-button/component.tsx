/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, Prop, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

/* Written on the host and moved onto the inner `<button>`. */
const ATTRS = ['aria-label', 'aria-describedby', 'title', 'lang'];

/**
 * @slot - The label.
 */
@Component({
  tag: 'tilburg-wbc-link-button',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcLinkButton {
  @Element() host!: HTMLElement;

  @Prop() type: 'button' | 'submit' | 'reset' = 'button';
  @Prop() disabled = false;
  /** Removes the button padding and minimum size, for use inside running text. */
  @Prop() inline = false;
  /** Tri-state: leave unset for a normal button, `true`/`false` for a toggle button. */
  @Prop() pressed?: boolean;

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
      <button
        {...this.inherited}
        class={{
          'utrecht-link-button': true,
          'utrecht-link-button--html-button': true,
          'utrecht-link-button--inline': this.inline,
          'utrecht-link-button--pressed': this.pressed === true,
          'utrecht-link-button--disabled': this.disabled,
        }}
        type={this.type}
        disabled={this.disabled}
        aria-pressed={this.pressed === undefined || this.pressed === null ? undefined : String(this.pressed)}
      >
        <slot />
      </button>
    );
  }
}
