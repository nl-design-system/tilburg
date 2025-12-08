import { Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-form-field',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone:false
})
export class TilburgFormField {
  @Input() invalid?: boolean = false;
  @Input() warning?: boolean = false;
  @Input() type?: 'checkbox' | 'radio' | 'text';
  @Input() class?: string;
}
