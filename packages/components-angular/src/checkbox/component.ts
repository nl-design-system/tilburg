import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'tilburg-checkbox',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgCheckbox {
  @Input() id?: string = undefined;

  /** The id belongs on the inner native control, so `<label for>` resolves to it; strip it from the host so it is not
   *  on the page twice (same approach as `TilburgCombobox`). */
  @HostBinding('attr.id') readonly hostId: null = null;

  @Input() control?: FormControl;
  @Input() name: string = '';
  @Input() ariaLabel: string = '';
  @Input() ariaLabelledBy?: string;
  @Input() ariaDescribedBy?: string;
  @Input() invalid?: boolean = false;
  @Input() required: boolean = false;
  @Input() disabled?: boolean = false;
  @Input() checked: boolean = false;
  @Output() checkChanged = new EventEmitter<Event>();
  onCheckChange(event: Event) {
    this.checkChanged.emit(event);
  }
}
