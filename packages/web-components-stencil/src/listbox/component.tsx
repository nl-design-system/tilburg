/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, Event, EventEmitter, h, Prop, State, Watch } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

export interface TilburgWbcListboxItem<V = unknown> {
  value: V;
  label: string;
}

let listboxCount = 0;

/**
 * Standalone WAI-ARIA listbox, same behaviour and DOM as Angular `<tilburg-listbox>` and React `Listbox`. Focus stays
 * on the `role="listbox"` element; `aria-activedescendant` and `data-active` mark the active option. The component
 * keeps its own `value` in sync and emits `tilburgChange` with the new value, like `tilburg-wbc-combobox`.
 */
@Component({
  tag: 'tilburg-wbc-listbox',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcListbox {
  @Element() host!: HTMLElement;

  /** Options, set as a JS property: `{ value, label }[]`. */
  @Prop() items: TilburgWbcListboxItem[] = [];
  /** Selected value: an item `value` (or `null`), an array of values with `multiple`. Updated on selection. */
  @Prop({ mutable: true }) value?: unknown;
  @Prop() multiple = false;
  @Prop() disabled = false;
  /** Sets `aria-invalid="true"` and `utrecht-listbox--invalid`. */
  @Prop() invalid = false;
  /** Sets `aria-required="true"`. */
  @Prop() required = false;
  /** Form field name. When set, one hidden `<input name>` per selected value is rendered so the selection submits. */
  @Prop() name?: string;

  /** Fired with the new value after every selection. */
  @Event() tilburgChange!: EventEmitter<unknown>;

  @State() activeIndex = -1;
  @State() inherited: InheritedAttributes = {};
  private inheritor?: AttributeInheritor;
  private readonly fallbackId = `tilburg-wbc-listbox-${++listboxCount}`;

  /* Keep `aria-activedescendant` on an option that still exists when `items` shrinks. */
  @Watch('items')
  itemsChanged() {
    this.activeIndex = Math.min(this.activeIndex, this.items.length - 1);
  }

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
    if (this.activeIndex < 0) return;
    const option = this.host.querySelector<HTMLElement>(`[id="${this.optionId(this.activeIndex)}"]`);
    if (option && typeof option.scrollIntoView === 'function') option.scrollIntoView({ block: 'nearest' });
  }

  private get internalId(): string {
    return this.inherited['id'] || this.fallbackId;
  }

  private optionId(index: number): string {
    return `${this.internalId}-opt-${index}`;
  }

  private selectedValues(): unknown[] {
    const v = this.value;
    if (v === null || v === undefined) return [];
    return Array.isArray(v) ? v : [v];
  }

  private select(index: number) {
    const item = this.items[index];
    if (!item || this.disabled) return;
    const current = this.selectedValues();
    const next = this.multiple
      ? current.includes(item.value)
        ? current.filter((v) => v !== item.value)
        : [...current, item.value]
      : item.value;
    this.value = next;
    this.tilburgChange.emit(next);
  }

  private readonly onKeyDown = (event: KeyboardEvent) => {
    if (this.disabled || this.items.length === 0) return;
    const last = this.items.length - 1;
    const moves: Record<string, number> = {
      ArrowDown: Math.min(this.activeIndex + 1, last),
      ArrowUp: Math.max(this.activeIndex - 1, 0),
      Home: 0,
      End: last,
    };
    if (event.key in moves) {
      event.preventDefault();
      this.activeIndex = moves[event.key];
    } else if ((event.key === ' ' || event.key === 'Enter') && this.activeIndex >= 0) {
      event.preventDefault();
      this.select(this.activeIndex);
    }
  };

  private readonly onFocus = () => {
    /* WAI-ARIA: focus lands on the first selected option, or the first option. */
    if (this.activeIndex >= 0 || this.disabled || this.items.length === 0) return;
    const selected = this.selectedValues();
    this.activeIndex = Math.max(
      this.items.findIndex((item) => selected.includes(item.value)),
      0,
    );
  };

  render() {
    const selected = this.selectedValues();
    return [
      <div
        {...this.inherited}
        id={this.internalId}
        class={{
          'utrecht-listbox': true,
          'utrecht-listbox--html-div': true,
          'utrecht-listbox--disabled': this.disabled,
          'utrecht-listbox--invalid': this.invalid,
        }}
        role="listbox"
        tabIndex={0}
        aria-activedescendant={this.activeIndex >= 0 ? this.optionId(this.activeIndex) : undefined}
        aria-disabled={this.disabled ? 'true' : undefined}
        aria-invalid={this.invalid ? 'true' : undefined}
        aria-multiselectable={this.multiple ? 'true' : undefined}
        aria-required={this.required ? 'true' : undefined}
        onKeyDown={this.onKeyDown}
        onFocus={this.onFocus}
        onBlur={() => (this.activeIndex = -1)}
      >
        <ul class="utrecht-listbox__list" role="presentation">
          {this.items.map((item, index) => {
            const isSelected = selected.includes(item.value);
            return (
              <li
                id={this.optionId(index)}
                class={{
                  'utrecht-listbox__option': true,
                  'utrecht-listbox__option--html-li': true,
                  'utrecht-listbox__option--selected': isSelected,
                }}
                role="option"
                aria-selected={isSelected ? 'true' : 'false'}
                data-active={index === this.activeIndex ? 'true' : undefined}
                onClick={() => {
                  if (this.disabled) return;
                  this.activeIndex = index;
                  this.select(index);
                }}
              >
                {item.label}
              </li>
            );
          })}
        </ul>
      </div>,
      this.name &&
        selected.map((value) => (
          <input type="hidden" name={this.name} value={String(value)} disabled={this.disabled} />
        )),
    ];
  }
}
