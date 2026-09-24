/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, Event, EventEmitter, FunctionalComponent, h, Prop, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

export type TilburgWbcPaginationStep = 'first' | 'previous' | 'next' | 'last' | 'page';

export interface TilburgWbcPaginationEvent {
  step: TilburgWbcPaginationStep;
  page?: number;
}

type PageSlot = { kind: 'page'; value: number } | { kind: 'ellipsis'; key: string };

/* Same windowing as Angular `pages` / React `computeSlots`: every page up to
   7, otherwise first + current±1 + last with leading/trailing ellipsis. */
const computeSlots = (total: number, current: number): PageSlot[] => {
  if (total <= 0) return [];
  if (total <= 7) return Array.from({ length: total }, (_, i) => ({ kind: 'page', value: i + 1 }) as PageSlot);
  const slots: PageSlot[] = [{ kind: 'page', value: 1 }];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) slots.push({ kind: 'ellipsis', key: 'lead' });
  for (let p = start; p <= end; p += 1) slots.push({ kind: 'page', value: p });
  if (end < total - 1) slots.push({ kind: 'ellipsis', key: 'trail' });
  slots.push({ kind: 'page', value: total });
  return slots;
};

const Icon: FunctionalComponent<{ points: string[] }> = ({ points }) => (
  <svg
    class="tilburg-pagination__icon"
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    {points.map((p) => (
      <polyline points={p}></polyline>
    ))}
  </svg>
);

@Component({
  tag: 'tilburg-wbc-pagination',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcPagination {
  @Element() host!: HTMLElement;

  @Prop() feedback?: string | null;
  /** Range text ("Pagina 3 van 12"), shown only when there is no page list. */
  @Prop() range?: string | null;
  @Prop() pageCount?: number | null;
  @Prop() currentPage?: number | null;
  @Prop() firstDisabled = false;
  @Prop() previousDisabled = false;
  @Prop() nextDisabled = false;
  @Prop() lastDisabled = false;
  @Prop() firstLabel = 'Eerste pagina';
  @Prop() previousLabel = 'Vorige pagina';
  @Prop() nextLabel = 'Volgende pagina';
  @Prop() lastLabel = 'Laatste pagina';
  /** Accessible name per page button. JS property only (a function). */
  @Prop() pageLabel: (n: number) => string = (n: number) => `Pagina ${n}`;

  /**
   * Navigation intent. The component is controlled: it never changes
   * `currentPage` itself. `page` is only set for numeric clicks; clicking the
   * current page fires nothing.
   */
  @Event() tilburgNavigate!: EventEmitter<TilburgWbcPaginationEvent>;

  /* `aria-label` (default `Paginering`) is written on the host and moved onto
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

  private onStep(step: TilburgWbcPaginationStep) {
    this.tilburgNavigate.emit({ step });
  }

  private onPage(page: number) {
    if (page === this.currentPage) return;
    this.tilburgNavigate.emit({ step: 'page', page });
  }

  private renderStepButton(step: TilburgWbcPaginationStep, disabled: boolean, label: string, points: string[]) {
    return (
      <button
        type="button"
        class="tilburg-pagination__button"
        disabled={disabled}
        aria-label={label}
        onClick={() => this.onStep(step)}
      >
        <Icon points={points} />
      </button>
    );
  }

  render() {
    const pages = computeSlots(this.pageCount ?? 0, this.currentPage ?? 1);
    return (
      <nav class="tilburg-pagination" aria-label={this.inherited['aria-label'] || 'Paginering'}>
        {this.feedback && <div class="tilburg-pagination__feedback">{this.feedback}</div>}
        <div class="tilburg-pagination__controls">
          {this.renderStepButton('first', this.firstDisabled, this.firstLabel, ['11 17 6 12 11 7', '18 17 13 12 18 7'])}
          {this.renderStepButton('previous', this.previousDisabled, this.previousLabel, ['15 18 9 12 15 6'])}
          {pages.length ? (
            <ul class="tilburg-pagination__pages">
              {pages.map((slot) => {
                if (slot.kind === 'ellipsis') {
                  return (
                    <li key={`e-${slot.key}`}>
                      <span class="tilburg-pagination__ellipsis" aria-hidden="true">
                        …
                      </span>
                    </li>
                  );
                }
                const current = slot.value === this.currentPage;
                return (
                  <li key={`p-${slot.value}`}>
                    <button
                      type="button"
                      class={{ 'tilburg-pagination__page': true, 'tilburg-pagination__page--current': current }}
                      aria-current={current ? 'page' : undefined}
                      aria-label={this.pageLabel(slot.value)}
                      disabled={current}
                      onClick={() => this.onPage(slot.value)}
                    >
                      {slot.value}
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            this.range && <div class="tilburg-pagination__range">{this.range}</div>
          )}
          {this.renderStepButton('next', this.nextDisabled, this.nextLabel, ['9 18 15 12 9 6'])}
          {this.renderStepButton('last', this.lastDisabled, this.lastLabel, ['13 17 18 12 13 7', '6 17 11 12 6 7'])}
        </div>
      </nav>
    );
  }
}
