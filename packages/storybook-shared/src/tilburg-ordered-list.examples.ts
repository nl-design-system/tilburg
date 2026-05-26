/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg ordered list.
   Imported by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fordered-list';

export const description = `Numbered list built on \`.tilburg-ordered-list\` + \`.utrecht-ordered-list__item\`. The Tilburg layer adds a \`--by-letter\` modifier that switches the marker to lower-case alphabet (\`a, b, c, …\`) and inherits utrecht spacing tokens for the list items.

## Usage

### Angular

\`\`\`html
<tilburg-ordered-list [byLetter]="true">
  <li class="utrecht-ordered-list__item">Eerste stap</li>
  <li class="utrecht-ordered-list__item">Tweede stap</li>
  <li class="utrecht-ordered-list__item">Derde stap</li>
</tilburg-ordered-list>
\`\`\`

Inputs: \`byLetter\` (boolean — switches markers from decimal to lower-alpha).

### Plain HTML / CSS

\`\`\`html
<ol class="tilburg-ordered-list utrecht-ordered-list utrecht-ordered-list--html-ol">
  <li class="utrecht-ordered-list__item">Eerste stap</li>
  <li class="utrecht-ordered-list__item">Tweede stap</li>
</ol>

<!-- Lettered markers -->
<ol class="tilburg-ordered-list tilburg-ordered-list--by-letter utrecht-ordered-list utrecht-ordered-list--html-ol">
  …
</ol>
\`\`\`
`;

export interface Example {
  name: string;
  html: string;
}

export const examples = {
  default: {
    name: 'Default (decimal)',
    html: `<ol class="tilburg-ordered-list utrecht-ordered-list utrecht-ordered-list--html-ol">
  <li class="utrecht-ordered-list__item">Gemeente Tilburg rekenkamer</li>
  <li class="utrecht-ordered-list__item">Gemeente Tilburg college</li>
  <li class="utrecht-ordered-list__item">Gemeente Tilburg contact</li>
</ol>`,
  },
  byLetter: {
    name: 'By letter (a, b, c, …)',
    html: `<ol class="tilburg-ordered-list tilburg-ordered-list--by-letter utrecht-ordered-list utrecht-ordered-list--html-ol">
  <li class="utrecht-ordered-list__item">Eerste stap</li>
  <li class="utrecht-ordered-list__item">Tweede stap</li>
  <li class="utrecht-ordered-list__item">Derde stap</li>
</ol>`,
  },
} satisfies Record<string, Example>;
