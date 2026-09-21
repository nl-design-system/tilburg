/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, Prop, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

/**
 * When the skip link is rendered:
 *  - `visible-on-focus` — production WCAG 2.4.1 pattern: hidden until focused.
 *  - `visible` — always rendered in place.
 *  - `hidden` — never rendered (kept off-screen).
 *  - `focus` — forces the focused appearance (storybook screenshots).
 */
export type TilburgWebcSkipLinkVisibility = 'visible-on-focus' | 'visible' | 'hidden' | 'focus';

/**
 * @slot - The link text, e.g. "Sla over en ga naar de hoofdinhoud".
 */
@Component({
  tag: 'tilburg-webc-skip-link',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWebcSkipLink {
  @Element() host!: HTMLElement;

  /** Fragment of the main-content landmark, e.g. `#main`. */
  @Prop() href?: string;
  @Prop() visibility: TilburgWebcSkipLinkVisibility = 'visible-on-focus';

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

  render() {
    return (
      <a
        {...this.inherited}
        class={{
          'utrecht-skip-link': true,
          'utrecht-skip-link--visible-on-focus': this.visibility === 'visible-on-focus',
          'utrecht-skip-link--visible': this.visibility === 'visible',
          'utrecht-skip-link--hidden': this.visibility === 'hidden',
          'utrecht-skip-link--focus': this.visibility === 'focus',
        }}
        href={this.href || undefined}
      >
        <slot />
      </a>
    );
  }
}
