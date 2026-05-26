/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg unordered list.
   Imported by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Funordered-list';

export const description = `Bulleted list built on \`.tilburg-unordered-list\` + \`.utrecht-unordered-list__item\`. Inherits utrecht spacing tokens and marker colour; disc markers by default.

## Usage

### Angular

\`\`\`html
<tilburg-unordered-list>
  <li class="utrecht-unordered-list__item">Eerste item</li>
  <li class="utrecht-unordered-list__item">Tweede item</li>
</tilburg-unordered-list>
\`\`\`

No inputs.

### Plain HTML / CSS

\`\`\`html
<ul class="tilburg-unordered-list utrecht-unordered-list utrecht-unordered-list--html-ul">
  <li class="utrecht-unordered-list__item">Eerste item</li>
  <li class="utrecht-unordered-list__item">Tweede item</li>
</ul>
\`\`\`
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
