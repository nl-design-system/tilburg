import { Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-figure',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgFigure {
  /** Text of the `<figcaption>`; without it no caption is rendered. */
  @Input() caption?: string;
}
