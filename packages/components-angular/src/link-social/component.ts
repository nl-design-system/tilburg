import { Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-link-social',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgLinkSocial {
  @Input() href?: string;
  /** The accessible name: the link only holds an icon. */
  @Input() ariaLabel?: string;
  /** Social links are external: `rel="external noopener noreferrer"` unless `false`. */
  @Input() external = true;
}

/** The `<ul>` around social links; project `<li class="utrecht-list-social__item">` items. */
@Component({
  selector: 'tilburg-list-social',
  templateUrl: 'list.html',
  styles: [':host { display: block; }'],
  standalone: false,
})
export class TilburgListSocial {
  @Input() ariaLabel?: string;
  @Input() ariaLabelledBy?: string;
}
