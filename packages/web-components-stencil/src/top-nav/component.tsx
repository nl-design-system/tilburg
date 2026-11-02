/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, Event, EventEmitter, h, Prop, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

export interface TilburgWbcTopNavItem {
  label: string | null | undefined;
  href?: string | null;
  current?: boolean;
  data?: unknown;
}

export interface TilburgWbcTopNavItemClickDetail {
  item: TilburgWbcTopNavItem;
  event: MouseEvent;
}

@Component({
  tag: 'tilburg-wbc-top-nav',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcTopNav {
  /** The links. JS property only (no attribute). Nothing is rendered for an empty array. */
  @Prop() items: TilburgWbcTopNavItem[] | null | undefined = [];

  /** Fired when a link is clicked, with the item and the native click event. */
  @Event() tilburgItemClick!: EventEmitter<TilburgWbcTopNavItemClickDetail>;

  @Element() host!: HTMLElement;

  /* `aria-label` is written on the host and moved onto the `<nav>`. */
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
      <nav class="utrecht-topnav" aria-label={this.inherited['aria-label'] ?? 'Hoofdmenu'}>
        <ul class="utrecht-topnav__list">
          {items.map((item, index) => (
            <li key={`${item.label ?? ''}-${index}`} class="utrecht-topnav__item">
              <a
                class={{ 'utrecht-topnav__link': true, 'utrecht-topnav__link--current': !!item.current }}
                href={item.href || '#'}
                aria-current={item.current ? 'page' : undefined}
                onClick={(event: MouseEvent) => this.tilburgItemClick.emit({ item, event })}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}
