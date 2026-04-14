import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'tilburg-textbox',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone:false
})
export class TilburgTextbox {
  @Input() id?: string = undefined;
  @Input() control!: FormControl;
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() required = false;
  @Input() readonly = false;

  @Input() dir?;
  @Input() inputMode?;
  @Input() type?;
  @Input() name?;

  @Input() ariaLabel?: string = '';

  constructor() {}
}
