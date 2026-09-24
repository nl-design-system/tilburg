import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'tilburg-data-list',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgDataList {
  @Input() large = false;

  @HostBinding('class.tilburg-data-list--large')
  get largeClass(): boolean {
    return this.large;
  }
}

@Component({
  selector: 'tilburg-data-list-item',
  template: '<div class="tilburg-data-list__item"><ng-content></ng-content></div>',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgDataListItem {}

@Component({
  selector: 'tilburg-data-list-key',
  template: '<dt class="tilburg-data-list__key" [attr.id]="id || null"><ng-content></ng-content></dt>',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgDataListKey {
  @Input() id?: string;
}

@Component({
  selector: 'tilburg-data-list-value',
  template: '<dd class="tilburg-data-list__value"><ng-content></ng-content></dd>',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgDataListValue {}
