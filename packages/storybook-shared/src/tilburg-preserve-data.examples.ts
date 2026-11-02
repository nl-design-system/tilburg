/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg preserve data. Imported
   by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`). */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fpreserve-data';

const intro = `Shows data a user entered as close to 1-on-1 as possible: spaces are kept, the text is not translated (\`translate="no"\`) and left-to-right and right-to-left text is isolated with \`<bdi>\`. Line breaks are not kept. Rendered as \`<bdi class="utrecht-preserve-data" translate="no">\`; with \`value\` it becomes \`<data value="…">\`, with \`dateTime\` a \`<time datetime="…">\`, each with the \`<bdi translate="no">\` inside.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-preserve-data>{{ aanvrager.naam }}</tilburg-preserve-data>
<tilburg-preserve-data [value]="aanvrager.postcode">{{ aanvrager.postcode }}</tilburg-preserve-data>
<tilburg-preserve-data dateTime="2026-05-19">19 mei 2026</tilburg-preserve-data>
\`\`\`

Inputs: \`value\` (renders a \`<data value>\`), \`dateTime\` (renders a \`<time datetime>\`; wins over \`value\`). Project the text as \`<ng-content>\`. Bind entered data with \`{{ }}\`: Angular collapses repeated spaces in static template text, but keeps them in interpolated values.`;

const usageReact = `### React

\`\`\`tsx
import { PreserveData } from '@gemeente-tilburg/components-react';

export function Ingevoerd({ naam }: { naam: string }) {
  return <PreserveData>{naam}</PreserveData>;
}
\`\`\`

Props: \`value\` (\`string\`; renders a \`<data value>\`), \`dateTime\` (\`string\`; renders a \`<time dateTime>\`, wins over \`value\`), \`children\` (the text), plus any standard attribute (\`className\`, merged after \`utrecht-preserve-data\`, \`lang\`, …). \`PreserveDataProps\` is exported as a type. The \`ref\` is forwarded to the outer element.`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<tilburg-wbc-preserve-data>J.  de  Vries</tilburg-wbc-preserve-data>
<tilburg-wbc-preserve-data value="5038 AB">5038  AB</tilburg-wbc-preserve-data>
<tilburg-wbc-preserve-data date-time="2026-05-19">19 mei 2026</tilburg-wbc-preserve-data>
\`\`\`

Attributes: \`value\`, \`date-time\` (prop \`dateTime\`; wins over \`value\`). The text goes in the default slot. No events.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<bdi class="utrecht-preserve-data" translate="no">J.  de  Vries</bdi>
<data class="utrecht-preserve-data" value="5038 AB"><bdi translate="no">5038  AB</bdi></data>
<time class="utrecht-preserve-data" datetime="2026-05-19"><bdi translate="no">19 mei 2026</bdi></time>
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
    html: `<p class="utrecht-paragraph">Uw naam: <bdi class="utrecht-preserve-data" translate="no">J.  de  Vries</bdi></p>`,
  },
  rightToLeft: {
    name: 'Right-to-left text',
    html: `<p class="utrecht-paragraph">Uw naam: <bdi class="utrecht-preserve-data" translate="no">سارة</bdi></p>`,
  },
  value: {
    name: 'With value',
    html: `<p class="utrecht-paragraph">Postcode: <data class="utrecht-preserve-data" value="5038 AB"><bdi translate="no">5038  AB</bdi></data></p>`,
  },
  dateTime: {
    name: 'With date and time',
    html: `<p class="utrecht-paragraph">Geboortedatum: <time class="utrecht-preserve-data" datetime="2026-05-19"><bdi translate="no">19 mei 2026</bdi></time></p>`,
  },
} satisfies Record<string, Example>;
