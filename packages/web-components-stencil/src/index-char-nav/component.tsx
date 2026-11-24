/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, Event, EventEmitter, h, Prop, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

export interface TilburgWbcIndexCharNavCharacter {
  char: string;
  href?: string | null;
  disabled?: boolean;
}

export interface TilburgWbcIndexCharNavCharClickDetail {
  character: TilburgWbcIndexCharNavCharacter;
  event: MouseEvent;
}

@Component({
  tag: 'tilburg-wbc-index-char-nav',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcIndexCharNav {
  /** The characters. JS property only (no attribute). Nothing is rendered for an empty array. */
  @Prop() characters: TilburgWbcIndexCharNavCharacter[] | null | undefined = [];

  /** The character shown as current (primary button link, `aria-current="page"`). */
  @Prop() currentChar?: string | null;

  /** Fired when an enabled character is clicked, with the character and the native click event. */
  @Event() tilburgCharClick!: EventEmitter<TilburgWbcIndexCharNavCharClickDetail>;

  @Element() host!: HTMLElement;

  /* `aria-label` is written on the host and moved onto the `<nav>`. */
  @State() inherited: InheritedAttributes = {};
  private inheritor?: AttributeInheritor;

  connectedCallback() {
    this.inheritor = inheritAttributes(this.host, ['aria-label'], (attributes) => {
      this.inherited = attributes;
    });
  }

  disconnectedCallback() {
    this.inheritor?.disconnect();
  }

  render() {
    const characters = this.characters ?? [];
    if (!characters.length) return null;
    return (
      <nav class="utrecht-index-char-nav" aria-label={this.inherited['aria-label'] ?? 'Alfabetische index'}>
        {characters.map((character) => {
          const current = character.char === this.currentChar;
          const disabled = !!character.disabled;
          return (
            <a
              key={character.char}
              class={{
                'utrecht-button-link utrecht-button-link--html-a utrecht-index-char-nav__link': true,
                'utrecht-button-link--primary-action': current,
                'utrecht-button-link--secondary-action': !current,
                'utrecht-button-link--placeholder': disabled,
                'utrecht-index-char-nav__link--current': current,
                'utrecht-index-char-nav__link--disabled': disabled,
              }}
              href={disabled ? undefined : character.href || '#'}
              role={disabled ? 'link' : undefined}
              aria-disabled={disabled ? 'true' : undefined}
              aria-current={current ? 'page' : undefined}
              onClick={(event: MouseEvent) => {
                if (!disabled) this.tilburgCharClick.emit({ character, event });
              }}
            >
              {character.char}
            </a>
          );
        })}
      </nav>
    );
  }
}
