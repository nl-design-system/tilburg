/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, Event, EventEmitter, h, Method, Prop, State, Watch } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

export type DrawerAlign = 'inline-start' | 'inline-end' | 'block-start' | 'block-end';

/**
 * Utrecht drawer on the native `<dialog>`, with the open/close API of `<tilburg-wbc-modal>`.
 *
 * @slot - The drawer's content.
 */
@Component({
  tag: 'tilburg-wbc-drawer',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcDrawer {
  @Element() host!: HTMLElement;

  /* The dialog's accessible name (`aria-label` / `aria-labelledby` on the host) belongs on the `<dialog>`. */
  @State() inherited: InheritedAttributes = {};
  private inheritor?: AttributeInheritor;

  /** The edge the drawer slides in from. */
  @Prop() align: DrawerAlign = 'inline-start';
  /** `true` opens the drawer modally (`showModal()`), `false` closes it. Reflects the current state. */
  @Prop({ mutable: true, reflect: true }) open = false;
  /** Close when the backdrop (the area outside the drawer) is clicked. */
  @Prop() closeOnBackdropClick = true;

  /** Fired after the drawer closed — Escape, backdrop click, a `method="dialog"` form or `close()`. */
  @Event() tilburgClose!: EventEmitter<void>;

  private dialog?: HTMLDialogElement;

  connectedCallback() {
    this.inheritor = inheritAttributes(this.host, ['aria-label', 'aria-labelledby'], (attributes) => {
      this.inherited = attributes;
    });
  }

  disconnectedCallback() {
    this.inheritor?.disconnect();
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

  /** Opens the drawer modally. */
  @Method()
  async showModal() {
    this.open = true;
  }

  /** Closes the drawer; `tilburgClose` fires from the native `close` event. */
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
    /* The backdrop belongs to the <dialog>: a click on it targets the dialog, but lands outside its box. (A click
       on the drawer's own padding targets the dialog too, and must not close it.) */
    const dialog = this.dialog;
    if (!this.closeOnBackdropClick || !dialog || event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (
      event.clientX < box.left ||
      event.clientX > box.right ||
      event.clientY < box.top ||
      event.clientY > box.bottom
    ) {
      this.closeDialog();
    }
  };

  render() {
    return (
      <dialog
        {...this.inherited}
        ref={(el) => (this.dialog = el)}
        class={`utrecht-drawer utrecht-drawer--${this.align}`}
        onClose={this.onDialogClose}
        onClick={this.onDialogClick}
      >
        <slot />
      </dialog>
    );
  }
}
