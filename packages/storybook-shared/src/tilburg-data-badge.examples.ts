/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg data badge. Imported
   by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fdata-badge';

const intro = `Small inline badge for a piece of data (a size, a label, a date). It is an inline element, so it can sit inside a paragraph. Use a \`<time>\` element for dates, times and durations (\`dateTime\`), a \`<data>\` element when there is a machine-readable \`value\`, and a \`<span>\` otherwise. Uses Utrecht's current class \`utrecht-data-badge\` (the successor of the deprecated \`utrecht-badge-data\`), styled with Tilburg blue.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-data-badge>Energielabel A</tilburg-data-badge>
<tilburg-data-badge value="259">≥ 250㎡</tilburg-data-badge>
<tilburg-data-badge dateTime="2026-12-24">24 december 2026</tilburg-data-badge>
\`\`\`

Inputs: \`dateTime\` (renders a \`<time datetime>\`), \`value\` (renders a \`<data value>\`). Without either it renders a \`<span>\`; \`dateTime\` wins when both are set. The content is the visible text.`;

const usageReact = `### React

\`\`\`tsx
import { DataBadge, Paragraph } from '@gemeente-tilburg/components-react';

export function Woningkenmerken() {
  return (
    <Paragraph>
      Kenmerken: <DataBadge value="259">≥ 250㎡</DataBadge> <DataBadge>Energielabel A</DataBadge>
    </Paragraph>
  );
}
\`\`\`

Props: \`dateTime\` (\`string\`, renders a \`<time>\`), \`value\` (\`string\`, renders a \`<data>\`), plus any standard HTML attribute (\`className\` is merged after \`utrecht-data-badge\`). \`DataBadgeProps\` is exported as a type. The \`ref\` is forwarded to the rendered element.`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<tilburg-wbc-data-badge>Energielabel A</tilburg-wbc-data-badge>
<tilburg-wbc-data-badge value="259">≥ 250㎡</tilburg-wbc-data-badge>
<tilburg-wbc-data-badge date-time="2026-12-24">24 december 2026</tilburg-wbc-data-badge>
\`\`\`

Attributes: \`date-time\` and \`value\`, as in Angular. \`id\` and \`title\` move from the host to the inner element. The default slot is the visible text.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<span class="utrecht-data-badge">Energielabel A</span>
<data class="utrecht-data-badge" value="259">≥ 250㎡</data>
<time class="utrecht-data-badge" datetime="2026-12-24">24 december 2026</time>
\`\`\`

Never put the badge in a \`<div>\` inside a \`<p>\`: the parser closes the paragraph at the \`<div>\`. Never use \`<data>\` without \`value\`.`;

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
    html: `<p class="utrecht-paragraph">Kenmerken van de woning: <span class="utrecht-data-badge">Energielabel A</span> <span class="utrecht-data-badge">Tuin op het zuiden</span></p>`,
  },
  value: {
    name: 'Machine-readable value (data)',
    html: `<p class="utrecht-paragraph">Perceeloppervlakte: <data class="utrecht-data-badge" value="259">≥ 250㎡</data></p>`,
  },
  dateTime: {
    name: 'Date and duration (time)',
    html: `<p class="utrecht-paragraph">Uw afspraak: <time class="utrecht-data-badge" datetime="2026-12-24">24 december 2026</time>, duur <time class="utrecht-data-badge" datetime="PT30M">30 minuten</time></p>`,
  },
} satisfies Record<string, Example>;
