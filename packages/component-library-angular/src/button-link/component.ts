import { Component, Input } from '@angular/core';
import { AppearanceType } from '@utrecht/component-library-angular';

@Component({
  selector: 'tilburg-button-link',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
})
export class TilburgButtonLink {
  @Input() href?: string;
  @Input() appearance?: AppearanceType;
  @Input() external = false;
  constructor() {}
}
