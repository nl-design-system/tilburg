import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '[tilburg-table-footer]',
  templateUrl: 'index.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.utrecht-table__footer]': 'true',
  },
  standalone: false,
})
export class TilburgTableFooterAttr {
  constructor() {}
}
