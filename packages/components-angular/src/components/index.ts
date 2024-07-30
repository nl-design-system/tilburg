import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TilburgButtonAttr } from './button/component';
import { TilburgRadioButtonAttr } from './radio-button/component';
import { ExampleStoryComponent } from './story/component';

const components = [ExampleStoryComponent, TilburgButtonAttr, TilburgRadioButtonAttr];

@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [CommonModule],
  providers: [],
})
export class ExampleComponentsModule {}
