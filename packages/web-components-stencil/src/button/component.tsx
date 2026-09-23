/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, Prop, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

export type TilburgWbcButtonAppearance = 'primary-action-button' | 'secondary-action-button' | 'subtle-button';
export type TilburgWbcButtonSize = 'small' | 'medium' | 'large';

const APPEARANCE_CLASS: Record<TilburgWbcButtonAppearance, string> = {
  'primary-action-button': 'utrecht-button--primary-action',
  'secondary-action-button': 'utrecht-button--secondary-action',
  'subtle-button': 'utrecht-button--subtle',
};

@Component({
  tag: 'tilburg-wbc-button',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcButton {
  @Element() host!: HTMLElement;

  @Prop() appearance: TilburgWbcButtonAppearance = 'primary-action-button';
  @Prop() size: TilburgWbcButtonSize = 'medium';
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';
  @Prop() disabled = false;
  @Prop() busy = false;
  /** Tri-state: leave unset for a normal button, `true`/`false` for a toggle button. */
  @Prop() pressed?: boolean;

  /* `aria-label`, `aria-describedby` and `title` are written on the host as
     plain HTML attributes and moved onto the inner `<button>`. */
  @State() inherited: InheritedAttributes = {};
  private inheritor?: AttributeInheritor;

  connectedCallback() {
    this.inheritor = inheritAttributes(this.host, ['aria-label', 'aria-describedby', 'title'], (attributes) => {
      this.inherited = attributes;
    });
  }

  disconnectedCallback() {
    this.inheritor?.disconnect();
  }

  render() {
    const { title, 'aria-label': ariaLabel, ...rest } = this.inherited;
    return (
      <button
        {...rest}
        class={{
          'utrecht-button': true,
          [`tilburg-${this.size}`]: true,
          [APPEARANCE_CLASS[this.appearance]]: Boolean(APPEARANCE_CLASS[this.appearance]),
          'utrecht-button--busy': this.busy,
          'utrecht-button--disabled': this.disabled,
          'utrecht-button--pressed': this.pressed === true,
          'utrecht-button--submit': this.type === 'submit',
        }}
        type={this.type}
        disabled={this.disabled}
        title={title}
        /* Same `aria-label || title` cascade as Angular/React, so icon-only
           buttons get an accessible name from their tooltip. */
        aria-label={ariaLabel || title || undefined}
        aria-busy={this.busy ? 'true' : undefined}
        aria-pressed={this.pressed === undefined ? undefined : String(this.pressed)}
      >
        <slot />
      </button>
    );
  }
}
