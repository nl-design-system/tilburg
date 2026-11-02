/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, Prop, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

const INHERITED = ['id', 'title', 'aria-label', 'aria-labelledby', 'aria-describedby'] as const;

let toggleCount = 0;

/**
 * A switch: a native `<input type="checkbox" role="switch">` plus the track label that draws it. As with
 * `tilburg-wbc-checkbox`, Angular's `(checkChanged)` is the native `change` event, which bubbles through the host.
 */
@Component({
  tag: 'tilburg-wbc-form-toggle',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcFormToggle {
  @Element() host!: HTMLElement;

  @Prop() name = '';
  /** Submitted value when on (native default `on`). */
  @Prop() value?: string;
  /** Kept in sync with user interaction. */
  @Prop({ mutable: true, reflect: true }) checked = false;
  @Prop() disabled = false;
  /** Adds `aria-invalid="true"` and `utrecht-form-toggle--invalid`. */
  @Prop() invalid = false;
  @Prop() required = false;

  @State() inherited: InheritedAttributes = {};
  private inheritor?: AttributeInheritor;
  /* The track label points at the input with `for`, so an id is needed even when the consumer sets none. */
  private readonly fallbackId = `tilburg-wbc-form-toggle-${++toggleCount}`;

  connectedCallback() {
    this.inheritor = inheritAttributes(this.host, INHERITED, (attributes) => {
      this.inherited = attributes;
    });
  }

  disconnectedCallback() {
    this.inheritor?.disconnect();
  }

  private readonly onChange = (event: Event) => {
    this.checked = (event.target as HTMLInputElement).checked;
  };

  render() {
    const id = this.inherited['id'] || this.fallbackId;
    return (
      <div
        class={{
          'utrecht-form-toggle': true,
          'utrecht-form-toggle--html-checkbox': true,
          'utrecht-form-toggle--disabled': this.disabled,
          'utrecht-form-toggle--invalid': this.invalid,
          'utrecht-form-toggle--required': this.required,
        }}
      >
        <input
          {...this.inherited}
          id={id}
          type="checkbox"
          role="switch"
          class="utrecht-form-toggle__checkbox"
          name={this.name || undefined}
          value={this.value}
          checked={this.checked}
          disabled={this.disabled}
          required={this.required}
          aria-invalid={this.invalid ? 'true' : undefined}
          aria-required={this.required ? 'true' : undefined}
          onChange={this.onChange}
        />
        <label htmlFor={id} class="utrecht-form-toggle__track utrecht-form-toggle__track--html-label">
          <span class="utrecht-form-toggle__thumb" />
        </label>
      </div>
    );
  }
}
