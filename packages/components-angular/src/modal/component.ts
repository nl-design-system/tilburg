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
  ViewEncapsulation,
} from '@angular/core';

let nextModalId = 0;

// `ViewEncapsulation.None`: the components-css modal rules must reach the
// projected content (`.tilburg-modal__content > * + *`, `…__content a`) and
// `body:has(.tilburg-modal[open])` locks page scroll — emulated encapsulation
// would scope both away. Selectors stay under `.tilburg-modal`.
@Component({
  selector: 'tilburg-modal',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: false,
})
export class TilburgModal implements AfterViewInit, OnChanges {
  /** Heading text; also the dialog's accessible name (`aria-labelledby`). */
  @Input() title?: string | null;
  /** `true` opens the dialog modally (`showModal()`), `false` closes it. */
  @Input() open = false;
  /** Visible text of the close button in the header. */
  @Input() closeLabel = 'Sluiten';
  /** Close when the backdrop (the area outside the dialog box) is clicked. */
  @Input() closeOnBackdropClick = true;

  /** Emitted after the dialog closed — close button, Escape, backdrop click or `close()`. */
  @Output() closed = new EventEmitter<void>();

  @ViewChild('dialog', { static: true }) dialog!: ElementRef<HTMLDialogElement>;

  readonly titleId = `tilburg-modal-${++nextModalId}-title`;

  ngAfterViewInit(): void {
    this.sync();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open'] && this.dialog) {
      this.sync();
    }
  }

  /** Opens the dialog modally. */
  showModal(): void {
    const dialog = this.dialog.nativeElement;
    this.open = true;
    if (!dialog.open) {
      dialog.showModal();
    }
  }

  /** Closes the dialog; `closed` is emitted from the native `close` event. */
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
    this.closed.emit();
  }

  onDialogClick(event: MouseEvent): void {
    // A click whose target is the <dialog> itself landed on the backdrop: the
    // box's own padding is covered by its children.
    if (this.closeOnBackdropClick && event.target === this.dialog.nativeElement) {
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
