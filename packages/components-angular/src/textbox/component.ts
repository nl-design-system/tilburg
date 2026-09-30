import { Component, HostBinding, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'tilburg-textbox',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgTextbox {
  @Input() id?: string = undefined;

  /** The id belongs on the inner native control, so `<label for>` resolves to it; strip it from the host so it is not
   *  on the page twice (same approach as `TilburgCombobox`). */
  @HostBinding('attr.id') readonly hostId: null = null;

  @Input() control!: FormControl;
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() required = false;
  @Input() readonly = false;

  @Input() dir?;
  @Input() inputMode?;
  @Input() type?;
  @Input() name?;
  @Input() placeholder?: string;

  @Input() ariaLabel?: string = '';
  @Input() ariaLabelledBy?: string;
  @Input() ariaDescribedBy?: string;
  @Input() autocomplete?: string;

  constructor() {}
}
