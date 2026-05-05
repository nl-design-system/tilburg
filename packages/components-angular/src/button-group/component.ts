import { Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-button-group',
  templateUrl: 'index.html',
  standalone: false,
})
export class TilburgButtonGroup {
  @Input() role: string = 'group';
  @Input() ariaLabel?: string;
  @Input() ariaLabelledby?: string;
  constructor() {}
}
