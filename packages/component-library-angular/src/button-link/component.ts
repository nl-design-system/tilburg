import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

export type AppearanceType = 'primary-action-button' | 'secondary-action-button' | 'subtle-button';

@Component({
  selector: '[tilburg-button-link]',
  templateUrl: 'index.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  inputs: ['rel'],
  host: {
    '[attr.rel]': 'external ? "external noopener noreferer" : ""',
    '[class.utrecht-button-link--primary-action]': 'appearance === "primary-action-button"',
    '[class.utrecht-button-link--secondary-action]': 'appearance === "secondary-action-button"',
    '[class.utrecht-button-link--subtle-action]': 'appearance === "subtle-button"',
    '[class.utrecht-button-link--html-a]': 'true',
    '[class.utrecht-button-link]': 'true',
  },
})
// COMPONENT IS COPIED BECAUSE IT IS NOT EXPORTED BY UTRECHT
export class TilburgButtonLink {
  @Input() appearance?: AppearanceType;
  @Input() external = false;
  constructor() {}
}
