import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '[tilburg-document]',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.utrecht-document]': 'true',
  },
})
export class TilburgDocument {
  constructor() {}
}
