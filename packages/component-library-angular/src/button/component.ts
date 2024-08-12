import { ChangeDetectionStrategy, Component, EventEmitter, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'tilburg-button',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  inputs: ['disabled', 'type'],
})
export class TilburgButtonAttr {
  @Input() disabled: boolean = false;

  @Input() clickHandler?: EventEmitter<Event>;

  constructor() {}
}
