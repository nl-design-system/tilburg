import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'tilburg-table',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
  /* Not emulated: the cell, header, zebra and footer rules must reach the projected rows and cells, which emulated encapsulation would scope away. */
  encapsulation: ViewEncapsulation.None,
})
export class TilburgTable {
  @Input() caption?: string;
  @Input() ariaLabel?: string;
  @Input() ariaLabelledBy?: string;
  /** @deprecated Use `ariaLabelledBy` (same casing as the form controls). */
  @Input() ariaLabelledby?: string;
  @Input() ariaDescribedBy?: string;
}
