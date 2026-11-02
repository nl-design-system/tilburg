import { Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-blockquote',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgBlockquote {
  /** Source of the quote; rendered after the content when set. */
  @Input() attribution: string = '';
}
