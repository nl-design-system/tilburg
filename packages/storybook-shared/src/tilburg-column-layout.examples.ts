/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg column layout. Imported
   by both the React storybook (`packages/storybook`) and the Angular storybook
   (`packages/storybook-angular`). */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fcolumn-layout';

const intro = `Flows content into newspaper-style columns: \`<div class="utrecht-column-layout">\` uses CSS multi-column layout, so the browser decides how many columns of at least \`--utrecht-column-layout-column-width\` (40ch) fit, and drops to one column on a narrow screen. Tilburg sets the gap to \`--tilburg-space-column-pig\` (32px); \`utrecht-column-layout--rule\` draws a thin line between the columns in the Tilburg line colour. The reading order stays the source order (down the first column, then the next), so use it for running text or a list of short items, not for content that has to be read side by side.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-column-layout [rule]="true">
  <tilburg-paragraph>…</tilburg-paragraph>
  <tilburg-paragraph>…</tilburg-paragraph>
</tilburg-column-layout>
\`\`\`

Inputs: \`rule\` (\`boolean\`, default \`false\`; adds \`utrecht-column-layout--rule\`, a line between the columns). Content: default projection.`;

const usageReact = `### React

\`\`\`tsx
import { ColumnLayout, Paragraph } from '@gemeente-tilburg/components-react';

export function Afvalinformatie() {
  return (
    <ColumnLayout rule>
      <Paragraph>…</Paragraph>
      <Paragraph>…</Paragraph>
    </ColumnLayout>
  );
}
\`\`\`

Props: \`rule\` (\`boolean\`, default \`false\`), \`children\`, plus any \`<div>\` attribute (\`className\` is merged after the utrecht classes). \`ColumnLayoutProps\` is exported as a type. The \`ref\` is forwarded to the \`<div>\`.`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<tilburg-wbc-column-layout rule>
  <p class="utrecht-paragraph">…</p>
  <p class="utrecht-paragraph">…</p>
</tilburg-wbc-column-layout>
\`\`\`

Renders \`<div class="utrecht-column-layout">\`. Attribute: \`rule\` (boolean, default \`false\`). Slot: default. No events.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<div class="utrecht-column-layout utrecht-column-layout--rule">
  <p class="utrecht-paragraph">…</p>
  <p class="utrecht-paragraph">…</p>
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

const paragraphs = `  <p class="utrecht-paragraph">Restafval, gft en papier halen we bij je huis op. Op de afvalkalender zie je op welke dag de containers aan de straat moeten staan. Zet je container voor 7.30 uur buiten, met de handgreep naar de straat.</p>
  <p class="utrecht-paragraph">Grof afval, zoals een oude bank of een kapotte wasmachine, breng je naar de milieustraat. Je kunt het ook laten ophalen; maak daarvoor online een afspraak.</p>
  <p class="utrecht-paragraph">Glas, textiel en klein chemisch afval breng je naar een verzamelcontainer in de wijk of naar de milieustraat. Lever lege batterijen in bij de supermarkt.</p>`;

export const examples = {
  default: {
    name: 'Default',
    html: `<div class="utrecht-column-layout">
${paragraphs}
</div>`,
  },
  rule: {
    name: 'With column rule',
    html: `<div class="utrecht-column-layout utrecht-column-layout--rule">
${paragraphs}
</div>`,
  },
} satisfies Record<string, Example>;
