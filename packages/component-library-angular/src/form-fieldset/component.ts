import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '[tilburg-fieldset]',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.utrecht-fieldset]': 'true',
    '[class.utrecht-form-fieldset--html-fieldset]': 'true',
    '[class.utrecht-form-fieldset--disabled]': 'disabled || null',
    '[class.utrecht-form-fieldset--invalid]': 'invalid || null',
  },
})
export class TilburgFieldsetAttr {
  @Input() disabled?: boolean = false;
  @Input() invalid?: boolean = false;
  constructor() {}
}
