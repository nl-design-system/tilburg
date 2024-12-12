import { Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-link',
  templateUrl: 'index.html',
})
export class TilburgLink {
  @Input() external = false;
  @Input() rel?;
  @Input() href?;
  @Input() target?;

  constructor() {}
}
