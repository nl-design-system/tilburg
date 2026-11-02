/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg superscript. Imported by
   both the React storybook (`packages/storybook`) and the Angular storybook
   (`packages/storybook-angular`). The CSS is ported from Utrecht in
   `packages/components-css/superscript` (not in `@utrecht/component-library-css`
   5.2.0). */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fsuperscript';

const intro = `Text set above the baseline for typographic conventions such as units (m²) and exponents, rendered as \`<sup class="utrecht-superscript">\`. Inline: it flows with the surrounding text. Use it only where the position carries meaning, not for visual effect. \`openType\` uses the font's own OpenType superscript glyphs instead of a shrunk, raised character; only use it when you know the font has them for every character.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-paragraph>Een dakkapel tot 4 m<tilburg-superscript>2</tilburg-superscript> is vergunningvrij.</tilburg-paragraph>
\`\`\`

Inputs: \`openType\` (\`boolean\`, default \`false\`; adds \`utrecht-superscript--open-type\`). The host stays \`display: inline\`.`;

const usageReact = `### React

\`\`\`tsx
import { Paragraph, Superscript } from '@gemeente-tilburg/components-react';

export function Dakkapel() {
  return (
    <Paragraph>
      Een dakkapel tot 4 m<Superscript>2</Superscript> is vergunningvrij.
    </Paragraph>
  );
}
\`\`\`

Props: \`openType\` (\`boolean\`, default \`false\`; adds \`utrecht-superscript--open-type\`), plus any standard HTML attribute (\`className\` is merged after the utrecht classes). \`SuperscriptProps\` is exported as a type. The \`ref\` is forwarded to the \`<sup>\`.`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<p class="utrecht-paragraph">Een dakkapel tot 4 m<tilburg-wbc-superscript>2</tilburg-wbc-superscript> is vergunningvrij.</p>
\`\`\`

Attribute: \`open-type\` (boolean, default \`false\`; adds \`utrecht-superscript--open-type\`). The host stays inline. No events or named slots.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<sup class="utrecht-superscript">2</sup>
<sup class="utrecht-superscript utrecht-superscript--open-type">2</sup>
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
  default: {
    name: 'Default',
    html: `<p class="utrecht-paragraph">Een dakkapel aan de achterkant tot 4 m<sup class="utrecht-superscript">2</sup> is meestal vergunningvrij.</p>`,
  },
  openType: {
    name: 'OpenType glyphs',
    html: `<p class="utrecht-paragraph">Een dakkapel aan de achterkant tot 4 m<sup class="utrecht-superscript utrecht-superscript--open-type">2</sup> is meestal vergunningvrij.</p>`,
  },
} satisfies Record<string, Example>;
