/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg breadcrumb. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fbreadcrumb';

const intro = `Tilburg breadcrumb. Trail links are blue with no underline by default and underlined on hover; the current item is bold gray-500.`;

const usageAngular = `### Angular

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

Inputs: \`ariaLabel\` (default \`'Kruimelpad'\`), \`items\` (\`{ label, href?, current?, data? }[]\`). Output: \`(itemClick)\` emits \`{ item, event }\`.`;

const usageReact = `### React

\`\`\`tsx
import { Breadcrumb, type BreadcrumbItem } from '@gemeente-tilburg/components-react';
import type { MouseEvent } from 'react';

const items: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Parkeren', href: '/parkeren' },
  { label: 'Bewonersvergunning', current: true },
];

export function Kruimelpad() {
  const onCrumbClick = ({ item, event }: { item: BreadcrumbItem; event: MouseEvent<HTMLAnchorElement> }) => {
    event.preventDefault();
    console.log('Kruimel aangeklikt:', item.label);
  };

  return <Breadcrumb ariaLabel="Kruimelpad" items={items} onItemClick={onCrumbClick} />;
}
\`\`\`

A crumb is rendered as the current page — a \`<span aria-current="page">\` instead of an \`<a>\` — when it carries \`current: true\` **or** when it is the last item in the array, so the trailing crumb needs no extra flag. \`aria-current\` is set by the component itself; you never pass it (the package's exported \`AriaCurrent\` type belongs to \`Link\`, not to \`Breadcrumb\`). With an empty \`items\` array the component renders \`null\`.

Props: \`items\` (\`BreadcrumbItem[]\`, default \`[]\`; \`BreadcrumbItem\` is \`{ label: string | null | undefined; href?: string | null; current?: boolean; data?: unknown }\`), \`ariaLabel\` (default \`'Kruimelpad'\`), \`onItemClick\` (\`(payload: { item: BreadcrumbItem; event: MouseEvent<HTMLAnchorElement> }) => void\`), plus any standard \`<nav>\` attribute (\`className\`, \`id\`, …). \`BreadcrumbItem\` and \`BreadcrumbProps\` are exported as type aliases.`;

const usagePlainHtml = `### Plain HTML / CSS

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
