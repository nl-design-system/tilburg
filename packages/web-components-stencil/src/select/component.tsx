/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, Prop, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

export interface TilburgWbcSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/* Global attributes written on the host that belong on the `<select>`: `id` must move so `<label for>` resolves to
   the select. */
const INHERITED = ['id', 'title', 'aria-label', 'aria-labelledby', 'aria-describedby'] as const;

/* `options` arrives as an array (property, React wrapper) or as JSON in the HTML attribute. */
const parseOptions = (options: TilburgWbcSelectOption[] | string | undefined): TilburgWbcSelectOption[] => {
  if (Array.isArray(options)) return options;
  if (!options) return [];
  try {
    const parsed: unknown = JSON.parse(options);
    return Array.isArray(parsed) ? (parsed as TilburgWbcSelectOption[]) : [];
  } catch {
    return [];
  }
};

@Component({
  tag: 'tilburg-wbc-select',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcSelect {
  @Element() host!: HTMLElement;

  /** The options: a list of `{ value, label, disabled? }`, or that list as JSON in the attribute. */
  @Prop() options: TilburgWbcSelectOption[] | string = [];
  @Prop() name?: string;
  /** Current value; kept in sync with the user's choice. */
  @Prop({ mutable: true }) value?: string;
  /** Text of an empty first option (value `""`), e.g. "Maak een keuze". */
  @Prop() placeholder?: string;
  @Prop() disabled = false;
  /** Adds `aria-invalid="true"` and `utrecht-select--invalid`. */
  @Prop() invalid = false;
  @Prop() required = false;

  @State() inherited: InheritedAttributes = {};
  private inheritor?: AttributeInheritor;

  connectedCallback() {
    this.inheritor = inheritAttributes(this.host, INHERITED, (attributes) => {
      this.inherited = attributes;
    });
  }

  disconnectedCallback() {
    this.inheritor?.disconnect();
  }

  private readonly onChange = (event: Event) => {
    this.value = (event.target as HTMLSelectElement).value;
  };

  render() {
    const options = parseOptions(this.options);
    return (
      <select
        {...this.inherited}
        class={{
          'utrecht-select': true,
          'utrecht-select--html-select': true,
          'utrecht-select--disabled': this.disabled,
          'utrecht-select--invalid': this.invalid,
        }}
        name={this.name || undefined}
        disabled={this.disabled}
        required={this.required}
        aria-invalid={this.invalid ? 'true' : undefined}
        aria-required={this.required ? 'true' : undefined}
        onChange={this.onChange}
      >
        {this.placeholder !== undefined && (
          <option value="" selected={!this.value}>
            {this.placeholder}
          </option>
        )}
        {options.map((option) => (
          <option value={option.value} selected={option.value === this.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
}
