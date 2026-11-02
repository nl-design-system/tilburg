/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg side nav (utrecht "navigatie sidenav"). */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fside-nav';

const intro = `Vertical, hierarchical navigation at the side of a page (one to two levels), built on utrecht's \`.utrecht-sidenav\` with the \`--pseudo-elements\` variant: the "metro line" markers are drawn with \`::before\` / \`::after\`, so the markup has no decorative elements. Links are dark text, pink on hover; the current page is bold pink and has \`aria-current="page"\`. A \`<nav>\` landmark, named with \`aria-label\` (default \`Submenu\`).`;

const usageAngular = `### Angular

\`\`\`ts
items: TilburgSideNavItem[] = [
  { label: 'Afval', href: '/afval' },
  {
    label: 'Parkeren',
    href: '/parkeren',
    children: [
      { label: 'Bewonersvergunning', href: '/parkeren/bewonersvergunning', current: true },
      { label: 'Bezoekersvergunning', href: '/parkeren/bezoekersvergunning' },
    ],
  },
  { label: 'Paspoort en ID-kaart', href: '/paspoort' },
];
\`\`\`

\`\`\`html
<tilburg-side-nav ariaLabel="Submenu" [items]="items" (itemClick)="onNavigate($event)"></tilburg-side-nav>
\`\`\`

Inputs: \`ariaLabel\` (default \`'Submenu'\`), \`items\` (\`{ label, href?, current?, data?, children? }[]\`, default \`[]\`; \`children\` is one nested level of the same items; nothing renders for an empty array; \`href\` falls back to \`#\`). Output: \`(itemClick)\` emits \`{ item, event }\` for top-level and child links.`;

const usageReact = `### React

\`\`\`tsx
import { SideNav, type SideNavItem } from '@gemeente-tilburg/components-react';

const items: SideNavItem[] = [
  { label: 'Afval', href: '/afval' },
  {
    label: 'Parkeren',
    href: '/parkeren',
    children: [{ label: 'Bewonersvergunning', href: '/parkeren/bewonersvergunning', current: true }],
  },
];

export function Submenu() {
  return <SideNav items={items} />;
}
\`\`\`

Props: \`items\` (\`SideNavItem[]\`, default \`[]\`; \`SideNavItem\` is \`{ label; href?; current?; data?; children?: SideNavItem[] }\`, one nested level is rendered), \`ariaLabel\` (default \`'Submenu'\`), \`onItemClick\` (\`({ item, event }) => void\`), plus any \`<nav>\` attribute and a forwarded \`ref\`. Renders \`null\` for an empty \`items\` array. \`SideNavItem\` and \`SideNavProps\` are exported as types.`;

const usageWebComponents = `### Web Components (Stencil)

\`items\` is a JS **property**:

\`\`\`html
<tilburg-wbc-side-nav aria-label="Submenu"></tilburg-wbc-side-nav>

<script type="module">
  const sideNav = document.querySelector('tilburg-wbc-side-nav');
  sideNav.items = [
    { label: 'Afval', href: '/afval' },
    { label: 'Parkeren', href: '/parkeren', children: [{ label: 'Bewonersvergunning', href: '/parkeren/bewonersvergunning', current: true }] },
  ];
  sideNav.addEventListener('tilburgItemClick', ({ detail }) => {
    detail.event.preventDefault();
    router.navigate(detail.item.href);
  });
</script>
\`\`\`

Property: \`items\` (\`{ label, href?, current?, data?, children? }[]\`, default \`[]\`). \`aria-label\` (default \`'Submenu'\`) is moved from the host onto the \`<nav>\`. Event: \`tilburgItemClick\` (Angular \`itemClick\`), \`detail\` is \`{ item, event }\`. Type: \`TilburgWbcSideNavItem\`.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<nav class="utrecht-sidenav utrecht-sidenav--pseudo-elements" aria-label="Submenu">
  <ul class="utrecht-sidenav__list">
    <li class="utrecht-sidenav__item">
      <a class="utrecht-sidenav__link" href="/afval">Afval</a>
      <div class="utrecht-sidenav__item-separator"></div>
    </li>
    <li class="utrecht-sidenav__item utrecht-sidenav__item--last">
      <a class="utrecht-sidenav__link utrecht-sidenav__link--parent" href="/parkeren">Parkeren</a>
      <ul class="utrecht-sidenav__list utrecht-sidenav__list--child">
        <li class="utrecht-sidenav__item utrecht-sidenav__item--child">
          <a class="utrecht-sidenav__link utrecht-sidenav__link--child utrecht-sidenav__link--current utrecht-sidenav__link--current-child" href="/parkeren/bewonersvergunning" aria-current="page">Bewonersvergunning</a>
        </li>
      </ul>
      <div class="utrecht-sidenav__item-separator"></div>
    </li>
  </ul>
</nav>
\`\`\`

Modifiers: \`__item--last\` on the last top-level item, \`__link--parent\` on a link with a child list, \`__link--child\` on child links, \`__link--current\` (plus \`__link--current-child\` for a child) on the current page.`;

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

