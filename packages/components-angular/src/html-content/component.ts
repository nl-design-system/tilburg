import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'tilburg-html-content',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
  /* Not emulated: the typography rules must reach projected and `[innerHTML]` content, which emulated encapsulation would scope away. */
  encapsulation: ViewEncapsulation.None,
})
export class TilburgHtmlContent {
  @Input() lang?: string;

  /** CMS-authored HTML string. Rendered inside the styled `.utrecht-html-content`
   *  div and sanitized by Angular's DomSanitizer. Leave unset to project content
   *  as children instead. */
  @Input() html?: string | null;
}
