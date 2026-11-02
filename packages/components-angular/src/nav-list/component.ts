import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface TilburgNavListItem {
  label: string | null | undefined;
  href?: string | null;
  current?: boolean;
  data?: unknown;
}

@Component({
  selector: 'tilburg-nav-list',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgNavList {
  @Input() items: TilburgNavListItem[] | null | undefined = [];
  @Input() center: boolean = false;
  @Output() itemClick = new EventEmitter<{ item: TilburgNavListItem; event: MouseEvent }>();
}
