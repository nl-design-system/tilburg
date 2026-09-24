/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, Prop } from '@stencil/core';
import { hasSlot } from '../utils/slots';

export type TilburgWbcValidationMessageType = 'error' | 'warning';
export type TilburgWbcValidationLiveRegion = 'polite' | 'assertive' | 'off';

/**
 * @slot - The message.
 * @slot icon - Replaces the default per-type icon (painted by CSS when empty).
 */
@Component({
  tag: 'tilburg-wbc-validation-message',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcValidationMessage {
  @Element() host!: HTMLElement;

  /** Anything other than `warning` renders as `error` (same as Angular). */
  @Prop() type: TilburgWbcValidationMessageType = 'error';
  /**
   * `aria-live` of the message. Angular calls this `ariaLive`; renamed because
   * `aria-live` is a global ARIA attribute (and `ariaLive` an HTMLElement property).
   */
  @Prop() liveRegion: TilburgWbcValidationLiveRegion = 'polite';

  private hasIcon = false;

  componentWillLoad() {
    this.hasIcon = hasSlot(this.host, 'icon');
  }

  render() {
    const isWarning = this.type === 'warning';
    return (
      <div
        class={{
          'tilburg-validation-message': true,
          'utrecht-form-field-error-message': !isWarning,
          'utrecht-form-field-description': isWarning,
          'utrecht-form-field-description--warning': isWarning,
          'tilburg-validation-message--error': !isWarning,
          'tilburg-validation-message--warning': isWarning,
        }}
        role="alert"
        aria-live={this.liveRegion}
      >
        <span class="tilburg-validation-message__icon" aria-hidden="true">
          {this.hasIcon && <slot name="icon" />}
        </span>
        <span>
          <slot />
        </span>
      </div>
    );
  }
}
