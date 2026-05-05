import { Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-separator',
  templateUrl: 'index.html',
  standalone: false,
})
export class TilburgSeparator {
  @Input() decorative: boolean = false;
  constructor() {}
}
