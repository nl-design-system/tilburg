import { Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-badge-status',
  templateUrl: 'index.html',
})
export class TilburgBadgeStatus {
  @Input() status?: string;
  constructor() {}
}
