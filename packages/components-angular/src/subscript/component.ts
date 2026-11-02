import { Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-subscript',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgSubscript {
  /** Uses the font's OpenType subscript glyphs (`utrecht-subscript--open-type`). */
  @Input() openType: boolean = false;
}
