import { Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-html-content',
  templateUrl: 'index.html',
  standalone: false,
})
export class TilburgHtmlContent {
  @Input() lang?: string;
  constructor() {}
}
