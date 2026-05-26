/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg article. Imported by
   both the React storybook (`packages/storybook`) and the Angular storybook
   (`packages/storybook-angular`). */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Farticle';

export const description = `Self-contained content block (a news item, FAQ entry, product description) rendered as an \`<article>\` so assistive tech treats it as a landmark with its own boundaries.

## Usage

### Angular

\`\`\`html
<tilburg-article>
  <tilburg-heading-2>Vergunningen</tilburg-heading-2>
  <tilburg-paragraph>…</tilburg-paragraph>
</tilburg-article>
\`\`\`

### Plain HTML / CSS

\`\`\`html
<article class="utrecht-article">
  <!-- self-contained content -->
</article>
\`\`\`
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
