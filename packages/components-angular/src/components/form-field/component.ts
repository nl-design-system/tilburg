import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'tilburg-form-field',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TilburgFormField {
  @Input() invalid?: boolean = false;
  @Input() type?: 'checkbox' | 'radio' | 'text';
  @Input() class?: string;
  constructor() {}
}
