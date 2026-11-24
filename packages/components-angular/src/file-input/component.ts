import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

/** A drop zone to add files to a form. Content projected into it is shown under the button: what may be uploaded. */
@Component({
  selector: 'tilburg-file-input',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgFileInput {
  @Input() id?: string = undefined;

  /** The id belongs on the inner native control, so `<label for>` resolves to it; strip it from the host so it is not
   *  on the page twice (same approach as `TilburgCombobox`). */
  @HostBinding('attr.id') readonly hostId: null = null;

  @Input() name?: string;
  @Input() multiple = false;
  /** File types the file dialog offers, as in `<input accept>`. A browser does not hold a dropped file to it. */
  @Input() accept?: string;
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() required = false;
  /** The text in the drop zone, above the button. */
  @Input() dropLabel?: string;
  /** The text on the button. Also the accessible name when there is no `id` (for a `<label>`) or `ariaLabel(ledBy)`. */
  @Input() buttonLabel?: string;
  /** List the chosen files under the drop zone. Turn it off when you upload a file right away and show it elsewhere:
   *  the input is then emptied after each choice, so the same file can be chosen again. */
  @Input() showFiles = true;
  /** Uploading: a spinner with `busyLabel` covers the drop zone and no file can be added. */
  @Input() busy = false;
  /** The text under the spinner, also announced to screen readers. */
  @Input() busyLabel = 'Bezig met uploaden…';
  @Input() ariaLabel?: string;
  @Input() ariaLabelledBy?: string;
  @Input() ariaDescribedBy?: string;

  /** The chosen or dropped files. */
  @Output() filesChange = new EventEmitter<File[]>();

  files: File[] = [];
  dragOver = false;

  get resolvedDropLabel(): string {
    return this.dropLabel ?? (this.multiple ? 'Sleep uw bestanden hierheen of' : 'Sleep uw bestand hierheen of');
  }

  get resolvedButtonLabel(): string {
    return this.buttonLabel ?? (this.multiple ? 'Bestanden kiezen' : 'Bestand kiezen');
  }

  get resolvedAriaLabel(): string | null {
    return this.ariaLabel || (this.id || this.ariaLabelledBy ? null : this.resolvedButtonLabel);
  }

  onChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const chosen = Array.from(input.files ?? []);
    this.filesChange.emit(chosen);
    if (this.showFiles) this.files = chosen;
    else input.value = '';
  }
}
