/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';

export interface TilburgWbcNavListItem {
  label: string | null | undefined;
  href?: string | null;
  current?: boolean;
  data?: unknown;
}

export interface TilburgWbcNavListItemClickDetail {
  item: TilburgWbcNavListItem;
  event: MouseEvent;
}

@Component({
  tag: 'tilburg-wbc-nav-list',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcNavList {
  /** The links. JS property only (no attribute). Nothing is rendered for an empty array. */
  @Prop() items: TilburgWbcNavListItem[] | null | undefined = [];

  /** Spread the items evenly over the full width (`utrecht-nav-list--center`). */
  @Prop() center = false;

  /** Fired when a link is clicked, with the item and the native click event. */
  @Event() tilburgItemClick!: EventEmitter<TilburgWbcNavListItemClickDetail>;

  render() {
    const items = this.items ?? [];
    if (!items.length) return null;
    return (
      <ul class={{ 'utrecht-nav-list': true, 'utrecht-nav-list--center': this.center }} role="list">
        {items.map((item, index) => (
          <li key={`${item.label ?? ''}-${index}`} class="utrecht-nav-list__item">
            <a
              class={{
                'utrecht-link utrecht-link--html-a utrecht-nav-list__link': true,
                'utrecht-link--current': !!item.current,
              }}
              href={item.href || '#'}
              aria-current={item.current ? 'page' : undefined}
              onClick={(event: MouseEvent) => this.tilburgItemClick.emit({ item, event })}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    );
  }
}
