/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, Event, EventEmitter, h, Prop, State } from '@stencil/core';
import { Heading, HeadingLevel } from '../utils/heading';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';
import { hasSlot } from '../utils/slots';

export type TilburgWbcAlertVariant = 'info' | 'success' | 'warning' | 'danger';
export type TilburgWbcAlertLiveRegion = 'polite' | 'assertive' | 'off';

/* API uses success/danger; DOM emits utrecht's ok/error so the global
   `.utrecht-alert--ok` / `--error` rules apply (same mapping as Angular/React). */
const VARIANT_TO_UTRECHT: Record<TilburgWbcAlertVariant, string> = {
  info: 'info',
  success: 'ok',
  warning: 'warning',
  danger: 'error',
};

/**
 * @slot - The alert message.
 * @slot icon - Replaces the default per-variant icon (painted by CSS when empty).
 * @slot close-icon - Replaces the default × in the close button (painted by CSS when empty).
 */
@Component({
  tag: 'tilburg-wbc-alert',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcAlert {
  @Element() host!: HTMLElement;

  @Prop() variant: TilburgWbcAlertVariant = 'info';
  /** Heading text. Named `heading` because `title` is a global HTML attribute (tooltip on the host). */
  @Prop() heading?: string;
  @Prop() headingLevel: HeadingLevel = 3;
  @Prop() closable = false;
  /** Defaults to `assertive` for `danger`, `polite` otherwise. */
  @Prop() liveRegion?: TilburgWbcAlertLiveRegion;
  @Prop() closeButtonAriaLabel = 'sluit alert';
  /** Visually hidden text prepended to the message for screen readers (e.g. "Fout:"). */
  @Prop() srPrefix?: string;

  /** Fired when the close button is activated. The alert does not remove itself. */
  @Event() tilburgClose!: EventEmitter<void>;

  @State() inherited: InheritedAttributes = {};
  private inheritor?: AttributeInheritor;
  private hasIcon = false;
  private hasCloseIcon = false;

  connectedCallback() {
    this.inheritor = inheritAttributes(this.host, ['aria-label'], (attributes) => {
      this.inherited = attributes;
    });
  }

  disconnectedCallback() {
    this.inheritor?.disconnect();
  }

  componentWillLoad() {
    this.hasIcon = hasSlot(this.host, 'icon');
    this.hasCloseIcon = hasSlot(this.host, 'close-icon');
  }

  private readonly onClose = () => {
    this.tilburgClose.emit();
  };

  render() {
    const variant = VARIANT_TO_UTRECHT[this.variant] ? this.variant : 'info';
    const liveRegion = this.liveRegion ?? (variant === 'danger' ? 'assertive' : 'polite');
    return (
      <div
        {...this.inherited}
        class={`utrecht-alert tilburg-alert utrecht-alert--${VARIANT_TO_UTRECHT[variant]}`}
        role={variant === 'danger' ? 'alert' : 'status'}
        aria-live={liveRegion}
        aria-atomic="true"
      >
        <div class="utrecht-alert__icon" aria-hidden="true">
          {this.hasIcon && <slot name="icon" />}
        </div>
        <div class="utrecht-alert__content">
          {this.heading && (
            <Heading level={this.headingLevel} class="tilburg-alert__title">
              {this.heading}
            </Heading>
          )}
          <div class="utrecht-alert__message">
            {this.srPrefix && <span class="utrecht-visually-hidden">{this.srPrefix}</span>}
            <slot />
          </div>
        </div>
        {this.closable && (
          <button
            type="button"
            class="tilburg-alert__close"
            aria-label={this.closeButtonAriaLabel}
            onClick={this.onClose}
          >
            {this.hasCloseIcon && <slot name="close-icon" />}
          </button>
        )}
      </div>
    );
  }
}
