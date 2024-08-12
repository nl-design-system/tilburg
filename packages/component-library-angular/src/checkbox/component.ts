import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  // Case-insensitive variant `input[type="checkbox" i]` does not appear to work in Angular
  selector: 'tilburg-checkbox',
  template: '',
  styleUrls: ['index.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[attr.aria-invalid]': 'invalid || undefined',
    '[attr.aria-required]': 'required && noValidate || undefined',
    '[attr.required]': 'required && !noValidate ? "required": null',
    '[attr.disabled]': 'disabled ? "disabled": null',
    '[attr.checked]': 'checked ? "checked": null',
    '[class.utrecht-checkbox--invalid]': 'invalid',
    '[class.utrecht-checkbox--html-input]': 'true',
    '[class.utrecht-checkbox--custom]': 'appearance === "custom"',
    '[class.utrecht-checkbox]': 'true',
  },
})
export class TilburgCheckboxAttr {
  @Input() formContext?: FormControl;
  @Input() invalid = false;
  @Input() disabled = false;
  @Input() checked = false;
  @Input() required = false;
  @Input() noValidate: boolean = false;
  @Input() appearance?: string = 'custom';
  constructor() {}
}