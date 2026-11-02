import { booleanAttribute, Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-column-layout',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgColumnLayout {
  /** Draw a line between the columns. */
  @Input({ transform: booleanAttribute }) rule = false;
}
