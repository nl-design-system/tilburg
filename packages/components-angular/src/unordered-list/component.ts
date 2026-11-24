import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'tilburg-unordered-list',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
  /* Not emulated: the item styling (`.utrecht-unordered-list--html-ul > li`, `::marker`) must reach the projected `<li>`, which emulated encapsulation would scope away. */
  encapsulation: ViewEncapsulation.None,
})
export class TilburgUnorderedList {}
