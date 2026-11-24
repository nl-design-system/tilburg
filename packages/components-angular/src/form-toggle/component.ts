import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

let nextUniqueId = 0;

/** A switch: a native `<input type="checkbox" role="switch">` plus the track label that draws it. Same API as
 *  `TilburgCheckbox`, so it binds to Angular forms the same way. */
@Component({
  selector: 'tilburg-form-toggle',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgFormToggle {
  private readonly uniqueId = `tilburg-form-toggle-${++nextUniqueId}`;

  /** Goes on the inner input. The track label points at it with `for`, so a unique one is generated when unset. */
  @Input() id?: string;
  get inputId(): string {
    return this.id || this.uniqueId;
  }

  /** Strip the id from the host so it is not on the page twice (same approach as `TilburgCheckbox`). */
  @HostBinding('attr.id') readonly hostId: null = null;

  /** A boolean FormControl. It owns the value and the disabled state. */
  @Input() control?: FormControl;
  @Input() name: string = '';
  @Input() ariaLabel: string = '';
  @Input() ariaLabelledBy?: string;
  @Input() ariaDescribedBy?: string;
  @Input() invalid?: boolean = false;
  @Input() required: boolean = false;
  @Input() disabled?: boolean = false;
  @Input() checked: boolean = false;
  /** Re-emits the native `change` event of the input. */
  @Output() checkChanged = new EventEmitter<Event>();
}
