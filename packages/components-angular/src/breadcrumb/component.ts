import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface TilburgBreadcrumbItem {
  label: string | null | undefined;
  href?: string | null;
  current?: boolean;
  data?: unknown;
}

@Component({
  selector: 'tilburg-breadcrumb',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgBreadcrumb {
  @Input() ariaLabel: string | null | undefined = 'Kruimelpad';
  @Input() items: TilburgBreadcrumbItem[] | null | undefined = [];
  @Output() itemClick = new EventEmitter<{
    item: TilburgBreadcrumbItem;
    event: MouseEvent;
  }>();

  onClick(item: TilburgBreadcrumbItem, event: MouseEvent): void {
    this.itemClick.emit({ item, event });
  }

  trackByLabel(_: number, item: TilburgBreadcrumbItem): string {
    return item.label ?? '';
  }
}
