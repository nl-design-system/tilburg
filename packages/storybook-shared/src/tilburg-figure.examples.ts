/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg figure. Imported by
   both the React storybook (`packages/storybook`) and the Angular storybook
   (`packages/storybook-angular`). */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Ffigure';

const intro = `Self-contained illustration (an image, map, chart or code sample) with an optional caption, rendered as \`<figure class="utrecht-figure">\` and \`<figcaption class="utrecht-figure__caption">\`. The caption gives the figure its accessible name; keep the \`alt\` text of the image itself as well, because the caption does not replace it.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-figure caption="Het nieuwe logo van Gemeente Tilburg.">
  <tilburg-image src="logo.svg" alt="Logo van Gemeente Tilburg"></tilburg-image>
</tilburg-figure>
\`\`\`

Inputs: \`caption\` (\`string\`, optional; without it no \`<figcaption>\` is rendered). Project the content of the figure as \`<ng-content>\`.`;

const usageReact = `### React

\`\`\`tsx
import { Figure, Image } from '@gemeente-tilburg/components-react';

export function Logo() {
  return (
    <Figure caption="Het nieuwe logo van Gemeente Tilburg.">
      <Image src="logo.svg" alt="Logo van Gemeente Tilburg" />
    </Figure>
  );
}
\`\`\`

Props: \`caption\` (\`ReactNode\`, optional; without it no \`<figcaption>\` is rendered), \`children\` (the figure content), plus any standard attribute (\`className\`, merged after \`utrecht-figure\`, \`id\`, …). \`FigureProps\` is exported as a type. The \`ref\` is forwarded to the \`<figure>\`.`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<tilburg-wbc-figure caption="Het nieuwe logo van Gemeente Tilburg.">
  <tilburg-wbc-image src="logo.svg" alt="Logo van Gemeente Tilburg"></tilburg-wbc-image>
</tilburg-wbc-figure>
\`\`\`

Renders \`<figure class="utrecht-figure">\` around the default slot, followed by \`<figcaption class="utrecht-figure__caption">\` when \`caption\` is set. \`id\`, \`aria-label\` and \`aria-labelledby\` written on the host are moved onto the \`<figure>\`. No events or named slots.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<figure class="utrecht-figure">
  <img class="utrecht-img" src="logo.svg" alt="Logo van Gemeente Tilburg" />
  <figcaption class="utrecht-figure__caption">Het nieuwe logo van Gemeente Tilburg.</figcaption>
</figure>
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
    html: `<figure class="utrecht-figure">
  <img class="utrecht-img" src="logo.svg" alt="Logo van Gemeente Tilburg" width="240" />
  <figcaption class="utrecht-figure__caption">Het logo van Gemeente Tilburg.</figcaption>
</figure>`,
  },
  codeSample: {
    name: 'Code sample',
    html: `<figure class="utrecht-figure">
  <pre class="utrecht-code-block"><code class="utrecht-code-block__content">&lt;tilburg-figure caption="…"&gt;&lt;/tilburg-figure&gt;</code></pre>
  <figcaption class="utrecht-figure__caption">Een figuur met een bijschrift in Angular.</figcaption>
</figure>`,
  },
  withoutCaption: {
    name: 'Without caption',
    html: `<figure class="utrecht-figure">
  <img class="utrecht-img" src="logo.svg" alt="Logo van Gemeente Tilburg" width="240" />
</figure>`,
  },
} satisfies Record<string, Example>;
