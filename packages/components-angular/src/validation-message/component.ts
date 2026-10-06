import { Component, Input } from '@angular/core';

export type TilburgValidationMessageType = 'error' | 'warning';
export type TilburgValidationLiveRegion = 'polite' | 'assertive' | 'off';

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

  get resolvedType(): TilburgValidationMessageType {
    return this.type === 'warning' ? 'warning' : 'error';
  }
}
