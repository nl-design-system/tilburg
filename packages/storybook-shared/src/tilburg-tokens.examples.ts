/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg design-token reference
   stories. Imported by both the React storybook (`packages/storybook`) and the
   Angular storybook (`packages/storybook-angular`) so the HTML lives in one
   place.

   The third "Resolved value" column is filled in at runtime by the optional
   enhancement script `@gemeente-tilburg/components-css/tokens/resolve` — it
   walks `<td data-token="…">` cells and writes `getComputedStyle()` output
   into them. Both storybook previews load + auto-invoke that script; raw
   HTML/CSS consumers opt in by importing it (or accept the static "—"
   fallback shown in the markup). The swatches, bars, and font-size samples
   already reflect the live token via `var(--…)` — the resolver just surfaces
   the underlying string. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Ftokens';

export const description = `Browseable reference for the \`--tilburg-*\` design tokens shipped via \`@gemeente-tilburg/design-tokens\`. Tokens are scoped to \`.tilburg-theme\` (the storybook decorator wraps each story in that scope), so the names below resolve to live values throughout the design system.

Tokens are grouped by purpose: **Colors** (brand palette + neutral scale), **Space** (block / row / column / inline gaps on the animal-named scale), **Typography** (font sizes), and **Interaction** (link / focus / active accents).

## Two token families: Tilburg-owned vs utrecht-owned

The Tilburg design system uses **two custom-property namespaces** that live on the same \`.tilburg-theme\` scope. Both resolve at runtime — what differs is who owns each name and what it controls.

### 1. \`--tilburg-*\` — Tilburg's own decisions

The brand palette (\`--tilburg-color-*\`), the animal-named space scale (\`--tilburg-space-{block,row,column,inline}-*\`), typography (\`--tilburg-typography-font-size-*\`, \`--tilburg-typography-font-family-*\`), borders (\`--tilburg-border-width-sm/md/lg\`), interaction accents (\`--tilburg-interaction-color\`), and component-specific slots (\`--tilburg-table-footer-border-width\`, \`--tilburg-accordion-section-border-color\`, …). Authored in \`proprietary/design-tokens/src/\` and built into \`dist/tilburg/theme.css\`. Reference these directly in app CSS.

### 2. \`--utrecht-*\` — Plumbing inherited from @utrecht/component-library-css

[utrecht](https://github.com/nl-design-system/utrecht) defines hundreds of \`--utrecht-<component>-*\` slots (\`--utrecht-button-primary-action-background-color\`, \`--utrecht-form-control-border-width\`, …). The Tilburg theme **points each one at the right \`--tilburg-*\` token**, so utrecht components automatically inherit the Tilburg look without any per-component CSS rewrites:

\`\`\`css
.tilburg-theme {
  --utrecht-button-primary-action-background-color: var(--tilburg-color-blue-300);
  --utrecht-form-control-border-width: var(--tilburg-border-width-sm);
  --utrecht-table-header-background-color: var(--tilburg-color-blue-100);
  /* …hundreds more */
}
\`\`\`

When you read CSS in \`@gemeente-tilburg/components-css/*/index.scss\` you'll see one of two patterns:

1. **Consume a utrecht token** when utrecht already defines a slot for the property — e.g. \`border-block-end-color: var(--utrecht-table-row-border-color)\`. The Tilburg theme already aliases that to \`--tilburg-color-blue-200\`.
2. **Consume a Tilburg token directly** when there's no matching utrecht slot, or when the rule is Tilburg-specific (e.g. zebra striping, badge counter brand colour, page-header logo). Example: \`background-color: var(--tilburg-color-pink-300)\`.

### Overriding tokens

Override values app-wide by re-declaring them on \`.tilburg-theme\`, or per-section with a more specific selector:

\`\`\`css
.tilburg-theme .promo-zone {
  --tilburg-color-blue-300: #c4007a;
}
\`\`\`

For more, see the package readme at \`proprietary/design-tokens/README.md\`.`;

export interface Example {
  name: string;
  html: string;
}

const tableStyle =
  'border-collapse:collapse;font-family:var(--utrecht-document-font-family, system-ui, sans-serif);font-size:0.875rem;inline-size:100%';
