---
"@gemeente-tilburg/components-react": minor
---

Port the full Angular component catalogue (43 components) to React as
self-contained wrappers that render the exact DOM Tilburg's Angular
templates produce. The React library no longer depends on
`@utrecht/component-library-react` or `@utrecht/button-react` — every
component is a minimal React function that emits the correct
`utrecht-*` / `tilburg-*` class set against raw HTML elements, so the
`@gemeente-tilburg/components-css` SCSS cascade applies identically to
Angular and React consumers.

Components added: Accordion (+ AccordionSection), Alert, Article,
BadgeStatus, Breadcrumb, ButtonGroup, ButtonLink, Checkbox, DataList
(+ Item, Key, Value), Document, Fieldset, FormField, FormFieldDescription,
FormLabel, Heading1–6, HtmlContent, LanguageToggle, Link, LoadingSpinner,
OrderedList, Page, PageContent, PageFooter, PageHeader, Pagination,
Paragraph, ProgressBar, RadioButton, Separator, Table (+ Body, Caption,
Cell, Footer, Header, HeaderCell, Row), Textarea, Textbox, UnorderedList,
ValidationMessage. The existing `Button` is upgraded to accept `size`,
`appearance`, `pressed`, `busy`, `disabled`, mapped 1:1 to the same
`utrecht-button*` state classes the Angular directive emits.

`Accordion` + `AccordionSection` mirror the Angular template
(`<div class="utrecht-accordion">` containing `<button
class="utrecht-button utrecht-button--subtle utrecht-accordion__button">`

- `<div class="utrecht-accordion__panel">`) so the Tilburg icon-slot
  contract is preserved. They do NOT use `<details>` / `<summary>`.

`HtmlContent` renders `<div class="utrecht-html-content">` directly;
`Fieldset` renders `<fieldset class="utrecht-fieldset">` directly — no
bridge-class plumbing required.

Tilburg SCSS dual-targets element + class for headings and form-field
(`utrecht-heading-N, .utrecht-heading-N`; `utrecht-form-field.tilburg-warning,
.utrecht-form-field.tilburg-warning`) so both Angular's custom-element
render and React's class-based render pick up the styles.

Bundle is now ~55 KB ESM / 38 KB CJS (was ~316 KB / 273 KB when Utrecht React
was bundled). Consumers should import:

- `@gemeente-tilburg/design-tokens/dist/tilburg/theme.css` (tokens),
- `@utrecht/component-library-css/dist/index.css` (Utrecht base reset),
- `@gemeente-tilburg/components-react/dist/style.css` (Tilburg overrides).

Package is now `private: false` (published) and ships ESM + CJS + `.d.ts`.
