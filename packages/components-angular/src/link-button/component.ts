import { Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-link-button',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgLinkButton {
  @Input() type = 'button';
  @Input() disabled = false;
  @Input() inline = false;
  @Input() pressed?: boolean;
  @Input() ariaLabel?: string;
  @Input() ariaDescribedBy?: string;
}
