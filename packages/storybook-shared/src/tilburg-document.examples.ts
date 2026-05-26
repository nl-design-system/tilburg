/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg document. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fdocument';

export const description = `Top-level document scope: sets the default font family, body text colour, and link colour that everything inside the page inherits. Apply once near the root of the app so child components pick up the Tilburg typography defaults via the \`--tilburg-document-*\` token chain.

## Usage

### Angular

\`\`\`html
<tilburg-document>
  <tilburg-page>…</tilburg-page>
</tilburg-document>
\`\`\`

### Plain HTML / CSS

\`\`\`html
<div class="utrecht-document">
  <!-- everything inside inherits the Tilburg body font + colour -->
</div>
\`\`\`
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
