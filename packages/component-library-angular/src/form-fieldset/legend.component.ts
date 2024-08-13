import { Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-fieldset-legend',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
})
export class TilburgFieldsetLegend {
  @Input() textContent?: string;
  @Input() disabled?: boolean = false;
  @Input() invalid?: boolean = false;
  constructor() {}
}
