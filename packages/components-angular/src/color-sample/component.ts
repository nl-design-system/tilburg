import { Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-color-sample',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgColorSample {
  /** Any CSS colour: sets the `value` attribute and the inline `color` that paints the swatch. */
  @Input() color?: string;
}
