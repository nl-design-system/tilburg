/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg blockquote. Imported by
   both the React storybook (`packages/storybook`) and the Angular storybook
   (`packages/storybook-angular`). Styled by the Utrecht base CSS with the
   Tilburg `--utrecht-blockquote-*` tokens; there is no components-css folder. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fblockquote';

const intro = `Quotation set apart from the body text, rendered as a \`<blockquote>\` with the quoted text in \`utrecht-blockquote__content\` and an optional source in \`utrecht-blockquote__attribution\`. When the quote is in another language than the page, set \`lang\` on it (WCAG 3.1.2).`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-blockquote attribution="Burgemeester van Tilburg">
  <tilburg-paragraph>Samen maken we Tilburg een stad waar iedereen mee kan doen.</tilburg-paragraph>
</tilburg-blockquote>
\`\`\`

Inputs: \`attribution\` (\`string\`, default \`''\`; the source of the quote, rendered after the content when set). Content is projected into \`utrecht-blockquote__content\`. \`lang\` on the host applies to the quote through inheritance.`;

const usageReact = `### React

\`\`\`tsx
import { Blockquote, Paragraph } from '@gemeente-tilburg/components-react';

export function Citaat() {
  return (
    <Blockquote attribution="Burgemeester van Tilburg">
      <Paragraph>Samen maken we Tilburg een stad waar iedereen mee kan doen.</Paragraph>
    </Blockquote>
  );
}
\`\`\`

Props: \`attribution\` (\`ReactNode\`, optional; rendered in \`utrecht-blockquote__attribution\`), plus any standard \`<blockquote>\` attribute (\`className\`, merged after \`utrecht-blockquote\`, \`cite\`, \`lang\`, …). \`children\` go in \`utrecht-blockquote__content\`. \`BlockquoteProps\` is exported as a type. The \`ref\` is forwarded to the \`<blockquote>\`.`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<tilburg-wbc-blockquote attribution="Burgemeester van Tilburg">
  <p class="utrecht-paragraph">Samen maken we Tilburg een stad waar iedereen mee kan doen.</p>
</tilburg-wbc-blockquote>
\`\`\`

Attribute: \`attribution\` (string; rendered after the content when set). \`cite\` written on the host is moved onto the \`<blockquote>\`; \`lang\` on the host applies to the quote through inheritance. No events or named slots.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<blockquote class="utrecht-blockquote">
  <div class="utrecht-blockquote__content">
    <p class="utrecht-paragraph">…</p>
  </div>
  <div class="utrecht-blockquote__attribution">…</div>
</blockquote>
\`\`\``;

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

export const descriptionWebComponents = `${intro}

## Usage

${usageWebComponents}

${usagePlainHtml}
`;

export const descriptionHtml = `${intro}

## Usage

${usagePlainHtml}
`;

export interface Example {
  name: string;
  html: string;
}

export const examples = {
  default: {
    name: 'Default',
    html: `<blockquote class="utrecht-blockquote">
  <div class="utrecht-blockquote__content">
    <p class="utrecht-paragraph">Samen maken we Tilburg een stad waar iedereen mee kan doen.</p>
  </div>
</blockquote>`,
  },
  attribution: {
    name: 'With attribution',
    html: `<blockquote class="utrecht-blockquote">
  <div class="utrecht-blockquote__content">
    <p class="utrecht-paragraph">Dankzij de wijkregisseur wist ik precies bij wie ik terecht kon met mijn vraag.</p>
  </div>
  <div class="utrecht-blockquote__attribution">Inwoner van de Reeshof</div>
</blockquote>`,
  },
  language: {
    name: 'Other language (lang)',
    html: `<blockquote class="utrecht-blockquote" lang="en">
  <div class="utrecht-blockquote__content">
    <p class="utrecht-paragraph">Tilburg is a city where everyone can take part.</p>
  </div>
  <div class="utrecht-blockquote__attribution">Gemeente Tilburg, English welcome brochure</div>
</blockquote>`,
  },
} satisfies Record<string, Example>;
