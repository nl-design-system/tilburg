import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '[tilburg-ordered-list-item]',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.utrecht-ordered-list__item]': 'true',
  },
})
export class TilburgOrderedListItemAttr {
  constructor() {}
}