import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '[tilburg-table-header-cell]',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[attr.role]': "scope === 'col' ? 'columnheader' : scope === 'row' ? 'rowheader' : undefined",
    '[class.utrecht-table__table-header-cell]': 'true',
  },
})
export class TilburgTableHeaderCellAttr {
  @Input() scope?: string;
  constructor() {}
}
