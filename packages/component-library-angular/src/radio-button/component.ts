import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  // Case-insensitive variant `input[type="radio" i]` does not appear to work in Angular
  selector: 'tilburg-radio-button',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
})
export class TilburgRadioButton {
  @Input() ariaLabel: string = '';
  @Input() id?: string = undefined;
  @Input() name: string = '';
  @Input() value: any;
  @Input() control!: FormControl;
  @Input() invalid: boolean = false;
  @Input() disabled: boolean = false;
  @Input() checked: boolean = false;
  constructor() {}
}