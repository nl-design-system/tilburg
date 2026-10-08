import { Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-table',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgTable {
  @Input() caption?: string;
  @Input() ariaLabel?: string;
  @Input() ariaLabelledBy?: string;
  /** @deprecated Use `ariaLabelledBy` (same casing as the form controls). */
  @Input() ariaLabelledby?: string;
  @Input() ariaDescribedBy?: string;
}
