import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'tilburg-form-field',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TilburgFormField {
  @Input() formContext?: FormControl;
  @Input() invalid?: boolean = false;
  @Input() type?: 'checkbox' | 'radio' | 'text';
  @Input() class?: string;
  constructor() {}
}
