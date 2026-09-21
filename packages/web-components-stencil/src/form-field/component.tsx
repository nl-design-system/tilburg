/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, h, Prop } from '@stencil/core';

export type TilburgWebcFormFieldType = 'checkbox' | 'radio' | 'text';

/**
 * Plain wrapper, like Angular `<tilburg-form-field>` and React `FormField`:
 * it renders the `utrecht-form-field` container and its modifiers, the
 * consumer composes label, description, control and validation message
 * (`tilburg-webc-form-label`, `tilburg-webc-form-field-description`,
 * `tilburg-webc-validation-message`, a native `<input>`, …) as children.
 *
 * @slot - Label, description, control and validation message.
 */
@Component({
  tag: 'tilburg-webc-form-field',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWebcFormField {
  @Prop() invalid = false;
  /** Tilburg modifier: paints the invalid state with the warning palette. */
  @Prop() warning = false;
  @Prop() type?: TilburgWebcFormFieldType;

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
