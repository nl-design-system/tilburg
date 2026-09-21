/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, Prop, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

export interface TilburgWebcPageFooterLink {
  label: string;
  href: string;
}

/* Objects/arrays arrive as JS properties (React proxy, `element.links = […]`)
   or, in plain HTML, as a JSON string attribute. */
function parseJson<T>(value: T | string | null | undefined): T | undefined {
  if (typeof value !== 'string') return value ?? undefined;
  try {
    return JSON.parse(value) as T;
  } catch {
    return undefined;
  }
}

/**
 * @slot - Extra content, rendered inside the container before both link lists.
 */
@Component({
  tag: 'tilburg-webc-page-footer',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWebcPageFooter {
  @Element() host!: HTMLElement;

  /** Legal / service links. Property, or a JSON array attribute: `links='[{"label":"Cookies","href":"/cookies"}]'`. */
  @Prop() links: TilburgWebcPageFooterLink[] | string = [];
  /** Call-to-action row above the list. Property, or a JSON object attribute. */
  @Prop() primaryLink?: TilburgWebcPageFooterLink | string | null;

  /* `aria-label` names the `<footer>` landmark, not the host. */
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
    const primaryLink = parseJson<TilburgWebcPageFooterLink | null>(this.primaryLink);
    const parsedLinks = parseJson<TilburgWebcPageFooterLink[]>(this.links);
    const links = Array.isArray(parsedLinks) ? parsedLinks : [];
    return (
      <footer {...this.inherited} class="tilburg-page-footer">
        <div class="tilburg-page-footer__container">
          <slot />
          {primaryLink && (
            <ul class="tilburg-page-footer__primary">
              <li>
                <a class="tilburg-page-footer__primary-link" href={primaryLink.href}>
                  {primaryLink.label}
                </a>
              </li>
            </ul>
          )}
          {links.length > 0 && (
            <ul class="tilburg-page-footer__list">
              {links.map((link) => (
                <li key={`${link.label}|${link.href}`}>
                  <a class="tilburg-page-footer__link" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </footer>
    );
  }
}
