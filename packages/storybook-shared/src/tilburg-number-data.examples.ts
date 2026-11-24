/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg number data. Imported
   by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fnumber-data';

const intro = `A number in a table or data list, as a \`<data>\` element: \`value\` holds the number for software (a valid floating-point number, like \`<input type="number">\`), the content shows it to people in the local notation ("1.234,56"). Tabular figures keep columns of numbers aligned. The \`positive\` and \`negative\` variants colour the number with \`--utrecht-number-data-{positive,negative}-color\` (Tilburg green-400 and red-400: the feedback colours green-300/red-300 are below 4.5:1 for text on white); always write the minus or plus sign as well, colour alone is not enough (WCAG 1.4.1). Set the right \`lang\` on the page or an ancestor: a screen reader reads "1.234" differently in English (WCAG 3.1.2). Do not split the number into extra elements inside \`<data>\`.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-number-data [value]="226000">226.000</tilburg-number-data>
<tilburg-number-data value="-1.5" variant="negative">−1,5%</tilburg-number-data>
\`\`\`

Inputs: \`value\` (\`number | string\`, the machine-readable number), \`variant\` (\`'positive' | 'negative'\`, adds the colour modifier). The content is the formatted number; the component does not format it.`;

const usageReact = `### React

\`\`\`tsx
import { NumberData } from '@gemeente-tilburg/components-react';

export function Inwoners() {
  return <NumberData value={226000}>226.000</NumberData>;
}
\`\`\`

Props: \`value\` (\`number | string\`), \`variant\` (\`'positive' | 'negative'\`), plus any standard \`<data>\` attribute (\`className\` is merged after \`utrecht-number-data\`). \`NumberDataProps\` and \`NumberDataVariant\` are exported as types. The \`ref\` is forwarded to the \`<data>\`.`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<tilburg-wbc-number-data value="226000">226.000</tilburg-wbc-number-data>
<tilburg-wbc-number-data value="-1.5" variant="negative">−1,5%</tilburg-wbc-number-data>
\`\`\`

Attributes: \`value\` and \`variant\`, as in Angular. \`id\` and \`title\` move from the host to the \`<data>\`. The default slot is the formatted number.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<data class="utrecht-number-data" value="1234.56">1.234,56</data>
<data class="utrecht-number-data utrecht-number-data--negative" value="-1.5">−1,5%</data>
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
    html: `<p class="utrecht-paragraph" lang="nl">Aantal inwoners van Tilburg: <data class="utrecht-number-data" value="226000">226.000</data></p>`,
  },
  positive: {
    name: 'Positive',
    html: `<p class="utrecht-paragraph" lang="nl">Groei ten opzichte van vorig jaar: <data class="utrecht-number-data utrecht-number-data--positive" value="1.8">+1,8%</data></p>`,
  },
  negative: {
    name: 'Negative',
    html: `<p class="utrecht-paragraph" lang="nl">Verandering in restafval per inwoner: <data class="utrecht-number-data utrecht-number-data--negative" value="-12.4">−12,4 kg</data></p>`,
  },
} satisfies Record<string, Example>;
