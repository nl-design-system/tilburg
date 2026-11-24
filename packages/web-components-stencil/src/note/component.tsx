/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, Prop, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

export type NoteVariant = 'info' | 'success' | 'warning' | 'danger';

/* Same API values as Alert; the DOM uses Utrecht's note modifiers (danger → error). */
const VARIANT_TO_UTRECHT: Record<NoteVariant, string> = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'error',
};

/**
 * @slot - The note's content.
 */
@Component({
  tag: 'tilburg-wbc-note',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcNote {
  @Element() host!: HTMLElement;

  /* The name of the note / aside belongs on the inner element, not on the host. */
  @State() inherited: InheritedAttributes = {};
  private inheritor?: AttributeInheritor;

  /** Feedback colour; none gives the neutral grey note. */
  @Prop() variant?: NoteVariant;
  /** Render `<aside>` (a complementary landmark) instead of `<section role="note">`. */
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
        role={this.aside ? undefined : 'note'}
        class={{ 'utrecht-note': true, [`utrecht-note--${modifier}`]: !!modifier }}
      >
        <slot />
      </Tag>
    );
  }
}
