import { Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-fieldset',
  templateUrl: 'index.html',
})
export class TilburgFieldset {
  @Input() disabled?: boolean = false;
  @Input() invalid?: boolean = false;
  constructor() {}
}
