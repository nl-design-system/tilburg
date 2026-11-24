/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, Prop, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

export type TilburgWbcLinkListAriaCurrent = 'page' | 'step' | 'location' | 'date' | 'time' | boolean;

export interface TilburgWbcLinkListLink {
  label: string;
  href: string;
  /** Adds `rel="external noopener noreferrer"`. */
  external?: boolean;
  /** Rendered as `aria-current`. */
  current?: TilburgWbcLinkListAriaCurrent;
}

/* Written on the host and moved onto the inner `<ul>`. */
const ATTRS = ['aria-label', 'aria-labelledby'];

@Component({
  tag: 'tilburg-wbc-link-list',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcLinkList {
  @Element() host!: HTMLElement;

  /** The links. JS property only (no attribute). Nothing is rendered for an empty array. */
  @Prop() links: TilburgWbcLinkListLink[] | null | undefined = [];

  @State() inherited: InheritedAttributes = {};
  private inheritor?: AttributeInheritor;

  connectedCallback() {
    this.inheritor = inheritAttributes(this.host, ATTRS, (attributes) => {
      this.inherited = attributes;
    });
  }

  disconnectedCallback() {
    this.inheritor?.disconnect();
  }

  render() {
    const links = this.links ?? [];
    if (!links.length) return null;
    return (
      <ul {...this.inherited} class="utrecht-link-list utrecht-link-list--html-ul" role="list">
        {links.map((link, index) => (
          <li key={`${link.href}-${index}`} class="utrecht-link-list__item">
            <a
              class="utrecht-link utrecht-link--html-a utrecht-link-list__link"
              href={link.href}
              rel={link.external ? 'external noopener noreferrer' : undefined}
              aria-current={link.current === undefined || link.current === null ? undefined : String(link.current)}
            >
              <svg
                class="utrecht-icon"
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <span class="utrecht-link-list__link-text">{link.label}</span>
            </a>
          </li>
        ))}
      </ul>
    );
  }
}
