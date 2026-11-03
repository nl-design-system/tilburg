import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';

type LabelFn<T> = string | ((item: T) => string);
type ValueFn<T> = string | ((item: T) => unknown);

let nextUniqueId = 0;

/**
 * Standalone WAI-ARIA listbox. Same data API as `TilburgCombobox` (`items`, `bindLabel`, `bindValue`, `control`).
 * Focus stays on the `role="listbox"` element; `aria-activedescendant` and `data-active` mark the active option (the
 * combobox convention, so the combobox option styling applies).
 */
@Component({
  selector: 'tilburg-listbox',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgListbox<T = unknown> implements OnChanges {
  private readonly uniqueId = `tilburg-listbox-${++nextUniqueId}`;

  /** Goes on the `role="listbox"` element; the option ids derive from it. Generated when unset. */
  @Input() id?: string;
  get internalId(): string {
    return this.id || this.uniqueId;
  }

  /** Strip the id from the host so it is not on the page twice (same approach as `TilburgCombobox`). */
  @HostBinding('attr.id') readonly hostId: null = null;

  /** Holds the selection: one value, or an array when `multiple`. */
  @Input() control?: FormControl;
  /** The selection when there is no `control`; updated on every selection. */
  @Input() value: unknown = null;
  @Input() items: T[] = [];
  @Input() bindLabel: LabelFn<T> = 'displayValue';
  @Input() bindValue: ValueFn<T> = 'value';
  @Input() multiple = false;
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() required = false;
  @Input() ariaLabel?: string;
  @Input() ariaLabelledBy?: string;
  @Input() ariaDescribedBy?: string;

  /** Emits the new value after every selection change. */
  @Output() valueChange = new EventEmitter<unknown>();

  readonly activeIndex = signal(-1);
  readonly optionId = (index: number) => `${this.internalId}-opt-${index}`;

  constructor(private readonly host: ElementRef<HTMLElement>) {}

  /* Keep `aria-activedescendant` on an option that still exists when `items` shrinks. */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) this.activeIndex.set(Math.min(this.activeIndex(), this.items.length - 1));
  }

  getLabel(item: T): string {
    const b = this.bindLabel;
    if (typeof b === 'function') return b(item);
    return String((item as Record<string, unknown>)[b] ?? '');
  }

  getValue(item: T): unknown {
    const b = this.bindValue;
    if (typeof b === 'function') return b(item);
    return (item as Record<string, unknown>)[b];
  }

  get isDisabled(): boolean {
    return this.disabled || !!this.control?.disabled;
  }

  /** Invalid when the consumer says so, or when the control is invalid after the user has interacted with it. */
  get showInvalid(): boolean {
    return this.invalid || (!!this.control?.invalid && this.control.touched);
  }

  selectedValues(): unknown[] {
    const v = this.control ? this.control.value : this.value;
    if (v === null || v === undefined) return [];
    return Array.isArray(v) ? v : [v];
  }

  isSelected(item: T): boolean {
    return this.selectedValues().includes(this.getValue(item));
  }

  select(index: number): void {
    const item = this.items[index];
    if (!item || this.isDisabled) return;
    const value = this.getValue(item);
    const current = this.selectedValues();
    const next = this.multiple
      ? current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
      : value;
    this.value = next;
    this.control?.setValue(next);
    this.control?.markAsDirty();
    this.valueChange.emit(next);
  }

  onOptionClick(index: number): void {
    if (this.isDisabled) return;
    this.activeIndex.set(index);
    this.select(index);
  }

  onFocus(): void {
    /* WAI-ARIA: focus lands on the first selected option, or the first option. */
    if (this.activeIndex() >= 0 || this.isDisabled || this.items.length === 0) return;
    this.activeIndex.set(
      Math.max(
        this.items.findIndex((item) => this.isSelected(item)),
        0,
      ),
    );
  }

  onBlur(): void {
    this.activeIndex.set(-1);
    this.control?.markAsTouched();
  }

  onKeydown(event: KeyboardEvent): void {
    if (this.isDisabled || this.items.length === 0) return;
    const last = this.items.length - 1;
    const moves: Record<string, number> = {
      ArrowDown: Math.min(this.activeIndex() + 1, last),
      ArrowUp: Math.max(this.activeIndex() - 1, 0),
      Home: 0,
      End: last,
    };
    if (event.key in moves) {
      event.preventDefault();
      this.activeIndex.set(moves[event.key]);
      this.host.nativeElement
        .querySelector(`[id="${this.optionId(this.activeIndex())}"]`)
        ?.scrollIntoView?.({ block: 'nearest' });
    } else if ((event.key === ' ' || event.key === 'Enter') && this.activeIndex() >= 0) {
      event.preventDefault();
      this.select(this.activeIndex());
    }
  }
}
