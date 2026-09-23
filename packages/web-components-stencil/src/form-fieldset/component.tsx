/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, Prop, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

/**
 * Native `<fieldset>` with utrecht-fieldset styling (Angular `<tilburg-fieldset>`,
 * React `Fieldset`). Pass a real `<legend class="utrecht-form-label">` as the
 * first child so the native fieldset/legend relationship stays intact.
 *
 * @slot - The `<legend>` followed by the grouped form fields.
 */
@Component({
  tag: 'tilburg-wbc-fieldset',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcFieldset {
  @Element() host!: HTMLElement;

  /** Native `disabled`: disables every control in the group. */
  @Prop() disabled = false;
  /** Adds `utrecht-fieldset--invalid` and `aria-invalid="true"`. */
  @Prop() invalid = false;

  /* Angular's `ariaLabel` / `ariaLabelledby` / `ariaDescribedBy` inputs are
     plain ARIA attributes here: written on the host, moved onto the
     `<fieldset>`. */
  @State() inherited: InheritedAttributes = {};
  private inheritor?: AttributeInheritor;

  connectedCallback() {
    this.inheritor = inheritAttributes(
      this.host,
      ['id', 'aria-label', 'aria-labelledby', 'aria-describedby', 'name'],
      (attributes) => {
        this.inherited = attributes;
      },
    );
  }

  disconnectedCallback() {
    this.inheritor?.disconnect();
  }

  render() {
    return (
      <fieldset
        {...this.inherited}
        class={{
          'utrecht-fieldset': true,
          'utrecht-fieldset--disabled': this.disabled,
          'utrecht-fieldset--invalid': this.invalid,
        }}
        disabled={this.disabled}
        aria-invalid={this.invalid ? 'true' : undefined}
      >
        <slot />
      </fieldset>
    );
  }
}
