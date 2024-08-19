import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'tilburg-form-field',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
})
export class TilburgFormField {
  @Input() formContext!: FormControl;
  @Input() label?: string;
  @Input() invalid?: boolean = false;
  @Input() type?: 'checkbox' | 'radio' | 'text';
  @Input() class?: string;
  constructor() {}
}
