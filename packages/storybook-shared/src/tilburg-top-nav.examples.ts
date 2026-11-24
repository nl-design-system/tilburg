/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg top nav (utrecht "navigatie topnav"). */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Ftop-nav';

const intro = `Horizontal main navigation for a small site (fewer than about five sections), built on utrecht's \`.utrecht-topnav\`. The items share the full width; white text on the Tilburg blue, the hovered and the current item get a darker blue and an underline. The current page has \`aria-current="page"\`. A \`<nav>\` landmark, named with \`aria-label\` (default \`Hoofdmenu\`). utrecht's base CSS plus the \`--utrecht-topnav-*\` tokens of the Tilburg theme; Tilburg's \`components-css/top-nav\` only lets the items wrap onto a new row when they don't fit (narrow screens, zoom), where utrecht lets them run off the screen.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-top-nav ariaLabel="Hoofdmenu" [items]="items" (itemClick)="onNavigate($event)"></tilburg-top-nav>
\`\`\`

Inputs: \`ariaLabel\` (default \`'Hoofdmenu'\`), \`items\` (\`{ label, href?, current?, data? }[]\`, default \`[]\`; nothing renders for an empty array; \`href\` falls back to \`#\`). Output: \`(itemClick)\` emits \`{ item, event }\`.`;

const usageReact = `### React

\`\`\`tsx
import { TopNav } from '@gemeente-tilburg/components-react';

export function Hoofdmenu() {
  return (
    <TopNav
      items={[
        { label: 'Home', href: '/' },
        { label: 'Aanvragen', href: '/aanvragen', current: true },
        { label: 'Mijn zaken', href: '/zaken' },
      ]}
    />
  );
}
\`\`\`

Props: \`items\` (\`TopNavItem[]\`, default \`[]\`; \`TopNavItem\` is \`{ label: string | null | undefined; href?: string | null; current?: boolean; data?: unknown }\`), \`ariaLabel\` (default \`'Hoofdmenu'\`), \`onItemClick\` (\`({ item, event }) => void\`), plus any \`<nav>\` attribute and a forwarded \`ref\`. Renders \`null\` for an empty \`items\` array. \`TopNavItem\` and \`TopNavProps\` are exported as types.`;

const usageWebComponents = `### Web Components (Stencil)

\`items\` is a JS **property**:

\`\`\`html
<tilburg-wbc-top-nav aria-label="Hoofdmenu"></tilburg-wbc-top-nav>

<script type="module">
  const topNav = document.querySelector('tilburg-wbc-top-nav');
  topNav.items = [
    { label: 'Home', href: '/' },
    { label: 'Aanvragen', href: '/aanvragen', current: true },
  ];
</script>
\`\`\`

Property: \`items\` (\`{ label, href?, current?, data? }[]\`, default \`[]\`). \`aria-label\` (default \`'Hoofdmenu'\`) is moved from the host onto the \`<nav>\`. Event: \`tilburgItemClick\` (Angular \`itemClick\`), \`detail\` is \`{ item, event }\`. Type: \`TilburgWbcTopNavItem\`.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<nav class="utrecht-topnav" aria-label="Hoofdmenu">
  <ul class="utrecht-topnav__list">
    <li class="utrecht-topnav__item">
      <a class="utrecht-topnav__link" href="/">Home</a>
    </li>
    <li class="utrecht-topnav__item">
      <a class="utrecht-topnav__link utrecht-topnav__link--current" href="/aanvragen" aria-current="page">Aanvragen</a>
    </li>
  </ul>
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
    html: `<nav class="utrecht-topnav" aria-label="Hoofdmenu">
  <ul class="utrecht-topnav__list">
    <li class="utrecht-topnav__item">
      <a class="utrecht-topnav__link" href="#">Home</a>
    </li>
    <li class="utrecht-topnav__item">
      <a class="utrecht-topnav__link utrecht-topnav__link--current" href="#" aria-current="page">Aanvragen</a>
    </li>
    <li class="utrecht-topnav__item">
      <a class="utrecht-topnav__link" href="#">Mijn zaken</a>
    </li>
    <li class="utrecht-topnav__item">
      <a class="utrecht-topnav__link" href="#">Contact</a>
    </li>
  </ul>
</nav>`,
  },
} satisfies Record<string, Example>;