const thStyle =
  'border-block-end:1px solid var(--tilburg-color-gray-200, #ccc);font-weight:700;padding:0.5rem 0.75rem;text-align:start';
const tdStyle =
  'border-block-end:1px solid var(--tilburg-color-gray-100, #eee);padding:0.5rem 0.75rem;vertical-align:middle';
const swatchStyle =
  'block-size:2rem;border:1px solid var(--tilburg-color-gray-200, #ccc);border-radius:2px;inline-size:4rem';
/* Single-quoted CSS font names so the resulting `style="…"` HTML attribute
   doesn't terminate at the inner quote (Angular's HTML parser is strict
   about nested attribute quotes, unlike the browser's lax parser). */
const monoStyle =
  "font-family:var(--tilburg-typography-font-family-code, ui-monospace, 'SF Mono', Menlo, Consolas, monospace);font-size:0.8125rem";
const grayValueColor = 'color:var(--tilburg-color-gray-400, #666)';
const sectionStyle = 'margin-block-end:2.5rem';

const COLOR_GROUPS: Array<{ label: string; tokens: string[] }> = [
  {
    label: 'Brand — blue',
    tokens: [
      '--tilburg-color-blue-50',
      '--tilburg-color-blue-100',
      '--tilburg-color-blue-200',
      '--tilburg-color-blue-300',
      '--tilburg-color-blue-400',
      '--tilburg-color-blue-500',
    ],
  },
  {
    label: 'Brand — pink',
    tokens: [
      '--tilburg-color-pink-100',
      '--tilburg-color-pink-200',
      '--tilburg-color-pink-300',
      '--tilburg-color-pink-400',
      '--tilburg-color-pink-500',
    ],
  },
  {
    label: 'Brand — green',
    tokens: [
      '--tilburg-color-green-100',
      '--tilburg-color-green-200',
      '--tilburg-color-green-300',
      '--tilburg-color-green-400',
    ],
  },
  {
    label: 'Brand — orange',
    tokens: [
      '--tilburg-color-orange-100',
      '--tilburg-color-orange-200',
      '--tilburg-color-orange-300',
      '--tilburg-color-orange-400',
    ],
  },
  {
    label: 'Brand — red',
    tokens: [
      '--tilburg-color-red-100',
      '--tilburg-color-red-200',
      '--tilburg-color-red-300',
      '--tilburg-color-red-400',
    ],
  },
  {
    label: 'Neutral — gray',
    tokens: [
      '--tilburg-color-gray-50',
      '--tilburg-color-gray-100',
      '--tilburg-color-gray-200',
      '--tilburg-color-gray-300',
      '--tilburg-color-gray-400',
      '--tilburg-color-gray-500',
    ],
  },
  {
    label: 'Neutral — black / white',
    tokens: ['--tilburg-color-white', '--tilburg-color-black'],
  },
];

const SPACE_AXES: Array<{ label: string; prefix: string }> = [
  { label: 'Block (vertical between rows)', prefix: '--tilburg-space-block-' },
  { label: 'Row (vertical inside a row)', prefix: '--tilburg-space-row-' },
  { label: 'Inline (horizontal start/end)', prefix: '--tilburg-space-inline-' },
];

const SPACE_SCALE = ['flea', 'ant', 'beetle', 'snail', 'rat', 'mouse', 'rabbit', 'cat', 'pig', 'dog'];

const TYPOGRAPHY_TOKENS = [
  { name: '--tilburg-typography-font-size-sm', sample: 'Aa — Small' },
  { name: '--tilburg-typography-font-size-md', sample: 'Aa — Medium' },
  { name: '--tilburg-typography-font-size-lg', sample: 'Aa — Large' },
  { name: '--tilburg-typography-font-size-xl', sample: 'Aa — Extra large' },
  { name: '--tilburg-typography-font-size-2xl', sample: 'Aa — 2× large' },
  { name: '--tilburg-typography-font-size-3xl', sample: 'Aa — 3× large' },
  { name: '--tilburg-typography-font-size-4xl', sample: 'Aa — 4× large' },
];

const INTERACTION_TOKENS = [
  '--tilburg-interaction-color',
  '--tilburg-interaction-hover-color',
  '--tilburg-interaction-active-color',
];

