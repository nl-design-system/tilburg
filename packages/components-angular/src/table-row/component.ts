import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '[tilburg-table-row]',
  templateUrl: 'index.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.utrecht-table__row]': 'true',
    role: 'table-row',
  },
  standalone:false
})
export class TilburgTableRowAttr {
  constructor() {}
}
