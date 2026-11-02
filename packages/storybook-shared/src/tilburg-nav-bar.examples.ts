/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg nav bar. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fnav-bar';

const intro = `Full-width navigation band in the page-header look, built on utrecht's \`.utrecht-nav-bar\`: a \`<nav>\` landmark (name it with \`aria-label\`, default \`Hoofdmenu\`) around a content area that is limited to the page width (1150px). Put a [Nav List](?path=/docs/tilburg-nav-list--docs) in it; links in the bar take the bar's white text colour. The band is \`blue-400\` (not the header's \`blue-300\`) so the white link text meets the 4.5:1 contrast ratio.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-nav-bar ariaLabel="Hoofdmenu">
  <tilburg-nav-list [items]="items"></tilburg-nav-list>
</tilburg-nav-bar>
\`\`\`

Inputs: \`ariaLabel\` (default \`'Hoofdmenu'\`). Content: default projection inside \`.utrecht-nav-bar__content\`.`;

const usageReact = `### React

\`\`\`tsx
import { NavBar, NavList } from '@gemeente-tilburg/components-react';

export function Hoofdmenu() {
  return (
    <NavBar ariaLabel="Hoofdmenu">
      <NavList
        items={[
          { label: 'Home', href: '/' },
          { label: 'Wonen', href: '/wonen', current: true },
        ]}
      />
    </NavBar>
  );
}
\`\`\`

Props: \`ariaLabel\` (default \`'Hoofdmenu'\`), \`children\` (rendered inside \`.utrecht-nav-bar__content\`), plus any \`<nav>\` attribute (\`className\`, \`id\`, …) and a forwarded \`ref\` (to the \`<nav>\`). \`NavBarProps\` is exported as a type.`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<tilburg-wbc-nav-bar aria-label="Hoofdmenu">
  <tilburg-wbc-nav-list></tilburg-wbc-nav-list>
</tilburg-wbc-nav-bar>
\`\`\`

\`aria-label\` (default \`'Hoofdmenu'\`) is moved from the host onto the \`<nav>\`. Slot: default, inside \`.utrecht-nav-bar__content\`. No events.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<nav class="utrecht-nav-bar" aria-label="Hoofdmenu">
  <div class="utrecht-nav-bar__content">
    <ul class="utrecht-nav-list" role="list">
      <li class="utrecht-nav-list__item">
        <a class="utrecht-link utrecht-link--html-a utrecht-nav-list__link" href="/">Home</a>
      </li>
      <li class="utrecht-nav-list__item">
        <a class="utrecht-link utrecht-link--html-a utrecht-nav-list__link utrecht-link--current" href="/wonen" aria-current="page">Wonen</a>
      </li>
    </ul>
  </div>
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

const item = (label: string, current = false) => `<li class="utrecht-nav-list__item">
        <a class="utrecht-link utrecht-link--html-a utrecht-nav-list__link${current ? ' utrecht-link--current" href="#" aria-current="page"' : '" href="#"'}>${label}</a>
      </li>`;

export const examples = {
  default: {
    name: 'Default',
    html: `<nav class="utrecht-nav-bar" aria-label="Hoofdmenu">
  <div class="utrecht-nav-bar__content">
    <ul class="utrecht-nav-list" role="list">
      ${item('Home')}
      ${item('Wonen', true)}
      ${item('Parkeren')}
      ${item('Afval')}
      ${item('Werk en inkomen')}
    </ul>
  </div>
</nav>`,
  },
  center: {
    name: 'Center',
    html: `<nav class="utrecht-nav-bar" aria-label="Hoofdmenu">
  <div class="utrecht-nav-bar__content">
    <ul class="utrecht-nav-list utrecht-nav-list--center" role="list">
      ${item('Inwoners', true)}
      ${item('Ondernemers')}
      ${item('Bestuur')}
    </ul>
  </div>
</nav>`,
  },
} satisfies Record<string, Example>;
