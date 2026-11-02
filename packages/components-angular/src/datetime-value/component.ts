import { Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-datetime-value',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgDatetimeValue {
  /** The machine-readable date, time or date and time (`2026-11-02T09:30`). */
  @Input() dateTime?: string;
}
