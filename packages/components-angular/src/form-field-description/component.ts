import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'tilburg-form-field-description',
  templateUrl: 'index.html',
  styles: [':host { display: block; }'],
  standalone: false,
})
export class TilburgFormFieldDescription {
  @Input() id?: string;
  @Input() formContext?: FormControl;
  @Input() invalid?: boolean = false;
  @Input() valid?: boolean = false;
  @Input() warning?: boolean = false;
  @Input() class?: string;
  constructor() {}
}
