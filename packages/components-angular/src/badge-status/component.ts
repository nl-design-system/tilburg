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
  /** Defaults to `assertive` for an urgent status (danger, error, invalid) and `polite` otherwise. */
  @Input() liveRegion?: 'polite' | 'assertive' | 'off';

  /** An urgent status is announced as an alert (bq-tlb-frontend 3b9998c); the rest as a polite status. */
  get urgent(): boolean {
    return ['danger', 'error', 'invalid'].includes(this.status ?? '');
  }
}
