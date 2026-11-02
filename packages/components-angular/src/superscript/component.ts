import { Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-superscript',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgSuperscript {
  /** Uses the font's OpenType superscript glyphs (`utrecht-superscript--open-type`). */
  @Input() openType: boolean = false;
}
