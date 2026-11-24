import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'tilburg-data-list',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
  /* Not emulated: `.tilburg-data-list--large .tilburg-data-list__item` spans the `<dl>` and the row `<div>`, which live
     in different component templates, so emulated encapsulation would scope the rule away. */
  encapsulation: ViewEncapsulation.None,
})
export class TilburgDataList {
  @Input() large = false;
}

@Component({
  selector: 'tilburg-data-list-item',
  template: '<div class="tilburg-data-list__item"><ng-content></ng-content></div>',
  styleUrls: ['index.scss'],
  standalone: false,
  encapsulation: ViewEncapsulation.None,
})
export class TilburgDataListItem {}

@Component({
  selector: 'tilburg-data-list-key',
  template: '<dt class="tilburg-data-list__key" [attr.id]="id || null"><ng-content></ng-content></dt>',
  styleUrls: ['index.scss'],
  standalone: false,
  encapsulation: ViewEncapsulation.None,
})
export class TilburgDataListKey {
  @Input() id?: string;
}

@Component({
  selector: 'tilburg-data-list-value',
  template: '<dd class="tilburg-data-list__value"><ng-content></ng-content></dd>',
  styleUrls: ['index.scss'],
  standalone: false,
  encapsulation: ViewEncapsulation.None,
})
export class TilburgDataListValue {}
