/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, Event, EventEmitter, h, Prop } from '@stencil/core';
import { hasSlot } from '../utils/slots';

let sectionCount = 0;

/**
 * @slot - Panel content.
 * @slot icon-expanded - Replaces the `−` shown while expanded.
 * @slot icon-collapsed - Replaces the `+` shown while collapsed.
 */
@Component({
  tag: 'tilburg-webc-accordion-section',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWebcAccordionSection {
  @Element() host!: HTMLElement;

  /**
   * Builds the button + panel IDs (`utrecht-accordion-{key}-button|panel`).
   * Named `sectionKey` because `key` is reserved by Stencil's JSX. When unset
   * a unique key is generated so sections never share IDs.
   */
  @Prop() sectionKey?: string;
  @Prop() label?: string;
  @Prop({ mutable: true, reflect: true }) expanded = false;
  @Prop() disabled = false;
  /** When true the section toggles itself; otherwise it only emits `tilburgToggle`. */
  @Prop() autoToggle = false;

  /** Fired with the requested next `expanded` state when the header is activated. */
  @Event() tilburgToggle!: EventEmitter<boolean>;

  private readonly fallbackKey = `webc-${++sectionCount}`;
  private hasIconExpanded = false;
  private hasIconCollapsed = false;

  componentWillLoad() {
    this.hasIconExpanded = hasSlot(this.host, 'icon-expanded');
    this.hasIconCollapsed = hasSlot(this.host, 'icon-collapsed');
  }

  private readonly onToggle = () => {
    if (this.disabled) return;
    const next = !this.expanded;
    if (this.autoToggle) {
      this.expanded = next;
    }
    this.tilburgToggle.emit(next);
  };

  render() {
    const key = this.sectionKey ?? this.fallbackKey;
    const panelId = `utrecht-accordion-${key}-panel`;
    const buttonId = `utrecht-accordion-${key}-button`;
    return (
      <div class="utrecht-accordion__section">
        <span class="utrecht-accordion__header">
          <button
            class="utrecht-button utrecht-button--subtle utrecht-accordion__button"
            id={buttonId}
            type="button"
            disabled={this.disabled}
            aria-expanded={String(this.expanded)}
            aria-controls={panelId}
            onClick={this.onToggle}
          >
            <span class="utrecht-accordion__button-icon" aria-hidden="true">
              {this.expanded ? (
                this.hasIconExpanded ? (
                  <slot name="icon-expanded" />
                ) : (
                  '−'
                )
              ) : this.hasIconCollapsed ? (
                <slot name="icon-collapsed" />
              ) : (
                '+'
              )}
            </span>
            <span class="utrecht-accordion__button-label tilburg-accordion__display-name">{this.label}</span>
          </button>
        </span>
        <div
          class="utrecht-accordion__panel"
          id={panelId}
          aria-labelledby={buttonId}
          hidden={!this.expanded}
          role="region"
        >
          <slot />
        </div>
      </div>
    );
  }
}
