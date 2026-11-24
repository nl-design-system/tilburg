import { Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-preserve-data',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgPreserveData {
  /** Renders a `<data value>` around the text. */
  @Input() value?: string | null;
  /** Renders a `<time datetime>` around the text; wins over `value`. */
  @Input() dateTime?: string | null;
}
