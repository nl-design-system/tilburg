/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, Event, EventEmitter, h, Prop, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

/* Global attributes written on the host that belong on the `<input>`: `id` must move so `<label for>` resolves to it. */
const INHERITED = ['id', 'aria-label', 'aria-labelledby', 'aria-describedby'] as const;

/** A drop zone to add files to a form. Content slotted into it is shown under the button: what may be uploaded. */
@Component({
  tag: 'tilburg-wbc-file-input',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcFileInput {
  @Element() host!: HTMLElement;

  @Prop() name?: string;
  @Prop() multiple = false;
  /** File types the file dialog offers, as in `<input accept>`. A browser does not hold a dropped file to it. */
  @Prop() accept?: string;
  @Prop() disabled = false;
  /** Adds `aria-invalid="true"`. */
  @Prop() invalid = false;
  @Prop() required = false;
  /** The text in the drop zone, above the button. */
  @Prop() dropLabel?: string;
  /** The text on the button. Also the accessible name when there is no `id` (for a `<label>`) or `aria-label(ledby)`. */
  @Prop() buttonLabel?: string;
  /** List the chosen files under the drop zone. Turn it off (`show-files="false"`) when you upload a file right away
   *  and show it elsewhere: the input is then emptied after each choice, so the same file can be chosen again. */
  @Prop() showFiles = true;

  /** Uploading: a spinner with `busy-label` covers the drop zone and no file can be added. */
  @Prop() busy = false;
  /** The text under the spinner, also announced to screen readers. */
  @Prop() busyLabel = 'Bezig met uploaden…';

  /** The chosen or dropped files. */
  @Event() tilburgFilesChange!: EventEmitter<File[]>;

  @State() files: File[] = [];
  @State() dragOver = false;
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

  private readonly onChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const chosen = Array.from(input.files ?? []);
    this.tilburgFilesChange.emit(chosen);
    if (this.showFiles) this.files = chosen;
    else input.value = '';
  };

  render() {
    const dropLabel =
      this.dropLabel ?? (this.multiple ? 'Sleep uw bestanden hierheen of' : 'Sleep uw bestand hierheen of');
    const buttonLabel = this.buttonLabel ?? (this.multiple ? 'Bestanden kiezen' : 'Bestand kiezen');
    const { id, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, ...rest } = this.inherited;
    return (
      <div
        class={{
          'tilburg-file-input': true,
          'tilburg-file-input--drag-over': this.dragOver,
          'tilburg-file-input--busy': this.busy,
        }}
      >
        {/* The drop itself is the browser's: it lands in the input, which covers the drop zone. */}
        <div
          class="tilburg-file-input__dropzone"
          aria-busy={this.busy ? 'true' : undefined}
          onDragEnter={() => (this.dragOver = !this.disabled && !this.busy)}
          onDragLeave={() => (this.dragOver = false)}
          onDrop={() => (this.dragOver = false)}
        >
          <span class="tilburg-file-input__text">{dropLabel}</span>
          <span class="tilburg-file-input__button utrecht-button utrecht-button--secondary-action" aria-hidden="true">
            {buttonLabel}
          </span>
          <slot />
          <input
            {...rest}
            class="tilburg-file-input__input"
            type="file"
            id={id}
            name={this.name}
            accept={this.accept}
            multiple={this.multiple}
            disabled={this.disabled || this.busy}
            required={this.required}
            aria-invalid={this.invalid ? 'true' : undefined}
            aria-required={this.required ? 'true' : undefined}
            aria-label={ariaLabel ?? (id || ariaLabelledBy ? undefined : buttonLabel)}
            aria-labelledby={ariaLabelledBy}
            onChange={this.onChange}
          />
          <div class="tilburg-file-input__busy" role="status">
            {this.busy && [
              <span class="tilburg-file-input__spinner" aria-hidden="true" />,
              <span>{this.busyLabel}</span>,
            ]}
          </div>
        </div>
        <div class="tilburg-file-input__files" role="status">
          {this.files.length > 0 && (
            <ul>
              {this.files.map((file) => (
                <li class="tilburg-file-input__file">{file.name}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}
