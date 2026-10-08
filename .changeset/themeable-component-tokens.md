---
"@gemeente-tilburg/design-tokens": minor
"@gemeente-tilburg/components-react": minor
"@gemeente-tilburg/components-angular": minor
---

Make more of the components themeable through tokens, without any visual change for the Tilburg and BAT themes: every
new token has the value the CSS used before, and the CSS keeps that value as fallback.

- Combobox: `--utrecht-combobox-popover-z-index` is now set (`10`), so the open list no longer falls behind positioned
  content further down the page (a page footer, for example).
- Accordion: the label reads `--tilburg-accordion-button-font-weight` (now `700`; it was the Figma string `Bold`, which
  is not a valid CSS font weight).
- Colours that were painted straight from the palette now read a component token first: combobox (focus, disabled,
  icon hover, chip focus, option active/selected), modal (background, border radius), badge status (background and
  text per status) and checkbox (invalid, checked + focus).
- Motion: a small scale `--tilburg-motion-duration-{short,medium,long}` and `--tilburg-motion-easing-{standard,
emphasized}`; the accordion, progress bar and modal use it. The modal animation is now set by tokens instead of on
  the component, so a theme can change it.
- High contrast (opt-in): `dist/high-contrast.css` and the class `tilburg-high-contrast`, on the same element as the
  theme class. Black background, white text and outlines, for every theme.
