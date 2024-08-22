import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'tilburg-textarea',
  template: '',
  styleUrls: ['index.scss'],
  // host: {
  //   '[attr.aria-invalid]': 'invalid || undefined',
  //   '[attr.dir]': 'dir || "auto"',
  //   '[attr.name]': 'name || null',
  //   '[attr.readonly]': 'readonly || null',
  //   '[class.utrecht-textarea--disabled]': 'disabled',
  //   '[class.utrecht-textarea--html-textarea]': 'true',
  //   '[class.utrecht-textarea--invalid]': 'invalid',
  //   '[class.utrecht-textarea--readonly]': 'readonly',
  //   '[class.utrecht-textarea--required]': 'required',
  //   '[class.utrecht-textarea--url]': 'type === "email" || type === "url"',
  //   '[class.utrecht-textarea]': 'true',
  //   '[attr.disabled]': 'disabled ? "disabled": null',
  //   '[attr.required]': 'required ? "required": null',
  // },
})
export class TilburgTextarea {
  @Input() formContext?: FormControl;
  @Input() dir = '';
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() required = false;
  @Input() readonly = false;
  constructor() {}
}
