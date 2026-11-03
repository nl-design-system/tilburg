/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg badge list. Imported
   by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fbadge-list';

const intro = `Wrapping row of badges with even spacing between them. The gaps come from \`--utrecht-badge-list-column-gap\` and \`--utrecht-badge-list-row-gap\`, which the Tilburg theme sets to \`--tilburg-space-column-snail\` / \`--tilburg-space-row-snail\`. Make it a list, so screen readers announce the badges as separate items and how many there are: \`<ul class="utrecht-badge-list" role="list">\` with each badge in an \`<li>\`. \`components-css/badge-list\` removes the bullets, margin and padding of the list (Utrecht only styles the \`<div>\`); \`role="list"\` keeps the list role in Safari, which drops it when the bullets are gone. Without a list the badges run together into one phrase. The React, Angular and Web Components wrappers render the \`<div>\` variant.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-badge-list>
  <tilburg-data-badge>Parkeren</tilburg-data-badge>
  <tilburg-data-badge>Afval</tilburg-data-badge>
</tilburg-badge-list>
\`\`\`

No inputs; the content is the badges.`;

const usageReact = `### React

\`\`\`tsx
import { BadgeList, DataBadge } from '@gemeente-tilburg/components-react';

export function Onderwerpen() {
  return (
    <BadgeList>
      <DataBadge>Parkeren</DataBadge>
      <DataBadge>Afval</DataBadge>
    </BadgeList>
  );
}
\`\`\`

Props: any standard \`<div>\` attribute (\`className\` is merged after \`utrecht-badge-list\`). \`BadgeListProps\` is exported as a type. The \`ref\` is forwarded to the \`<div>\`.`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<tilburg-wbc-badge-list>
  <tilburg-wbc-data-badge>Parkeren</tilburg-wbc-data-badge>
  <tilburg-wbc-data-badge>Afval</tilburg-wbc-data-badge>
</tilburg-wbc-badge-list>
\`\`\`

No attributes; \`id\` and \`title\` move from the host to the inner \`<div>\`. The default slot holds the badges.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<ul class="utrecht-badge-list" role="list">
  <li><span class="utrecht-data-badge">Parkeren</span></li>
  <li><span class="utrecht-data-badge">Afval</span></li>
</ul>
\`\`\`

Needs this CSS (in \`components-css/badge-list\`) on top of Utrecht:

\`\`\`css
:is(ul, ol).utrecht-badge-list {
  list-style: none;
  margin-block: 0;
  padding-inline-start: 0;
}
\`\`\`

Without a list, as the wrappers render it:

\`\`\`html
<div class="utrecht-badge-list">
  <span class="utrecht-data-badge">Parkeren</span>
  <span class="utrecht-data-badge">Afval</span>
</div>
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
    html: `<ul class="utrecht-badge-list" role="list">
  <li><span class="utrecht-data-badge">Parkeren</span></li>
  <li><span class="utrecht-data-badge">Afval</span></li>
  <li><span class="utrecht-data-badge">Paspoort en ID-kaart</span></li>
  <li><span class="utrecht-data-badge">Verhuizen</span></li>
</ul>`,
  },
  wrapping: {
    name: 'Wrapping',
    html: `<div style="max-inline-size:16rem">
  <ul class="utrecht-badge-list" role="list">
    <li><span class="utrecht-data-badge">Bouwen en verbouwen</span></li>
    <li><span class="utrecht-data-badge">Subsidies</span></li>
    <li><span class="utrecht-data-badge">Evenementen</span></li>
    <li><span class="utrecht-data-badge">Werk en inkomen</span></li>
    <li><span class="utrecht-data-badge">Zorg</span></li>
  </ul>
</div>`,
  },
  div: {
    name: 'Without list',
    html: `<div class="utrecht-badge-list">
  <span class="utrecht-data-badge">Parkeren</span>
  <span class="utrecht-data-badge">Afval</span>
</div>`,
  },
} satisfies Record<string, Example>;
