import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'tilburg-form',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
  /* The field spacing (`.utrecht-form > * + *`) must reach projected fields, which emulated encapsulation would scope away. */
  encapsulation: ViewEncapsulation.None,
})
export class TilburgForm {
  @Input() id?: string;
  /** The id belongs on the inner `<form>` (for `<button form="…">`); strip it from the host so it is not on the page
   *  twice (same approach as `TilburgCheckbox`). */
  @HostBinding('attr.id') readonly hostId: null = null;
  @Input() ariaLabel?: string;
  @Input() ariaLabelledBy?: string;
  /** Sets `novalidate`: the browser leaves validation (and its error bubbles) to the app. */
  @Input() noValidate: boolean = false;
}
