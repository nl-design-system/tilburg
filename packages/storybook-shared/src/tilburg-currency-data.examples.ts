/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg currency data. Imported
   by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fcurrency-data';

const intro = `Shows an amount of money, formatted for the locale with \`Intl.NumberFormat\` exactly like Utrecht's React \`CurrencyData\` (default locale \`nl-NL\`, currency \`EUR\`). The text uses grouping, two decimals, non-breaking spaces and a real minus sign (U+2212) placed before the currency in Dutch ("− € 85,00"); \`value\` holds currency and amount for software ("EUR -85"). Positive and negative amounts get the \`utrecht-currency-data--positive\` / \`--negative\` modifier classes (Utrecht has no styling for them yet). Tabular figures align amounts in a column; the amount never wraps. Unlike Utrecht there is no compact \`aria-label\`: ARIA does not allow it on \`<data>\` (role generic), and screen readers read the visible amount well when the page has the right \`lang\`.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-currency-data [amount]="1234.5"></tilburg-currency-data>
<tilburg-currency-data amount="-85" currency="EUR" locale="nl-NL"></tilburg-currency-data>
\`\`\`

Inputs: \`amount\` (\`number | string\`, required), \`currency\` (ISO 4217 code, default \`'EUR'\`), \`locale\` (BCP 47, default \`'nl-NL'\`). The visible text is generated, the component takes no content.`;

const usageReact = `### React

\`\`\`tsx
import { CurrencyData, Paragraph } from '@gemeente-tilburg/components-react';

export function Aanslag() {
  return (
    <Paragraph>
      Te betalen: <CurrencyData amount={1234.5} />
    </Paragraph>
  );
}
\`\`\`

Props: \`amount\` (\`number | string\`, required), \`currency\` (default \`'EUR'\`), \`locale\` (default \`'nl-NL'\`), plus any standard \`<data>\` attribute (\`className\` is merged after the Utrecht classes). It takes no \`children\`: the text is always the formatted amount. \`CurrencyDataProps\` is exported as a type. The \`ref\` is forwarded to the \`<data>\`.`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<tilburg-wbc-currency-data amount="1234.5"></tilburg-wbc-currency-data>
<tilburg-wbc-currency-data amount="-85" currency="EUR" locale="nl-NL"></tilburg-wbc-currency-data>
\`\`\`

Attributes: \`amount\`, \`currency\` and \`locale\`, as in Angular. \`id\` and \`title\` move from the host to the \`<data>\`. No slot: the text is generated.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<data class="utrecht-currency-data utrecht-currency-data--positive" value="EUR 1234.5">€&nbsp;1.234,50</data>
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
    html: `<p class="utrecht-paragraph">Te betalen: <data class="utrecht-currency-data utrecht-currency-data--positive" value="EUR 1234.5">€&nbsp;1.234,50</data></p>`,
  },
  negative: {
    name: 'Negative amount',
    html: `<p class="utrecht-paragraph">Terug te ontvangen: <data class="utrecht-currency-data utrecht-currency-data--negative" value="EUR -85">&#x2212;&nbsp;€&nbsp;85,00</data></p>`,
  },
  zero: {
    name: 'Zero',
    html: `<p class="utrecht-paragraph">Openstaand saldo: <data class="utrecht-currency-data" value="EUR 0">€&nbsp;0,00</data></p>`,
  },
} satisfies Record<string, Example>;
