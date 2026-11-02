import { Component, Input, ViewEncapsulation } from '@angular/core';

export type TilburgActionGroupDirection = 'row' | 'column' | 'column-stretch';

/* `ViewEncapsulation.None`: the row rule `.utrecht-action-group .utrecht-link-button` must reach the link buttons of
   projected `<tilburg-link-button>`s, which carry another component's encapsulation attribute. Every selector in the
   stylesheet stays scoped under `.utrecht-action-group` (or the host tag). */
@Component({
  selector: 'tilburg-action-group',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: false,
})
export class TilburgActionGroup {
  @Input() direction: TilburgActionGroupDirection = 'row';
  @Input() role: string = 'group';
  @Input() ariaLabel?: string;
  @Input() ariaLabelledBy?: string;
}
