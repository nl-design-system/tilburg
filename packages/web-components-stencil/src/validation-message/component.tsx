/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, Prop } from '@stencil/core';
import { hasSlot } from '../utils/slots';

export type TilburgWbcValidationMessageType = 'error' | 'warning';
export type TilburgWbcValidationLiveRegion = 'polite' | 'assertive' | 'off';

/* Default glyph per type, the same `<svg>` as the HTML reference. */
const GLYPH: Record<TilburgWbcValidationMessageType, string> = {
  error: 'M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm1 13H9v-2h2v2Zm0-4H9V5h2v5Z',
  warning: 'M10 1 1 19h18L10 1Zm0 5 1 7h-2l1-7Zm0 9a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z',
};

/**
 * @slot - The message.
 * @slot icon - Replaces the default per-type icon.
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
  @Prop() liveRegion: TilburgWbcValidationLiveRegion = 'assertive';

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
        /* The role follows the live region: assertive (default) = alert, polite = status, off = none. */
        role={this.liveRegion === 'assertive' ? 'alert' : this.liveRegion === 'polite' ? 'status' : undefined}
        aria-live={this.liveRegion}
      >
        <span class="tilburg-validation-message__icon" aria-hidden="true">
          {this.hasIcon ? (
            <slot name="icon" />
          ) : (
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d={GLYPH[isWarning ? 'warning' : 'error']} />
            </svg>
          )}
        </span>
        <span>
          <slot />
        </span>
      </div>
    );
  }
}
