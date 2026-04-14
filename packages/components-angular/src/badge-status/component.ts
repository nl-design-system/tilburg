import { Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-badge-status',
  templateUrl: 'index.html',
  standalone:false
})
export class TilburgBadgeStatus {
  @Input() status?: string;
  constructor() {}
}
