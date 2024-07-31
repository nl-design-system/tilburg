import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'tilburg-page',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TilburgPage {
  constructor() {}
}
