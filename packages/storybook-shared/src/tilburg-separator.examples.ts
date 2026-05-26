/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg separator. Imported
   by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fseparator';

export const description = `Thin horizontal divider between content sections, using \`--tilburg-line-border-color\` and \`--tilburg-line-border-width\`. Pass \`decorative\` for purely visual dividers so the element is hidden from assistive technology.

## Usage

### Angular

\`\`\`html
<tilburg-separator [decorative]="true"></tilburg-separator>
\`\`\`

Inputs: \`decorative\` (when \`true\`, sets \`aria-hidden\` so screen readers skip the divider).

### Plain HTML / CSS

\`\`\`html
<hr class="utrecht-separator" aria-hidden="true" />
\`\`\`
`;

export interface Example {
  name: string;
  html: string;
}

const wrapStyle = 'max-width:32rem';

export const examples = {
  default: {
    name: 'Default',
    html: `<div style="${wrapStyle}">
  <p class="utrecht-paragraph">Eerste sectie met wat tekst boven de scheidingslijn.</p>
  <hr class="utrecht-separator" />
  <p class="utrecht-paragraph">Tweede sectie onder de scheidingslijn.</p>
</div>`,
  },
  decorative: {
    name: 'Decorative (aria-hidden)',
    html: `<div style="${wrapStyle}">
  <p class="utrecht-paragraph">Aanvraagdetails</p>
  <hr class="utrecht-separator" aria-hidden="true" />
  <p class="utrecht-paragraph">Contactgegevens</p>
</div>`,
  },
} satisfies Record<string, Example>;
