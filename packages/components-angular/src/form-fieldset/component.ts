import { Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-fieldset',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgFieldset {
  @Input() disabled?: boolean = false;
  @Input() invalid?: boolean = false;
  @Input() ariaLabel?: string;
  @Input() ariaLabelledBy?: string;
  /** @deprecated Use `ariaLabelledBy` (same casing as the form controls). */
  @Input() ariaLabelledby?: string;
  @Input() ariaDescribedBy?: string;
}
