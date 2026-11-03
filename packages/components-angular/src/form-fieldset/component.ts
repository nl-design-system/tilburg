import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'tilburg-fieldset',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
  /* The legend rule (`.utrecht-fieldset > legend` in components-css/form-fieldset) must reach the projected legend, which emulated encapsulation would scope away. */
  encapsulation: ViewEncapsulation.None,
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
