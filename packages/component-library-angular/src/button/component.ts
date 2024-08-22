import { Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-button',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  host: {
    'utrecht-button': '',
  },
})
export class TilburgButtonAttr {
  @Input() appearance = 'primary-action-button';
  @Input() type = 'button';
  @Input() disabled = false;
  @Input() small = false;
}
