import { Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-button-group',
  templateUrl: 'index.html',
  styles: [':host { display: block; }'],
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
