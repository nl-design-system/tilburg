/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg data placeholder.
   Imported by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`). */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fdata-placeholder';

const intro = `Grey bar shown in place of short data (a name, an address, an amount) while it is still loading: \`<span class="utrecht-data-placeholder">\`. Only for short, single-line text. The placeholder itself is empty, so tell assistive technology what is going on: mark the region that is loading with \`aria-busy="true"\` and remove it once the data is there. \`loading\` adds \`utrecht-data-placeholder--loading\`, which shows the busy cursor (\`--utrecht-action-busy-cursor\`, Tilburg \`progress\`). Colour: \`--utrecht-data-placeholder-background-color\` (Tilburg \`--tilburg-color-gray-400\`, 6.2:1 against white, so the bar meets the 3:1 contrast for non-text UI).`;

const usageAngular = `### Angular

\`\`\`html
<p class="utrecht-paragraph" aria-busy="true">
  Naam: <tilburg-data-placeholder [loading]="true"></tilburg-data-placeholder>
</p>
\`\`\`

Inputs: \`loading\` (default \`false\`; adds \`utrecht-data-placeholder--loading\`).`;

const usageReact = `### React

\`\`\`tsx
import { DataPlaceholder, Paragraph } from '@gemeente-tilburg/components-react';

export function Naam({ naam }: { naam?: string }) {
  return (
    <Paragraph aria-busy={naam ? undefined : 'true'}>
      Naam: {naam ?? <DataPlaceholder loading />}
    </Paragraph>
  );
}
\`\`\`

Props: \`loading\` (\`boolean\`, default \`false\`; adds \`utrecht-data-placeholder--loading\`), plus any standard attribute (\`className\`, merged after \`utrecht-data-placeholder\`, \`style\`, …). It renders no children. \`DataPlaceholderProps\` is exported as a type. The \`ref\` is forwarded to the \`<span>\`.`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<p class="utrecht-paragraph" aria-busy="true">
  Naam: <tilburg-wbc-data-placeholder loading></tilburg-wbc-data-placeholder>
</p>
\`\`\`

Renders an empty \`<span class="utrecht-data-placeholder">\`. Attribute: \`loading\` (boolean, default \`false\`; adds \`utrecht-data-placeholder--loading\`). No slots or events.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<p class="utrecht-paragraph" aria-busy="true">
  Naam: <span class="utrecht-data-placeholder utrecht-data-placeholder--loading"></span>
</p>
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
    html: `<p class="utrecht-paragraph">Naam: <span class="utrecht-data-placeholder"></span></p>`,
  },
  loading: {
    name: 'Loading',
    html: `<div aria-busy="true">
  <p class="utrecht-paragraph">Naam: <span class="utrecht-data-placeholder utrecht-data-placeholder--loading"></span></p>
  <p class="utrecht-paragraph">Adres: <span class="utrecht-data-placeholder utrecht-data-placeholder--loading"></span></p>
</div>`,
  },
} satisfies Record<string, Example>;
