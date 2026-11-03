import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  inject,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { announce } from '../utils/announce';

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
/* Default glyph per variant, the same path as the HTML reference's `<svg>`. */
const VARIANT_GLYPH: Record<TilburgAlertVariant, string> = {
  info: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-6h2v6Zm0-8h-2V7h2v2Z',
  success: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1.4 14.6L6 12l1.4-1.4 3.2 3.2 6-6L18 9.2l-7.4 7.4Z',
  warning: 'M1 21h22L12 2 1 21Zm12-3h-2v-2h2v2Zm0-4h-2v-4h2v4Z',
  danger:
    'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm5 13.6L15.6 17 12 13.4 8.4 17 7 15.6 10.6 12 7 8.4 8.4 7 12 10.6 15.6 7 17 8.4 13.4 12 17 15.6Z',
};

/* The alert type, read out before the message (bq-tlb-frontend TIL-51): the colour and icon show it visually only. */
const DEFAULT_SR_PREFIX: Record<string, string> = {
  info: 'Informatie:',
  success: 'Succes:',
  warning: 'Waarschuwing:',
  danger: 'Fout:',
};

@Component({
  selector: 'tilburg-alert',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: false,
})
export class TilburgAlert implements AfterViewChecked {
  @Input() variant: TilburgAlertVariant | null | undefined = 'info';
  @Input() title?: string | null;
  /** `title` is an input here, but a static `title="…"` would also land on the host element as the native
   *  attribute (a browser tooltip and an extra accessible description). Keep it off the host. */
  @HostBinding('attr.title') readonly hostTitle = null;
  @Input() headingLevel: 1 | 2 | 3 | 4 | 5 | 6 = 3;
  @Input() closable: boolean | null | undefined = false;
  @Input() liveRegion: TilburgAlertLiveRegion = 'polite';
  @Input() ariaLabel?: string | null;
  @Input() closeButtonAriaLabel = 'sluit alert';
  /** Visually hidden text prepended to the alert message for screen readers (e.g. "Fout:", "Waarschuwing:").
   *  Defaults per variant; pass `''` or `null` for none. */
  @Input() srPrefix?: string | null;
  /** Read the alert out through a persistent live region when it appears and when its text changes. Use it for an alert
   *  that is rendered together with its text (e.g. after a submit), which a live region on the alert itself often
   *  does not announce (TIL-40). The alert then has no live role of its own, so it is not read twice. */
  @Input() announce = false;

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private lastAnnounced = '';

  get resolvedSrPrefix(): string | null {
    return this.srPrefix === undefined ? (DEFAULT_SR_PREFIX[this.resolvedVariant] ?? null) : this.srPrefix;
  }

  @Output() closed = new EventEmitter<void>();

  get resolvedVariant(): TilburgAlertVariant {
    return this.variant ?? 'info';
  }

  get iconPath(): string {
    return VARIANT_GLYPH[this.resolvedVariant];
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

  /* After every check, but only announces when the text differs from what was read last. */
  ngAfterViewChecked(): void {
    if (!this.announce || this.resolvedLiveRegion === 'off') return;
    /* Title and message are separate blocks: join them with a space so they do not run together. */
    const content = this.host.nativeElement.querySelector('.utrecht-alert__content');
    const text = Array.from(content?.children ?? [], (part) => part.textContent?.trim() ?? '')
      .filter(Boolean)
      .join(' ');
    if (text && text !== this.lastAnnounced) {
      this.lastAnnounced = text;
      announce(text, this.resolvedLiveRegion);
    }
  }

  onClose(): void {
    this.closed.emit();
  }
}
