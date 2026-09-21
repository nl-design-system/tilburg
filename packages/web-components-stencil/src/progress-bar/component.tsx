/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, Event, EventEmitter, h, Prop, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';
import { hasSlot } from '../utils/slots';

/**
 * @slot back-icon - Replaces the default `←` in front of the back label.
 */
@Component({
  tag: 'tilburg-webc-progress-bar',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWebcProgressBar {
  @Element() host!: HTMLElement;

  @Prop() value = 0;
  @Prop() total = 0;
  /** Step label ("Stap 2 van 4"); doubles as the track's `aria-valuetext`. */
  @Prop() label?: string;
  /** Step title (`<h2>`). Named `heading` because `title` is a global HTML attribute (tooltip on the host). */
  @Prop() heading?: string;
  @Prop() backLabel?: string;
  @Prop() showBack = false;

  /** Fired when the back link is activated. The link's default navigation is prevented. */
  @Event() tilburgBackClick!: EventEmitter<MouseEvent>;

  /* `aria-label` is written on the host and moved onto the `role="progressbar"` track. */
  @State() inherited: InheritedAttributes = {};
  private inheritor?: AttributeInheritor;
  private hasBackIcon = false;

  connectedCallback() {
    this.inheritor = inheritAttributes(this.host, ['aria-label'], (attributes) => {
      this.inherited = attributes;
    });
  }

  disconnectedCallback() {
    this.inheritor?.disconnect();
  }

  componentWillLoad() {
    this.hasBackIcon = hasSlot(this.host, 'back-icon');
  }

  private get percentage(): number {
    const total = Number(this.total) || 0;
    const value = Number(this.value) || 0;
    if (total <= 0) {
      return 0;
    }
    return Math.max(0, Math.min(100, (value / total) * 100));
  }

  private readonly onBack = (event: MouseEvent) => {
    event.preventDefault();
    this.tilburgBackClick.emit(event);
  };

  render() {
    const percentage = this.percentage;
    return [
      this.showBack && (
        <a class="tilburg-progress-bar__back utrecht-link utrecht-link--html-a" href="#" onClick={this.onBack}>
          {this.hasBackIcon ? <slot name="back-icon" /> : <span aria-hidden="true">←</span>}
          <span class="tilburg-progress-bar__back-label">{this.backLabel}</span>
        </a>
      ),
      <div class="tilburg-progress-bar__header">
        {this.heading && <h2 class="tilburg-progress-bar__title tilburg-step-title">{this.heading}</h2>}
        {this.label && <div class="tilburg-progress-bar__label">{this.label}</div>}
      </div>,
      <div
        class="tilburg-progress-bar__track"
        role="progressbar"
        /* A progressbar needs an accessible name: `aria-label`, then the
           heading, then "Voortgang" (same cascade as React). */
        aria-label={this.inherited['aria-label'] || this.heading || 'Voortgang'}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={String(Math.round(percentage))}
        aria-valuetext={this.label || undefined}
      >
        <div class="tilburg-progress-bar__indicator progress-bar-indicator" style={{ width: `${percentage}%` }} />
      </div>,
    ];
  }
}
