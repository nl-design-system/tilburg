/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, Listen, Prop, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

const INHERITED = ['id', 'title', 'aria-label', 'aria-labelledby', 'aria-describedby'] as const;

/**
 * The native `change` / `input` events of the inner `<input>` bubble through
 * the host as-is.
 */
@Component({
  tag: 'tilburg-wbc-radio-button',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcRadioButton {
  @Element() host!: HTMLElement;

  @Prop() name = '';
  @Prop() value?: string;
  /**
   * Kept in sync with user interaction — also when another radio of the same
   * group gets selected (which fires no event on this one).
   */
  @Prop({ mutable: true, reflect: true }) checked = false;
  @Prop() disabled = false;
  /** Adds `aria-invalid="true"` and `utrecht-radio-button--invalid`. */
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

  /* Selecting a sibling radio unchecks ours without a `change` event on it,
     so resync on any radio change within the same group. */
  @Listen('change', { target: 'document' })
  onGroupChange(event: Event) {
    const target = event.target as HTMLInputElement | null;
    if (!this.input || !target || target.type !== 'radio' || !this.name || target.name !== this.name) return;
    this.checked = this.input.checked;
  }

  render() {
    return (
      <input
        {...this.inherited}
        ref={(el) => (this.input = el)}
        type="radio"
        class={{
          'utrecht-radio-button': true,
          'utrecht-radio-button--html-input': true,
          'utrecht-radio-button--invalid': this.invalid,
        }}
        name={this.name || undefined}
        value={this.value}
        checked={this.checked}
        disabled={this.disabled}
        required={this.required}
        aria-disabled={this.disabled ? 'true' : undefined}
        aria-invalid={this.invalid ? 'true' : undefined}
        aria-required={this.required ? 'true' : undefined}
        onChange={(event: Event) => (this.checked = (event.target as HTMLInputElement).checked)}
      />
    );
  }
}
