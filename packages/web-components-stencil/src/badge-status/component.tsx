/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, Prop, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

export type TilburgWbcBadgeStatusLiveRegion = 'polite' | 'assertive' | 'off';

/**
 * @slot - The badge text.
 */
@Component({
  tag: 'tilburg-wbc-badge-status',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcBadgeStatus {
  @Element() host!: HTMLElement;

  /**
   * Appended as the `utrecht-badge-status--{status}` modifier: `info`, `success`,
   * `warning`, `error`, or a utrecht feedback alias (`safe`, `danger`, `invalid`,
   * `inactive`, `neutral`). Also the accessible name when no `aria-label` is set.
   */
  @Prop() status?: string;
  /** Defaults to `assertive` for an urgent status (danger, error, invalid) and `polite` otherwise. */
  @Prop() liveRegion?: TilburgWbcBadgeStatusLiveRegion;

  /* Angular's `ariaLabel` input is the plain `aria-label` attribute here: it is
     moved from the host onto the inner `role="status"` span. */
  @State() inherited: InheritedAttributes = {};
  private inheritor?: AttributeInheritor;

  connectedCallback() {
    this.inheritor = inheritAttributes(this.host, ['aria-label', 'aria-describedby', 'title'], (attributes) => {
      this.inherited = attributes;
    });
  }

  disconnectedCallback() {
    this.inheritor?.disconnect();
  }

  render() {
    const { 'aria-label': ariaLabel, ...rest } = this.inherited;
    /* An urgent status is announced as an alert (bq-tlb-frontend 3b9998c); the rest as a polite status. */
    const urgent = ['danger', 'error', 'invalid'].includes(this.status ?? '');
    return (
      <span
        {...rest}
        class={{
          'utrecht-badge-status': true,
          [`utrecht-badge-status--${this.status}`]: Boolean(this.status),
        }}
        role={urgent ? 'alert' : 'status'}
        aria-live={this.liveRegion ?? (urgent ? 'assertive' : 'polite')}
        /* The visible text is the accessible name; the status code ("warning") is not a label. */
        aria-label={ariaLabel || undefined}
      >
        <slot />
      </span>
    );
  }
}
