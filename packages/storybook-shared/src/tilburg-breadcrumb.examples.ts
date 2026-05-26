/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg breadcrumb. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fbreadcrumb';

export const description = `Tilburg breadcrumb. Trail links are blue with no underline by default and underlined on hover; the current item is bold gray-500.

## Usage

### Angular

\`\`\`ts
items: TilburgBreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Parkeren', href: '/parkeren' },
  { label: 'Bewonersvergunning', current: true },
];
\`\`\`

\`\`\`html
<tilburg-breadcrumb
  ariaLabel="Kruimelpad"
  [items]="items"
  (itemClick)="onCrumbClick($event)"
/>
\`\`\`

Inputs: \`ariaLabel\` (default \`'Kruimelpad'\`), \`items\` (\`{ label, href?, current?, data? }[]\`). Output: \`(itemClick)\` emits \`{ item, event }\`.

### Plain HTML / CSS

\`\`\`html
<nav class="utrecht-breadcrumb-nav tilburg-breadcrumb" aria-label="Kruimelpad">
  <ol class="utrecht-breadcrumb-nav__list utrecht-breadcrumb-nav__list--html-ol">
    <li class="utrecht-breadcrumb-nav__item">
      <a class="utrecht-breadcrumb-nav__link" href="/">Home</a>
      <span class="utrecht-breadcrumb-nav__separator" aria-hidden="true">›</span>
    </li>
    <li class="utrecht-breadcrumb-nav__item">
      <span aria-current="page" class="utrecht-breadcrumb-nav__link utrecht-breadcrumb-nav__link--current">
        Bewonersvergunning
      </span>
    </li>
  </ol>
</nav>
\`\`\`
`;

export interface Example {
  name: string;
  html: string;
}

export const examples = {
  default: {
    name: 'Default trail',
    html: `<nav class="utrecht-breadcrumb-nav tilburg-breadcrumb" aria-label="Kruimelpad">
  <ol class="utrecht-breadcrumb-nav__list utrecht-breadcrumb-nav__list--html-ol">
    <li class="utrecht-breadcrumb-nav__item">
      <a class="utrecht-breadcrumb-nav__link" href="#">Home</a>
      <span class="utrecht-breadcrumb-nav__separator" aria-hidden="true">›</span>
    </li>
    <li class="utrecht-breadcrumb-nav__item">
      <a class="utrecht-breadcrumb-nav__link" href="#">Parkeren</a>
      <span class="utrecht-breadcrumb-nav__separator" aria-hidden="true">›</span>
    </li>
    <li class="utrecht-breadcrumb-nav__item">
      <a class="utrecht-breadcrumb-nav__link" href="#">Vergunning aanvragen</a>
      <span class="utrecht-breadcrumb-nav__separator" aria-hidden="true">›</span>
    </li>
    <li class="utrecht-breadcrumb-nav__item">
      <span aria-current="page" class="utrecht-breadcrumb-nav__link utrecht-breadcrumb-nav__link--current">Bewonersvergunning</span>
    </li>
  </ol>
</nav>`,
  },
  twoLevels: {
    name: 'Two levels',
    html: `<nav class="utrecht-breadcrumb-nav tilburg-breadcrumb" aria-label="Kruimelpad">
  <ol class="utrecht-breadcrumb-nav__list utrecht-breadcrumb-nav__list--html-ol">
    <li class="utrecht-breadcrumb-nav__item">
      <a class="utrecht-breadcrumb-nav__link" href="#">Home</a>
      <span class="utrecht-breadcrumb-nav__separator" aria-hidden="true">›</span>
    </li>
    <li class="utrecht-breadcrumb-nav__item">
      <span aria-current="page" class="utrecht-breadcrumb-nav__link utrecht-breadcrumb-nav__link--current">Aanvragen</span>
    </li>
  </ol>
</nav>`,
  },
} satisfies Record<string, Example>;
