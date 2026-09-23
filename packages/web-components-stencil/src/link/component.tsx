/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, Prop, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

export type TilburgWbcAriaCurrent = 'page' | 'step' | 'location' | 'date' | 'time' | boolean;

/**
 * @slot - The link text.
 */
@Component({
  tag: 'tilburg-wbc-link',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcLink {
  @Element() host!: HTMLElement;

  @Prop() href?: string;
  @Prop() target?: string;
  @Prop() rel?: string;
  /** Appends `external noopener noreferrer` to `rel`. */
  @Prop() external = false;
  /** Rendered as `aria-current` on the inner `<a>`. */
  @Prop() current?: TilburgWbcAriaCurrent;

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

  private get resolvedRel(): string | undefined {
    if (this.external) {
      const prefix = this.rel ? `${this.rel} ` : '';
      return `${prefix}external noopener noreferrer`;
    }
    return this.rel || undefined;
  }

  private get ariaCurrent(): string | undefined {
    if (this.current === undefined || this.current === null) return undefined;
    // A bare `current` attribute arrives as '' — treat it like `true`.
    return (this.current as unknown) === '' ? 'true' : String(this.current);
  }

  render() {
    return (
      <a
        {...this.inherited}
        class="utrecht-link utrecht-link--html-a"
        rel={this.resolvedRel}
        target={this.target || undefined}
        href={this.href || undefined}
        aria-current={this.ariaCurrent}
      >
        <slot />
      </a>
    );
  }
}
