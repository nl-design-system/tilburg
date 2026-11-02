/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg emphasis. Imported by
   both the React storybook (`packages/storybook`) and the Angular storybook
   (`packages/storybook-angular`). Styled by the Utrecht base CSS; there is no
   components-css folder. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Femphasis';

const intro = `Emphasis inside running text. The default renders \`<em>\` (stress emphasis, italic): it changes how a sentence is read. The \`strong\` variant renders \`<strong>\` (importance, bold): use it for a warning or a key fact. Inline: it flows with the surrounding text. Do not use it for headings or purely visual styling.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-paragraph>
  Je kunt je aanvraag <tilburg-emphasis>niet</tilburg-emphasis> meer wijzigen na het versturen.
  <tilburg-emphasis [strong]="true">Neem je identiteitsbewijs mee.</tilburg-emphasis>
</tilburg-paragraph>
\`\`\`

Inputs: \`strong\` (\`boolean\`, default \`false\`; renders \`<strong class="utrecht-emphasis utrecht-emphasis--strong">\` instead of \`<em class="utrecht-emphasis utrecht-emphasis--stressed">\`). The host stays \`display: inline\`.`;

const usageReact = `### React

\`\`\`tsx
import { Emphasis, Paragraph } from '@gemeente-tilburg/components-react';

export function Afspraak() {
  return (
    <Paragraph>
      Je kunt je aanvraag <Emphasis>niet</Emphasis> meer wijzigen na het versturen.{' '}
      <Emphasis strong>Neem je identiteitsbewijs mee.</Emphasis>
    </Paragraph>
  );
}
\`\`\`

Props: \`strong\` (\`boolean\`, default \`false\`; renders \`<strong>\` with \`utrecht-emphasis--strong\` instead of \`<em>\` with \`utrecht-emphasis--stressed\`), plus any standard HTML attribute (\`className\` is merged after the utrecht classes). \`EmphasisProps\` is exported as a type. The \`ref\` is forwarded to the \`<em>\` / \`<strong>\`.`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<p class="utrecht-paragraph">
  Je kunt je aanvraag <tilburg-wbc-emphasis>niet</tilburg-wbc-emphasis> meer wijzigen.
  <tilburg-wbc-emphasis strong>Neem je identiteitsbewijs mee.</tilburg-wbc-emphasis>
</p>
\`\`\`

Attribute: \`strong\` (boolean, default \`false\`; renders \`<strong>\` instead of \`<em>\`). The host stays inline. No events or named slots.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<em class="utrecht-emphasis utrecht-emphasis--stressed">…</em>
<strong class="utrecht-emphasis utrecht-emphasis--strong">…</strong>
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
  stressed: {
    name: 'Stressed (em)',
    html: `<p class="utrecht-paragraph">Je kunt je aanvraag <em class="utrecht-emphasis utrecht-emphasis--stressed">niet</em> meer wijzigen nadat je hem hebt verstuurd.</p>`,
  },
  strong: {
    name: 'Strong',
    html: `<p class="utrecht-paragraph">Je afspraak staat vast. <strong class="utrecht-emphasis utrecht-emphasis--strong">Neem je identiteitsbewijs mee</strong>, anders kunnen we je niet helpen.</p>`,
  },
} satisfies Record<string, Example>;
