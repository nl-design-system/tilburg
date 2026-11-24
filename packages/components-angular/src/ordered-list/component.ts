import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'tilburg-ordered-list',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
  /* Not emulated: the item styling (`.utrecht-ordered-list--html-ol > li`, `::marker`) must reach the projected `<li>`, which emulated encapsulation would scope away. */
  encapsulation: ViewEncapsulation.None,
})
export class TilburgOrderedList {
  @Input() byLetter = false;
}
