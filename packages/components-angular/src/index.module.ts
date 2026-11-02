import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UtrechtComponentsModule } from '@utrecht/component-library-angular';
import { TilburgAccordion, TilburgAccordionSection } from './accordion/component';
import { TilburgAlert } from './alert/component';
import { TilburgArticle } from './article/component';
import { TilburgBadgeStatus } from './badge-status/component';
import { TilburgBlockquote } from './blockquote/component';
import { TilburgBreadcrumb } from './breadcrumb/component';
import { TilburgButton } from './button/component';
import { TilburgButtonGroup } from './button-group/component';
import { TilburgButtonLink } from './button-link/component';
import { TilburgCheckbox } from './checkbox/component';
import { TilburgCode } from './code/component';
import { TilburgCodeBlock } from './code-block/component';
import { TilburgCombobox } from './combobox/component';
import { TilburgDataList, TilburgDataListItem, TilburgDataListKey, TilburgDataListValue } from './data-list/component';
import { TilburgDocument } from './document/component';
import { TilburgEmphasis } from './emphasis/component';
import { TilburgFormField } from './form-field/component';
import { TilburgFormFieldDescription } from './form-field-description/component';
import { TilburgFieldset } from './form-fieldset/component';
import { TilburgFormLabel } from './form-label/component';
import { TilburgHeading1 } from './heading-1/component';
import { TilburgHeading2 } from './heading-2/component';
import { TilburgHeading3 } from './heading-3/component';
import { TilburgHeading4 } from './heading-4/component';
import { TilburgHeading5 } from './heading-5/component';
import { TilburgHeading6 } from './heading-6/component';
import { TilburgHeadingGroup } from './heading-group/component';
import { TilburgHtmlContent } from './html-content/component';
import { TilburgLanguageToggle } from './language-toggle/component';
import { TilburgLink } from './link/component';
import { TilburgLoadingSpinner } from './loading-spinner/component';
import { TilburgMark } from './mark/component';
import { TilburgModal } from './modal/component';
import { TilburgOrderedList } from './ordered-list/component';
import { TilburgPage } from './page/component';
import { TilburgPageContent } from './page-content/component';
import { TilburgPageFooter } from './page-footer/component';
import { TilburgPageHeader } from './page-header/component';
import { TilburgPagination } from './pagination/component';
import { TilburgParagraph } from './paragraph/component';
import { TilburgPasswordInput } from './password-input/component';
import { TilburgPreHeading } from './pre-heading/component';
import { TilburgProgressBar } from './progress-bar/component';
import { TilburgRadioButton } from './radio-button/component';
import { TilburgSelect } from './select/component';
import { TilburgSeparator } from './separator/component';
import { TilburgSkipLink } from './skip-link/component';
import { TilburgSubscript } from './subscript/component';
import { TilburgSuperscript } from './superscript/component';
import { TilburgTable } from './table/component';
import { TilburgTableBodyAttr } from './table-body/component';
import { TilburgTableCaptionAttr } from './table-caption/component';
import { TilburgTableCellAttr } from './table-cell/component';
import { TilburgTableFooterAttr } from './table-footer/component';
import { TilburgTableHeaderAttr } from './table-header/component';
import { TilburgTableHeaderCellAttr } from './table-header-cell/component';
import { TilburgTableRowAttr } from './table-row/component';
import { TilburgTextarea } from './textarea/component';
import { TilburgTextareaAutoresizeDirective } from './textarea/textarea-resize-directive';
import { TilburgTextbox } from './textbox/component';
import { TilburgTooltip } from './tooltip/component';
import { TilburgUnorderedList } from './unordered-list/component';
import { TilburgValidationMessage } from './validation-message/component';

const components = [
  TilburgAccordion,
  TilburgAccordionSection,
  TilburgAlert,
  TilburgArticle,
  TilburgBadgeStatus,
  TilburgBlockquote,
  TilburgBreadcrumb,
  TilburgButton,
  TilburgButtonGroup,
  TilburgButtonLink,
  TilburgCheckbox,
  TilburgCode,
  TilburgCodeBlock,
  TilburgCombobox,
  TilburgDataList,
  TilburgDataListItem,
  TilburgDataListKey,
  TilburgDataListValue,
  TilburgHeading1,
  TilburgHeading2,
  TilburgHeading3,
  TilburgHeading4,
  TilburgHeading5,
  TilburgHeading6,
  TilburgHeadingGroup,
  TilburgLanguageToggle,
  TilburgLink,
  TilburgLoadingSpinner,
  TilburgMark,
  TilburgModal,
  TilburgFormField,
  TilburgFormFieldDescription,
  TilburgFieldset,
  TilburgOrderedList,
  TilburgPage,
  TilburgPageContent,
  TilburgPageFooter,
  TilburgPageHeader,
  TilburgPagination,
  TilburgParagraph,
  TilburgPasswordInput,
  TilburgPreHeading,
  TilburgProgressBar,
  TilburgTable,
  TilburgTableBodyAttr,
  TilburgTableCaptionAttr,
  TilburgTableCellAttr,
  TilburgTableFooterAttr,
  TilburgTableHeaderAttr,
  TilburgTableHeaderCellAttr,
  TilburgTableRowAttr,
  TilburgDocument,
  TilburgEmphasis,
  TilburgHtmlContent,
  TilburgFormLabel,
  TilburgSelect,
  TilburgSeparator,
  TilburgSkipLink,
  TilburgSubscript,
  TilburgSuperscript,
  TilburgTextareaAutoresizeDirective,
  TilburgTextarea,
  TilburgTextbox,
  TilburgRadioButton,
  TilburgTooltip,
  TilburgUnorderedList,
  TilburgValidationMessage,
];

@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [CommonModule, ReactiveFormsModule, UtrechtComponentsModule],
  providers: [],
})
export class TilburgComponentsModule {}
