/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, h, Prop } from '@stencil/core';

export type TilburgWbcFormFieldType = 'checkbox' | 'radio' | 'text';

/**
 * Plain wrapper, like Angular `<tilburg-form-field>` and React `FormField`:
 * it renders the `utrecht-form-field` container and its modifiers, the
 * consumer composes label, description, control and validation message
 * (`tilburg-wbc-form-label`, `tilburg-wbc-form-field-description`,
 * `tilburg-wbc-validation-message`, a native `<input>`, …) as children.
 *
 * @slot - Label, description, control and validation message.
 */
@Component({
  tag: 'tilburg-wbc-form-field',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcFormField {
  @Prop() invalid = false;
  /** Tilburg modifier: paints the invalid state with the warning palette. */
  @Prop() warning = false;
  @Prop() type?: TilburgWbcFormFieldType;

  render() {
    return (
      <div
        class={{
          'utrecht-form-field': true,
          [`utrecht-form-field--${this.type}`]: Boolean(this.type),
          'utrecht-form-field--invalid': this.invalid,
          'tilburg-warning': this.warning,
        }}
      >
        <slot />
      </div>
    );
  }
}
