/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg heading group. Imported
   by both the React storybook (`packages/storybook`) and the Angular storybook
   (`packages/storybook-angular`). Styled by the Utrecht base CSS; the headings
   inside it bring their own Tilburg components-css. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fheading-group';

const intro = `Groups a heading with a pre-heading (or a subtitle paragraph) in an \`<hgroup class="utrecht-heading-group">\`, so they are presented as one title. Write the heading first and the pre-heading after it: screen readers read the heading first (WCAG 1.3.2), and the Heading Group CSS moves the pre-heading visually above it. Only the heading counts in the document outline; the pre-heading is a plain paragraph.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-heading-group>
  <tilburg-heading-1>Afvalkalender</tilburg-heading-1>
  <tilburg-pre-heading>Afval en recycling</tilburg-pre-heading>
</tilburg-heading-group>
\`\`\`

No inputs. Content is projected into the \`<hgroup>\`: use the existing Tilburg heading components and \`<tilburg-pre-heading>\` (whose host carries the reordering) or a \`<tilburg-paragraph>\` subtitle after the heading.`;

const usageReact = `### React

\`\`\`tsx
import { Heading1, HeadingGroup, PreHeading } from '@gemeente-tilburg/components-react';

export function Paginatitel() {
  return (
    <HeadingGroup>
      <Heading1>Afvalkalender</Heading1>
      <PreHeading>Afval en recycling</PreHeading>
    </HeadingGroup>
  );
}
\`\`\`

Props: no component-specific props. \`HeadingGroupProps\` is an exported type alias of \`HTMLAttributes<HTMLElement>\` (\`className\` is merged after \`utrecht-heading-group\`). The \`ref\` is forwarded to the \`<hgroup>\`.`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<tilburg-wbc-heading-group>
  <tilburg-wbc-heading-1>Afvalkalender</tilburg-wbc-heading-1>
  <tilburg-wbc-pre-heading>Afval en recycling</tilburg-wbc-pre-heading>
</tilburg-wbc-heading-group>
\`\`\`

Renders \`<hgroup class="utrecht-heading-group">\` around the default slot. No attributes, events or named slots.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<hgroup class="utrecht-heading-group">
  <utrecht-heading-1><h1 class="utrecht-heading-1">Afvalkalender</h1></utrecht-heading-1>
  <p class="utrecht-pre-heading">Afval en recycling</p>
</hgroup>
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
    html: `<hgroup class="utrecht-heading-group">
  <utrecht-heading-1><h1 class="utrecht-heading-1">Afvalkalender</h1></utrecht-heading-1>
  <p class="utrecht-pre-heading">Afval en recycling</p>
</hgroup>`,
  },
  level2: {
    name: 'Heading 2',
    html: `<hgroup class="utrecht-heading-group">
  <utrecht-heading-2><h2 class="utrecht-heading-2">Parkeervergunning aanvragen</h2></utrecht-heading-2>
  <p class="utrecht-pre-heading">Parkeren</p>
</hgroup>`,
  },
  subtitle: {
    name: 'With subtitle paragraph',
    html: `<hgroup class="utrecht-heading-group">
  <utrecht-heading-1><h1 class="utrecht-heading-1">Spoorpark</h1></utrecht-heading-1>
  <p class="utrecht-paragraph">Het stadspark dat Tilburgers samen hebben gemaakt</p>
</hgroup>`,
  },
} satisfies Record<string, Example>;
