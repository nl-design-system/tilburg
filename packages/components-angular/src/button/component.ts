import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'tilburg-button',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgButton {
  @Input() appearance = 'primary-action-button';
  @Input() size = 'medium';
  @Input() type = 'button';
  @Input() disabled = false;
  /** @deprecated Has no effect; use `size="small"`. */
  @Input() small = false;
  @Input() title? = '';
  /** `title` is an input here, but a static `title="…"` would also land on the host element as the native
   *  attribute (a browser tooltip and an extra accessible description). Keep it off the host. */
  @HostBinding('attr.title') readonly hostTitle = null;
  @Input() ariaLabel?: string;
  @Input() ariaDescribedBy?: string;
  @Input() pressed?: boolean;
}
