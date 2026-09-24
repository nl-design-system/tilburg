import { Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-page-header',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgPageHeader {
  @Input() logoSrc?: string | null;
  @Input() logoAlt = '';
  @Input() title?: string | null;
  @Input() titleHref?: string | null;
  @Input() ariaLabel?: string | null;
}
