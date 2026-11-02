/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg color sample. Imported
   by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`). */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fcolor-sample';

const intro = `Small swatch that shows a colour, for example in the legend of a map or chart: \`<data class="utrecht-color-sample" value="…" style="color: …">\`. The swatch is painted with \`currentColor\`, so the colour goes in the inline \`color\` style and, machine-readable, in \`value\`. Always put a text label next to it ("roze", "blauw, hoog water"): users who can't tell colours apart need the text. \`forced-color-adjust: none\` keeps the colour in Windows high-contrast mode.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-color-sample color="#e00078"></tilburg-color-sample> Roze
\`\`\`

Inputs: \`color\` (any CSS colour; sets both the \`value\` attribute and the inline \`color\`).`;

const usageReact = `### React

\`\`\`tsx
import { ColorSample } from '@gemeente-tilburg/components-react';

export function Legenda() {
  return (
    <span>
      <ColorSample color="#e00078" /> Roze
    </span>
  );
}
\`\`\`

Props: \`color\` (\`string\`; sets both \`value\` and the inline \`color\`), plus any standard attribute (\`className\`, merged after \`utrecht-color-sample\`, \`style\`, …). \`ColorSampleProps\` is exported as a type. The \`ref\` is forwarded to the \`<data>\`.`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<tilburg-wbc-color-sample color="#e00078"></tilburg-wbc-color-sample> Roze
\`\`\`

Renders \`<data class="utrecht-color-sample" value="#e00078" style="color: #e00078">\`. Attribute: \`color\`. No slots or events.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<data class="utrecht-color-sample" value="#e00078" style="color: #e00078"></data> Roze
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
    html: `<p class="utrecht-paragraph">
  <data class="utrecht-color-sample" value="#e00078" style="color: #e00078"></data> Roze
</p>`,
  },
  legend: {
    name: 'Legend',
    html: `<div>
  <p class="utrecht-paragraph"><data class="utrecht-color-sample" value="#00a4db" style="color: #00a4db"></data> Blauw, hoog water</p>
  <p class="utrecht-paragraph"><data class="utrecht-color-sample" value="#ffd800" style="color: #ffd800"></data> Geel, laag water</p>
  <p class="utrecht-paragraph"><data class="utrecht-color-sample" value="#008a6a" style="color: #008a6a"></data> Groen, normaal peil</p>
</div>`,
  },
} satisfies Record<string, Example>;
