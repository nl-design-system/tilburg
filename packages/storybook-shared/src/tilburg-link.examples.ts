/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg link.
   Imported by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Flink';

export const description = `Inline link built on \`.utrecht-link\` + \`.utrecht-link--html-a\`. Tilburg layer adds an underline on \`:visited\`, shifts hover to the visited colour, and inverts the foreground to white on focus (matches the rest of the interaction surface).

## Usage

### Angular

\`\`\`html
<tilburg-link href="/parkeren" target="_blank">Parkeren in Tilburg</tilburg-link>
\`\`\`

Inputs: \`href\`, \`target\`, \`rel\`, \`external\`, \`current\` (\`'page' | 'step' | 'location' | 'date' | 'time' | boolean\`), \`ariaLabel\`, \`ariaDescribedBy\`.

### Plain HTML / CSS

\`\`\`html
<a class="utrecht-link utrecht-link--html-a" href="/parkeren">Parkeren in Tilburg</a>
\`\`\`
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
