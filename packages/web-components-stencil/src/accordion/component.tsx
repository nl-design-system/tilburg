/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, Listen, Prop, State } from '@stencil/core';
import { Heading, HeadingLevel } from '../utils/heading';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

const ACCORDION_NAV_KEYS = ['ArrowDown', 'ArrowUp', 'Home', 'End'] as const;
type AccordionNavKey = (typeof ACCORDION_NAV_KEYS)[number];

/**
 * @slot - `<tilburg-webc-accordion-section>` elements.
 */
@Component({
  tag: 'tilburg-webc-accordion',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWebcAccordion {
  @Element() host!: HTMLElement;

  @Prop() headingLevel: HeadingLevel = 2;
  @Prop() displayName?: string;

  @State() inherited: InheritedAttributes = {};
  private inheritor?: AttributeInheritor;

  connectedCallback() {
    this.inheritor = inheritAttributes(this.host, ['aria-label'], (attributes) => {
      this.inherited = attributes;
    });
  }

  disconnectedCallback() {
    this.inheritor?.disconnect();
  }

  /* Roving focus across the section headers, mirroring the Angular
     `TilburgAccordion` host listener: Arrow Up/Down wrap between the enabled
     buttons, Home/End jump to the first/last. */
  @Listen('keydown')
  onKeyDown(event: KeyboardEvent) {
    if (!ACCORDION_NAV_KEYS.includes(event.key as AccordionNavKey)) return;

    const target = event.target as HTMLElement | null;
    if (!(target instanceof HTMLButtonElement)) return;
    if (!target.classList.contains('utrecht-accordion__button')) return;
    // Skip nested accordions: only handle buttons that belong to this one.
    if (target.closest('tilburg-webc-accordion') !== this.host) return;

    const buttons = Array.from(
      this.host.querySelectorAll<HTMLButtonElement>('tilburg-webc-accordion-section button.utrecht-accordion__button'),
    ).filter((button) => !button.disabled && button.closest('tilburg-webc-accordion') === this.host);

    const idx = buttons.indexOf(target);
    if (idx === -1 || buttons.length === 0) return;

    let next: number;
    switch (event.key as AccordionNavKey) {
      case 'ArrowDown':
        next = (idx + 1) % buttons.length;
        break;
      case 'ArrowUp':
        next = (idx - 1 + buttons.length) % buttons.length;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = buttons.length - 1;
        break;
    }

    event.preventDefault();
    buttons[next].focus();
  }

  render() {
    const ariaLabel = this.inherited['aria-label'];
    return (
      <div class="utrecht-accordion" aria-label={ariaLabel} role={ariaLabel ? 'region' : undefined}>
        {this.displayName && (
          <Heading level={this.headingLevel} class="tilburg-accordion__display-name">
            {this.displayName}
          </Heading>
        )}
        <slot />
      </div>
    );
  }
}
