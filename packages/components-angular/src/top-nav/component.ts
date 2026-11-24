import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface TilburgTopNavItem {
  label: string | null | undefined;
  href?: string | null;
  current?: boolean;
  data?: unknown;
}

@Component({
  selector: 'tilburg-top-nav',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgTopNav {
  @Input() ariaLabel: string | null | undefined = 'Hoofdmenu';
  @Input() items: TilburgTopNavItem[] | null | undefined = [];
  @Output() itemClick = new EventEmitter<{ item: TilburgTopNavItem; event: MouseEvent }>();
}
