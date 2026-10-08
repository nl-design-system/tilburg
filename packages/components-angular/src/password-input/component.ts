import { AfterViewChecked, Component, ElementRef, HostBinding, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { setNativeAttributes } from '../utils/native-attributes';

let nextId = 0;

/** A password textbox with a show/hide toggle (Tilburg component, bq-tlb-frontend TIL-72). */
@Component({
  selector: 'tilburg-password-input',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgPasswordInput implements AfterViewChecked {
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
  @Input() ariaLabel?: string;
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

  // `read: ElementRef`: the utrecht textbox is a component, so a bare `#input` would resolve to its instance.
  @ViewChild('input', { read: ElementRef }) private input?: ElementRef<HTMLInputElement>;

  /** The utrecht directive's host binding strips `name` (no autofill for password managers); write it back. */
  ngAfterViewChecked(): void {
    setNativeAttributes(this.input?.nativeElement, { name: this.name });
  }

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
