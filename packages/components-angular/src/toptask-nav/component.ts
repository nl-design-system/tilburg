import { Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-toptask-nav',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgToptaskNav {
  @Input() grid = false;
  @Input() ariaLabel: string | null | undefined = 'Veelgevraagd';
}
