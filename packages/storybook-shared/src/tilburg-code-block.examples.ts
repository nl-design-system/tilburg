/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg code block. Imported by
   both the React storybook (`packages/storybook`) and the Angular storybook
   (`packages/storybook-angular`). Styled by the Utrecht base CSS with the
   Tilburg `--utrecht-code-block-*` tokens, plus `packages/components-css/code-block`
   (horizontal scroll for long lines). */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fcode-block';

const intro = `Multi-line code or preformatted text on a grey background, rendered as \`<pre class="utrecht-code-block"><code class="utrecht-code-block__content">\`. Whitespace and line breaks are kept as written; long lines do not wrap but scroll horizontally inside the block, so the page itself never scrolls sideways.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-code-block>{{ snippet }}</tilburg-code-block>
\`\`\`

No inputs. Angular collapses whitespace in templates, so pass multi-line code as a bound string (\`{{ snippet }}\`) or put \`ngPreserveWhitespaces\` on the element; braces in literal code must be escaped in a template anyway.`;

const usageReact = `### React

\`\`\`tsx
import { CodeBlock } from '@gemeente-tilburg/components-react';

const snippet = \`<link rel="stylesheet" href="https://tilburg.nl/huisstijl.css">\`;

export function Voorbeeld() {
  return <CodeBlock>{snippet}</CodeBlock>;
}
\`\`\`

Props: no component-specific props. \`CodeBlockProps\` is an exported type alias of \`HTMLAttributes<HTMLPreElement>\` (\`className\` is merged after \`utrecht-code-block\`). \`children\` go inside the inner \`<code>\`. The \`ref\` is forwarded to the \`<pre>\`.`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<tilburg-wbc-code-block>npm install @gemeente-tilburg/components-css</tilburg-wbc-code-block>
\`\`\`

Renders \`<pre class="utrecht-code-block"><code class="utrecht-code-block__content">\` around the default slot. No attributes, events or named slots.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<pre class="utrecht-code-block"><code class="utrecht-code-block__content">…</code></pre>
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
    html: `<pre class="utrecht-code-block"><code class="utrecht-code-block__content">npm install @gemeente-tilburg/components-css</code></pre>`,
  },
  multiline: {
    name: 'Multiple lines',
    html: `<pre class="utrecht-code-block"><code class="utrecht-code-block__content">&lt;html lang="nl" class="tilburg-theme"&gt;
  &lt;body class="utrecht-document"&gt;
    &lt;h1 class="utrecht-heading-1"&gt;Afvalkalender&lt;/h1&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>`,
  },
} satisfies Record<string, Example>;
