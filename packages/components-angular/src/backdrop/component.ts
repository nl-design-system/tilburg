import { booleanAttribute, Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-backdrop',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgBackdrop {
  /** Cover the whole viewport (`position: fixed`) instead of the nearest positioned ancestor. */
  @Input({ transform: booleanAttribute }) viewport = false;
}
