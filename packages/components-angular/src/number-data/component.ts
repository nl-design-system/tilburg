import { Component, Input } from '@angular/core';

export type TilburgNumberDataVariant = 'positive' | 'negative';

@Component({
  selector: 'tilburg-number-data',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgNumberData {
  /** The machine-readable number (valid floating-point number notation). */
  @Input() value?: number | string;
  /** Colours the number; still write the sign in the text. */
  @Input() variant?: TilburgNumberDataVariant;
}
