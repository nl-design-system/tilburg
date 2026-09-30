import { Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-html-content',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgHtmlContent {
  @Input() lang?: string;

  /** CMS-authored HTML string. Rendered inside the styled `.utrecht-html-content`
   *  div and sanitized by Angular's DomSanitizer. Leave unset to project content
   *  as children instead. */
  @Input() html?: string | null;
}
