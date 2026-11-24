/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, Event, EventEmitter, h, Prop, State } from '@stencil/core';
import { announce } from '../utils/announce';
import { HeadingLevel } from '../utils/heading';
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
 * @slot icon - Replaces the default per-variant icon.
 * @slot close-icon - Replaces the default × in the close button.
 */
/* Default glyphs: the same `<i><svg>` as the HTML reference and the React/Angular layers. */
const GLYPH: Record<TilburgWbcAlertVariant | 'close', string> = {
  info: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-6h2v6Zm0-8h-2V7h2v2Z',
  success: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1.4 14.6L6 12l1.4-1.4 3.2 3.2 6-6L18 9.2l-7.4 7.4Z',
  warning: 'M1 21h22L12 2 1 21Zm12-3h-2v-2h2v2Zm0-4h-2v-4h2v4Z',
  danger:
    'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm5 13.6L15.6 17 12 13.4 8.4 17 7 15.6 10.6 12 7 8.4 8.4 7 12 10.6 15.6 7 17 8.4 13.4 12 17 15.6Z',
  close:
    'm18.3 5.71-1.42-1.42L12 9.17 7.12 4.29 5.71 5.71 10.59 10.59 5.71 15.46l1.41 1.42L12 12l4.88 4.88 1.42-1.42-4.88-4.87 4.87-4.88Z',
};

const Icon = ({ glyph }: { glyph: keyof typeof GLYPH }) => (
  <i
    aria-hidden="true"
    style={{
      alignItems: 'center',
      display: 'inline-flex',
      fontSize: 'var(--utrecht-alert-icon-size, 1.5rem)',
      fontStyle: 'normal',
      justifyContent: 'center',
    }}
  >
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={GLYPH[glyph]} />
    </svg>
  </i>
);

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
  @Prop() closeButtonAriaLabel = 'Sluit alert';
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
    const level = [1, 2, 3, 4, 5, 6].includes(Number(this.headingLevel)) ? Number(this.headingLevel) : 3;
    const HeadingTag = `utrecht-heading-${level}`;
    const InnerHeadingTag = `h${level}`;
    return (
      <div
        {...this.inherited}
        class={`utrecht-alert tilburg-alert utrecht-alert--${VARIANT_TO_UTRECHT[variant]}`}
        role={this.announce ? undefined : variant === 'danger' ? 'alert' : 'status'}
        aria-live={this.announce ? undefined : liveRegion}
        aria-atomic={this.announce ? undefined : 'true'}
      >
        <div class="utrecht-alert__icon" aria-hidden="true">
          {this.hasIcon ? <slot name="icon" /> : <Icon glyph={variant} />}
        </div>
        <div class="utrecht-alert__content">
          {this.heading && (
            /* The utrecht heading directly, as in the HTML reference (no tilburg-wbc-heading-N wrapper). */
            <HeadingTag class="tilburg-alert__title">
              <InnerHeadingTag class={`utrecht-heading-${level}`}>{this.heading}</InnerHeadingTag>
            </HeadingTag>
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
            {this.hasCloseIcon ? <slot name="close-icon" /> : <Icon glyph="close" />}
          </button>
        )}
      </div>
    );
  }
}
