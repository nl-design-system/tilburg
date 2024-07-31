import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TilburgButtonAttr } from './button/component';
import { TilburgCheckboxAttr } from './checkbox/component';
import { TilburgFormField } from './form-field/component';
import { TilburgFormLabelAttr } from './form-label/component';
import { TilburgHeading1 } from './heading-1/component';
import { TilburgHeading2 } from './heading-2/component';
import { TilburgHeading3 } from './heading-3/component';
import { TilburgHeading4 } from './heading-4/component';
import { TilburgHeading5 } from './heading-5/component';
import { TilburgHeading6 } from './heading-6/component';
import { TilburgLinkAttr } from './link/component';
import { TilburgRadioButtonAttr } from './radio-button/component';
import { ExampleStoryComponent } from './story/component';
import { TilburgTextareaAttr } from './textarea/component';

const components = [
  ExampleStoryComponent,
  TilburgButtonAttr,
  TilburgCheckboxAttr,
  TilburgHeading1,
  TilburgHeading2,
  TilburgHeading3,
  TilburgHeading4,
  TilburgHeading5,
  TilburgHeading6,
  TilburgLinkAttr,
  TilburgFormField,
  TilburgFormLabelAttr,
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
