/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg page content.
   Imported by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fpage-content';

const intro = `Main content region of a page. Sits inside \`<tilburg-page>\` between the header and footer; provides a constrained max-inline-size and consistent inline padding.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-page-content>
  <tilburg-heading-1>Aanvraag indienen</tilburg-heading-1>
  <tilburg-paragraph>Vul de gegevens in om de aanvraag te starten.</tilburg-paragraph>
</tilburg-page-content>
\`\`\``;

const usageReact = `### React

\`PageContent\` renders a \`<main class="utrecht-page-content">\` and projects its children into it. Because it is the page's main landmark, give it \`id="main"\` and \`tabIndex={-1}\` so the skip link can move focus into it.

\`\`\`tsx
import { Heading1, Page, PageContent, Paragraph } from '@gemeente-tilburg/components-react';

export function AanvraagPage() {
  return (
    <Page>
      <PageContent id="main" tabIndex={-1}>
        <Heading1>Aanvraag indienen</Heading1>
        <Paragraph>Vul de gegevens in om de aanvraag te starten.</Paragraph>
      </PageContent>
    </Page>
  );
}
\`\`\`

Props: \`children\`, \`className\` (merged with \`utrecht-page-content\`), plus any standard \`<main>\` attribute (\`id\`, \`tabIndex\`, \`aria-*\`, …) — \`PageContentProps\` is exported as an alias for \`HTMLAttributes<HTMLElement>\`. The component forwards its ref to the underlying \`<main>\`. Render only one per page.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<main class="utrecht-page-content">
  <!-- main content -->
</main>
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
    html: `<main class="utrecht-page-content" style="max-width:1150px;margin-inline:auto;padding:1rem">
  <utrecht-heading-1><h1 class="utrecht-heading-1">Aanvraag indienen</h1></utrecht-heading-1>
  <p class="utrecht-paragraph">Vul de gegevens in om de aanvraag te starten.</p>
</main>`,
  },
} satisfies Record<string, Example>;
