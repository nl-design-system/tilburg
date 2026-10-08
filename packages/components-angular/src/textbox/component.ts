import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { setNativeAttributes } from '../utils/native-attributes';

@Component({
  selector: 'tilburg-textbox',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgTextbox implements AfterViewChecked {
  @Input() id?: string = undefined;

  /** The id belongs on the inner native control, so `<label for>` resolves to it; strip it from the host so it is not
   *  on the page twice (same approach as `TilburgCombobox`). */
  @HostBinding('attr.id') readonly hostId: null = null;

  /** Reactive-forms binding. Without it, the textbox is a plain input driven by `disabled`. */
  @Input() control?: FormControl;
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() required = false;
  @Input() readonly = false;

  @Input() dir?: string;
  @Input() inputMode?: string;
  @Input() type?: string;
  @Input() name?: string;
  @Input() placeholder?: string;

  @Input() ariaLabel?: string = '';
  @Input() ariaLabelledBy?: string;
  @Input() ariaDescribedBy?: string;
  @Input() autocomplete?: string;

  /** `blur`/`focus` do not bubble, so a listener on `<tilburg-textbox>` itself never fires; these re-emit them. */
  @Output() blur = new EventEmitter<FocusEvent>();
  @Output() focus = new EventEmitter<FocusEvent>();

  // `read: ElementRef`: the utrecht textbox is a component, so a bare `#input` would resolve to its instance.
  @ViewChild('input', { read: ElementRef }) private input?: ElementRef<HTMLInputElement>;

  ngAfterViewChecked(): void {
    setNativeAttributes(this.input?.nativeElement, {
      name: this.name,
      dir: this.dir,
      inputmode: this.inputMode,
    });
  }
}
