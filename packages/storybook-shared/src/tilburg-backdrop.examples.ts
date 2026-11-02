/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg backdrop. Imported by
   both the React storybook (`packages/storybook`) and the Angular storybook
   (`packages/storybook-angular`). */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fbackdrop';

const intro = `Semi-transparent layer that dims the content behind a modal element, such as a drawer or a loading overlay: \`<div class="utrecht-backdrop">\`. Utrecht's base CSS with the Tilburg \`--utrecht-backdrop-*\` tokens (black at 20% opacity, fading in). It covers its nearest positioned ancestor; add \`utrecht-backdrop--viewport\` to cover the whole viewport. Users who ask for reduced transparency (\`prefers-reduced-transparency\`) get an almost opaque backdrop, users who ask for reduced motion get no fade. Utrecht's \`utrecht-backdrop--reduced-transparency\` and \`--reduced-motion\` classes force those states regardless of the user setting (the Reduced transparency example uses one); the components do not have an input for them, add the class yourself if you need it. The backdrop itself carries no meaning; a native \`<dialog>\` opened with \`showModal()\` brings its own \`::backdrop\` and makes the page behind it inert, which this element does not.`;

const usageAngular = `### Angular

\`\`\`html
<div style="position: relative">
  <tilburg-paragraph>Inhoud achter de backdrop.</tilburg-paragraph>
  <tilburg-backdrop></tilburg-backdrop>
</div>
\`\`\`

Inputs: \`viewport\` (\`boolean\`, default \`false\`; adds \`utrecht-backdrop--viewport\` so the backdrop is \`position: fixed\` over the whole viewport). Content: default projection.`;

const usageReact = `### React

\`\`\`tsx
import { Backdrop, Paragraph } from '@gemeente-tilburg/components-react';

export function Bezig() {
  return (
    <div style={{ position: 'relative' }}>
      <Paragraph>Inhoud achter de backdrop.</Paragraph>
      <Backdrop />
    </div>
  );
}
\`\`\`

Props: \`viewport\` (\`boolean\`, default \`false\`; adds \`utrecht-backdrop--viewport\`), \`children\`, plus any \`<div>\` attribute (\`className\` is merged after \`utrecht-backdrop\`). \`BackdropProps\` is exported as a type. The \`ref\` is forwarded to the \`<div>\`.`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<div style="position: relative">
  <p class="utrecht-paragraph">Inhoud achter de backdrop.</p>
  <tilburg-wbc-backdrop></tilburg-wbc-backdrop>
</div>
\`\`\`

Renders \`<div class="utrecht-backdrop">\`. Attribute: \`viewport\` (boolean, default \`false\`). Slot: default. No events.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<div style="position: relative">
  <p class="utrecht-paragraph">Inhoud achter de backdrop.</p>
  <div class="utrecht-backdrop"></div>
</div>

<!-- Over the whole viewport -->
<div class="utrecht-backdrop utrecht-backdrop--viewport"></div>
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

const wrapStyle = 'position:relative;max-inline-size:32rem;padding:1rem';

export const examples = {
  default: {
    name: 'Default',
    html: `<div style="${wrapStyle}">
  <p class="utrecht-paragraph">Je aanvraag wordt verstuurd. De inhoud van het formulier is even niet te gebruiken.</p>
  <p class="utrecht-paragraph">Sluit dit venster niet.</p>
  <div class="utrecht-backdrop"></div>
</div>`,
  },
  reducedTransparency: {
    name: 'Reduced transparency',
    html: `<div style="${wrapStyle}">
  <p class="utrecht-paragraph">Je aanvraag wordt verstuurd. De inhoud van het formulier is even niet te gebruiken.</p>
  <p class="utrecht-paragraph">Sluit dit venster niet.</p>
  <div class="utrecht-backdrop utrecht-backdrop--reduced-transparency"></div>
</div>`,
  },
} satisfies Record<string, Example>;
