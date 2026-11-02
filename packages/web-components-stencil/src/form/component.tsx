/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, Prop, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

const INHERITED = ['id', 'name', 'action', 'method', 'aria-label', 'aria-labelledby'] as const;

/**
 * A real `<form class="utrecht-form">` in light DOM with the content slotted inside, so the controls submit with it.
 * The native `submit` / `reset` events bubble through the host as-is.
 */
@Component({
  tag: 'tilburg-wbc-form',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcForm {
  @Element() host!: HTMLElement;

  /** Sets `novalidate`: the browser leaves validation to the app. */
  @Prop() noValidate = false;

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

  render() {
    return (
      <form {...this.inherited} class="utrecht-form" noValidate={this.noValidate}>
        <slot />
      </form>
    );
  }
}