/* The third `<td data-token="…">` cell is filled in at runtime by the
   resolver script at `@gemeente-tilburg/components-css/tokens/resolve`. The
   em-dash is the static fallback shown when the script isn't loaded (raw
   HTML/CSS consumers can include the script to get live values). */

const colorRow = (name: string): string => `<tr>
  <td style="${tdStyle}"><div style="${swatchStyle};background-color:var(${name})"></div></td>
  <td style="${tdStyle};${monoStyle}">${name}</td>
  <td style="${tdStyle};${monoStyle};${grayValueColor}" data-token="${name}">&mdash;</td>
</tr>`;

const spaceRow = (name: string): string => `<tr>
  <td style="${tdStyle}"><div style="background-color:var(--tilburg-color-blue-300, #0a8cd9);block-size:1rem;inline-size:var(${name})"></div></td>
  <td style="${tdStyle};${monoStyle}">${name}</td>
  <td style="${tdStyle};${monoStyle};${grayValueColor}" data-token="${name}">&mdash;</td>
</tr>`;

const typographyRow = (name: string, sample: string): string => `<tr>
  <td style="${tdStyle};font-size:var(${name})">${sample}</td>
  <td style="${tdStyle};${monoStyle}">${name}</td>
  <td style="${tdStyle};${monoStyle};${grayValueColor}" data-token="${name}">&mdash;</td>
</tr>`;

const valueRow = (name: string): string => `<tr>
  <td style="${tdStyle}"><div style="${swatchStyle};background-color:var(${name})"></div></td>
  <td style="${tdStyle};${monoStyle}">${name}</td>
  <td style="${tdStyle};${monoStyle};${grayValueColor}" data-token="${name}">&mdash;</td>
</tr>`;

const tokenSection = (title: string, body: string): string => `<section style="${sectionStyle}">
  <h2 class="utrecht-heading-2" style="margin-block-end:0.75rem">${title}</h2>
  ${body}
</section>`;

const colorsHtml = COLOR_GROUPS.map((group) =>
  tokenSection(
    group.label,
    `<table style="${tableStyle}">
  <thead>
    <tr>
      <th style="${thStyle};inline-size:8rem">Swatch</th>
      <th style="${thStyle}">Token</th>
      <th style="${thStyle}">Resolved value</th>
    </tr>
  </thead>
  <tbody>
    ${group.tokens.map(colorRow).join('\n    ')}
  </tbody>
</table>`,
  ),
).join('\n');

const spaceHtml = SPACE_AXES.map((axis) =>
  tokenSection(
    axis.label,
    `<table style="${tableStyle}">
  <thead>
    <tr>
      <th style="${thStyle};inline-size:14rem">Bar (actual size)</th>
      <th style="${thStyle}">Token</th>
      <th style="${thStyle}">Resolved value</th>
    </tr>
  </thead>
  <tbody>
    ${SPACE_SCALE.map((step) => spaceRow(`${axis.prefix}${step}`)).join('\n    ')}
  </tbody>
</table>`,
  ),
).join('\n');

const typographyHtml = tokenSection(
  'Font sizes',
  `<table style="${tableStyle}">
  <thead>
    <tr>
      <th style="${thStyle};inline-size:16rem">Sample</th>
      <th style="${thStyle}">Token</th>
      <th style="${thStyle}">Resolved value</th>
    </tr>
  </thead>
  <tbody>
    ${TYPOGRAPHY_TOKENS.map((token) => typographyRow(token.name, token.sample)).join('\n    ')}
  </tbody>
</table>`,
);

const interactionHtml = tokenSection(
  'Interaction colour set',
  `<table style="${tableStyle}">
  <thead>
    <tr>
      <th style="${thStyle};inline-size:8rem">Swatch</th>
      <th style="${thStyle}">Token</th>
      <th style="${thStyle}">Resolved value</th>
    </tr>
  </thead>
  <tbody>
    ${INTERACTION_TOKENS.map(valueRow).join('\n    ')}
  </tbody>
</table>`,
);

export const examples = {
  colors: {
    name: 'Colors',
    html: colorsHtml,
  },
  space: {
    name: 'Space',
    html: spaceHtml,
  },
  typography: {
    name: 'Typography (font sizes)',
    html: typographyHtml,
  },
  interaction: {
    name: 'Interaction accents',
    html: interactionHtml,
  },
} satisfies Record<string, Example>;
