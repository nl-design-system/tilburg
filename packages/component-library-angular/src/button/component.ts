import { Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-button',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
})
export class TilburgButton {
  @Input() appearance = 'primary-action-button';
  @Input() size = 'medium';
  @Input() type = 'button';
  @Input() disabled = false;
  @Input() small = false;
  @Input() title? = '';
}
