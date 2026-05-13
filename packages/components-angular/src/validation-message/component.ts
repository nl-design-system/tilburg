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
  @Input() ariaLive: TilburgValidationLiveRegion = 'polite';

  get resolvedType(): TilburgValidationMessageType {
    return this.type === 'warning' ? 'warning' : 'error';
  }
}
