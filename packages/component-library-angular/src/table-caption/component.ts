import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '[tilburg-table-caption]',
  templateUrl: 'index.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.utrecht-table__caption]': 'true',
  },
})
export class TilburgTableCaptionAttr {
  constructor() {}
}
