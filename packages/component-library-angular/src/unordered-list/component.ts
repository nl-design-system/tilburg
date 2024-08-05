import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '[tilburg-unordered-list]',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    role: 'list',
    '[class.utrecht-unordered-list]': 'true',
  },
})
export class TilburgUnorderedListAttr {
  constructor() {}
}
