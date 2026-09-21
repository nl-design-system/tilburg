/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, Prop, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

export type TilburgWebcButtonLinkAppearance = 'primary-action-button' | 'secondary-action-button' | 'subtle-button';

const APPEARANCE_CLASS: Record<TilburgWebcButtonLinkAppearance, string> = {
  'primary-action-button': 'utrecht-button-link--primary-action',
  'secondary-action-button': 'utrecht-button-link--secondary-action',
  'subtle-button': 'utrecht-button-link--subtle',
};

/**
 * @slot - The link text.
 */
@Component({
  tag: 'tilburg-webc-button-link',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWebcButtonLink {
  @Element() host!: HTMLElement;

  /** No appearance modifier when unset (same as Angular/React). */
  @Prop() appearance?: TilburgWebcButtonLinkAppearance;
  @Prop() href?: string;
  @Prop() target?: string;
  @Prop() rel?: string;
  /** Sets `rel="external noopener noreferrer"` (replaces `rel`). */
  @Prop() external = false;
  /** Visible but not yet actionable: `aria-disabled="true"` + the `--placeholder` modifier (React parity). */
  @Prop() placeholder = false;

  /* `aria-label`, `aria-describedby`, `title` and `lang` are written on the
     host as plain HTML attributes and moved onto the inner `<a>`. */
  @State() inherited: InheritedAttributes = {};
  private inheritor?: AttributeInheritor;

  connectedCallback() {
    this.inheritor = inheritAttributes(this.host, ['aria-label', 'aria-describedby', 'title', 'lang'], (attributes) => {
      this.inherited = attributes;
    });
  }

  disconnectedCallback() {
    this.inheritor?.disconnect();
  }

  render() {
    const appearanceClass = this.appearance ? APPEARANCE_CLASS[this.appearance] : undefined;
    return (
      <a
        {...this.inherited}
        class={{
          'utrecht-button-link': true,
          'utrecht-button-link--html-a': true,
          [appearanceClass ?? '']: Boolean(appearanceClass),
          'utrecht-button-link--placeholder': this.placeholder,
        }}
        href={this.href || undefined}
        target={this.target || undefined}
        rel={this.external ? 'external noopener noreferrer' : this.rel || undefined}
        aria-disabled={this.placeholder ? 'true' : undefined}
      >
        <slot />
      </a>
    );
  }
}
