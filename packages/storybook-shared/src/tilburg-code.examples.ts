/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg inline code. Imported by
   both the React storybook (`packages/storybook`) and the Angular storybook
   (`packages/storybook-angular`). Styled by the Utrecht base CSS with the
   Tilburg `--utrecht-code-*` tokens; there is no components-css folder. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fcode';

const intro = `Inline fragment of code, a file name or a value someone has to type literally, rendered as \`<code class="utrecht-code">\` in the Tilburg code font. Inline: it flows with the surrounding text. For multi-line code use Code Block.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-paragraph>Upload je bestand als <tilburg-code>.pdf</tilburg-code> of <tilburg-code>.jpg</tilburg-code>.</tilburg-paragraph>
\`\`\`

No inputs. The host stays \`display: inline\`.`;

const usageReact = `### React

\`\`\`tsx
import { Code, Paragraph } from '@gemeente-tilburg/components-react';

export function Bestandstypen() {
  return (
    <Paragraph>
      Upload je bestand als <Code>.pdf</Code> of <Code>.jpg</Code>.
    </Paragraph>
  );
}
\`\`\`

Props: no component-specific props. \`CodeProps\` is an exported type alias of \`HTMLAttributes<HTMLElement>\` (\`className\` is merged after \`utrecht-code\`). The \`ref\` is forwarded to the \`<code>\`.`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<p class="utrecht-paragraph">Upload je bestand als <tilburg-wbc-code>.pdf</tilburg-wbc-code>.</p>
\`\`\`

Renders \`<code class="utrecht-code">\` around the default slot; the host stays inline. No attributes, events or named slots.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<code class="utrecht-code">.pdf</code>
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
    html: `<p class="utrecht-paragraph">Upload je bestand als <code class="utrecht-code">.pdf</code> of <code class="utrecht-code">.jpg</code>, maximaal 10 MB.</p>`,
  },
  value: {
    name: 'Value to type literally',
    html: `<p class="utrecht-paragraph">Typ <code class="utrecht-code">STOP</code> in het tekstvak om je aanmelding voor de nieuwsbrief te beëindigen.</p>`,
  },
} satisfies Record<string, Example>;
