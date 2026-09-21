/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, h, Prop } from '@stencil/core';

export type TilburgWebcFormLabelType = 'checkbox' | 'radio' | 'text';

/**
 * @slot - Label text, optionally a `<span class="tilburg-form-label__optional">`
 *   addon, or the checkbox / radio control the label wraps.
 */
@Component({
  tag: 'tilburg-webc-form-label',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWebcFormLabel {
  /** `id` of the labelled control (rendered as `<label for>`). */
  @Prop() for?: string;
  /** `checkbox` / `radio` add the matching modifier; `text` (or unset) renders the plain label. */
  @Prop() type?: TilburgWebcFormLabelType;
  /** Presentational mirror of the control's state. */
  @Prop() checked = false;
  /** Presentational mirror of the control's state. */
  @Prop() disabled = false;

  render() {
    return (
      <label
        class={{
          'utrecht-form-label': true,
          'utrecht-form-label--checkbox': this.type === 'checkbox',
          'utrecht-form-label--checked': this.checked,
          'utrecht-form-label--disabled': this.disabled,
          'utrecht-form-label--radio': this.type === 'radio',
        }}
        htmlFor={this.for}
      >
        <slot />
      </label>
    );
  }
}
