import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'tilburg-checkbox',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
})
export class TilburgCheckboxAttr {
  @Input() formContext?: FormControl;
  @Input() invalid?: boolean = false;
  @Input() disabled?: boolean = false;
  constructor() {}
}
