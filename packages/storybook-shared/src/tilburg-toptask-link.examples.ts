/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg toptask link. Imported
   by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Ftoptask-link';

const intro = `A large tile link to one of the tasks residents come for most (afval, paspoort, parkeren, …), with an icon above the title. Toptask links normally sit in a Toptask Nav. The whole tile is one link: its accessible name is the title, so the icon is \`aria-hidden\`. Colours follow the Tilburg interaction colour (white text on pink, darker on hover).`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-toptask-link href="/afval">
  <svg slot="icon" class="utrecht-icon" aria-hidden="true"><!-- icon --></svg>
  Afval
</tilburg-toptask-link>
\`\`\`

Inputs: \`href\`, \`ariaLabel\`, \`ariaDescribedBy\`. Content: default projection for the title, \`slot="icon"\` for the icon. The icon wrapper is only rendered when an icon is projected (checked once, on first render).`;

const usageReact = `### React

\`\`\`tsx
import { ToptaskLink } from '@gemeente-tilburg/components-react';

export function AfvalTaak() {
  return (
    <ToptaskLink href="/afval" icon={<TrashIcon className="utrecht-icon" aria-hidden />}>
      Afval
    </ToptaskLink>
  );
}
\`\`\`

Props: \`icon\` (\`ReactNode\`; the icon wrapper is only rendered when it is set), plus any \`<a>\` attribute (\`href\`, \`aria-label\`, \`className\`, …). \`ToptaskLinkProps\` is exported as a type. The \`ref\` is forwarded to the \`<a>\`.`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<tilburg-wbc-toptask-link href="/afval">
  <svg slot="icon" class="utrecht-icon" aria-hidden="true"><!-- icon --></svg>
  Afval
</tilburg-wbc-toptask-link>
\`\`\`

Attributes: \`href\`, and \`aria-label\` / \`aria-describedby\` / \`title\` / \`lang\` (moved onto the inner \`<a>\`). Slots: default (the title), \`icon\` (the wrapper is only rendered when the slot is used). No events.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<a class="utrecht-toptask-link" href="/afval">
  <span class="utrecht-toptask-link__icon"><svg class="utrecht-icon" aria-hidden="true" viewBox="0 0 24 24"><!-- icon --></svg></span>
  <span class="utrecht-toptask-link__title">Afval</span>
</a>
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

const svg = (paths: string) =>
  `<svg class="utrecht-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;

/** Task glyphs (Tabler icons, MIT) for the examples and stories. */
export const icons = {
  afval: svg(
    '<path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />',
  ),
  paspoort: svg(
    '<path d="M3 7a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v10a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z" /><path d="M7 10a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M15 8l2 0" /><path d="M15 12l2 0" /><path d="M7 16l10 0" />',
  ),
  parkeren: svg(
    '<path d="M4 6a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" /><path d="M9 16v-8h4a2 2 0 0 1 0 4h-4" />',
  ),
  verhuizen: svg(
    '<path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />',
  ),
};

/** The tasks shown in the examples: [href, title, icon]. */
export const tasks: [string, string, string][] = [
  ['/afval', 'Afval', icons.afval],
  ['/paspoort-en-id-kaart', 'Paspoort en ID-kaart', icons.paspoort],
  ['/parkeren', 'Parkeren', icons.parkeren],
  ['/verhuizen', 'Verhuizen doorgeven', icons.verhuizen],
];

/** One toptask link of the HTML reference; Toptask Nav reuses it. */
export const toptaskLink = ([href, title, icon]: [string, string, string]) =>
  `<a class="utrecht-toptask-link" href="${href}"><span class="utrecht-toptask-link__icon">${icon}</span><span class="utrecht-toptask-link__title">${title}</span></a>`;

export const examples = {
  default: {
    name: 'Default',
    html: toptaskLink(tasks[0]),
  },
  withoutIcon: {
    name: 'Without icon',
    html: `<a class="utrecht-toptask-link" href="/afspraak-maken"><span class="utrecht-toptask-link__title">Afspraak maken</span></a>`,
  },
} satisfies Record<string, Example>;
