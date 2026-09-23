/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, Prop, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

const INHERITED = ['id', 'title', 'aria-label', 'aria-labelledby', 'aria-describedby'] as const;

/**
 * Angular's `(checkChanged)` output re-emits the native `change` event; here
 * the native `change` / `input` events of the inner `<input>` bubble through
 * the host as-is, so listen for those instead.
 */
@Component({
  tag: 'tilburg-wbc-checkbox',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcCheckbox {
  @Element() host!: HTMLElement;

  @Prop() name = '';
  /** Submitted value when checked (native default `on`). */
  @Prop() value?: string;
  /** Kept in sync with user interaction. */
  @Prop({ mutable: true, reflect: true }) checked = false;
  /** Mixed state (`aria-checked="mixed"`); cleared by the browser on the next click. */
  @Prop({ mutable: true }) indeterminate = false;
  @Prop() disabled = false;
  /** Adds `aria-invalid="true"` and `utrecht-checkbox--invalid`. */
  @Prop() invalid = false;
  @Prop() required = false;

  @State() inherited: InheritedAttributes = {};
  private inheritor?: AttributeInheritor;
  private input?: HTMLInputElement;

  connectedCallback() {
    this.inheritor = inheritAttributes(this.host, INHERITED, (attributes) => {
      this.inherited = attributes;
    });
  }

  disconnectedCallback() {
    this.inheritor?.disconnect();
  }

  componentDidRender() {
    /* `indeterminate` is a DOM property only, there is no attribute. */
    if (this.input) this.input.indeterminate = this.indeterminate;
  }

  private readonly onChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    this.checked = input.checked;
    this.indeterminate = input.indeterminate;
  };

  render() {
    return (
      <input
        {...this.inherited}
        ref={(el) => (this.input = el)}
        type="checkbox"
        class={{
          'utrecht-checkbox': true,
          'utrecht-checkbox--html-input': true,
          'utrecht-checkbox--custom': true,
          'utrecht-checkbox--indeterminate': this.indeterminate,
          'utrecht-checkbox--invalid': this.invalid,
        }}
        name={this.name || undefined}
        value={this.value}
        checked={this.checked}
        disabled={this.disabled}
        required={this.required}
        aria-checked={this.indeterminate ? 'mixed' : undefined}
        aria-invalid={this.invalid ? 'true' : undefined}
        aria-required={this.required ? 'true' : undefined}
        onChange={this.onChange}
      />
    );
  }
}
