import { Component, Input } from '@angular/core';
import { AriaCurrent } from '../link/component';

export interface TilburgLinkListLink {
  label: string;
  href: string;
  /** Adds `rel="external noopener noreferrer"`. */
  external?: boolean;
  /** Rendered as `aria-current`. */
  current?: AriaCurrent;
}

@Component({
  selector: 'tilburg-link-list',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgLinkList {
  @Input() links: TilburgLinkListLink[] | null | undefined = [];
  @Input() ariaLabel?: string;
  @Input() ariaLabelledBy?: string;
}
