/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg mark. Imported by both
   the React storybook (`packages/storybook`) and the Angular storybook
   (`packages/storybook-angular`). Styled by the Utrecht base CSS; the Tilburg
   highlight colour comes from `--utrecht-mark-background-color` (patch
   `proprietary/design-tokens/src/patches/mark.tokens.json`). */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fmark';

const intro = `Highlights text that is relevant in the current context, for example the search term in a list of search results, rendered as \`<mark class="utrecht-mark">\` on a Tilburg yellow background. Inline: it flows with the surrounding text. The highlight is not announced by every screen reader, so do not rely on it alone to convey meaning. In print and forced-colors mode Utrecht swaps the background for an outline / the system highlight colours.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-paragraph>Openingstijden <tilburg-mark>Stadswinkel</tilburg-mark> Stadhuisplein</tilburg-paragraph>
\`\`\`

No inputs. The host stays \`display: inline\`.`;

const usageReact = `### React

\`\`\`tsx
import { Mark, Paragraph } from '@gemeente-tilburg/components-react';

export function Zoekresultaat() {
  return (
    <Paragraph>
      Openingstijden <Mark>Stadswinkel</Mark> Stadhuisplein
    </Paragraph>
  );
}
\`\`\`

Props: no component-specific props. \`MarkProps\` is an exported type alias of \`HTMLAttributes<HTMLElement>\` (\`className\` is merged after \`utrecht-mark\`). The \`ref\` is forwarded to the \`<mark>\`.`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<p class="utrecht-paragraph">Openingstijden <tilburg-wbc-mark>Stadswinkel</tilburg-wbc-mark> Stadhuisplein</p>
\`\`\`

Renders \`<mark class="utrecht-mark">\` around the default slot; the host stays inline. No attributes, events or named slots.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<mark class="utrecht-mark">…</mark>
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
    html: `<p class="utrecht-paragraph">Openingstijden <mark class="utrecht-mark">Stadswinkel</mark> Stadhuisplein: maandag tot en met vrijdag van 9.00 tot 17.00 uur.</p>`,
  },
} satisfies Record<string, Example>;
