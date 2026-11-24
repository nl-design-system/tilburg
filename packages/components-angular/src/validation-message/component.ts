import { Component, Input } from '@angular/core';

export type TilburgValidationMessageType = 'error' | 'warning';
export type TilburgValidationLiveRegion = 'polite' | 'assertive' | 'off';

/* Default glyph per type, the same path as the HTML reference's `<svg>`. */
const TYPE_GLYPH: Record<TilburgValidationMessageType, string> = {
  error: 'M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm1 13H9v-2h2v2Zm0-4H9V5h2v5Z',
  warning: 'M10 1 1 19h18L10 1Zm0 5 1 7h-2l1-7Zm0 9a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z',
};

@Component({
  selector: 'tilburg-validation-message',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgValidationMessage {
  @Input() type?: string | null = 'error';
  /** `assertive` (default) renders an alert, `polite` a status, `off` no live role. */
  @Input() ariaLive: TilburgValidationLiveRegion = 'assertive';

  get role(): 'alert' | 'status' | null {
    return this.ariaLive === 'assertive' ? 'alert' : this.ariaLive === 'polite' ? 'status' : null;
  }

  get iconPath(): string {
    return TYPE_GLYPH[this.resolvedType];
  }

  get resolvedType(): TilburgValidationMessageType {
    return this.type === 'warning' ? 'warning' : 'error';
  }
}
