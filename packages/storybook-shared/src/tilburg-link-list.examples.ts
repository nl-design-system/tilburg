/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg link list. Imported
   by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Flink-list';

const intro = `A list of links, each with a chevron in front, for related information at the end of a text or a short list of follow-up pages. Rendered as \`<ul role="list">\` (the \`role\` keeps the list semantics in Safari, which drops them when \`list-style\` is \`none\`). The links follow the Tilburg link-list tokens: not underlined at rest, underlined on hover and active. The chevron is decorative (\`aria-hidden\`). Give the list a name (\`aria-label\` / \`aria-labelledby\`) when there is no heading right above it.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-link-list
  ariaLabel="Meer over afval"
  [links]="[
    { label: 'Afvalkalender', href: '/afval/afvalkalender' },
    { label: 'Grofvuil laten ophalen', href: '/afval/grofvuil' },
    { label: 'Afvalscheiding in Nederland', href: 'https://www.milieucentraal.nl', external: true }
  ]"
></tilburg-link-list>
\`\`\`

Inputs: \`links\` (\`TilburgLinkListLink[]\`, default \`[]\`; each \`{ label: string; href: string; external?: boolean; current?: AriaCurrent }\` — \`external\` adds \`rel="external noopener noreferrer"\`, \`current\` renders \`aria-current\`), \`ariaLabel\`, \`ariaLabelledBy\`. Nothing is rendered for an empty list.`;

const usageReact = `### React

\`\`\`tsx
import { LinkList } from '@gemeente-tilburg/components-react';

export function MeerOverAfval() {
  return (
    <LinkList
      aria-label="Meer over afval"
      links={[
        { label: 'Afvalkalender', href: '/afval/afvalkalender' },
        { label: 'Grofvuil laten ophalen', href: '/afval/grofvuil' },
        { label: 'Afvalscheiding in Nederland', href: 'https://www.milieucentraal.nl', external: true },
      ]}
    />
  );
}
\`\`\`

Props: \`links\` (\`LinkListLink[]\`, default \`[]\`; each \`{ label: ReactNode; href: string; external?: boolean; current?: AriaCurrent }\`), plus any \`<ul>\` attribute (\`className\`, \`aria-label\`, \`aria-labelledby\`, …). \`LinkListProps\` and \`LinkListLink\` are exported as types. The \`ref\` is forwarded to the \`<ul>\`. Nothing is rendered for an empty list.`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<tilburg-wbc-link-list aria-label="Meer over afval"></tilburg-wbc-link-list>

<script type="module">
  document.querySelector('tilburg-wbc-link-list').links = [
    { label: 'Afvalkalender', href: '/afval/afvalkalender' },
    { label: 'Grofvuil laten ophalen', href: '/afval/grofvuil' },
  ];
</script>
\`\`\`

Properties: \`links\` (JS property only, same shape as Angular). Attributes \`aria-label\` / \`aria-labelledby\` are moved onto the inner \`<ul>\`. No slots or events.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<ul class="utrecht-link-list utrecht-link-list--html-ul" role="list" aria-label="Meer over afval">
  <li class="utrecht-link-list__item">
    <a class="utrecht-link utrecht-link--html-a utrecht-link-list__link" href="/afval/afvalkalender">
      <svg class="utrecht-icon" aria-hidden="true" viewBox="0 0 24 24"><!-- chevron --></svg>
      <span class="utrecht-link-list__link-text">Afvalkalender</span>
    </a>
  </li>
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

/** The decorative chevron every layer renders in front of the link text. */
export const chevron = `<svg class="utrecht-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6" /></svg>`;

const item = (label: string, href: string, extra = '') => `  <li class="utrecht-link-list__item">
    <a class="utrecht-link utrecht-link--html-a utrecht-link-list__link" href="${href}"${extra}>${chevron}<span class="utrecht-link-list__link-text">${label}</span></a>
  </li>`;

export const examples = {
  default: {
    name: 'Default',
    html: `<ul class="utrecht-link-list utrecht-link-list--html-ul" role="list" aria-label="Meer over afval">
${item('Afvalkalender', '/afval/afvalkalender')}
${item('Grofvuil laten ophalen', '/afval/grofvuil')}
${item('Afvalscheiding in Nederland', 'https://www.milieucentraal.nl', ' rel="external noopener noreferrer"')}
</ul>`,
  },
  current: {
    name: 'With the current page',
    html: `<h2 class="utrecht-heading-2" id="parkeren-kop">Parkeren</h2>
<ul class="utrecht-link-list utrecht-link-list--html-ul" role="list" aria-labelledby="parkeren-kop">
${item('Parkeervergunning aanvragen', '/parkeren/vergunning', ' aria-current="page"')}
${item('Bezoekersparkeren', '/parkeren/bezoekers')}
${item('Parkeergarages in het centrum', '/parkeren/garages')}
</ul>`,
  },
} satisfies Record<string, Example>;
