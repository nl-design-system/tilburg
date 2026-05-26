/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg paragraph. Imported
   by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fparagraph';

export const description = `Body text paragraph. Three size modes: default, \`lead\` (slightly larger, for intro text), and \`small\` (used in captions / small print). All three inherit Tilburg's body font + colour via the utrecht-paragraph token chain.

## Usage

### Angular

\`\`\`html
<tilburg-paragraph>Standaard alinea.</tilburg-paragraph>
<tilburg-paragraph [lead]="true">Inleidende alinea, iets groter.</tilburg-paragraph>
<tilburg-paragraph [small]="true">Kleine print onderaan een sectie.</tilburg-paragraph>
\`\`\`

Inputs: \`lead\` (boolean), \`small\` (boolean).

### Plain HTML / CSS

\`\`\`html
<p class="utrecht-paragraph">Standaard alinea.</p>
<p class="utrecht-paragraph utrecht-paragraph--lead">Inleidende alinea.</p>
<p class="utrecht-paragraph utrecht-paragraph--small">Kleine print.</p>
\`\`\`
`;

export interface Example {
  name: string;
  html: string;
}

const COPY =
  'Tilburg, gelegen in het zuiden van Nederland, is een bruisende stad met een rijke geschiedenis en een levendige cultuur.';

export const examples = {
  default: {
    name: 'Default',
    html: `<p class="utrecht-paragraph">${COPY}</p>`,
  },
  lead: {
    name: 'Lead',
    html: `<p class="utrecht-paragraph utrecht-paragraph--lead">${COPY}</p>`,
  },
  small: {
    name: 'Small',
    html: `<p class="utrecht-paragraph utrecht-paragraph--small">${COPY}</p>`,
  },
} satisfies Record<string, Example>;
