import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

export type TilburgDrawerAlign = 'inline-start' | 'inline-end' | 'block-start' | 'block-end';

/* Utrecht drawer on the native `<dialog>`, with the open/close API of `TilburgModal`. */
@Component({
  selector: 'tilburg-drawer',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgDrawer implements AfterViewInit, OnChanges {
  /** The edge the drawer slides in from. */
  @Input() align: TilburgDrawerAlign = 'inline-start';
  /** `true` opens the drawer modally (`showModal()`), `false` closes it. */
  @Input() open = false;
  /** Close when the backdrop (the area outside the drawer) is clicked. */
  @Input() closeOnBackdropClick = true;
  /** The dialog's accessible name, or the id of the heading that names it. */
  @Input() ariaLabel?: string | null;
  @Input() ariaLabelledBy?: string | null;

  /** Emitted after the drawer closed — Escape, backdrop click, a `method="dialog"` form or `close()`. */
  @Output() closed = new EventEmitter<void>();
  /** Emits when the drawer opens or closes from the inside, so `[(open)]` stays in sync. */
  @Output() openChange = new EventEmitter<boolean>();

  @ViewChild('dialog', { static: true }) dialog!: ElementRef<HTMLDialogElement>;

  ngAfterViewInit(): void {
    this.sync();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open'] && this.dialog) {
      this.sync();
    }
  }

  /** Opens the drawer modally. */
  showModal(): void {
    const dialog = this.dialog.nativeElement;
    if (!this.open) {
      this.open = true;
      this.openChange.emit(true);
    }
    if (!dialog.open) {
      dialog.showModal();
    }
  }

  /** Closes the drawer; `closed` is emitted from the native `close` event. */
  close(): void {
    const dialog = this.dialog.nativeElement;
    if (dialog.open) {
      dialog.close();
    }
  }

  onDialogClose(event: Event): void {
    if (event.target !== this.dialog.nativeElement) {
      return;
    }
    this.open = false;
    this.openChange.emit(false);
    this.closed.emit();
  }

  onDialogClick(event: MouseEvent): void {
    /* The backdrop belongs to the <dialog>: a click on it targets the dialog, but lands outside its box. (A click
       on the drawer's own padding targets the dialog too, and must not close it.) */
    const dialog = this.dialog.nativeElement;
    const box = dialog.getBoundingClientRect();
    const outside =
      event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom;
    if (this.closeOnBackdropClick && event.target === dialog && outside) {
      this.close();
    }
  }

  private sync(): void {
    if (this.open) {
      this.showModal();
    } else {
      this.close();
    }
  }
}
