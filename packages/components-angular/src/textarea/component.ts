import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'tilburg-textarea',
  templateUrl: './index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgTextarea {
  @Input() id?: string = undefined;
  @Input() dir = '';
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() required = false;
  @Input() readonly = false;
  @Input() control!: FormControl;
  @Input() placeholder?: string;
  @Input() rows?: number;
  @Input() cols?: number;
  @Input() ariaLabel?: string = '';
  @Input() ariaDescribedBy?: string;
  constructor() {}
}
