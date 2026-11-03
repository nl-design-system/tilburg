/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg subscript. Imported by
   both the React storybook (`packages/storybook`) and the Angular storybook
   (`packages/storybook-angular`). `.utrecht-subscript` is unstyled upstream (the UA styles of
   `<sub>` apply), so there is no components-css folder. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fsubscript';

const intro = `Text set below the baseline for typographic conventions such as chemical formulas (CO₂), rendered as \`<sub class="utrecht-subscript">\`. Inline: it flows with the surrounding text. Use it only where the position carries meaning, not for visual effect. Utrecht's \`utrecht-subscript--open-type\` variant (the font's own OpenType subscript glyphs) is not offered: Tilburg's fonts have no such glyphs, so "CO₂" would render as "CO2".`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-paragraph>Uitstoot van CO<tilburg-subscript>2</tilburg-subscript> per inwoner</tilburg-paragraph>
\`\`\`

No inputs. The host stays \`display: inline\`.`;

const usageReact = `### React

\`\`\`tsx
import { Paragraph, Subscript } from '@gemeente-tilburg/components-react';

export function Uitstoot() {
  return (
    <Paragraph>
      Uitstoot van CO<Subscript>2</Subscript> per inwoner
    </Paragraph>
  );
}
\`\`\`

Props: any standard HTML attribute (\`className\` is merged after the utrecht classes). \`SubscriptProps\` is exported as a type. The \`ref\` is forwarded to the \`<sub>\`.`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<p class="utrecht-paragraph">Uitstoot van CO<tilburg-wbc-subscript>2</tilburg-wbc-subscript> per inwoner</p>
\`\`\`

No attributes. The host stays inline. No events or named slots.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<sub class="utrecht-subscript">2</sub>
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
    html: `<p class="utrecht-paragraph">Tilburg wil de uitstoot van CO<sub class="utrecht-subscript">2</sub> in 2030 met de helft verminderen.</p>`,
  },
} satisfies Record<string, Example>;
