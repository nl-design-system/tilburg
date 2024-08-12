import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  // Case-insensitive variant `input[type="radio" i]` does not appear to work in Angular
  selector: 'tilburg-radio-button',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
})
export class TilburgRadioButton {
  @Input() formContext?: FormControl;
  @Input() invalid?: boolean = false;
  @Input() disabled?: boolean = false;
  constructor() {}
}
