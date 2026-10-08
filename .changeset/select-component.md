---
"@gemeente-tilburg/components-react": minor
"@gemeente-tilburg/components-angular": minor
"@gemeente-tilburg/design-tokens": patch
---

Add the Select component: a native `<select class="utrecht-select utrecht-select--html-select">` with the Tilburg
chevron (the combobox chevron, and a white one in high contrast) and the textbox hover state. React `Select` takes
`<option>` children; Angular `<tilburg-select>` takes `options` (`{ value, label, disabled? }`) with either a
`FormControl` (`control`) or `value` + `(valueChange)`, and keeps the `id` on the inner `<select>` so `<label for>`
works.
