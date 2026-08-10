/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg heading.
   Imported by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fheading';

const intro = `Headings 1–6 use Tilburg responsive font-size tokens: a large-viewport size by default and a small-viewport size below 768px. The outer \`<utrecht-heading-N>\` custom element triggers the Tilburg \`--utrecht-heading-N-font-size\` override; the inner \`<hN class="utrecht-heading-N">\` is what utrecht-css's font-size rule reads.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-heading-1>Page title</tilburg-heading-1>
<tilburg-heading-2>Section title</tilburg-heading-2>
<tilburg-heading-3>Subsection title</tilburg-heading-3>
\`\`\`

The Tilburg wrapper renders \`<utrecht-heading-N>\` and projects the text into an inner \`<hN class="utrecht-heading-N">\` so both the Tilburg responsive sizing and utrecht-css typography apply.`;

const usageReact = `### React

\`\`\`tsx
import { Heading1, Heading2, Heading3 } from '@gemeente-tilburg/components-react';

export function VergunningPagina() {
  return (
    <>
      <Heading1>Vergunning aanvragen</Heading1>
      <Heading2>Wat heb je nodig?</Heading2>
      <Heading3>Documenten uploaden</Heading3>
    </>
  );
}
\`\`\`

There is no single \`<Heading level={n}>\` component: \`Heading1\` … \`Heading6\` are six separate exports, one per level. Each renders \`<utrecht-heading-N><hN class="utrecht-heading-N">…</hN></utrecht-heading-N>\` — the same DOM as the plain HTML reference — so both the Tilburg responsive sizing and utrecht-css typography apply.

Props: none of the six add component-specific props. \`Heading1Props\` … \`Heading6Props\` are exported type aliases of \`HTMLAttributes<HTMLHeadingElement>\`, so you pass \`children\` plus any standard heading attribute (\`id\`, \`lang\`, \`aria-*\`, …). \`className\` is placed on the outer \`<utrecht-heading-N>\` wrapper; every other attribute is spread onto the inner \`<hN>\`, which is also what the forwarded \`ref\` points at.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<utrecht-heading-1>
  <h1 class="utrecht-heading-1">Page title</h1>
</utrecht-heading-1>
\`\`\`

The custom element is required: \`utrecht-heading-N { --utrecht-heading-N-font-size: var(--tilburg-heading-N-…) }\` only matches when the element is present.`;

export const description = `${intro}

## Usage

${usageAngular}

${usagePlainHtml}
`;

export const descriptionReact = `${intro}

## Usage

${usageReact}

${usagePlainHtml}
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
