import { Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-button-group',
  templateUrl: 'index.html',
  styles: [':host { display: block; }'],
  // A static `role="…"` on the tag is also written onto the host; drop it so only the inner div has the role.
  host: { '[attr.role]': 'null' },
  standalone: false,
})
export class TilburgButtonGroup {
  @Input() role: string = 'group';
  @Input() ariaLabel?: string;
  @Input() ariaLabelledBy?: string;
  /** @deprecated Use `ariaLabelledBy` (same casing as the form controls). */
  @Input() ariaLabelledby?: string;
  constructor() {}
}
