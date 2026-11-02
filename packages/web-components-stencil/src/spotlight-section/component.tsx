/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, Prop, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

export type SpotlightSectionVariant = 'info' | 'success' | 'warning' | 'danger';

/* Same API values as Alert; the DOM uses Utrecht's ok/error modifiers. */
const VARIANT_TO_UTRECHT: Record<SpotlightSectionVariant, string> = {
  info: 'info',
  success: 'ok',
  warning: 'warning',
  danger: 'error',
};

/**
 * @slot - The highlighted content.
 */
@Component({
  tag: 'tilburg-wbc-spotlight-section',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcSpotlightSection {
  @Element() host!: HTMLElement;

  /* The name of the section / aside belongs on the inner element, not on the host. */
  @State() inherited: InheritedAttributes = {};
  private inheritor?: AttributeInheritor;

  /** Feedback colour; none gives the neutral grey block. */
  @Prop() variant?: SpotlightSectionVariant;
  /** Render `<aside>` instead of `<section>`. */
  @Prop() aside = false;

  connectedCallback() {
    this.inheritor = inheritAttributes(this.host, ['aria-label', 'aria-labelledby'], (attributes) => {
      this.inherited = attributes;
    });
  }

  disconnectedCallback() {
    this.inheritor?.disconnect();
  }

  render() {
    const Tag = this.aside ? 'aside' : 'section';
    const modifier = this.variant && VARIANT_TO_UTRECHT[this.variant];
    return (
      <Tag
        {...this.inherited}
        class={{ 'utrecht-spotlight-section': true, [`utrecht-spotlight-section--${modifier}`]: !!modifier }}
      >
        <slot />
      </Tag>
    );
  }
}
