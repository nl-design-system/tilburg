import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  isDevMode,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'tilburg-checkbox',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgCheckbox implements OnChanges {
  @Input() id?: string = undefined;

  /** The id belongs on the inner native control, so `<label for>` resolves to it; strip it from the host so it is not
   *  on the page twice (same approach as `TilburgCombobox`). */
  @HostBinding('attr.id') readonly hostId: null = null;

  /** A boolean FormControl for this one checkbox. A group of checkboxes sharing one value (an array of the checked
   *  options) cannot use it: bind `checked` and handle `(checkChanged)` per option instead. */
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['control'] && isDevMode() && Array.isArray(this.control?.value)) {
      console.warn(
        'tilburg-checkbox: `control` holds an array. It binds one boolean; for a checkbox group use `checked` and ' +
          '`(checkChanged)` per option.',
      );
    }
  }

  onCheckChange(event: Event) {
    this.checkChanged.emit(event);
  }
}
