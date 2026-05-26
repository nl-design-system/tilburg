import { Component, Input } from '@angular/core';

export type AriaCurrent = 'page' | 'step' | 'location' | 'date' | 'time' | boolean;

@Component({
  selector: 'tilburg-link',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgLink {
  @Input() external = false;
  @Input() rel?: string;
  @Input() href?: string;
  @Input() target?: string;
  @Input() ariaLabel?: string;
  @Input() ariaDescribedBy?: string;
  @Input() current?: AriaCurrent;

  get resolvedRel(): string | null {
    if (this.external) {
      const prefix = this.rel ? `${this.rel} ` : '';
      return `${prefix}external noopener noreferrer`;
    }
    return this.rel || null;
  }
}
