import { Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-fieldset',
  templateUrl: 'index.html',
  standalone:false
})
export class TilburgFieldset {
  @Input() disabled?: boolean = false;
  @Input() invalid?: boolean = false;
  constructor() {}
}
