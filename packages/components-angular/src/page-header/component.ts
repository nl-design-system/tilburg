import { Component, HostBinding, Input } from '@angular/core';

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
  /** `title` is an input here, but a static `title="…"` would also land on the host element as the native
   *  attribute (a browser tooltip and an extra accessible description). Keep it off the host. */
  @HostBinding('attr.title') readonly hostTitle = null;
  @Input() titleHref?: string | null;
  @Input() ariaLabel?: string | null;
}
