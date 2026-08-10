/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg link.
   Imported by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Flink';

const intro = `Inline link built on \`.utrecht-link\` + \`.utrecht-link--html-a\`. Tilburg layer adds an underline on \`:visited\`, shifts hover to the visited colour, and inverts the foreground to white on focus (matches the rest of the interaction surface).`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-link href="/parkeren" target="_blank">Parkeren in Tilburg</tilburg-link>
\`\`\`

Inputs: \`href\`, \`target\`, \`rel\`, \`external\`, \`current\` (\`'page' | 'step' | 'location' | 'date' | 'time' | boolean\`), \`ariaLabel\`, \`ariaDescribedBy\`.`;

const usageReact = `### React

\`\`\`tsx
import { Link } from '@gemeente-tilburg/components-react';

export function Voorbeeld() {
  return (
    <>
      <Link href="/parkeren" target="_blank">
        Parkeren in Tilburg
      </Link>
      <Link href="https://nldesignsystem.nl" external>
        NL Design System
      </Link>
      <Link href="/parkeren" current="page">
        Huidige pagina
      </Link>
    </>
  );
}
\`\`\`

Props: \`external\` (sets \`rel="external noopener noreferrer"\`), \`current\` (\`'page' | 'step' | 'location' | 'date' | 'time' | boolean\`, rendered as \`aria-current\`), plus any standard anchor attribute (\`href\`, \`target\`, \`rel\`, \`aria-label\`, \`aria-describedby\`, \`className\`, …). \`AriaCurrent\` and \`LinkProps\` are exported as type aliases.

\`aria-current\` is deliberately removed from the passthrough attributes: set it through \`current\` so the accepted values stay typed. The \`utrecht-link\` and \`--html-a\` classes are applied for you.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<a class="utrecht-link utrecht-link--html-a" href="/parkeren">Parkeren in Tilburg</a>
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

export const examples = {
  default: {
    name: 'Default',
    html: `<a class="utrecht-link utrecht-link--html-a" href="#">Parkeren in Tilburg</a>`,
  },
  inParagraph: {
    name: 'In a paragraph',
    html: `<p class="utrecht-paragraph">Tilburg, gelegen in het zuiden van Nederland, is een bruisende stad met een rijke geschiedenis en een levendige cultuur. Bekijk de <a class="utrecht-link utrecht-link--html-a" href="#">website van Tilburg</a> voor actuele informatie en evenementen.</p>`,
  },
  externalLink: {
    name: 'External link',
    html: `<a class="utrecht-link utrecht-link--html-a" href="https://nldesignsystem.nl" rel="external noopener noreferrer" target="_blank">NL Design System ↗</a>`,
  },
} satisfies Record<string, Example>;
