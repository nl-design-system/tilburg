/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, Prop, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

/* Global attributes written on the host that belong on the `<input>`. `id`
   must move so `<label for>` resolves to the input; `dir` / `inputmode` are
   Angular inputs, but global attributes in HTML. */
const INHERITED = ['id', 'title', 'dir', 'inputmode', 'aria-label', 'aria-labelledby', 'aria-describedby'] as const;

@Component({
  tag: 'tilburg-webc-textbox',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWebcTextbox {
  @Element() host!: HTMLElement;

  @Prop() type = 'text';
  @Prop() name?: string;
  /** Current value; kept in sync with user input. */
  @Prop({ mutable: true }) value?: string;
  @Prop() placeholder?: string;
  @Prop() autocomplete?: string;
  @Prop() disabled = false;
  /** Adds `aria-invalid="true"` and `utrecht-textbox--invalid`. */
  @Prop() invalid = false;
  @Prop() required = false;
  @Prop() readonly = false;

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

  private readonly onInput = (event: Event) => {
    this.value = (event.target as HTMLInputElement).value;
  };

  render() {
    const { dir, inputmode, ...rest } = this.inherited;
    /* Same derivations as the utrecht Angular `input[utrecht-textbox]` directive. */
    const inputMode = inputmode || (this.type === 'number' ? 'numeric' : undefined);
    return (
      <input
        {...rest}
        class={{
          'utrecht-textbox': true,
          'utrecht-textbox--html-input': true,
          'utrecht-textbox--disabled': this.disabled,
          'utrecht-textbox--invalid': this.invalid,
          'utrecht-textbox--numeric': this.type === 'number' || inputMode === 'numeric',
          'utrecht-textbox--password': this.type === 'password',
          'utrecht-textbox--read-only': this.readonly,
          'utrecht-textbox--required': this.required,
          'utrecht-textbox--url': this.type === 'email' || this.type === 'url',
        }}
        type={this.type}
        name={this.name || undefined}
        value={this.value}
        placeholder={this.placeholder || undefined}
        autocomplete={this.autocomplete || undefined}
        dir={dir || 'auto'}
        inputMode={inputMode}
        disabled={this.disabled}
        required={this.required}
        readOnly={this.readonly}
        aria-invalid={this.invalid ? 'true' : undefined}
        aria-required={this.required ? 'true' : undefined}
        onInput={this.onInput}
      />
    );
  }
}
