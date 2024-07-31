import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TilburgBadgeStatus } from './badge-status/component';
import { TilburgButtonAttr } from './button/component';
import { TilburgButtonGroup } from './button-group/component';
import { TilburgButtonLinkAttr } from './button-link/component';
import { TilburgCheckboxAttr } from './checkbox/component';
import { TilburgColorSample } from './color-sample/component';
import { TilburgDocument } from './document/component';
import { TilburgFormField } from './form-field/component';
import { TilburgFormFieldDescription } from './form-field-description/component';
import { TilburgFieldsetAttr } from './form-fieldset/component';
import { TilburgFormLabelAttr } from './form-label/component';
import { TilburgHeading1 } from './heading-1/component';
import { TilburgHeading2 } from './heading-2/component';
import { TilburgHeading3 } from './heading-3/component';
import { TilburgHeading4 } from './heading-4/component';
import { TilburgHeading5 } from './heading-5/component';
import { TilburgHeading6 } from './heading-6/component';
import { TilburgHtmlContent } from './html-content/component';
import { TilburgLinkAttr } from './link/component';
import { TilburgPage } from './page/component';
import { TilburgRadioButtonAttr } from './radio-button/component';
import { TilburgSeparator } from './separator/component';
import { ExampleStoryComponent } from './story/component';
import { TilburgTextareaAttr } from './textarea/component';

const components = [
  ExampleStoryComponent,
  TilburgBadgeStatus,
  TilburgButtonAttr,
  TilburgButtonGroup,
  TilburgButtonLinkAttr,
  TilburgCheckboxAttr,
  TilburgColorSample,
  TilburgHeading1,
  TilburgHeading2,
  TilburgHeading3,
  TilburgHeading4,
  TilburgHeading5,
  TilburgHeading6,
  TilburgLinkAttr,
  TilburgFormField,
  TilburgFormFieldDescription,
  TilburgFieldsetAttr,
  TilburgPage,
  TilburgDocument,
  TilburgHtmlContent,
  TilburgFormLabelAttr,
  TilburgSeparator,
  TilburgTextareaAttr,
  TilburgRadioButtonAttr,
];

@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [CommonModule],
  providers: [],
})
export class ExampleComponentsModule {}
