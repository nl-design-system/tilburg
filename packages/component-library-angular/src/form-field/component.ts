import { Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-form-field',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
})
export class TilburgFormField {
  @Input() invalid?: boolean = false;
  @Input() type?: 'checkbox' | 'radio' | 'text';
  @Input() class?: string;
  constructor() {
    console.log('TilburgFormField');
  }
}
