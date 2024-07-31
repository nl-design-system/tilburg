import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '[tilburg-link]',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  inputs: ['rel'],
  host: {
    '[attr.rel]': 'external ? (rel ? rel + " " : "") + "external noopener noreferer" : rel',
    '[class.utrecht-link]': 'true',
    '[class.utrecht-link--html-a]': 'true',
    '[class.utrecht-link--external]': 'external',
  },
})
export class TilburgLinkAttr {
  @Input() external = false;
  constructor() {}
}
