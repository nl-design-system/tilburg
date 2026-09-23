/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, Event, EventEmitter, h, Listen, Prop, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

export interface TilburgWbcComboboxItem<V = unknown> {
  value: V;
  label: string;
  disabled?: boolean;
}

let comboboxCount = 0;

const ClearIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const ChevronIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

/**
 * Tilburg combobox — WAI-ARIA combobox (readonly input + listbox popover).
 * Same behaviour as Angular `<tilburg-combobox>`, React `Combobox` and the
 * `components-css/combobox/index.js` enhancer, and the same DOM, so the
 * `components-css/combobox` styling applies as-is.
 *
 *  - Normal (`multiple` false): selecting replaces the value and closes.
 *  - Chiplist (`multiple` true): selecting toggles; selected options render as
 *    removable chips before the input.
 *
 * The component keeps its own `value` in sync and emits `tilburgChange` with
 * the new value (single: the item value or `null`; multiple: an array).
 */
@Component({
  tag: 'tilburg-wbc-combobox',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcCombobox {
  @Element() host!: HTMLElement;

  /** Options, set as a JS property: `{ value, label, disabled? }[]`. */
  @Prop() items: TilburgWbcComboboxItem[] = [];
  /**
   * Selected value: an item `value` (or `null`) in single mode, an array of
   * item values in multiple mode. Updated by the component on selection.
   */
  @Prop({ mutable: true }) value?: unknown;
  @Prop() multiple = false;
  @Prop() placeholder?: string;
  @Prop() disabled = false;
  /** Shows the × clear-all button while something is selected. */
  @Prop() clearable = false;
  /** Sets `aria-invalid="true"` on the input. */
  @Prop() invalid = false;
  /** Sets `aria-required="true"` on the input. */
  @Prop() required = false;
  /**
   * Form field name. When set, one hidden `<input name>` per selected value is
   * rendered so the selection is submitted with the surrounding `<form>`.
   */
  @Prop() name?: string;

  /** Fired with the new value after every selection, chip removal or clear. */
  @Event() tilburgChange!: EventEmitter<unknown>;

  @State() isOpen = false;
  @State() activeIndex = -1;

  /* `id`, `aria-label`, `aria-labelledby` and `aria-describedby` are written
     on the host and moved onto the inner `<input role="combobox">`, so
     `<label for>` resolves and the id is not duplicated. */
  @State() inherited: InheritedAttributes = {};
  private inheritor?: AttributeInheritor;
  private readonly fallbackId = `tilburg-wbc-combobox-${++comboboxCount}`;
  private inputEl?: HTMLInputElement;
  private scrolledIndex = -1;

  connectedCallback() {
    this.inheritor = inheritAttributes(
      this.host,
      ['id', 'aria-label', 'aria-labelledby', 'aria-describedby'],
      (attributes) => {
        this.inherited = attributes;
      },
    );
  }

  disconnectedCallback() {
    this.inheritor?.disconnect();
  }

  componentDidRender() {
    /* Keep the active option visible inside the scrolling popover. */
    if (!this.isOpen || this.activeIndex < 0) {
      this.scrolledIndex = -1;
      return;
    }
    if (this.activeIndex === this.scrolledIndex) return;
    this.scrolledIndex = this.activeIndex;
    const option = this.host.querySelector<HTMLElement>(`[id="${this.optionId(this.activeIndex)}"]`);
    if (option && typeof option.scrollIntoView === 'function') option.scrollIntoView({ block: 'nearest' });
  }

  /** Close on a pointer-down outside the component. */
  @Listen('mousedown', { target: 'document' })
  onDocumentMouseDown(event: MouseEvent) {
    if (!this.isOpen) return;
    const target = event.target as Node | null;
    if (target && this.host.contains(target)) return;
    this.close();
  }

  private get internalId(): string {
    return this.inherited['id'] || this.fallbackId;
  }

  private get listboxId(): string {
    return `${this.internalId}-listbox`;
  }

  private optionId(index: number): string {
    return `${this.internalId}-opt-${index}`;
  }

  private get options(): TilburgWbcComboboxItem[] {
    return Array.isArray(this.items) ? this.items : [];
  }

  /** Current value, normalised to an array. */
  private selectedValues(): unknown[] {
    const value = this.value;
    if (value === null || value === undefined || (value === '' && !this.multiple)) return [];
    return Array.isArray(value) ? value : [value];
  }

  private isSelected(item: TilburgWbcComboboxItem): boolean {
    return this.selectedValues().includes(item.value);
  }

  private setValue(next: unknown) {
    this.value = next;
    this.tilburgChange.emit(next);
  }

  private open() {
    if (this.disabled || this.isOpen) return;
    this.isOpen = true;
    /* No auto-active on open (same as Angular/React): the selected option only
       shows its "selected" tone until the user hovers or navigates. */
    this.activeIndex = -1;
  }

  private close() {
    this.isOpen = false;
    this.activeIndex = -1;
  }

  /** Next enabled option index from `from` in direction `step`, or `from` when there is none. */
  private enabledIndex(from: number, step: 1 | -1): number {
    const options = this.options;
    for (let i = from + step; i >= 0 && i < options.length; i += step) {
      if (!options[i].disabled) return i;
    }
    return from;
  }

  private selectAt(index: number) {
    const item = this.options[index];
    if (!item || item.disabled || this.disabled) return;
    if (this.multiple) {
      const current = this.selectedValues();
      this.setValue(current.includes(item.value) ? current.filter((v) => v !== item.value) : [...current, item.value]);
    } else {
      this.setValue(item.value);
      this.close();
      this.inputEl?.focus();
    }
  }

  private removeChip(value: unknown) {
    this.setValue(this.selectedValues().filter((v) => v !== value));
  }

  private readonly onToggle = () => {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
      this.inputEl?.focus();
    }
  };

  private readonly onClear = (event: MouseEvent) => {
    event.stopPropagation();
    this.setValue(this.multiple ? [] : null);
  };

  private readonly onKeyDown = (event: KeyboardEvent) => {
    if (this.disabled) return;
    const last = this.options.length;
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen) this.open();
        else this.activeIndex = this.enabledIndex(this.activeIndex, 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!this.isOpen) this.open();
        else
          this.activeIndex = this.activeIndex < 0 ? this.enabledIndex(-1, 1) : this.enabledIndex(this.activeIndex, -1);
        break;
      case 'Home':
        if (this.isOpen) {
          event.preventDefault();
          this.activeIndex = this.enabledIndex(-1, 1);
        }
        break;
      case 'End':
        if (this.isOpen) {
          event.preventDefault();
          const index = this.enabledIndex(last, -1);
          this.activeIndex = index === last ? -1 : index;
        }
        break;
      case 'Enter':
        if (this.isOpen && this.activeIndex >= 0) {
          event.preventDefault();
          this.selectAt(this.activeIndex);
        }
        break;
      case 'Escape':
        if (this.isOpen) {
          event.preventDefault();
          this.close();
        }
        break;
      case 'Backspace': {
        const values = this.selectedValues();
        if (this.multiple && (this.inputEl?.value ?? '') === '' && values.length > 0) {
          this.removeChip(values[values.length - 1]);
        }
        break;
      }
    }
  };

  render() {
    const inherited = { ...this.inherited };
    delete inherited['id'];
    const options = this.options;
    const values = this.selectedValues();
    const selectedItems = values
      .map((v) => options.find((item) => item.value === v))
      .filter((item): item is TilburgWbcComboboxItem => item !== undefined);
    const displayValue = this.multiple ? '' : (options.find((item) => item.value === this.value)?.label ?? '');
    const hasValue = values.length > 0;

    return (
      <div class={{ 'utrecht-combobox': true, 'tilburg-combobox--multiple': this.multiple }}>
        {/* Click anywhere on the value container toggles the popover; chip-remove
            and clear stop their click from bubbling here. */}
        <div class="tilburg-combobox__value-container" onClick={this.onToggle}>
          {this.multiple &&
            selectedItems.map((item) => (
              <span key={String(item.value)} class="tilburg-combobox__chip">
                {item.label}
                <button
                  type="button"
                  class="tilburg-combobox__chip-remove"
                  aria-label={`Verwijder ${item.label}`}
                  disabled={this.disabled}
                  onClick={(event: MouseEvent) => {
                    event.stopPropagation();
                    this.removeChip(item.value);
                  }}
                >
                  ×
                </button>
              </span>
            ))}
          <input
            {...inherited}
            ref={(el) => (this.inputEl = el)}
            class="tilburg-combobox__input"
            type="text"
            role="combobox"
            id={this.internalId}
            aria-expanded={this.isOpen ? 'true' : 'false'}
            aria-controls={this.listboxId}
            aria-activedescendant={this.isOpen && this.activeIndex >= 0 ? this.optionId(this.activeIndex) : undefined}
            aria-invalid={this.invalid ? 'true' : undefined}
            aria-required={this.required ? 'true' : undefined}
            placeholder={this.multiple && selectedItems.length > 0 ? undefined : this.placeholder}
            value={displayValue}
            disabled={this.disabled}
            readOnly
            onKeyDown={this.onKeyDown}
          />
          {this.clearable && hasValue && (
            <button
              type="button"
              class="tilburg-combobox__clear"
              aria-label="Wis selectie"
              disabled={this.disabled}
              onClick={this.onClear}
            >
              <ClearIcon />
            </button>
          )}
          <button
            type="button"
            class="tilburg-combobox__chevron"
            aria-label={this.isOpen ? 'Sluit opties' : 'Toon opties'}
            tabIndex={-1}
            disabled={this.disabled}
          >
            <ChevronIcon />
          </button>
        </div>
        <ul
          id={this.listboxId}
          role="listbox"
          class={{
            'utrecht-listbox': true,
            'utrecht-combobox__popover': true,
            'utrecht-combobox__popover--block-end': true,
            'utrecht-combobox__popover--hidden': !this.isOpen,
          }}
          aria-multiselectable={this.multiple ? 'true' : undefined}
        >
          {options.map((item, index) => (
            <li
              key={String(item.value)}
              id={this.optionId(index)}
              role="option"
              class="utrecht-listbox__option"
              data-active={this.activeIndex === index ? 'true' : undefined}
              aria-selected={this.isSelected(item) ? 'true' : 'false'}
              aria-disabled={item.disabled ? 'true' : undefined}
              onMouseEnter={() => {
                if (!item.disabled) this.activeIndex = index;
              }}
              onMouseDown={(event: MouseEvent) => {
                /* Keep focus on the input. */
                event.preventDefault();
                this.selectAt(index);
              }}
            >
              {item.label}
            </li>
          ))}
        </ul>
        {this.name &&
          !this.disabled &&
          values.map((value) => <input type="hidden" name={this.name} value={String(value)} />)}
      </div>
    );
  }
}
