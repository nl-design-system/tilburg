---
"@gemeente-tilburg/components-react": minor
"@gemeente-tilburg/components-angular": minor
"@gemeente-tilburg/design-tokens": patch
---

New Tilburg components, brought over from bq-tlb-frontend:

- **Password input** (TIL-72): a password textbox with a show/hide toggle button. The button keeps the label
  "Wachtwoord tonen" and reports its state with `aria-pressed`; a status line says "Wachtwoord is zichtbaar." /
  "Wachtwoord is verborgen." after each click. 44px target, visible focus, reduced motion and forced-colours support,
  and Edge's own reveal eye hidden. React `PasswordInput`, Angular `<tilburg-password-input>`, Web Component
  `<tilburg-wbc-password-input>`, and an `enhancePasswordInput()` script for plain HTML.
- **Tooltip** (TIL-53/54): a short description of a control, meeting WCAG 1.4.13: opens on hover (with a short delay)
  and focus, closes on Escape, the pointer can move onto it, a tap toggles it on touch screens. The trigger keeps its
  name and gets the tooltip added to its `aria-describedby`. React `Tooltip`, Angular `<tilburg-tooltip>`, Web
  Component `<tilburg-wbc-tooltip>`, and an `enhanceTooltip()` script for plain HTML. A white border in high contrast.
  It stays in view: when the preferred side has no room (top of the page, or the edge of an `overflow: hidden`
  container such as a table cell) it opens on the other side, and it shifts sideways instead of sticking out past the
  left or right edge.

Fix: Angular `<tilburg-textbox type="…">` rendered every field as a text field — `type` only reached the utrecht
directive, which never writes it to the element — so a password field showed the password. The real input type is now
set.
