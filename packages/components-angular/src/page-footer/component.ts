import { Component, Input } from '@angular/core';

export interface TilburgPageFooterLink {
  label: string;
  href: string;
}

@Component({
  selector: 'tilburg-page-footer',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgPageFooter {
  @Input() ariaLabel?: string | null;
  @Input() links: TilburgPageFooterLink[] = [];
  @Input() primaryLink?: TilburgPageFooterLink | null;
}
