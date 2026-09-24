import { Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-badge-status',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgBadgeStatus {
  @Input() status?: string;
  @Input() ariaLabel?: string;
  @Input() liveRegion: 'polite' | 'assertive' | 'off' = 'polite';
}
