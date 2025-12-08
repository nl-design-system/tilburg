import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  // Case-insensitive variant `input[type="radio" i]` does not appear to work in Angular
  selector: 'tilburg-radio-button',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone:false
})
export class TilburgRadioButton {
  @Input() id?: string = undefined;
  @Input() ariaLabel: string = '';
  @Input() name: string = '';
  @Input() value: any;
  @Input() control!: FormControl;
  @Input() invalid: boolean = false;
  @Input() disabled: boolean = false;
  @Input() checked: boolean = false;

  constructor() {}
  mouseUp(event: MouseEvent) {
    (event.target as HTMLInputElement).classList.remove('tilburg-radio-pressed');
  }
  mouseDown(event: MouseEvent) {
    (event.target as HTMLInputElement).classList.add('tilburg-radio-pressed');
  }
}
