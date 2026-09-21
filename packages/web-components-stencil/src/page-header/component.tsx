/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, Prop, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

/**
 * @slot - Actions on the inline-end (user name, log-out button, menu toggle, …).
 */
@Component({
  tag: 'tilburg-webc-page-header',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWebcPageHeader {
  @Element() host!: HTMLElement;

  @Prop() logoSrc?: string | null;
  @Prop() logoAlt = '';
  /** Header text. Named `heading` because `title` is a global HTML attribute (tooltip on the host). */
  @Prop() heading?: string | null;
  /** Link target of the brand area; defaults to `/`. */
  @Prop() titleHref?: string | null;

  /* `aria-label` names the `<header>` landmark, not the host. */
  @State() inherited: InheritedAttributes = {};
  private inheritor?: AttributeInheritor;
  private hasActions = false;

  connectedCallback() {
    this.inheritor = inheritAttributes(this.host, ['aria-label'], (attributes) => {
      this.inherited = attributes;
    });
  }

  disconnectedCallback() {
    this.inheritor?.disconnect();
  }

  componentWillLoad() {
    /* `components-css` hides an empty actions container with `:empty`, but
       Stencil's light-DOM slot markers keep the div from being `:empty`. Only
       render it when actions are projected (same as the React component).
       Uses `querySelectorAll` + `parentElement` for the reason documented in
       `utils/slots.ts`: `children` is patched and empty before first render. */
    this.hasActions = Array.from(this.host.querySelectorAll('*')).some(
      (child) => child.parentElement === this.host && !child.hasAttribute('slot'),
    );
  }

  render() {
    return (
      <header {...this.inherited} class="tilburg-page-header">
        <div class="tilburg-page-header__container">
          {(this.logoSrc || this.heading) && (
            <a class="tilburg-page-header__brand" href={this.titleHref || '/'}>
              {this.logoSrc && <img class="tilburg-page-header__logo" src={this.logoSrc} alt={this.logoAlt} />}
              {this.heading && <span class="tilburg-page-header__title">{this.heading}</span>}
            </a>
          )}
          {this.hasActions && (
            <div class="tilburg-page-header__actions">
              <slot />
            </div>
          )}
        </div>
      </header>
    );
  }
}
