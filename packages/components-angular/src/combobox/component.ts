import {
  Component,
  computed,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  signal,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';

/* eslint-disable-next-line no-unused-vars -- `item` is the callback param in a
   function-type alias; it has no body, so ESLint's no-unused-vars false-positives. */
type LabelFn<T> = string | ((item: T) => string);
/* eslint-disable-next-line no-unused-vars */
type ValueFn<T> = string | ((item: T) => unknown);

let nextUniqueId = 0;

/**
 * Tilburg combobox — vanilla composite over the WAI-ARIA combobox pattern.
 *
 * Renders the same DOM as the HTML/CSS reference in
 * `packages/storybook-shared/src/tilburg-combobox.examples.ts`, so the
 * styling in `@gemeente-tilburg/components-css/combobox` applies as-is.
 *
 * Two visual modes share the same outer shell:
 *  - Normal (`multiple=false`): single-line text input + chevron.
 *  - Chiplist (`multiple=true`): selected options render inline as chips
 *    inside the host before the input.
 */
@Component({
  selector: 'tilburg-combobox',
  templateUrl: 'index.html',
  /* No `styleUrls` and `encapsulation: None`: the combobox SCSS is already
     imported globally via the consuming app's stylesheet
     (`storybook-angular/src/styles.scss` and the React/HTML preview); pulling
     it in again through `styleUrls` injected a second `<style>` block whose
     duplicate rules sat AFTER the global ones in the cascade. The duplicate
     was bundled at the time the components-angular `dist/` was built, so it
     was always one revision behind the live SCSS — that's why hover beat the
     open-state rule even after the gating was fixed, and why the listbox kept
     its 4px `padding-block` after we set it to 0. */
  encapsulation: ViewEncapsulation.None,
  standalone: false,
})
export class TilburgCombobox<T = unknown> {
  /** Per-instance fallback id so two instances on the same page never
   *  collide when the consumer omits `[id]`. Each instance gets a fresh
   *  `tilburg-combobox-<n>` so the listbox + option ids derived from it
   *  remain unique across the document (WCAG: every id used in ARIA must
   *  be unique). */
  private readonly _uniqueId = `tilburg-combobox-${++nextUniqueId}`;

  @Input() id?: string;
  get internalId(): string {
    return this.id ?? this._uniqueId;
  }

  /** The consumer's `<tilburg-combobox id="…">` sets the id both on the
   *  custom-element host and (via the `internalId` binding) on the inner
   *  `<input role="combobox">`. The id needs to live on the input so the
   *  label's `for=…` resolves — but having it on the host as well violates
   *  "every id is unique on the page" (WCAG 4.1.1). Strip it from the host. */
  @HostBinding('attr.id') readonly hostId: null = null;
  @Input() control!: FormControl;
  @Input() items: T[] = [];
  @Input() bindLabel: LabelFn<T> = 'displayValue';
  @Input() bindValue: ValueFn<T> = 'value';
  @Input() multiple = false;
  @Input() placeholder?: string;
  @Input() disabled = false;
  @Input() clearable = false;
  @Input() invalid = false;
  @Input() required = false;
  @Input() ariaLabel?: string;
  @Input() ariaDescribedBy?: string;
  /** Reserved for a future cut. Always treated as `false` in v1. */
  @Input() searchable = false;
  /** Reserved for a future cut. Always treated as `false` in v1. */
  @Input() loading = false;

  @Output() change = new EventEmitter<unknown>();

  @ViewChild('inputEl', { static: true }) inputEl!: ElementRef<HTMLInputElement>;

  readonly isOpen = signal(false);
  readonly activeIndex = signal(-1);

  readonly listboxId = computed(() => `${this.internalId}-listbox`);
  readonly optionId = (index: number) => `${this.internalId}-opt-${index}`;

  /** Items, normalised for rendering. */
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

  /** Current control value, normalised to an array. */
  selectedValues(): unknown[] {
    const v = this.control?.value;
    if (v === null || v === undefined) return [];
    return Array.isArray(v) ? v : [v];
  }

  isSelected(item: T): boolean {
    return this.selectedValues().includes(this.getValue(item));
  }

  /** For chiplist rendering: the items that are currently selected, in order. */
  get selectedItems(): T[] {
    const values = this.selectedValues();
    return values
      .map((v) => this.items.find((item) => this.getValue(item) === v))
      .filter((item): item is T => item !== undefined);
  }

  /** Whether the control currently holds at least one value (single or multi).
   *  Drives the optional clear-all `×` button: it shows in single mode when a
   *  value is set, and in multi mode when at least one chip is present. */
  hasValue(): boolean {
    const v = this.control?.value;
    if (v === null || v === undefined || v === '') return false;
    return Array.isArray(v) ? v.length > 0 : true;
  }

  /** Display value for the single-mode input. */
  get displayValue(): string {
    if (this.multiple) return '';
    const selected = this.items.find((item) => this.getValue(item) === this.control?.value);
    return selected ? this.getLabel(selected) : '';
  }

  open(): void {
    if (this.disabled || this.control?.disabled) return;
    if (!this.isOpen()) {
      this.isOpen.set(true);
      /* No auto-mark: leave activeIndex at -1 so the freshly-opened popover
         doesn't paint a blue-400 stripe on the currently-selected option.
         The selected option still reads as "selected" via the soft blue-50
         background. The active stripe only appears once the user pointer-
         hovers or keyboard-navigates to an option. ArrowDown/ArrowUp on
         activeIndex=-1 lands on index 0, so keyboard nav still works. */
      this.activeIndex.set(-1);
    }
  }

  close(): void {
    this.isOpen.set(false);
    this.activeIndex.set(-1);
  }

  toggle(): void {
    if (this.isOpen()) this.close();
    else this.open();
  }

  /** Select the option at the given index. In multi-mode, toggles; in
   *  single-mode, replaces and closes. Emits `change`. */
  selectOption(index: number): void {
    const item = this.items[index];
    if (!item) return;
    const value = this.getValue(item);
    if (this.multiple) {
      const current = this.selectedValues();
      const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
      this.control?.setValue(next);
      this.change.emit(next);
    } else {
      this.control?.setValue(value);
      this.change.emit(value);
      this.close();
      this.inputEl.nativeElement.focus();
    }
  }

  removeChip(value: unknown, event?: Event): void {
    event?.stopPropagation();
    const next = this.selectedValues().filter((v) => v !== value);
    this.control?.setValue(next);
    this.change.emit(next);
  }

  clear(event?: Event): void {
    event?.stopPropagation();
    const next = this.multiple ? [] : null;
    this.control?.setValue(next);
    this.change.emit(next);
  }

  onInputKeydown(event: KeyboardEvent): void {
    if (this.disabled || this.control?.disabled) return;
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen()) this.open();
        else this.activeIndex.update((i) => Math.min(i + 1, this.items.length - 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!this.isOpen()) this.open();
        else this.activeIndex.update((i) => Math.max(i - 1, 0));
        break;
      case 'Home':
        if (this.isOpen()) {
          event.preventDefault();
          this.activeIndex.set(0);
        }
        break;
      case 'End':
        if (this.isOpen()) {
          event.preventDefault();
          this.activeIndex.set(this.items.length - 1);
        }
        break;
      case 'Enter':
        if (this.isOpen() && this.activeIndex() >= 0) {
          event.preventDefault();
          this.selectOption(this.activeIndex());
        }
        break;
      case 'Escape':
        if (this.isOpen()) {
          event.preventDefault();
          this.close();
        }
        break;
      case 'Backspace':
        if (this.multiple && this.inputEl.nativeElement.value === '' && this.selectedValues().length > 0) {
          const values = this.selectedValues();
          this.removeChip(values[values.length - 1]);
        }
        break;
    }
  }

  /* Close on outside click. */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isOpen()) return;
    const host = (event.target as HTMLElement).closest('tilburg-combobox');
    if (host !== this.inputEl.nativeElement.closest('tilburg-combobox')) this.close();
  }
}
