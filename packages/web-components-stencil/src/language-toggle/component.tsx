/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, Event, EventEmitter, h, Prop, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

export interface TilburgWbcLanguageOption {
  code: string;
  label: string;
}

const DEFAULT_OPTIONS: TilburgWbcLanguageOption[] = [
  { code: 'NL', label: 'NL' },
  { code: 'EN', label: 'EN' },
];

@Component({
  tag: 'tilburg-wbc-language-toggle',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcLanguageToggle {
  @Element() host!: HTMLElement;

  /** The choices, in toggle order. JS property only (no attribute). */
  @Prop() options: TilburgWbcLanguageOption[] = DEFAULT_OPTIONS;
  /** Code of the active option. Controlled: update it from `tilburgToggle`. */
  @Prop() active: string | null | undefined = 'NL';

  /** Fired on click, Enter or Space with the code of the **next** option. */
  @Event() tilburgToggle!: EventEmitter<string>;

  /* `aria-label` (default `Switch language`), `aria-describedby` and `title`
     are written on the host and moved onto the inner `<button>`. */
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

  private emitNext() {
    const options = this.options ?? [];
    if (!options.length) return;
    const index = options.findIndex((option) => option.code === this.active);
    const next = options[(index + 1) % options.length] ?? options[0];
    this.tilburgToggle.emit(next.code);
  }

  private readonly onClick = () => {
    this.emitNext();
  };

  private readonly onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.emitNext();
    }
  };

  render() {
    const options = this.options ?? [];
    const lastIsActive = options.length > 0 && options[options.length - 1].code === this.active;
    return (
      <button
        {...this.inherited}
        type="button"
        role="switch"
        tabindex="0"
        aria-label={this.inherited['aria-label'] ?? 'Switch language'}
        aria-checked={lastIsActive ? 'true' : 'false'}
        onClick={this.onClick}
        onKeyDown={this.onKeyDown}
        class="tilburg-language-toggle utrecht-button utrecht-button--html-button utrecht-button--secondary-action"
      >
        {options.map((option) => (
          <span
            key={option.code}
            class={{
              'tilburg-language-toggle__option': true,
              'tilburg-language-toggle__option--active': option.code === this.active,
            }}
          >
            {option.label}
          </span>
        ))}
      </button>
    );
  }
}
