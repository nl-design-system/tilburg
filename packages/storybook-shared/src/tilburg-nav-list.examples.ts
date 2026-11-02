/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg nav list (the links of a navigation bar). */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fnav-list';

const intro = `Horizontal list of navigation links, built on utrecht's \`.utrecht-nav-list\`. Links are bold and not underlined; hover and the current page (\`aria-current="page"\`) are underlined. A nav list is only the \`<ul>\`: put it in a [Nav Bar](?path=/docs/tilburg-nav-bar--docs) or another \`<nav aria-label="…">\` so it is a navigation landmark. \`center\` spreads the items evenly over the full width.`;

const usageAngular = `### Angular

\`\`\`ts
items: TilburgNavListItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Wonen', href: '/wonen', current: true },
  { label: 'Parkeren', href: '/parkeren' },
];
\`\`\`

\`\`\`html
<tilburg-nav-bar ariaLabel="Hoofdmenu">
  <tilburg-nav-list [items]="items" (itemClick)="onNavigate($event)"></tilburg-nav-list>
</tilburg-nav-bar>
\`\`\`

Inputs: \`items\` (\`{ label, href?, current?, data? }[]\`, default \`[]\`; nothing renders for an empty array; \`href\` falls back to \`#\`), \`center\` (default \`false\`). Output: \`(itemClick)\` emits \`{ item, event }\` (call \`event.preventDefault()\` for client-side routing). The host has \`display: contents\`, so the \`<ul>\` is laid out as if it were a direct child of the nav bar.`;

const usageReact = `### React

\`\`\`tsx
import { NavBar, NavList, type NavListItem } from '@gemeente-tilburg/components-react';

const items: NavListItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Wonen', href: '/wonen', current: true },
  { label: 'Parkeren', href: '/parkeren' },
];

export function Hoofdmenu() {
  return (
    <NavBar ariaLabel="Hoofdmenu">
      <NavList items={items} />
    </NavBar>
  );
}
\`\`\`

Props: \`items\` (\`NavListItem[]\`, default \`[]\`; \`NavListItem\` is \`{ label: string | null | undefined; href?: string | null; current?: boolean; data?: unknown }\`), \`center\` (default \`false\`), \`onItemClick\` (\`({ item, event }) => void\`), plus any \`<ul>\` attribute (\`className\`, \`id\`, …) and a forwarded \`ref\`. Renders \`null\` for an empty \`items\` array. \`NavListItem\` and \`NavListProps\` are exported as types.`;

const usageWebComponents = `### Web Components (Stencil)

\`items\` is a JS **property** (an array cannot be an HTML attribute):

\`\`\`html
<tilburg-wbc-nav-bar aria-label="Hoofdmenu">
  <tilburg-wbc-nav-list></tilburg-wbc-nav-list>
</tilburg-wbc-nav-bar>

<script type="module">
  const list = document.querySelector('tilburg-wbc-nav-list');
  list.items = [
    { label: 'Home', href: '/' },
    { label: 'Wonen', href: '/wonen', current: true },
    { label: 'Parkeren', href: '/parkeren' },
  ];
  list.addEventListener('tilburgItemClick', ({ detail }) => {
    detail.event.preventDefault();
    router.navigate(detail.item.href);
  });
</script>
\`\`\`

Property: \`items\` (\`{ label, href?, current?, data? }[]\`, default \`[]\`). Attribute: \`center\` (boolean). Event: \`tilburgItemClick\` (Angular \`itemClick\`), \`detail\` is \`{ item, event }\`. Type: \`TilburgWbcNavListItem\`. The host has \`display: contents\`.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<ul class="utrecht-nav-list" role="list">
  <li class="utrecht-nav-list__item">
    <a class="utrecht-link utrecht-link--html-a utrecht-nav-list__link" href="/">Home</a>
  </li>
  <li class="utrecht-nav-list__item">
    <a class="utrecht-link utrecht-link--html-a utrecht-nav-list__link utrecht-link--current" href="/wonen" aria-current="page">Wonen</a>
  </li>
</ul>
\`\`\`

\`role="list"\` keeps the list semantics that Safari drops for a list without bullets. Add \`utrecht-nav-list--center\` to the \`<ul>\` to spread the items over the full width.`;

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

const list = (modifier = '') => `<ul class="utrecht-nav-list${modifier}" role="list">
    <li class="utrecht-nav-list__item">
      <a class="utrecht-link utrecht-link--html-a utrecht-nav-list__link" href="#">Home</a>
    </li>
    <li class="utrecht-nav-list__item">
      <a class="utrecht-link utrecht-link--html-a utrecht-nav-list__link utrecht-link--current" href="#" aria-current="page">Wonen</a>
    </li>
    <li class="utrecht-nav-list__item">
      <a class="utrecht-link utrecht-link--html-a utrecht-nav-list__link" href="#">Parkeren</a>
    </li>
    <li class="utrecht-nav-list__item">
      <a class="utrecht-link utrecht-link--html-a utrecht-nav-list__link" href="#">Afval</a>
    </li>
  </ul>`;

export const examples = {
  default: {
    name: 'Default',
    html: `<nav aria-label="Onderwerpen">
  ${list()}
</nav>`,
  },
  center: {
    name: 'Center',
    html: `<nav aria-label="Onderwerpen">
  ${list(' utrecht-nav-list--center')}
</nav>`,
  },
} satisfies Record<string, Example>;
