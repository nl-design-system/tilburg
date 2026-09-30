import { Component, HostBinding, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  // Case-insensitive variant `input[type="radio" i]` does not appear to work in Angular
  selector: 'tilburg-radio-button',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgRadioButton {
  @Input() id?: string = undefined;

  /** The id belongs on the inner native control, so `<label for>` resolves to it; strip it from the host so it is not
   *  on the page twice (same approach as `TilburgCombobox`). */
  @HostBinding('attr.id') readonly hostId: null = null;

  @Input() ariaLabel: string = '';
  @Input() ariaLabelledBy?: string;
  @Input() ariaDescribedBy?: string;
  @Input() name: string = '';
  @Input() value: any;
  @Input() control!: FormControl;
  @Input() invalid: boolean = false;
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() checked: boolean = false;

  constructor() {}
}
