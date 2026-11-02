/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg pre-heading. Imported by
   both the React storybook (`packages/storybook`) and the Angular storybook
   (`packages/storybook-angular`). Styled by the Utrecht base CSS with the
   Tilburg `--utrecht-pre-heading-*` tokens; there is no components-css folder. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fpre-heading';

const intro = `Short label that sits visually above a heading, such as the section or category of a page, rendered as \`<p class="utrecht-pre-heading">\`. It is not a heading itself. Combine it with a heading in a Heading Group: there the pre-heading follows the heading in the HTML (so the heading is read first, WCAG 1.3.2) and CSS moves it above.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-heading-group>
  <tilburg-heading-1>Afvalkalender</tilburg-heading-1>
  <tilburg-pre-heading>Afval en recycling</tilburg-pre-heading>
</tilburg-heading-group>
\`\`\`

No inputs. The host is \`display: block\` and carries the Heading Group's \`order\`, so the pre-heading is shown above the heading even though the Angular host sits between \`<hgroup>\` and the \`<p>\`.`;

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

Props: no component-specific props. \`PreHeadingProps\` is an exported type alias of \`HTMLAttributes<HTMLParagraphElement>\` (\`className\` is merged after \`utrecht-pre-heading\`). The \`ref\` is forwarded to the \`<p>\`.`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<tilburg-wbc-heading-group>
  <tilburg-wbc-heading-1>Afvalkalender</tilburg-wbc-heading-1>
  <tilburg-wbc-pre-heading>Afval en recycling</tilburg-wbc-pre-heading>
</tilburg-wbc-heading-group>
\`\`\`

Renders \`<p class="utrecht-pre-heading">\` around the default slot. Like Angular, the host is block-level and carries the Heading Group's \`order\`. No attributes, events or named slots.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<p class="utrecht-pre-heading">Afval en recycling</p>
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
    html: `<p class="utrecht-pre-heading">Afval en recycling</p>`,
  },
  headingGroup: {
    name: 'In a heading group',
    html: `<hgroup class="utrecht-heading-group">
  <utrecht-heading-1><h1 class="utrecht-heading-1">Afvalkalender</h1></utrecht-heading-1>
  <p class="utrecht-pre-heading">Afval en recycling</p>
</hgroup>`,
  },
} satisfies Record<string, Example>;
