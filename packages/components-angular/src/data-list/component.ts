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
  template: '<ng-content></ng-content>',
  host: { class: 'tilburg-data-list__item' },
  standalone: false,
})
export class TilburgDataListItem {}

@Component({
  selector: 'tilburg-data-list-key',
  template: '<ng-content></ng-content>',
  host: { class: 'tilburg-data-list__key' },
  standalone: false,
})
export class TilburgDataListKey {
  @Input() id?: string;

  @HostBinding('attr.id')
  get hostId(): string | null {
    return this.id ?? null;
  }
}

@Component({
  selector: 'tilburg-data-list-value',
  template: '<ng-content></ng-content>',
  host: { class: 'tilburg-data-list__value' },
  standalone: false,
})
export class TilburgDataListValue {}