export const examples = {
  default: {
    name: 'Default',
    html: `<nav class="utrecht-sidenav utrecht-sidenav--pseudo-elements" aria-label="Submenu">
  <ul class="utrecht-sidenav__list">
    <li class="utrecht-sidenav__item">
      <a class="utrecht-sidenav__link" href="#">Afval</a>
      <div class="utrecht-sidenav__item-separator"></div>
    </li>
    <li class="utrecht-sidenav__item">
      <a class="utrecht-sidenav__link utrecht-sidenav__link--current" href="#" aria-current="page">Parkeren</a>
      <div class="utrecht-sidenav__item-separator"></div>
    </li>
    <li class="utrecht-sidenav__item">
      <a class="utrecht-sidenav__link" href="#">Paspoort en ID-kaart</a>
      <div class="utrecht-sidenav__item-separator"></div>
    </li>
    <li class="utrecht-sidenav__item utrecht-sidenav__item--last">
      <a class="utrecht-sidenav__link" href="#">Verhuizen</a>
      <div class="utrecht-sidenav__item-separator"></div>
    </li>
  </ul>
</nav>`,
  },
  withChildren: {
    name: 'With children',
    html: `<nav class="utrecht-sidenav utrecht-sidenav--pseudo-elements" aria-label="Submenu">
  <ul class="utrecht-sidenav__list">
    <li class="utrecht-sidenav__item">
      <a class="utrecht-sidenav__link" href="#">Afval</a>
      <div class="utrecht-sidenav__item-separator"></div>
    </li>
    <li class="utrecht-sidenav__item">
      <a class="utrecht-sidenav__link utrecht-sidenav__link--parent" href="#">Parkeren</a>
      <ul class="utrecht-sidenav__list utrecht-sidenav__list--child">
        <li class="utrecht-sidenav__item utrecht-sidenav__item--child">
          <a class="utrecht-sidenav__link utrecht-sidenav__link--child utrecht-sidenav__link--current utrecht-sidenav__link--current-child" href="#" aria-current="page">Bewonersvergunning</a>
        </li>
        <li class="utrecht-sidenav__item utrecht-sidenav__item--child">
          <a class="utrecht-sidenav__link utrecht-sidenav__link--child" href="#">Bezoekersvergunning</a>
        </li>
      </ul>
      <div class="utrecht-sidenav__item-separator"></div>
    </li>
    <li class="utrecht-sidenav__item utrecht-sidenav__item--last">
      <a class="utrecht-sidenav__link" href="#">Paspoort en ID-kaart</a>
      <div class="utrecht-sidenav__item-separator"></div>
    </li>
  </ul>
</nav>`,
  },
} satisfies Record<string, Example>;
