import { Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-form-label',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
})
export class TilburgFormLabel {
  @Input() checked?: boolean = false;
  @Input() type?: 'checkbox' | 'radio' | 'text';
  @Input() disabled?: boolean = false;
  constructor() {}
}
