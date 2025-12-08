import { Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-form-label',
  templateUrl: 'index.html',
  standalone:false
})
export class TilburgFormLabel {
  @Input() for?: string = undefined;
  @Input() checked?: boolean = false;
  @Input() type?: 'checkbox' | 'radio' | 'text';
  @Input() disabled?: boolean = false;
  constructor() {}
}
