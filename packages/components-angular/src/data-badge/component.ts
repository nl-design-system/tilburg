import { Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-data-badge',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgDataBadge {
  /** Renders a `<time datetime>` (date, time or duration). Wins over `value`. */
  @Input() dateTime?: string;
  /** Renders a `<data value>` with a machine-readable value. */
  @Input() value?: string;
}
