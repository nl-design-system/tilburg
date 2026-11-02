import { Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-nav-bar',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgNavBar {
  @Input() ariaLabel: string | null | undefined = 'Hoofdmenu';
}
