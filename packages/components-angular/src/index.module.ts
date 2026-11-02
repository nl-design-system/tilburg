import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UtrechtComponentsModule } from '@utrecht/component-library-angular';
import { TilburgAccordion, TilburgAccordionSection } from './accordion/component';
import { TilburgActionGroup } from './action-group/component';
import { TilburgAlert } from './alert/component';
import { TilburgArticle } from './article/component';
import { TilburgBadgeList } from './badge-list/component';
import { TilburgBadgeStatus } from './badge-status/component';
import { TilburgBlockquote } from './blockquote/component';
import { TilburgBreadcrumb } from './breadcrumb/component';
import { TilburgButton } from './button/component';
import { TilburgButtonGroup } from './button-group/component';
import { TilburgButtonLink } from './button-link/component';
import { TilburgCheckbox } from './checkbox/component';
import { TilburgCode } from './code/component';
import { TilburgCodeBlock } from './code-block/component';
import { TilburgColorSample } from './color-sample/component';
import { TilburgCombobox } from './combobox/component';
import { TilburgCurrencyData } from './currency-data/component';
import { TilburgDataBadge } from './data-badge/component';
import { TilburgDataList, TilburgDataListItem, TilburgDataListKey, TilburgDataListValue } from './data-list/component';
import { TilburgDataPlaceholder } from './data-placeholder/component';
import { TilburgDatetimeValue } from './datetime-value/component';
import { TilburgDocument } from './document/component';
import { TilburgEmphasis } from './emphasis/component';
import { TilburgFigure } from './figure/component';
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
import { TilburgIbanData } from './iban-data/component';
import { TilburgIcon } from './icon/component';
import { TilburgImage } from './image/component';
import { TilburgLanguageToggle } from './language-toggle/component';
import { TilburgLink } from './link/component';
import { TilburgLinkButton } from './link-button/component';
import { TilburgLinkList } from './link-list/component';
import { TilburgLinkSocial, TilburgListSocial } from './link-social/component';
import { TilburgLoadingSpinner } from './loading-spinner/component';
import { TilburgMark } from './mark/component';
import { TilburgModal } from './modal/component';
import { TilburgMultilineData } from './multiline-data/component';
import { TilburgNavBar } from './nav-bar/component';
import { TilburgNavList } from './nav-list/component';
import { TilburgNumberData } from './number-data/component';
import { TilburgOrderedList } from './ordered-list/component';
import { TilburgPage } from './page/component';
import { TilburgPageContent } from './page-content/component';
import { TilburgPageFooter } from './page-footer/component';
import { TilburgPageHeader } from './page-header/component';
import { TilburgPagination } from './pagination/component';
import { TilburgParagraph } from './paragraph/component';
import { TilburgPasswordInput } from './password-input/component';
import { TilburgPreHeading } from './pre-heading/component';
import { TilburgPreserveData } from './preserve-data/component';
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
import { TilburgToptaskLink } from './toptask-link/component';
import { TilburgToptaskNav } from './toptask-nav/component';
import { TilburgUnorderedList } from './unordered-list/component';
import { TilburgUrlData } from './url-data/component';
import { TilburgValidationMessage } from './validation-message/component';

const components = [
  TilburgAccordion,
  TilburgAccordionSection,
  TilburgActionGroup,
  TilburgAlert,
  TilburgArticle,
  TilburgBadgeList,
  TilburgBadgeStatus,
  TilburgBlockquote,
  TilburgBreadcrumb,
  TilburgButton,
  TilburgButtonGroup,
  TilburgButtonLink,
  TilburgCheckbox,
  TilburgColorSample,
  TilburgCode,
  TilburgCodeBlock,
  TilburgCombobox,
  TilburgCurrencyData,
  TilburgDataBadge,
  TilburgDataList,
  TilburgDataListItem,
  TilburgDataListKey,
  TilburgDataListValue,
  TilburgDataPlaceholder,
  TilburgDatetimeValue,
  TilburgFigure,
  TilburgHeading1,
  TilburgHeading2,
  TilburgHeading3,
  TilburgHeading4,
  TilburgHeading5,
  TilburgHeading6,
  TilburgHeadingGroup,
  TilburgLanguageToggle,
  TilburgLink,
  TilburgLinkButton,
  TilburgLinkList,
  TilburgLinkSocial,
  TilburgListSocial,
  TilburgLoadingSpinner,
  TilburgMark,
  TilburgModal,
  TilburgMultilineData,
  TilburgNavBar,
  TilburgNavList,
  TilburgNumberData,
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
  TilburgPreserveData,
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
  TilburgIbanData,
  TilburgIcon,
  TilburgImage,
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
  TilburgToptaskLink,
  TilburgToptaskNav,
  TilburgUnorderedList,
  TilburgUrlData,
  TilburgValidationMessage,
];

@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [CommonModule, ReactiveFormsModule, UtrechtComponentsModule],
  providers: [],
})
export class TilburgComponentsModule {}
