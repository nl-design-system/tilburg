/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg ordered list.
   Imported by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fordered-list';

const intro = `Numbered list built on \`.tilburg-ordered-list\` + \`.utrecht-ordered-list__item\`. The Tilburg layer adds a \`--by-letter\` modifier that switches the marker to lower-case alphabet (\`a, b, c, …\`) and inherits utrecht spacing tokens for the list items.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-ordered-list [byLetter]="true">
  <li class="utrecht-ordered-list__item">Eerste stap</li>
  <li class="utrecht-ordered-list__item">Tweede stap</li>
  <li class="utrecht-ordered-list__item">Derde stap</li>
</tilburg-ordered-list>
\`\`\`

Inputs: \`byLetter\` (boolean — switches markers from decimal to lower-alpha).`;

const usageReact = `### React

\`\`\`tsx
import { OrderedList } from '@gemeente-tilburg/components-react';

export function Stappenplan() {
  return (
    <OrderedList byLetter>
      <li className="utrecht-ordered-list__item">Eerste stap</li>
      <li className="utrecht-ordered-list__item">Tweede stap</li>
      <li className="utrecht-ordered-list__item">Derde stap</li>
    </OrderedList>
  );
}
\`\`\`

There is no separate list-item component: the children are plain \`<li>\` elements. Add \`className="utrecht-ordered-list__item"\` yourself to pick up the utrecht item spacing and marker colour — \`OrderedList\` only decorates the \`<ol>\`. Nesting works by rendering another \`<OrderedList>\` (or \`<UnorderedList>\`) inside an \`<li>\`; the nested list collapses its outer margins automatically.

Props: \`byLetter?: boolean\` (default \`false\` — switches markers from decimal to lower-alpha), plus every standard \`<ol>\` attribute (\`className\`, \`start\`, \`reversed\`, \`aria-label\`, …) via \`OlHTMLAttributes<HTMLOListElement>\`. Forwards its ref to the \`<ol>\`. \`OrderedListProps\` is exported as a type.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<ol class="tilburg-ordered-list utrecht-ordered-list utrecht-ordered-list--html-ol">
  <li class="utrecht-ordered-list__item">Eerste stap</li>
  <li class="utrecht-ordered-list__item">Tweede stap</li>
</ol>

<!-- Lettered markers -->
<ol class="tilburg-ordered-list tilburg-ordered-list--by-letter utrecht-ordered-list utrecht-ordered-list--html-ol">
  …
</ol>
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
