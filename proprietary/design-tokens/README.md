<!-- @license CC0-1.0 -->

# @gemeente-tilburg/design-tokens

Design tokens for the Tilburg design system, built with [Style Dictionary](https://amzn.github.io/style-dictionary/) and exported as CSS custom properties scoped to `.tilburg-theme`.

The package ships values consumed by `@gemeente-tilburg/components-css`, `@gemeente-tilburg/components-angular`, downstream Angular apps, and Figma plugins (via `dist/tilburg/list.json`).

## How tokens are used

Tilburg's CSS layer mixes **two families** of custom properties. Both resolve at runtime via the same `.tilburg-theme` scope — what differs is who owns each name.

### 1. Tilburg-owned tokens (`--tilburg-*`)

The Tilburg brand decisions. Defined in `src/` (and the legacy `legacy/` tree), built by `style-dictionary-build.mjs` into `dist/tilburg/theme.css`. Reference these in your own app CSS when you need a brand colour, spacing step, or font size:

| Family                  | Examples                                                                                                                      | What it controls                                                                                                                                                              |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Colour palette**      | `--tilburg-color-blue-300`, `--tilburg-color-pink-400`, `--tilburg-color-gray-100`, `--tilburg-color-white`                   | The full Tilburg brand palette (blue / pink / green / orange / red / gray scales plus alpha variants).                                                                        |
| **Space scale**         | `--tilburg-space-block-snail`, `--tilburg-space-row-mouse`, `--tilburg-space-inline-rabbit`                                   | Animal-named spacing scale (`flea, ant, beetle, snail, rat, mouse, rabbit, cat, pig, dog, …`) on four axes (`block, row, column, inline`).                                    |
| **Typography**          | `--tilburg-typography-font-size-md`, `--tilburg-typography-font-family-primary`                                               | Font sizes (`sm/md/lg/xl/2xl/3xl/4xl`), font families (`primary, secondary, code`), line heights, weights.                                                                    |
| **Borders / radius**    | `--tilburg-border-width-sm` (1 px), `--tilburg-border-width-md` (2 px), `--tilburg-border-radius-lg`                          | Layout edges.                                                                                                                                                                 |
| **Interaction accents** | `--tilburg-interaction-color`, `--tilburg-interaction-hover-color`, `--tilburg-interaction-active-color`                      | The "Tilburg blue" used for links, focus rings, primary buttons.                                                                                                              |
| **Component slots**     | `--tilburg-table-footer-border-width`, `--tilburg-accordion-section-border-color`, `--tilburg-page-header-title-font-size`, … | Per-component knobs that components-css consumes. Consumers normally tune the higher-level family tokens above; component slots exist as overrides for unusual styling needs. |

Browse the full set live under **Tilburg / Tokens** in the storybook.

### 2. Utrecht-owned tokens (`--utrecht-*`)

[Utrecht's component-library-css](https://github.com/nl-design-system/utrecht/tree/main/packages/component-library-css) defines hundreds of `--utrecht-<component>-*` properties (`--utrecht-button-padding-inline-end`, `--utrecht-form-field-margin-block-end`, `--utrecht-link-hover-color`, …). The Tilburg theme **points each one at the appropriate `--tilburg-*` token**, so the utrecht components automatically inherit the Tilburg look:

```css
/* From the built tilburg theme.css (excerpt): */
.tilburg-theme {
  --utrecht-button-primary-action-background-color: var(--tilburg-color-blue-300);
  --utrecht-button-primary-action-color: var(--tilburg-color-white);
  --utrecht-form-control-border-width: var(--tilburg-border-width-sm);
  --utrecht-table-header-background-color: var(--tilburg-color-blue-100);
  /* …hundreds more */
}
```

When you read CSS in `@gemeente-tilburg/components-css/*/index.scss`, you'll usually see one of two patterns:

1. **Component-css consumes a utrecht token** — the utrecht token is the public API, the Tilburg layer just paints. Example: `border-block-end-color: var(--utrecht-table-row-border-color)` — utrecht-css already maps that token to `--tilburg-color-blue-200` via the theme.
2. **Component-css consumes a Tilburg token directly** — when there's no matching utrecht slot, or when the rule is Tilburg-specific (e.g. zebra striping). Example: `background-color: var(--tilburg-color-pink-300)` on the counter badge.

### Cascading and customisation

All tokens live on `.tilburg-theme`. To override values app-wide, scope your own rules to that class:

```css
.tilburg-theme {
  --tilburg-interaction-color: #c4007a;
}
```

To branch the palette per page section, declare a more specific selector:

```css
.tilburg-theme .my-promo-zone {
  --tilburg-color-blue-300: #00aa55;
}
```

Component-level slots (`--tilburg-<component>-*`, e.g. `--tilburg-page-header-background-color`) accept the same overrides at the component scope.

## Build pipeline

- Source files: `src/` (DTCG-format JSON) and `legacy/` (Style-Dictionary-format JSON).
- Build script: `style-dictionary-build.mjs` — outputs to `dist/tilburg/` (`theme.css`, `variables.css`, `list.json`, `tokens.cjs`, `_mixin.scss`).
- The `tgz` in this folder is a packed dist used by downstream apps that consume from a tarball; rebuild with `node ./style-dictionary-build.mjs && cd dist && npm pack`.

See the matching publish-from-dist memory in the repo CLAUDE/agent notes for the full release flow.

## License

Code: [EUPL-1.2](./LICENSE.md). Documentation: [CC0-1.0](https://creativecommons.org/publicdomain/zero/1.0/legalcode).
