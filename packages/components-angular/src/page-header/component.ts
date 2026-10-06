import { Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-page-header',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgPageHeader {
  @Input() logoSrc?: string | null;
  /** Defaults to "Gemeente Tilburg" when there is no title: the logo is then the link's only content (TIL-89). */
  @Input() logoAlt = '';
  @Input() title?: string | null;
  @Input() titleHref?: string | null;
  @Input() ariaLabel?: string | null;
}
