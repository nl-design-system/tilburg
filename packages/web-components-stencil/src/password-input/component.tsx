/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, Prop, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

/* Global attributes written on the host that belong on the `<input>`: `id` must move so `<label for>` resolves to it. */
const INHERITED = ['id', 'aria-labelledby', 'aria-describedby'] as const;

let passwordInputCount = 0;

/** A password textbox with a show/hide toggle (Tilburg component, bq-tlb-frontend TIL-72). */
@Component({
  tag: 'tilburg-wbc-password-input',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcPasswordInput {
  @Element() host!: HTMLElement;

  @Prop() name?: string;
  /** Current value; kept in sync with user input. */
  @Prop({ mutable: true }) value?: string;
  @Prop() autocomplete?: string;
  @Prop() placeholder?: string;
  @Prop() disabled = false;
  /** Adds `aria-invalid="true"` and `utrecht-textbox--invalid`. */
  @Prop() invalid = false;
  @Prop() required = false;
  /** Label of the show/hide button; it stays the same, `aria-pressed` reports the state. */
  @Prop() toggleLabel = 'Wachtwoord tonen';
  @Prop() statusShown = 'Wachtwoord is zichtbaar.';
  @Prop() statusHidden = 'Wachtwoord is verborgen.';

  @State() visible = false;
  /** Empty until the first click, so nothing is announced on page load. */
  @State() status = '';
  @State() inherited: InheritedAttributes = {};

  private inheritor?: AttributeInheritor;
  private readonly fallbackId = `tilburg-wbc-password-input-${++passwordInputCount}`;

  connectedCallback() {
    this.inheritor = inheritAttributes(this.host, INHERITED, (attributes) => {
      this.inherited = attributes;
    });
  }

  disconnectedCallback() {
    this.inheritor?.disconnect();
  }

  private readonly onInput = (event: Event) => {
    this.value = (event.target as HTMLInputElement).value;
  };

  private readonly onToggle = () => {
    this.visible = !this.visible;
    this.status = this.visible ? this.statusShown : this.statusHidden;
  };

  render() {
    const { id, ...rest } = this.inherited;
    const inputId = id || this.fallbackId;
    return (
      <div class="tilburg-password-input">
        <input
          {...rest}
          id={inputId}
          class={{
            'utrecht-textbox': true,
            'utrecht-textbox--html-input': true,
            'utrecht-textbox--password': true,
            'utrecht-textbox--disabled': this.disabled,
            'utrecht-textbox--invalid': this.invalid,
            'utrecht-textbox--required': this.required,
          }}
          type={this.visible ? 'text' : 'password'}
          name={this.name || undefined}
          value={this.value}
          autocomplete={this.autocomplete || undefined}
          placeholder={this.placeholder || undefined}
          disabled={this.disabled}
          required={this.required}
          aria-invalid={this.invalid ? 'true' : undefined}
          aria-required={this.required ? 'true' : undefined}
          onInput={this.onInput}
        />
        <button
          type="button"
          class="tilburg-password-input__toggle"
          aria-pressed={this.visible ? 'true' : 'false'}
          aria-controls={inputId}
          aria-label={this.toggleLabel}
          disabled={this.disabled}
          onClick={this.onToggle}
        >
          <svg
            class="tilburg-password-input__icon tilburg-password-input__icon--show"
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <svg
            class="tilburg-password-input__icon tilburg-password-input__icon--hide"
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M17.94 17.94A10 10 0 0 1 12 20c-7 0-11-8-11-8a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A9.1 9.1 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19M14.12 14.12a3 3 0 1 1-4.24-4.24" />
            <path d="M1 1l22 22" />
          </svg>
        </button>
        <span class="tilburg-password-input__status" aria-live="polite">
          {this.status}
        </span>
      </div>
    );
  }
}
