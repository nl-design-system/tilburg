import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '[tilburg-table-cell]',
  templateUrl: 'index.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.utrecht-table__cell]': 'true',
  },
  standalone: false,
})
export class TilburgTableCellAttr {
  constructor() {}
}
