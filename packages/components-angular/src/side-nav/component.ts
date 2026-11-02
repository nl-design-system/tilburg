import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface TilburgSideNavItem {
  label: string | null | undefined;
  href?: string | null;
  current?: boolean;
  data?: unknown;
  /** One nested level; children of children are not rendered. */
  children?: TilburgSideNavItem[];
}

@Component({
  selector: 'tilburg-side-nav',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgSideNav {
  @Input() ariaLabel: string | null | undefined = 'Submenu';
  @Input() items: TilburgSideNavItem[] | null | undefined = [];
  @Output() itemClick = new EventEmitter<{ item: TilburgSideNavItem; event: MouseEvent }>();
}
