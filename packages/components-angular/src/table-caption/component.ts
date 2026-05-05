import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '[tilburg-table-caption]',
  templateUrl: 'index.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[attr.id]': 'id || null',
    '[class.utrecht-table__caption]': 'true',
  },
  standalone: false,
})
export class TilburgTableCaptionAttr {
  @Input() id?: string;
  constructor() {}
}
