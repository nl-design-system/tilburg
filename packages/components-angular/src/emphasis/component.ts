import { Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-emphasis',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgEmphasis {
  /** Renders `<strong>` (importance) instead of `<em>` (stress emphasis). */
  @Input() strong: boolean = false;
}
