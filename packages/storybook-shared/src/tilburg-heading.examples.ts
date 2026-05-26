/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg heading.
   Imported by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fheading';

export const description = `Headings 1–6 use Tilburg responsive font-size tokens: a large-viewport size by default and a small-viewport size below 768px. The outer \`<utrecht-heading-N>\` custom element triggers the Tilburg \`--utrecht-heading-N-font-size\` override; the inner \`<hN class="utrecht-heading-N">\` is what utrecht-css's font-size rule reads.

## Usage

### Angular

\`\`\`html
<tilburg-heading-1>Page title</tilburg-heading-1>
<tilburg-heading-2>Section title</tilburg-heading-2>
<tilburg-heading-3>Subsection title</tilburg-heading-3>
\`\`\`

The Tilburg wrapper renders \`<utrecht-heading-N>\` and projects the text into an inner \`<hN class="utrecht-heading-N">\` so both the Tilburg responsive sizing and utrecht-css typography apply.

### Plain HTML / CSS

\`\`\`html
<utrecht-heading-1>
  <h1 class="utrecht-heading-1">Page title</h1>
</utrecht-heading-1>
\`\`\`

The custom element is required: \`utrecht-heading-N { --utrecht-heading-N-font-size: var(--tilburg-heading-N-…) }\` only matches when the element is present.
`;

export interface Example {
  name: string;
  html: string;
}

export const examples = {
  allLevels: {
    name: 'All six levels',
    html: `<div style="display:flex;flex-direction:column;gap:0.5rem">
  <utrecht-heading-1><h1 class="utrecht-heading-1">Heading 1 — Tilburg</h1></utrecht-heading-1>
  <utrecht-heading-2><h2 class="utrecht-heading-2">Heading 2 — Tilburg</h2></utrecht-heading-2>
  <utrecht-heading-3><h3 class="utrecht-heading-3">Heading 3 — Tilburg</h3></utrecht-heading-3>
  <utrecht-heading-4><h4 class="utrecht-heading-4">Heading 4 — Tilburg</h4></utrecht-heading-4>
  <utrecht-heading-5><h5 class="utrecht-heading-5">Heading 5 — Tilburg</h5></utrecht-heading-5>
  <utrecht-heading-6><h6 class="utrecht-heading-6">Heading 6 — Tilburg</h6></utrecht-heading-6>
</div>`,
  },
} satisfies Record<string, Example>;
