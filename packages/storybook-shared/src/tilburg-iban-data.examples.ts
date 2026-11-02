/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg IBAN data. Imported
   by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fiban-data';

const intro = `Shows a bank account number (IBAN) the way people read it over: in groups of four, never broken over two lines, with a slashed zero and tabular figures. The \`value\` attribute holds the normalized IBAN (no spaces or dashes, upper case) for software; \`translate="no"\` stops translation tools from changing it. The components normalize and format the IBAN for you, exactly like Utrecht's React \`IBANData\`: \`" nl91 abna-0417 1643 00 "\` becomes \`value="NL91ABNA0417164300"\` and the text "NL91 ABNA 0417 1643 00". They do not validate the IBAN.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-iban-data value="NL91ABNA0417164300"></tilburg-iban-data>
\`\`\`

Inputs: \`value\` (\`string\`, required; any spacing or case). The visible text is generated, the component takes no content.`;

const usageReact = `### React

\`\`\`tsx
import { IbanData, Paragraph } from '@gemeente-tilburg/components-react';

export function Betaalgegevens() {
  return (
    <Paragraph>
      Maak het bedrag over naar <IbanData value="NL91ABNA0417164300" />.
    </Paragraph>
  );
}
\`\`\`

Props: \`value\` (\`string\`, required), plus any standard \`<data>\` attribute (\`className\` is merged after \`utrecht-iban-data\`). It takes no \`children\`: the text is always the formatted IBAN. \`IbanDataProps\` is exported as a type. The \`ref\` is forwarded to the \`<data>\`.`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<tilburg-wbc-iban-data value="NL91ABNA0417164300"></tilburg-wbc-iban-data>
\`\`\`

Attribute: \`value\`, as in Angular. \`id\` and \`title\` move from the host to the \`<data>\`. No slot: the text is generated.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<data class="utrecht-iban-data" value="NL91ABNA0417164300" translate="no">NL91 ABNA 0417 1643 00</data>
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
    html: `<p class="utrecht-paragraph">Maak het bedrag over naar <data class="utrecht-iban-data" value="NL91ABNA0417164300" translate="no">NL91 ABNA 0417 1643 00</data> onder vermelding van uw aanslagnummer.</p>`,
  },
  long: {
    name: 'Long IBAN (Mauritius, 30 characters)',
    html: `<p class="utrecht-paragraph"><data class="utrecht-iban-data" value="MU43BOMM0101123456789101000MUR" translate="no">MU43 BOMM 0101 1234 5678 9101 000M UR</data></p>`,
  },
} satisfies Record<string, Example>;
