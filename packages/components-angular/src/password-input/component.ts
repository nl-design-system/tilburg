import { Component, HostBinding, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

let nextId = 0;

/** A password textbox with a show/hide toggle (Tilburg component, bq-tlb-frontend TIL-72). */
@Component({
  selector: 'tilburg-password-input',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgPasswordInput {
  @Input() id?: string = undefined;

  /** The id belongs on the inner `<input>`, so `<label for>` resolves to it; strip it from the host. */
  @HostBinding('attr.id') readonly hostId: null = null;

  /** Reactive-forms binding. Without it, the input is a plain uncontrolled field. */
  @Input() control?: FormControl;
  @Input() name?: string;
  @Input() autocomplete?: string;
  @Input() placeholder?: string;
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() required = false;
  @Input() ariaDescribedBy?: string;
  @Input() ariaLabelledBy?: string;
  /** Label of the show/hide button; it stays the same, `aria-pressed` reports the state. */
  @Input() toggleLabel = 'Wachtwoord tonen';
  @Input() statusShown = 'Wachtwoord is zichtbaar.';
  @Input() statusHidden = 'Wachtwoord is verborgen.';

  visible = false;
  /** Empty until the first click, so nothing is announced on page load. */
  status = '';

  private readonly fallbackId = `tilburg-password-input-${++nextId}`;

  get inputId(): string {
    return this.id || this.fallbackId;
  }

  get isDisabled(): boolean {
    return this.control ? this.control.disabled : this.disabled;
  }

  toggle(): void {
    this.visible = !this.visible;
    this.status = this.visible ? this.statusShown : this.statusHidden;
  }
}
