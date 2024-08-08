import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  // Case-insensitive variant `input[type="radio" i]` does not appear to work in Angular
  selector: 'input[type="radio"][tilburg-radio-button]',
  template: '',
  styleUrls: ['index.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[attr.aria-invalid]': 'invalid || undefined',
    '[attr.disabled]': 'disabled || null',
    '[attr.aria-disabled]': 'disabled || undefined',
    '[class.utrecht-radio-button--invalid]': 'invalid',
    '[class.utrecht-radio-button--html-input]': 'true',
    '[class.utrecht-radio-button]': 'true',
  },
})
export class TilburgRadioButtonAttr {
  @Input() formContext?: FormControl;
  @Input() invalid?: boolean = false;
  @Input() disabled?: boolean = false;
  constructor() {}
}
