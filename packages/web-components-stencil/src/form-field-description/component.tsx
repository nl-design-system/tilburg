/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, Prop, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

/**
 * @slot - The description text.
 */
@Component({
  tag: 'tilburg-webc-form-field-description',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWebcFormFieldDescription {
  @Element() host!: HTMLElement;

  /** Error styling; also adds `role="alert"` so the message is announced. */
  @Prop() invalid = false;
  @Prop() valid = false;
  @Prop() warning = false;

  /* `id` moves onto the description `<div>` so a control's
     `aria-describedby` points at the element that carries the text. */
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
      <div
        {...this.inherited}
        class={{
          'utrecht-form-field-description': true,
          'utrecht-form-field-description--invalid': this.invalid,
          'utrecht-form-field-description--valid': this.valid,
          'utrecht-form-field-description--warning': this.warning,
        }}
        role={this.invalid ? 'alert' : undefined}
      >
        <slot />
      </div>
    );
  }
}
