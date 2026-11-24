/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg toptask navigation.
   Imported by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place. */

import { tasks, toptaskLink } from './tilburg-toptask-link.examples';

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Ftoptask-nav';

const intro = `The container for Toptask Links: a \`<nav>\` landmark (named "Veelgevraagd" by default) that stacks the links, or with \`grid\` places them side by side and wraps them onto new rows. Keep it to a handful of tasks; the tiles are the first thing residents see.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-toptask-nav [grid]="true">
  <tilburg-toptask-link href="/afval">
    <svg slot="icon" class="utrecht-icon" aria-hidden="true"><!-- icon --></svg>
    Afval
  </tilburg-toptask-link>
  <tilburg-toptask-link href="/parkeren">Parkeren</tilburg-toptask-link>
</tilburg-toptask-nav>
\`\`\`

Inputs: \`grid\` (default \`false\`), \`ariaLabel\` (default \`'Veelgevraagd'\`). Content: the toptask links.`;

const usageReact = `### React

\`\`\`tsx
import { ToptaskLink, ToptaskNav } from '@gemeente-tilburg/components-react';

export function Veelgevraagd() {
  return (
    <ToptaskNav grid>
      <ToptaskLink href="/afval" icon={<TrashIcon className="utrecht-icon" aria-hidden />}>
        Afval
      </ToptaskLink>
      <ToptaskLink href="/parkeren">Parkeren</ToptaskLink>
    </ToptaskNav>
  );
}
\`\`\`

Props: \`grid\` (default \`false\`), \`aria-label\` (default \`'Veelgevraagd'\`), plus any \`<nav>\` attribute (\`className\`, \`id\`, …). \`ToptaskNavProps\` is exported as a type. The \`ref\` is forwarded to the \`<nav>\`.`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<tilburg-wbc-toptask-nav grid>
  <tilburg-wbc-toptask-link href="/afval">Afval</tilburg-wbc-toptask-link>
  <tilburg-wbc-toptask-link href="/parkeren">Parkeren</tilburg-wbc-toptask-link>
</tilburg-wbc-toptask-nav>
\`\`\`

Attributes: \`grid\` (boolean, default \`false\`), \`aria-label\` (default \`'Veelgevraagd'\`, moved onto the inner \`<nav>\`). Slot: default (the toptask links). No events.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<nav class="utrecht-toptask-nav utrecht-toptask-nav--grid" aria-label="Veelgevraagd">
  <a class="utrecht-toptask-link" href="/afval">…</a>
  <a class="utrecht-toptask-link" href="/parkeren">…</a>
</nav>
\`\`\`

Modifier: \`utrecht-toptask-nav--grid\` (side by side, wrapping).`;

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

const links = tasks.map((task) => `  ${toptaskLink(task)}`).join('\n');

export const examples = {
  grid: {
    name: 'Grid',
    html: `<nav class="utrecht-toptask-nav utrecht-toptask-nav--grid" aria-label="Veelgevraagd">
${links}
</nav>`,
  },
  stacked: {
    name: 'Stacked',
    html: `<div style="max-inline-size:20rem">
<nav class="utrecht-toptask-nav" aria-label="Veelgevraagd">
${links}
</nav>
</div>`,
  },
} satisfies Record<string, Example>;
