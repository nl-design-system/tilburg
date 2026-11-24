/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg note. Imported by both
   the React storybook (`packages/storybook`) and the Angular storybook
   (`packages/storybook-angular`). */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fnote';

const intro = `Draws attention to additional or important information next to the main content: \`<section class="utrecht-note" role="note">\`. Utrecht 5.2.0 has no note yet, so Tilburg ships a port of Utrecht's note CSS (same \`utrecht-note\` classes and \`--utrecht-note-*\` properties) with Tilburg fallbacks: a light grey block by default, and with a \`variant\` the Tilburg feedback colours, the same as Alert (\`info\` blue, \`success\` green, \`warning\` orange, \`danger\` red). \`role="note"\` tells assistive technology the content is supplementary; with \`aside\` it renders \`<aside>\` (a complementary landmark) instead — give that a name with \`aria-label\` or \`aria-labelledby\`. A note is not a live region: for a message that appears after an action use Alert. The colour alone does not tell what kind of note it is, so say it in the text or a heading as well.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-note variant="info">
  <tilburg-paragraph>Neem een geldig identiteitsbewijs mee naar je afspraak.</tilburg-paragraph>
</tilburg-note>
\`\`\`

Inputs: \`variant\` (\`'info' | 'success' | 'warning' | 'danger'\`, default none: the neutral grey note; \`danger\` → \`.utrecht-note--error\`, as in Alert), \`aside\` (\`boolean\`, default \`false\`; renders \`<aside>\` instead of \`<section role="note">\`), \`ariaLabel\`, \`ariaLabelledBy\` (the name of the note or aside). Content: default projection.`;

const usageReact = `### React

\`\`\`tsx
import { Note, Paragraph } from '@gemeente-tilburg/components-react';

export function AfspraakTip() {
  return (
    <Note variant="info">
      <Paragraph>Neem een geldig identiteitsbewijs mee naar je afspraak.</Paragraph>
    </Note>
  );
}
\`\`\`

Props: \`variant\` (\`NoteVariant\` = \`'info' | 'success' | 'warning' | 'danger'\`, default none), \`aside\` (\`boolean\`, default \`false\`), \`children\`, plus any HTML attribute (\`className\` is merged after the utrecht classes, \`aria-label\`, …). \`NoteProps\` is exported as a type. The \`ref\` is forwarded to the \`<section>\` / \`<aside>\`.`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<tilburg-wbc-note variant="info">
  <p class="utrecht-paragraph">Neem een geldig identiteitsbewijs mee naar je afspraak.</p>
</tilburg-wbc-note>
\`\`\`

Renders \`<section class="utrecht-note" role="note">\` (or \`<aside>\`). Attributes: \`variant\` (\`info\` / \`success\` / \`warning\` / \`danger\`), \`aside\` (boolean). \`aria-label\` and \`aria-labelledby\` on the element are moved onto the inner element. Slot: default. No events.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<section class="utrecht-note utrecht-note--info" role="note">
  <p class="utrecht-paragraph">Neem een geldig identiteitsbewijs mee naar je afspraak.</p>
</section>
\`\`\`

Modifiers: \`--info\`, \`--success\`, \`--warning\`, \`--error\` (danger).`;

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
    html: `<section class="utrecht-note" role="note">
  <p class="utrecht-paragraph">Het Stadskantoor is op Koningsdag gesloten.</p>
</section>`,
  },
  info: {
    name: 'Info',
    html: `<section class="utrecht-note utrecht-note--info" role="note">
  <p class="utrecht-paragraph">Neem een geldig identiteitsbewijs mee naar je afspraak.</p>
</section>`,
  },
  success: {
    name: 'Success',
    html: `<section class="utrecht-note utrecht-note--success" role="note">
  <p class="utrecht-paragraph">Je hoeft niets te doen: we verlengen je parkeervergunning automatisch.</p>
</section>`,
  },
  warning: {
    name: 'Warning',
    html: `<section class="utrecht-note utrecht-note--warning" role="note">
  <p class="utrecht-paragraph">Je rijbewijs verloopt binnenkort. Vraag op tijd een nieuw rijbewijs aan.</p>
</section>`,
  },
  danger: {
    name: 'Danger',
    html: `<section class="utrecht-note utrecht-note--error" role="note">
  <p class="utrecht-paragraph">Betaal de aanslag voor 31 maart, anders ontvang je een aanmaning met extra kosten.</p>
</section>`,
  },
  withHeading: {
    name: 'With heading, as aside',
    html: `<aside class="utrecht-note utrecht-note--info" aria-labelledby="note-heading-title">
  <h3 class="utrecht-heading-3" id="note-heading-title">Goed om te weten</h3>
  <p class="utrecht-paragraph">Woon je korter dan 3 jaar in Tilburg? Dan heb je een verklaring van je vorige gemeente nodig.</p>
</aside>`,
  },
} satisfies Record<string, Example>;
