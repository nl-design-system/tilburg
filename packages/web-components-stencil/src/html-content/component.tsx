/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, Prop, State } from '@stencil/core';
import { sanitizeHtml } from './sanitize';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

/**
 * @slot - Rich content, used when `html` is not set.
 */
@Component({
  tag: 'tilburg-webc-html-content',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWebcHtmlContent {
  @Element() host!: HTMLElement;

  /**
   * CMS-authored HTML string, rendered inside the styled `.utrecht-html-content`
   * div after allowlist sanitizing (the counterpart of Angular's `DomSanitizer`).
   * Leave unset to slot the content as children instead.
   */
  @Prop() html?: string | null;

  /* Angular's `lang` input is the plain `lang` attribute here: it is moved from
     the host onto the `.utrecht-html-content` div, like Angular's `[attr.lang]`. */
  @State() inherited: InheritedAttributes = {};
  private inheritor?: AttributeInheritor;

  connectedCallback() {
    this.inheritor = inheritAttributes(this.host, ['lang'], (attributes) => {
      this.inherited = attributes;
    });
  }

  disconnectedCallback() {
    this.inheritor?.disconnect();
  }

  render() {
    const lang = this.inherited['lang'] || undefined;
    if (this.html !== null && this.html !== undefined) {
      return <div class="utrecht-html-content" lang={lang} innerHTML={sanitizeHtml(this.html)} />;
    }
    return (
      <div class="utrecht-html-content" lang={lang}>
        <slot />
      </div>
    );
  }
}
