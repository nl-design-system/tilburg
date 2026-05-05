import { Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-table',
  templateUrl: 'index.html',
  standalone: false,
})
export class TilburgTable {
  @Input() caption?: string;
  @Input() ariaLabel?: string;
  @Input() ariaLabelledby?: string;
  @Input() ariaDescribedBy?: string;
  constructor() {}
}
