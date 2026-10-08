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
  selector: 'tilburg-textarea',
  templateUrl: './index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgTextarea implements AfterViewChecked {
  @Input() id?: string = undefined;

  /** The id belongs on the inner native control, so `<label for>` resolves to it; strip it from the host so it is not
   *  on the page twice (same approach as `TilburgCombobox`). */
  @HostBinding('attr.id') readonly hostId: null = null;

  @Input() dir = '';
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() required = false;
  @Input() readonly = false;
  /** Reactive-forms binding. Without it, the textarea is a plain field driven by `disabled`. */
  @Input() control?: FormControl;
  @Input() name?: string;
  @Input() placeholder?: string;
  /** Minimum height in lines (default 4); the field grows to 8 lines (or `rows`, if larger) before it scrolls. */
  @Input() rows?: number;
  @Input() cols?: number;
  @Input() ariaLabel?: string = '';
  @Input() ariaLabelledBy?: string;
  @Input() ariaDescribedBy?: string;
  @Input() autocomplete?: string;

  /** `blur`/`focus` do not bubble, so a listener on `<tilburg-textarea>` itself never fires; these re-emit them. */
  @Output() blur = new EventEmitter<FocusEvent>();
  @Output() focus = new EventEmitter<FocusEvent>();

  // `read: ElementRef`: the utrecht textarea is a component, so a bare `#textarea` would resolve to its instance.
  @ViewChild('textarea', { read: ElementRef }) private textarea?: ElementRef<HTMLTextAreaElement>;

  ngAfterViewChecked(): void {
    setNativeAttributes(this.textarea?.nativeElement, { name: this.name, dir: this.dir });
  }
}
