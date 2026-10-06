import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface TilburgSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'tilburg-select',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgSelect {
  @Input() id?: string = undefined;

  /** The id belongs on the inner native control, so `<label for>` resolves to it; strip it from the host so it is not
   *  on the page twice (same approach as `TilburgCombobox`). */
  @HostBinding('attr.id') readonly hostId: null = null;

  /** Reactive-forms binding. Without it, use `value` and `(valueChange)`. */
  @Input() control?: FormControl;
  @Input() options: TilburgSelectOption[] = [];
  /** The selected value when there is no `control`. */
  @Input() value?: string;
  /** Text of an empty first option (value `""`), e.g. "Maak een keuze". */
  @Input() placeholder?: string;
  @Input() name?: string;
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() required = false;
  @Input() ariaLabel?: string;
  @Input() ariaLabelledBy?: string;
  @Input() ariaDescribedBy?: string;

  @Output() valueChange = new EventEmitter<string>();

  get isDisabled(): boolean {
    return this.control ? this.control.disabled : this.disabled;
  }

  onChange(event: Event) {
    this.value = (event.target as HTMLSelectElement).value;
    this.valueChange.emit(this.value);
  }
}
