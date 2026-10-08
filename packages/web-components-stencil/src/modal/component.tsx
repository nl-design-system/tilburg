/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, Event, EventEmitter, h, Method, Prop, State, Watch } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';
import { hasSlot } from '../utils/slots';

let modalCount = 0;

/**
 * @slot - Dialog content (rendered in `.tilburg-modal__content`).
 * @slot footer - Actions, rendered in `<footer class="tilburg-modal__footer">`; the footer is omitted when unused.
 */
@Component({
  tag: 'tilburg-wbc-modal',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcModal {
  @Element() host!: HTMLElement;

  /* `aria-describedby` on the host (the id of the text that explains the dialog) belongs on the `<dialog>`. */
  @State() inherited: InheritedAttributes = {};
  private inheritor?: AttributeInheritor;

  /** Heading text; also the dialog's accessible name. Named `heading` because `title` is a global HTML attribute. */
  @Prop() heading?: string;
  /** `true` opens the dialog modally (`showModal()`), `false` closes it. Reflects the current state. */
  @Prop({ mutable: true, reflect: true }) open = false;
  /** Visible text of the close button in the header. */
  @Prop() closeLabel = 'Sluiten';
  /** Close when the backdrop (the area outside the dialog box) is clicked. */
  @Prop() closeOnBackdropClick = true;

  /** Fired after the dialog closed — close button, Escape, backdrop click or `close()`. */
  @Event() tilburgClose!: EventEmitter<void>;

  private dialog?: HTMLDialogElement;
  private readonly titleId = `tilburg-wbc-modal-${++modalCount}-title`;
  private hasFooter = false;

  connectedCallback() {
    this.inheritor = inheritAttributes(this.host, ['aria-describedby'], (attributes) => {
      this.inherited = attributes;
    });
  }

  disconnectedCallback() {
    this.inheritor?.disconnect();
  }

  componentWillLoad() {
    this.hasFooter = hasSlot(this.host, 'footer');
  }

  componentDidLoad() {
    this.sync();
  }

  @Watch('open')
  sync() {
    if (this.open) {
      this.openDialog();
    } else {
      this.closeDialog();
    }
  }

  /** Opens the dialog modally. */
  @Method()
  async showModal() {
    this.open = true;
  }

  /** Closes the dialog; `tilburgClose` fires from the native `close` event. */
  @Method()
  async close() {
    this.open = false;
  }

  private openDialog() {
    const dialog = this.dialog;
    if (!dialog || dialog.open) return;
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
  }

  private closeDialog() {
    const dialog = this.dialog;
    if (!dialog || !dialog.hasAttribute('open')) return;
    if (typeof dialog.close === 'function') {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
      dialog.dispatchEvent(new CustomEvent('close'));
    }
  }

  private readonly onDialogClose = (event: Event) => {
    if (event.target !== this.dialog) return;
    this.open = false;
    this.tilburgClose.emit();
  };

  private readonly onDialogClick = (event: MouseEvent) => {
    /* A click whose target is the <dialog> itself landed on the backdrop:
       the box's own padding is covered by its children. */
    if (this.closeOnBackdropClick && event.target === this.dialog) {
      this.closeDialog();
    }
  };

  private readonly onCloseButton = () => this.closeDialog();

  render() {
    return (
      <dialog
        ref={(el) => (this.dialog = el)}
        class="tilburg-modal"
        aria-labelledby={this.titleId}
        aria-describedby={this.inherited['aria-describedby'] || undefined}
        onClose={this.onDialogClose}
        onClick={this.onDialogClick}
      >
        <header class="tilburg-modal__header">
          <h2 id={this.titleId}>{this.heading}</h2>
          <button type="button" class="tilburg-modal__close-button" onClick={this.onCloseButton}>
            <span>{this.closeLabel}</span>
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>
        </header>
        <div class="tilburg-modal__content">
          <slot />
        </div>
        {this.hasFooter && (
          <footer class="tilburg-modal__footer">
            <slot name="footer" />
          </footer>
        )}
      </dialog>
    );
  }
}
