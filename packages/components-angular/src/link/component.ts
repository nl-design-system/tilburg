import { Component, Input } from '@angular/core';

export type AriaCurrent = 'page' | 'step' | 'location' | 'date' | 'time' | boolean;

@Component({
  selector: 'tilburg-link',
  templateUrl: 'index.html',
  standalone: false,
})
export class TilburgLink {
  @Input() external = false;
  @Input() rel?;
  @Input() href?;
  @Input() target?;
  @Input() ariaLabel?: string;
  @Input() ariaDescribedBy?: string;
  @Input() current?: AriaCurrent;

  constructor() {}
}
