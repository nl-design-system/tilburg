import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'tilburg-fieldset',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
})
export class TilburgFieldset {
  @Input() textContent?: string;
  @Input() formContext?: FormControl;
  @Input() disabled?: boolean = false;
  @Input() invalid?: boolean = false;
  constructor() {}
}
