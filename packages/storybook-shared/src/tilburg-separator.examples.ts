/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg separator. Imported
   by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fseparator';

const intro = `Thin horizontal divider between content sections, using \`--tilburg-line-border-color\` and \`--tilburg-line-border-width\`. Pass \`decorative\` for purely visual dividers so the element is hidden from assistive technology.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-separator [decorative]="true"></tilburg-separator>
\`\`\`

Inputs: \`decorative\` (when \`true\`, sets \`aria-hidden\` so screen readers skip the divider).`;

const usageReact = `### React

\`\`\`tsx
import { Paragraph, Separator } from '@gemeente-tilburg/components-react';

export function Aanvraagdetails() {
  return (
    <>
      <Paragraph>Eerste sectie met wat tekst boven de scheidingslijn.</Paragraph>
      <Separator decorative />
      <Paragraph>Tweede sectie onder de scheidingslijn.</Paragraph>
    </>
  );
}
\`\`\`

\`Separator\` renders a void \`<hr class="utrecht-separator" />\`: always self-closing, it accepts no \`children\`. Leave \`decorative\` off when the divider marks a real thematic break in the content — then screen readers keep announcing the separator.

Props: \`decorative\` (\`boolean\`, default \`false\`; when \`true\` it sets \`aria-hidden="true"\` so screen readers skip the divider), plus any standard \`<hr>\` attribute (\`className\`, merged after \`utrecht-separator\`, \`id\`, \`role\`, …). \`SeparatorProps\` is exported as a type. The \`ref\` is forwarded to the \`<hr>\`.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<hr class="utrecht-separator" aria-hidden="true" />
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

export interface Example {
  name: string;
  html: string;
}

const wrapStyle = 'max-width:32rem';

export const examples = {
  default: {
    name: 'Default',
    html: `<div style="${wrapStyle}">
  <p class="utrecht-paragraph">Eerste sectie met wat tekst boven de scheidingslijn.</p>
  <hr class="utrecht-separator" />
  <p class="utrecht-paragraph">Tweede sectie onder de scheidingslijn.</p>
</div>`,
  },
  decorative: {
    name: 'Decorative (aria-hidden)',
    html: `<div style="${wrapStyle}">
  <p class="utrecht-paragraph">Aanvraagdetails</p>
  <hr class="utrecht-separator" aria-hidden="true" />
  <p class="utrecht-paragraph">Contactgegevens</p>
</div>`,
  },
} satisfies Record<string, Example>;
