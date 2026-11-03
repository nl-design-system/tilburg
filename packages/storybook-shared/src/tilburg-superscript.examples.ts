/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg superscript. Imported by
   both the React storybook (`packages/storybook`) and the Angular storybook
   (`packages/storybook-angular`). `.utrecht-superscript` is unstyled upstream (the UA styles of
   `<sup>` apply), so there is no components-css folder. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fsuperscript';

const intro = `Text set above the baseline for typographic conventions such as units (m²) and exponents, rendered as \`<sup class="utrecht-superscript">\`. Inline: it flows with the surrounding text. Use it only where the position carries meaning, not for visual effect. Utrecht's \`utrecht-superscript--open-type\` variant (the font's own OpenType superscript glyphs) is not offered: Tilburg's fonts have no such glyphs, so "m²" would render as "m2".`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-paragraph>Een dakkapel tot 4 m<tilburg-superscript>2</tilburg-superscript> is vergunningvrij.</tilburg-paragraph>
\`\`\`

No inputs. The host stays \`display: inline\`.`;

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

Props: any standard HTML attribute (\`className\` is merged after the utrecht classes). \`SuperscriptProps\` is exported as a type. The \`ref\` is forwarded to the \`<sup>\`.`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<p class="utrecht-paragraph">Een dakkapel tot 4 m<tilburg-wbc-superscript>2</tilburg-wbc-superscript> is vergunningvrij.</p>
\`\`\`

No attributes. The host stays inline. No events or named slots.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<sup class="utrecht-superscript">2</sup>
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
} satisfies Record<string, Example>;
