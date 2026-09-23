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
  @Prop() liveRegion: TilburgWbcBadgeStatusLiveRegion = 'polite';

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
    return (
      <span
        {...rest}
        class={{
          'utrecht-badge-status': true,
          [`utrecht-badge-status--${this.status}`]: Boolean(this.status),
        }}
        role="status"
        aria-live={this.liveRegion}
        /* Same `ariaLabel || status` cascade as Angular/React. */
        aria-label={ariaLabel || this.status || undefined}
      >
        <slot />
      </span>
    );
  }
}
