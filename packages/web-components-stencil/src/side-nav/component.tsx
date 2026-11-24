/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, Event, EventEmitter, h, Prop, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

export interface TilburgWbcSideNavItem {
  label: string | null | undefined;
  href?: string | null;
  current?: boolean;
  data?: unknown;
  /** One nested level; children of children are not rendered. */
  children?: TilburgWbcSideNavItem[];
}

export interface TilburgWbcSideNavItemClickDetail {
  item: TilburgWbcSideNavItem;
  event: MouseEvent;
}

@Component({
  tag: 'tilburg-wbc-side-nav',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcSideNav {
  /** The links, with one optional nested level (`children`). JS property only. Nothing is rendered for an empty array. */
  @Prop() items: TilburgWbcSideNavItem[] | null | undefined = [];

  /** Fired when a top-level or child link is clicked, with the item and the native click event. */
  @Event() tilburgItemClick!: EventEmitter<TilburgWbcSideNavItemClickDetail>;

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

  private link(item: TilburgWbcSideNavItem, classes: Record<string, boolean>) {
    return (
      <a
        class={classes}
        href={item.href || '#'}
        aria-current={item.current ? 'page' : undefined}
        onClick={(event: MouseEvent) => this.tilburgItemClick.emit({ item, event })}
      >
        {item.label}
      </a>
    );
  }

  render() {
    const items = this.items ?? [];
    if (!items.length) return null;
    return (
      <nav
        class="utrecht-sidenav utrecht-sidenav--pseudo-elements"
        aria-label={this.inherited['aria-label'] ?? 'Submenu'}
      >
        <ul class="utrecht-sidenav__list">
          {items.map((item, index) => {
            const children = item.children ?? [];
            return (
              <li
                key={`${item.label ?? ''}-${index}`}
                class={{ 'utrecht-sidenav__item': true, 'utrecht-sidenav__item--last': index === items.length - 1 }}
              >
                {this.link(item, {
                  'utrecht-sidenav__link': true,
                  'utrecht-sidenav__link--current': !!item.current,
                  'utrecht-sidenav__link--parent': children.length > 0,
                })}
                {children.length > 0 && (
                  <ul class="utrecht-sidenav__list utrecht-sidenav__list--child">
                    {children.map((child) => (
                      <li class="utrecht-sidenav__item utrecht-sidenav__item--child">
                        {this.link(child, {
                          'utrecht-sidenav__link utrecht-sidenav__link--child': true,
                          'utrecht-sidenav__link--current utrecht-sidenav__link--current-child': !!child.current,
                        })}
                      </li>
                    ))}
                  </ul>
                )}
                <div class="utrecht-sidenav__item-separator"></div>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}
