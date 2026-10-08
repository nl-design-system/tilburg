---
"@gemeente-tilburg/components-react": minor
"@gemeente-tilburg/components-angular": minor
---

Accessibility fixes brought over from bq-tlb-frontend (the Tilburg Blueriq app):

- Form fields are no longer red before the user has touched them: checkbox, radio button, textarea and textbox show the
  invalid look on `:user-invalid` or `aria-invalid="true"` instead of `:invalid` (TIL-69).
- Angular checkbox and radio button pass `invalid` to the utrecht directive, so `aria-invalid` and the invalid class no
  longer fight with the directive's own binding; the checkbox now binds `control` (`FormControl`).
- Alert: `srPrefix` defaults per variant ("Informatie:", "Succes:", "Waarschuwing:", "Fout:"; `''` for none) (TIL-51),
  and a new `announce` option reads the alert out through a persistent live region (TIL-40). React gets `srPrefix` too.
- Badge status: the visible text is the accessible name (the status code no longer replaces it), and `danger`, `error`
  and `invalid` are announced as an assertive alert.
- Validation message: the role follows the live region (`assertive`, now the default, is an alert; `polite` a status;
  `off` none), so `role="alert"` and `aria-live="polite"` no longer contradict each other.
- Page header: a logo without a title gets "Gemeente Tilburg" as alt text, so the brand link has a name (TIL-89).
- Modal: `aria-describedby` (Angular `ariaDescribedBy`) to link the text that explains the dialog.
- Headings wrap long words at 320px / 400% zoom (WCAG 1.4.10); table row headers in the body get the row look (TIL-88).
- Reduced motion for the accordion, progress bar and loading spinner; Windows high contrast (`forced-colors`) support
  for checkbox, radio button, combobox and select options, progress bar and modal.
