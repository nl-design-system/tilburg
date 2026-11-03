import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'tilburg-form-field-description',
  templateUrl: 'index.html',
  styles: [':host { display: block; }'],
  /* The `id` moves onto the description `<div>`; keeping it on the host too would duplicate it. */
  host: { '[attr.id]': 'null' },
  standalone: false,
})
export class TilburgFormFieldDescription {
  @Input() id?: string;
  @Input() formContext?: FormControl;
  @Input() invalid?: boolean = false;
  @Input() valid?: boolean = false;
  @Input() warning?: boolean = false;
  @Input() class?: string;
  constructor() {}
}
