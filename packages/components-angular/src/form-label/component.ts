import { Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-form-label',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgFormLabel {
  @Input() for?: string;
  @Input() checked?: boolean = false;
  @Input() type?: 'checkbox' | 'radio' | 'text';
  @Input() disabled?: boolean = false;
}
