---
"@gemeente-tilburg/design-tokens": minor
"@gemeente-tilburg/components-react": patch
"@gemeente-tilburg/components-angular": patch
---

Accessibility fixes (WCAG 2.2 AA), some of which change the look of existing components:

- The feedback text colours now meet 4.5:1 on white: informative blue-400 (was blue-300), positive green-400 (was
  green-300), negative red-400 in the Tilburg theme (was red-300; BAT keeps its red-900), and warning a new
  `--tilburg-color-orange-500` (was orange-300). This darkens validation and warning messages, alert icons and
  everything else that uses these tokens as a text or icon colour. Borders keep their lighter shade (they pass 3:1).
- Badge Status (info, neutral, safe, warning) and Breadcrumb links use the same darker shades.
- Page Header: a subtle button on the blue header is white instead of pink (was 1.9:1).
- Loading Spinner: the labelled overlay gets `role="group"` (an `aria-label` on a plain `<div>` is not allowed).
- Top Nav lets its items wrap instead of running off the screen at 320px; Combobox and Listbox mark the
  keyboard-active option with the focus outline and keep the selected option readable in forced-colors mode; Index
  Char Nav marks the current character in forced-colors mode.
- Tokens: the code font falls back to a monospace font, Data Placeholder uses gray-400 (3:1 for non-text UI), and
  `--utrecht-focus-outline-offset` gets its missing `px` unit.
