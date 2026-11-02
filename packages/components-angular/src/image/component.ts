import { booleanAttribute, Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-image',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgImage {
  @Input() src?: string;
  /** Describe the image; `''` for a decorative image. */
  @Input() alt?: string;
  @Input() width?: number | string;
  @Input() height?: number | string;
  /** Adds `utrecht-img--photo`: scales the image down to fit its container. */
  @Input({ transform: booleanAttribute }) photo = false;
}
