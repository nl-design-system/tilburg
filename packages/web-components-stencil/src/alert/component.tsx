/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, Event, EventEmitter, h, Prop, State } from '@stencil/core';
import { announce } from '../utils/announce';
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
/* The alert type, read out before the message (bq-tlb-frontend TIL-51): the colour and icon show it visually only. */
const DEFAULT_SR_PREFIX: Record<string, string> = {
  info: 'Informatie:',
  success: 'Succes:',
  warning: 'Waarschuwing:',
  danger: 'Fout:',
};

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
  /** Read the alert out through a persistent live region when it appears and when its text changes (TIL-40); the
   *  alert then has no live role of its own, so it is not read twice. */
  @Prop() announce = false;

  private lastAnnounced = '';

  /* After every render, but only announces when the text differs from what was read last. */
  componentDidRender() {
    const variant = VARIANT_TO_UTRECHT[this.variant] ? this.variant : 'info';
    const liveRegion = this.liveRegion ?? (variant === 'danger' ? 'assertive' : 'polite');
    if (!this.announce || liveRegion === 'off') return;
    /* Title and message are separate blocks: join them with a space so they do not run together. */
    const content = this.host.querySelector('.utrecht-alert__content');
    const text = Array.from(content?.children ?? [], (part) => part.textContent?.trim() ?? '')
      .filter(Boolean)
      .join(' ');
    if (text && text !== this.lastAnnounced) {
      this.lastAnnounced = text;
      announce(text, liveRegion);
    }
  }
  @Prop() closeButtonAriaLabel = 'sluit alert';
  /** Visually hidden text prepended to the message for screen readers (e.g. "Fout:"). Defaults per variant;
   *  `sr-prefix=""` for none. */
  @Prop() srPrefix?: string | null;

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
    const prefix = this.srPrefix === undefined ? DEFAULT_SR_PREFIX[this.variant] : this.srPrefix;
    const variant = VARIANT_TO_UTRECHT[this.variant] ? this.variant : 'info';
    const liveRegion = this.liveRegion ?? (variant === 'danger' ? 'assertive' : 'polite');
    return (
      <div
        {...this.inherited}
        class={`utrecht-alert tilburg-alert utrecht-alert--${VARIANT_TO_UTRECHT[variant]}`}
        role={this.announce ? undefined : variant === 'danger' ? 'alert' : 'status'}
        aria-live={this.announce ? undefined : liveRegion}
        aria-atomic={this.announce ? undefined : 'true'}
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
            {prefix && <span class="utrecht-visually-hidden">{prefix} </span>}
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
