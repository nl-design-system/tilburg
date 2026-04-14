import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '[tilburg-table-body]',
  templateUrl: 'index.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.utrecht-table__body]': 'true',
    role: 'table-row-group',
  },
  standalone:false
})
export class TilburgTableBodyAttr {
  constructor() {}
}
