import { Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-fieldset',
  templateUrl: 'index.html',
  standalone: false,
})
export class TilburgFieldset {
  @Input() disabled?: boolean = false;
  @Input() invalid?: boolean = false;
  @Input() ariaLabel?: string;
  @Input() ariaLabelledby?: string;
  @Input() ariaDescribedBy?: string;
  constructor() {}
}
