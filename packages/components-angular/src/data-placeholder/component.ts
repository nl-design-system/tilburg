import { booleanAttribute, Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-data-placeholder',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgDataPlaceholder {
  /** Adds `utrecht-data-placeholder--loading` (busy cursor). */
  @Input({ transform: booleanAttribute }) loading = false;
}
