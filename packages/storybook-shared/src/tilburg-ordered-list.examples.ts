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
      <li>Eerste stap</li>
      <li>Tweede stap</li>
      <li>Derde stap</li>
    </OrderedList>
  );
}
\`\`\`

There is no separate list-item component: the children are plain \`<li>\` elements and they need no class of their own. \`OrderedList\` always emits the \`utrecht-ordered-list--html-ol\` modifier on the \`<ol>\`, and the Tilburg CSS layer styles that list's direct \`<li>\` children with the same item spacing and marker colour as an explicit \`.utrecht-ordered-list__item\`. Nesting works by rendering another \`<OrderedList>\` (or \`<UnorderedList>\`) inside an \`<li>\`; the nested list collapses its outer margins automatically.

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

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<tilburg-webc-ordered-list by-letter>
  <li>Eerste stap</li>
  <li>Tweede stap</li>
  <li>Derde stap</li>
</tilburg-webc-ordered-list>
\`\`\`

Attributes: \`by-letter\` (boolean — switches markers from decimal to lower-alpha), plus \`aria-label\` / \`aria-labelledby\`, which are moved onto the inner \`<ol>\`. Slot: default — plain \`<li>\` items; they end up as direct children of the \`<ol>\`, so the \`--html-ol > li\` item styling applies without a class. No events.

Nesting: when you write the markup as static HTML, the browser's HTML parser closes an open \`<li>\` as soon as it meets another \`<li>\` inside a custom element, so a nested \`<tilburg-webc-ordered-list>\` inside an \`<li>\` gets its items hoisted into the outer list. Nested lists work when the DOM is built by a framework or DOM APIs (React, Angular, \`append()\`); in static HTML nest a plain \`<ol class="tilburg-ordered-list utrecht-ordered-list utrecht-ordered-list--html-ol">\` instead.`;

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
