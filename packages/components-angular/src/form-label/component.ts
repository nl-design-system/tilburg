import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'tilburg-form-label',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  /* `encapsulation: None`: the components-css rules that space this label from the control after it, and lay out a
     label wrapping a checkbox/radio host, key on elements outside this template (the next sibling of the host, the
     projected control host), which emulated encapsulation would scope away. */
  encapsulation: ViewEncapsulation.None,
  standalone: false,
})
export class TilburgFormLabel {
  @Input() for?: string;
  @Input() checked?: boolean = false;
  @Input() type?: 'checkbox' | 'radio' | 'text';
  @Input() disabled?: boolean = false;
}
