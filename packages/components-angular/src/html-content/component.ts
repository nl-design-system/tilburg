import { Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-html-content',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgHtmlContent {
  @Input() lang?: string;
}
