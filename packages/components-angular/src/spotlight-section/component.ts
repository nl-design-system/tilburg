import { booleanAttribute, Component, Input } from '@angular/core';

export type TilburgSpotlightSectionVariant = 'info' | 'success' | 'warning' | 'danger';

/* Same API values as Alert; the DOM uses Utrecht's ok/error modifiers. */
const VARIANT_TO_UTRECHT: Record<TilburgSpotlightSectionVariant, string> = {
  info: 'info',
  success: 'ok',
  warning: 'warning',
  danger: 'error',
};

@Component({
  selector: 'tilburg-spotlight-section',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgSpotlightSection {
  /** Feedback colour; none gives the neutral grey block. */
  @Input() variant?: TilburgSpotlightSectionVariant | null;
  /** Render `<aside>` instead of `<section>`. */
  @Input({ transform: booleanAttribute }) aside = false;
  @Input() ariaLabel?: string | null;
  @Input() ariaLabelledBy?: string | null;

  get variantClass(): string | null {
    return this.variant ? `utrecht-spotlight-section--${VARIANT_TO_UTRECHT[this.variant]}` : null;
  }
}
