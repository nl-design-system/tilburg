import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

export type TilburgAlertVariant = 'info' | 'success' | 'warning' | 'danger';
export type TilburgAlertLiveRegion = 'polite' | 'assertive' | 'off';

// API uses success/danger; DOM emits utrecht's ok/error so global
// @utrecht/component-library-css `.utrecht-alert--ok` / `--error` rules apply.
const VARIANT_TO_UTRECHT: Record<TilburgAlertVariant, string> = {
  info: 'info',
  success: 'ok',
  warning: 'warning',
  danger: 'error',
};

// `ViewEncapsulation.None` lets the SCSS rule for the icon's inner `<i>` reach
// projected `<app-icon>` content (was previously `::ng-deep`, which the repo
// stylelint config disallows). Selectors stay scoped under `.tilburg-alert`.
@Component({
  selector: 'tilburg-alert',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: false,
})
export class TilburgAlert {
  @Input() variant: TilburgAlertVariant | null | undefined = 'info';
  @Input() title?: string | null;
  @Input() headingLevel: 1 | 2 | 3 | 4 | 5 | 6 = 3;
  @Input() closable: boolean | null | undefined = false;
  @Input() liveRegion: TilburgAlertLiveRegion = 'polite';
  @Input() ariaLabel?: string | null;
  @Input() closeButtonAriaLabel = 'sluit alert';
  /** Visually hidden text prepended to the alert message for screen readers (e.g. "Fout:", "Waarschuwing:"). */
  @Input() srPrefix?: string | null;

  @Output() closed = new EventEmitter<void>();

  get resolvedVariant(): TilburgAlertVariant {
    return this.variant ?? 'info';
  }

  get variantClass(): string {
    return `utrecht-alert--${VARIANT_TO_UTRECHT[this.resolvedVariant]}`;
  }

  get resolvedRole(): 'alert' | 'status' {
    return this.resolvedVariant === 'danger' ? 'alert' : 'status';
  }

  get resolvedLiveRegion(): TilburgAlertLiveRegion {
    if (this.resolvedVariant === 'danger' && this.liveRegion === 'polite') {
      return 'assertive';
    }
    return this.liveRegion;
  }

  onClose(): void {
    this.closed.emit();
  }
}
