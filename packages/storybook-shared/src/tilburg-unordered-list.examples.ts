/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg unordered list.
   Imported by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Funordered-list';

const intro = `Bulleted list built on \`.tilburg-unordered-list\` + \`.utrecht-unordered-list__item\`. Inherits utrecht spacing tokens and marker colour; disc markers by default.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-unordered-list>
  <li class="utrecht-unordered-list__item">Eerste item</li>
  <li class="utrecht-unordered-list__item">Tweede item</li>
</tilburg-unordered-list>
\`\`\`

No inputs.`;

const usageReact = `### React

\`\`\`tsx
import { UnorderedList } from '@gemeente-tilburg/components-react';

export function Aanvragen() {
  return (
    <UnorderedList>
      <li className="utrecht-unordered-list__item">
        Aanvragen
        <UnorderedList>
          <li className="utrecht-unordered-list__item">Vergunningen</li>
          <li className="utrecht-unordered-list__item">Subsidies</li>
        </UnorderedList>
      </li>
      <li className="utrecht-unordered-list__item">Contact</li>
    </UnorderedList>
  );
}
\`\`\`

There is no separate list-item component: the children are plain \`<li>\` elements. Add \`className="utrecht-unordered-list__item"\` yourself for the utrecht item spacing and marker colour — \`UnorderedList\` only decorates the \`<ul>\`. Nest by rendering another \`<UnorderedList>\` (or \`<OrderedList>\`) inside an \`<li>\`; the nested list collapses its outer margins automatically.

Props: no component-specific props. It accepts every standard \`<ul>\` attribute (\`className\`, \`aria-label\`, \`id\`, …) via \`HTMLAttributes<HTMLUListElement>\` and forwards its ref to the \`<ul>\`. \`UnorderedListProps\` is exported as a type alias for that attribute set.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<ul class="tilburg-unordered-list utrecht-unordered-list utrecht-unordered-list--html-ul">
  <li class="utrecht-unordered-list__item">Eerste item</li>
  <li class="utrecht-unordered-list__item">Tweede item</li>
</ul>
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
    name: 'Default',
    html: `<ul class="tilburg-unordered-list utrecht-unordered-list utrecht-unordered-list--html-ul">
  <li class="utrecht-unordered-list__item">In deze app staan niet de dagen waarop wij de wijkcontainers legen, alleen de huiscontainers (kliko&apos;s).</li>
  <li class="utrecht-unordered-list__item">Je kunt je afval gescheiden aanbieden via de kliko of de milieustraat.</li>
  <li class="utrecht-unordered-list__item">Op feestdagen kan de ophaaldag verschuiven; controleer de afvalkalender.</li>
</ul>`,
  },
  nested: {
    name: 'Nested',
    html: `<ul class="tilburg-unordered-list utrecht-unordered-list utrecht-unordered-list--html-ul">
  <li class="utrecht-unordered-list__item">
    Aanvragen
    <ul class="tilburg-unordered-list utrecht-unordered-list utrecht-unordered-list--html-ul">
      <li class="utrecht-unordered-list__item">Vergunningen</li>
      <li class="utrecht-unordered-list__item">Subsidies</li>
    </ul>
  </li>
  <li class="utrecht-unordered-list__item">Contact</li>
</ul>`,
  },
} satisfies Record<string, Example>;
