/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg spotlight section.
   Imported by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`). */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fspotlight-section';

const intro = `Block that makes a part of the page stand out, such as a summary, a deadline or a practical tip: \`<section class="utrecht-spotlight-section">\`. Utrecht's base CSS with Tilburg tokens: a light grey block by default, and with a \`variant\` the background and border of the Tilburg feedback colours, the same as Alert (\`info\` blue, \`success\` green, \`warning\` orange, \`danger\` red). Unlike Alert it is not a live region: it is static content that is there when the page loads. Render it as \`<aside>\` (\`aside\`) when the content is supplementary to the page rather than part of its flow. The colour alone does not tell what kind of message it is, so say it in the text or a heading as well. Utrecht marks this component deprecated in favour of Note; it stays in Tilburg for existing pages.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-spotlight-section variant="warning">
  <tilburg-paragraph>Vraag je paspoort uiterlijk 6 weken voor vertrek aan.</tilburg-paragraph>
</tilburg-spotlight-section>
\`\`\`

Inputs: \`variant\` (\`'info' | 'success' | 'warning' | 'danger'\`, default none: the neutral grey block; \`success\` → \`.utrecht-spotlight-section--ok\`, \`danger\` → \`--error\`, as in Alert), \`aside\` (\`boolean\`, default \`false\`; renders \`<aside>\` instead of \`<section>\`), \`ariaLabel\`, \`ariaLabelledBy\` (the name of the section or aside). Content: default projection.`;

const usageReact = `### React

\`\`\`tsx
import { Paragraph, SpotlightSection } from '@gemeente-tilburg/components-react';

export function Reistip() {
  return (
    <SpotlightSection variant="warning">
      <Paragraph>Vraag je paspoort uiterlijk 6 weken voor vertrek aan.</Paragraph>
    </SpotlightSection>
  );
}
\`\`\`

Props: \`variant\` (\`SpotlightSectionVariant\` = \`'info' | 'success' | 'warning' | 'danger'\`, default none), \`aside\` (\`boolean\`, default \`false\`), \`children\`, plus any HTML attribute (\`className\` is merged after the utrecht classes). \`SpotlightSectionProps\` is exported as a type. The \`ref\` is forwarded to the \`<section>\` / \`<aside>\`.`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<tilburg-wbc-spotlight-section variant="warning">
  <p class="utrecht-paragraph">Vraag je paspoort uiterlijk 6 weken voor vertrek aan.</p>
</tilburg-wbc-spotlight-section>
\`\`\`

Renders \`<section class="utrecht-spotlight-section">\` (or \`<aside>\`). Attributes: \`variant\` (\`info\` / \`success\` / \`warning\` / \`danger\`), \`aside\` (boolean). \`aria-label\` and \`aria-labelledby\` on the element are moved onto the \`<section>\` / \`<aside>\`. Slot: default. No events.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<section class="utrecht-spotlight-section utrecht-spotlight-section--warning">
  <p class="utrecht-paragraph">Vraag je paspoort uiterlijk 6 weken voor vertrek aan.</p>
</section>
\`\`\`

Modifiers: \`--info\`, \`--ok\` (success), \`--warning\`, \`--error\` (danger).`;

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
    html: `<section class="utrecht-spotlight-section">
  <p class="utrecht-paragraph">Je kunt je afspraak tot 24 uur van tevoren kosteloos verzetten of annuleren.</p>
</section>`,
  },
  info: {
    name: 'Info',
    html: `<section class="utrecht-spotlight-section utrecht-spotlight-section--info">
  <p class="utrecht-paragraph">Neem een geldig identiteitsbewijs mee naar je afspraak in het Stadskantoor.</p>
</section>`,
  },
  success: {
    name: 'Success',
    html: `<section class="utrecht-spotlight-section utrecht-spotlight-section--ok">
  <p class="utrecht-paragraph">Je melding is ontvangen. Binnen 5 werkdagen hoor je wat we ermee doen.</p>
</section>`,
  },
  warning: {
    name: 'Warning',
    html: `<section class="utrecht-spotlight-section utrecht-spotlight-section--warning">
  <p class="utrecht-paragraph">Vraag je paspoort uiterlijk 6 weken voor vertrek aan. In de zomer is het druk.</p>
</section>`,
  },
  danger: {
    name: 'Danger',
    html: `<section class="utrecht-spotlight-section utrecht-spotlight-section--error">
  <p class="utrecht-paragraph">Let op: na 1 juli kun je geen bezwaar meer maken tegen deze aanslag.</p>
</section>`,
  },
  aside: {
    name: 'As aside',
    html: `<aside class="utrecht-spotlight-section utrecht-spotlight-section--info" aria-label="Tip">
  <p class="utrecht-paragraph">Tip: met DigiD regel je de meeste zaken direct online.</p>
</aside>`,
  },
} satisfies Record<string, Example>;
