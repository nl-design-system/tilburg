import { Component, EventEmitter, Input, Output } from '@angular/core';

export type TilburgPaginationStep = 'first' | 'previous' | 'next' | 'last' | 'page';

export interface TilburgPaginationEvent {
  step: TilburgPaginationStep;
  page?: number;
}

type PageSlot = { kind: 'page'; value: number } | { kind: 'ellipsis'; key: string };

@Component({
  selector: 'tilburg-pagination',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgPagination {
  @Input() ariaLabel: string | null | undefined = 'Paginering';
  @Input() feedback?: string | null;
  @Input() range?: string | null;
  @Input() pageCount: number | null | undefined;
  @Input() currentPage: number | null | undefined;
  @Input() firstDisabled = false;
  @Input() previousDisabled = false;
  @Input() nextDisabled = false;
  @Input() lastDisabled = false;
  @Input() firstLabel = 'Eerste pagina';
  @Input() previousLabel = 'Vorige pagina';
  @Input() nextLabel = 'Volgende pagina';
  @Input() lastLabel = 'Laatste pagina';
  @Input() pageLabel = (n: number): string => `Pagina ${n}`;

  @Output() navigate = new EventEmitter<TilburgPaginationEvent>();

  get pages(): PageSlot[] {
    const total = this.pageCount ?? 0;
    const current = this.currentPage ?? 1;
    if (total <= 0) {
      return [];
    }
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => ({ kind: 'page', value: i + 1 }) as PageSlot);
    }
    const slots: PageSlot[] = [{ kind: 'page', value: 1 }];
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    if (start > 2) {
      slots.push({ kind: 'ellipsis', key: 'lead' });
    }
    for (let p = start; p <= end; p += 1) {
      slots.push({ kind: 'page', value: p });
    }
    if (end < total - 1) {
      slots.push({ kind: 'ellipsis', key: 'trail' });
    }
    slots.push({ kind: 'page', value: total });
    return slots;
  }

  onStep(step: TilburgPaginationStep): void {
    this.navigate.emit({ step });
  }

  onPage(page: number): void {
    if (page === this.currentPage) {
      return;
    }
    this.navigate.emit({ step: 'page', page });
  }

  isCurrent(page: number): boolean {
    return page === this.currentPage;
  }
}
