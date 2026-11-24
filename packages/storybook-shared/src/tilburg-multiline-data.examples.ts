/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg multiline data. Imported
   by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fmultiline-data';

const intro = `Shows data that spans several lines, such as an address, where the line breaks are newline characters (\`\\n\`) in the data, not \`<br>\` elements. That way the data can be shown as text without allowing HTML injection. It renders a \`<pre>\` (like Utrecht's React \`MultilineData\`) whose font and margins are reset to the surrounding text; line breaks are kept, other runs of white space collapse.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-multiline-data>{{ adres }}</tilburg-multiline-data>
\`\`\`

No inputs; the content is the text. Pass it through an interpolation (\`adres = 'Stadhuisplein 130\\n5038 TC Tilburg'\`): Angular collapses newlines that are written literally in a template.`;

const usageReact = `### React

\`\`\`tsx
import { MultilineData } from '@gemeente-tilburg/components-react';

export function Bezoekadres() {
  return <MultilineData>{'Stadhuisplein 130\\n5038 TC Tilburg'}</MultilineData>;
}
\`\`\`

Props: any standard \`<pre>\` attribute (\`className\` is merged after the Utrecht classes). \`MultilineDataProps\` is exported as a type. The \`ref\` is forwarded to the \`<pre>\`.`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<tilburg-wbc-multiline-data>Stadhuisplein 130
5038 TC Tilburg</tilburg-wbc-multiline-data>
\`\`\`

No attributes; \`id\` and \`title\` move from the host to the \`<pre>\`. The default slot is the text.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<pre class="utrecht-multiline-data utrecht-multiline-data--html-pre">Stadhuisplein 130
5038 TC Tilburg</pre>
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
    name: 'Address',
    html: `<pre class="utrecht-multiline-data utrecht-multiline-data--html-pre">Gemeente Tilburg
Stadhuisplein 130
5038 TC Tilburg</pre>`,
  },
  note: {
    name: 'Free text with line breaks',
    html: `<pre class="utrecht-multiline-data utrecht-multiline-data--html-pre">Container staat naast de ingang.
Graag na 07:30 legen,    niet eerder.</pre>`,
  },
} satisfies Record<string, Example>;
