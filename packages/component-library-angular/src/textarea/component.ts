import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'tilburg-textarea',
  templateUrl: './index.html',
  styleUrls: ['index.scss'],
})
export class TilburgTextarea {
  @Input() dir = '';
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() required = false;
  @Input() readonly = false;
  @Input() formContext!: FormControl;
  constructor() {}
}
