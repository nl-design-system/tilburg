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
import { TilburgOrderedListAttr } from './ordered-list/component';
import { TilburgOrderedListItemAttr } from './ordered-list/item.component';
import { TilburgPage } from './page/component';
import { TilburgPageContent } from './page-content/component';
import { TilburgPageFooter } from './page-footer/component';
import { TilburgPageHeader } from './page-header/component';
import { TilburgRadioButtonAttr } from './radio-button/component';
import { TilburgSeparator } from './separator/component';
import { ExampleStoryComponent } from './story/component';
import { TilburgTableAttr } from './table/component';
import { TilburgTableBodyAttr } from './table-body/component';
import { TilburgTableCaptionAttr } from './table-caption/component';
import { TilburgTableCellAttr } from './table-cell/component';
import { TilburgTableFooterAttr } from './table-footer/component';
import { TilburgTableHeaderAttr } from './table-header/component';
import { TilburgTableHeaderCellAttr } from './table-header-cell/component';
import { TilburgTableRowAttr } from './table-row/component';
import { TilburgTextareaAttr } from './textarea/component';
import { TilburgTextboxAttr } from './textbox/component';
import { TilburgUnorderedListAttr } from './unordered-list/component';

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
  TilburgOrderedListAttr,
  TilburgOrderedListItemAttr,
  TilburgPage,
  TilburgPageContent,
  TilburgPageFooter,
  TilburgPageHeader,
  TilburgTableAttr,
  TilburgTableBodyAttr,
  TilburgTableCaptionAttr,
  TilburgTableCellAttr,
  TilburgTableFooterAttr,
  TilburgTableHeaderAttr,
  TilburgTableHeaderCellAttr,
  TilburgTableRowAttr,
  TilburgDocument,
  TilburgHtmlContent,
  TilburgFormLabelAttr,
  TilburgSeparator,
  TilburgTextareaAttr,
  TilburgTextboxAttr,
  TilburgRadioButtonAttr,
  TilburgOrderedListAttr,
  TilburgUnorderedListAttr,
];

@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [CommonModule],
  providers: [],
})
export class TilburgComponentsModule {}
