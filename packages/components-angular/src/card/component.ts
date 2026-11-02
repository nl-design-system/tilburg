import { Component, Input, ViewEncapsulation } from '@angular/core';

// `ViewEncapsulation.None`: the components-css card rules for the projected image (`.utrecht-card__image img`) and
// `.utrecht-card__content:not(:has(img))` must reach projected content; emulated encapsulation would scope them away.
// Selectors stay under `.utrecht-card`.
@Component({
  selector: 'tilburg-card',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: false,
})
export class TilburgCard {
  /** Heading text; with `href` it is the link text and the card's accessible name. */
  @Input() heading?: string | null;
  @Input() headingLevel: 1 | 2 | 3 | 4 | 5 | 6 = 3;
  /** Makes the heading a link that covers the whole card. */
  @Input() href?: string | null;
}
