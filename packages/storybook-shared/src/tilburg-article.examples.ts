/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg article. Imported by
   both the React storybook (`packages/storybook`) and the Angular storybook
   (`packages/storybook-angular`). */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Farticle';

const intro = `Self-contained content block (a news item, FAQ entry, product description) rendered as an \`<article>\` so assistive tech treats it as a landmark with its own boundaries.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-article>
  <tilburg-heading-2>Vergunningen</tilburg-heading-2>
  <tilburg-paragraph>…</tilburg-paragraph>
</tilburg-article>
\`\`\``;

const usageReact = `### React

\`\`\`tsx
import { Article, Heading2, Paragraph } from '@gemeente-tilburg/components-react';

export function Nieuwsbericht() {
  return (
    <Article>
      <Heading2>Vergunningen</Heading2>
      <Paragraph>…</Paragraph>
      <Paragraph small>Geplaatst op 19 mei 2026.</Paragraph>
    </Article>
  );
}
\`\`\`

Content goes in \`children\`; the component renders a single \`<article class="utrecht-article">\` around it.

Props: no component-specific props. \`ArticleProps\` is an exported type alias of \`HTMLAttributes<HTMLElement>\`, so you pass \`children\` plus any standard attribute — \`className\` (merged after \`utrecht-article\`), \`id\`, \`lang\`, \`aria-labelledby\` to tie the landmark to its heading, and so on. The \`ref\` is forwarded to the \`<article>\`.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<article class="utrecht-article">
  <!-- self-contained content -->
</article>
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
    html: `<article class="utrecht-article" style="max-width:32rem">
  <h2 class="utrecht-heading-2">Vergunning aanvragen</h2>
  <p class="utrecht-paragraph">Je kunt een vergunning aanvragen via het online formulier op deze website. Vul alle verplichte velden in en upload de benodigde documenten.</p>
</article>`,
  },
} satisfies Record<string, Example>;
