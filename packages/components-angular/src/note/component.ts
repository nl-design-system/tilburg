import { booleanAttribute, Component, Input, ViewEncapsulation } from '@angular/core';

export type TilburgNoteVariant = 'info' | 'success' | 'warning' | 'danger';

/* Same API values as Alert; the DOM uses Utrecht's note modifiers (danger → error). */
const VARIANT_TO_UTRECHT: Record<TilburgNoteVariant, string> = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'error',
};

// `ViewEncapsulation.None`: the components-css rule `.utrecht-note > *` must reach the projected children; emulated
// encapsulation would scope it away. Selectors stay under `.utrecht-note`.
@Component({
  selector: 'tilburg-note',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: false,
})
export class TilburgNote {
  /** Feedback colour; none gives the neutral grey note. */
  @Input() variant?: TilburgNoteVariant | null;
  /** Render `<aside>` (a complementary landmark) instead of `<section role="note">`. */
  @Input({ transform: booleanAttribute }) aside = false;
  @Input() ariaLabel?: string | null;
  @Input() ariaLabelledBy?: string | null;

  get variantClass(): string | null {
    return this.variant ? `utrecht-note--${VARIANT_TO_UTRECHT[this.variant]}` : null;
  }
}
