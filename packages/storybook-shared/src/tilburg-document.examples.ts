/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg document. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fdocument';

const intro = `Top-level document scope: sets the default font family, body text colour, and link colour that everything inside the page inherits. Apply once near the root of the app so child components pick up the Tilburg typography defaults via the \`--tilburg-document-*\` token chain.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-document>
  <tilburg-page>…</tilburg-page>
</tilburg-document>
\`\`\``;

const usageReact = `### React

\`Document\` renders a single \`<div class="utrecht-document">\` around its children. Mount it once, as high in the tree as possible — typically wrapping the router outlet — and put the \`Page\` layout inside it.

\`\`\`tsx
import { Document, Page, PageContent, PageFooter, PageHeader } from '@gemeente-tilburg/components-react';

export function App({ children }: { children: React.ReactNode }) {
  return (
    <Document>
      <Page>
        <PageHeader logoSrc="/logo-on-dark.svg" title="Gemeente Tilburg" titleHref="/" />
        <PageContent id="main" tabIndex={-1}>
          {children}
        </PageContent>
        <PageFooter links={[{ label: 'Privacystatement', href: '/privacystatement' }]} />
      </Page>
    </Document>
  );
}
\`\`\`

Props: \`children\`, \`className\` (merged with \`utrecht-document\`), plus any standard \`<div>\` attribute (\`id\`, \`lang\`, \`style\`, …) — \`DocumentProps\` is exported as an alias for \`HTMLAttributes<HTMLDivElement>\`. The component forwards its ref to the underlying \`<div>\`.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<div class="utrecht-document">
  <!-- everything inside inherits the Tilburg body font + colour -->
</div>
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
    name: 'Document scope',
    html: `<div class="utrecht-document" style="padding:1rem;max-width:32rem">
  <p class="utrecht-paragraph">Tekst binnen een <code>utrecht-document</code> erft de Tilburg-typografie en body-kleur via de design tokens.</p>
</div>`,
  },
} satisfies Record<string, Example>;
