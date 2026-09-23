/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, Event, EventEmitter, h, Prop, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

export interface TilburgWbcBreadcrumbItem {
  label: string | null | undefined;
  href?: string | null;
  current?: boolean;
  data?: unknown;
}

export interface TilburgWbcBreadcrumbItemClickDetail {
  item: TilburgWbcBreadcrumbItem;
  event: MouseEvent;
}

@Component({
  tag: 'tilburg-wbc-breadcrumb',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcBreadcrumb {
  @Element() host!: HTMLElement;

  /**
   * The trail. JS property only (no attribute). An item renders as the current
   * page (`<span aria-current="page">`) when it has `current: true` or is the
   * last one. Nothing is rendered for an empty array.
   */
  @Prop() items: TilburgWbcBreadcrumbItem[] | null | undefined = [];

  /**
   * Fired when a trail link is clicked, with the item and the native click
   * event (call `detail.event.preventDefault()` for client-side routing).
   */
  @Event() tilburgItemClick!: EventEmitter<TilburgWbcBreadcrumbItemClickDetail>;

  /* `aria-label` (default `Kruimelpad`) is written on the host and moved onto
     the `<nav>`. */
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
    const items = this.items ?? [];
    if (!items.length) return null;
    return (
      <nav aria-label={this.inherited['aria-label'] ?? 'Kruimelpad'} class="utrecht-breadcrumb-nav tilburg-breadcrumb">
        <ol class="utrecht-breadcrumb-nav__list utrecht-breadcrumb-nav__list--html-ol">
          {items.map((item, index) => {
            const last = index === items.length - 1;
            return (
              <li key={`${item.label ?? ''}-${index}`} class="utrecht-breadcrumb-nav__item">
                {!last && !item.current ? (
                  [
                    <a
                      class="utrecht-breadcrumb-nav__link"
                      href={item.href || '#'}
                      onClick={(event: MouseEvent) => this.tilburgItemClick.emit({ item, event })}
                    >
                      {item.label}
                    </a>,
                    <span class="utrecht-breadcrumb-nav__separator" aria-hidden="true">
                      ›
                    </span>,
                  ]
                ) : (
                  <span aria-current="page" class="utrecht-breadcrumb-nav__link utrecht-breadcrumb-nav__link--current">
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
}
