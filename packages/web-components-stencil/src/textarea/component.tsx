/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, Prop, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

const INHERITED = ['id', 'title', 'dir', 'aria-label', 'aria-labelledby', 'aria-describedby'] as const;

const px = (value: string) => parseInt(value.replace('px', ''), 10);

@Component({
  tag: 'tilburg-webc-textarea',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWebcTextarea {
  @Element() host!: HTMLElement;

  @Prop() name?: string;
  /** Current value; kept in sync with user input. Use this instead of text content. */
  @Prop({ mutable: true }) value?: string;
  @Prop() placeholder?: string;
  @Prop() rows?: number;
  @Prop() cols?: number;
  @Prop() autocomplete?: string;
  @Prop() disabled = false;
  /** Adds `aria-invalid="true"` and `utrecht-textarea--invalid`. */
  @Prop() invalid = false;
  @Prop() required = false;
  @Prop() readonly = false;
  /**
   * Grows the textarea with its content between 4 and 8 lines (the Angular
   * `tilburgTextAreaAutoResize` directive, which is always on there).
   */
  @Prop() autoResize = true;

  @State() inherited: InheritedAttributes = {};
  private inheritor?: AttributeInheritor;
  private textarea?: HTMLTextAreaElement;

  connectedCallback() {
    this.inheritor = inheritAttributes(this.host, INHERITED, (attributes) => {
      this.inherited = attributes;
    });
  }

  disconnectedCallback() {
    this.inheritor?.disconnect();
  }

  componentDidLoad() {
    if (this.autoResize && this.textarea?.scrollHeight) {
      setTimeout(() => this.resize());
    }
  }

  /* Port of the Angular `TilburgTextareaAutoresizeDirective`. */
  private resize() {
    const el = this.textarea;
    if (!this.autoResize || !el || typeof window === 'undefined' || !window.getComputedStyle) return;
    el.style.height = '0';
    const style = window.getComputedStyle(el);
    const padding = px(style.paddingTop) + px(style.paddingBottom);
    const lineHeight = px(style.lineHeight);
    if (Number.isNaN(padding) || Number.isNaN(lineHeight)) {
      el.style.height = '';
      return;
    }
    const minSize = lineHeight * 4 + padding;
    const maxSize = Math.min(lineHeight * 8 + padding, el.scrollHeight);
    el.style.height = `${Math.max(minSize, maxSize)}px`;
  }

  private readonly onInput = (event: Event) => {
    this.value = (event.target as HTMLTextAreaElement).value;
    this.resize();
  };

  render() {
    const { dir, ...rest } = this.inherited;
    return (
      <textarea
        {...rest}
        ref={(el) => (this.textarea = el)}
        class={{
          'utrecht-textarea': true,
          'utrecht-textarea--html-textarea': true,
          'utrecht-textarea--disabled': this.disabled,
          'utrecht-textarea--invalid': this.invalid,
          'utrecht-textarea--read-only': this.readonly,
          'utrecht-textarea--required': this.required,
        }}
        name={this.name || undefined}
        value={this.value}
        placeholder={this.placeholder || undefined}
        rows={this.rows ?? undefined}
        cols={this.cols ?? undefined}
        autocomplete={this.autocomplete || undefined}
        dir={dir || 'auto'}
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
