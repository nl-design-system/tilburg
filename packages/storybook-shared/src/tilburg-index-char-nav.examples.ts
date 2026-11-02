/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg index character navigation (A–Z). */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Findex-char-nav';

const intro = `A–Z navigation for an alphabetical index (for example "Producten en diensten van A tot Z"), built on utrecht's \`.utrecht-index-char-nav\`. Every character is a Tilburg [Button Link](?path=/docs/tilburg-button-link--docs): secondary by default, primary for the current character (\`aria-current="page"\`). A character without entries is disabled: a placeholder link without \`href\`, with \`aria-disabled="true"\`, so it stays in the row and is still read out. A \`<nav>\` landmark, named with \`aria-label\` (default \`Alfabetische index\`). utrecht's base CSS plus the \`--utrecht-index-char-nav-*\` tokens of the Tilburg theme and the Tilburg button-link CSS.`;

const usageAngular = `### Angular

\`\`\`ts
characters: TilburgIndexCharNavCharacter[] = [
  { char: 'A', href: '#A' },
  { char: 'B', href: '#B' },
  { char: 'C', disabled: true },
];
\`\`\`

\`\`\`html
<tilburg-index-char-nav [characters]="characters" currentChar="B" (charClick)="onChar($event)"></tilburg-index-char-nav>
\`\`\`

Inputs: \`ariaLabel\` (default \`'Alfabetische index'\`), \`characters\` (\`{ char, href?, disabled? }[]\`, default \`[]\`; nothing renders for an empty array; \`href\` falls back to \`#\`), \`currentChar\` (the character shown as current). Output: \`(charClick)\` emits \`{ character, event }\` (not for disabled characters).`;

const usageReact = `### React

\`\`\`tsx
import { IndexCharNav } from '@gemeente-tilburg/components-react';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((char) => ({
  char,
  href: \`#\${char}\`,
  disabled: char === 'Q' || char === 'X',
}));

export function ProductenAZ() {
  return <IndexCharNav characters={characters} currentChar="B" />;
}
\`\`\`

Props: \`characters\` (\`IndexCharNavCharacter[]\`, default \`[]\`; \`{ char: string; href?: string | null; disabled?: boolean }\`), \`currentChar\`, \`ariaLabel\` (default \`'Alfabetische index'\`), \`onCharClick\` (\`({ character, event }) => void\`), plus any \`<nav>\` attribute and a forwarded \`ref\`. Renders \`null\` for an empty \`characters\` array. This is not utrecht's React \`IndexCharNav\` (which renders a \`<div role="group">\` and has a button mode): it renders the HTML reference below. \`IndexCharNavCharacter\` and \`IndexCharNavProps\` are exported as types.`;

const usageWebComponents = `### Web Components (Stencil)

\`characters\` is a JS **property**:

\`\`\`html
<tilburg-wbc-index-char-nav current-char="B"></tilburg-wbc-index-char-nav>

<script type="module">
  const nav = document.querySelector('tilburg-wbc-index-char-nav');
  nav.characters = [{ char: 'A', href: '#A' }, { char: 'B', href: '#B' }, { char: 'C', disabled: true }];
  nav.addEventListener('tilburgCharClick', ({ detail }) => console.log(detail.character.char));
</script>
\`\`\`

Property: \`characters\` (\`{ char, href?, disabled? }[]\`, default \`[]\`). Attribute: \`current-char\`. \`aria-label\` (default \`'Alfabetische index'\`) is moved from the host onto the \`<nav>\`. Event: \`tilburgCharClick\` (Angular \`charClick\`), \`detail\` is \`{ character, event }\`. Type: \`TilburgWbcIndexCharNavCharacter\`.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<nav class="utrecht-index-char-nav" aria-label="Alfabetische index">
  <a class="utrecht-button-link utrecht-button-link--html-a utrecht-button-link--secondary-action utrecht-index-char-nav__link" href="#A">A</a>
  <a class="utrecht-button-link utrecht-button-link--html-a utrecht-button-link--primary-action utrecht-index-char-nav__link utrecht-index-char-nav__link--current" href="#B" aria-current="page">B</a>
  <a class="utrecht-button-link utrecht-button-link--html-a utrecht-button-link--secondary-action utrecht-button-link--placeholder utrecht-index-char-nav__link utrecht-index-char-nav__link--disabled" role="link" aria-disabled="true">C</a>
</nav>
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

const base = 'utrecht-button-link utrecht-button-link--html-a';
const link = (char: string, state: 'default' | 'current' | 'disabled' = 'default') => {
  if (state === 'current')
    return `<a class="${base} utrecht-button-link--primary-action utrecht-index-char-nav__link utrecht-index-char-nav__link--current" href="#" aria-current="page">${char}</a>`;
  if (state === 'disabled')
    return `<a class="${base} utrecht-button-link--secondary-action utrecht-button-link--placeholder utrecht-index-char-nav__link utrecht-index-char-nav__link--disabled" role="link" aria-disabled="true">${char}</a>`;
  return `<a class="${base} utrecht-button-link--secondary-action utrecht-index-char-nav__link" href="#">${char}</a>`;
};

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const examples = {
  default: {
    name: 'Default',
    html: `<nav class="utrecht-index-char-nav" aria-label="Alfabetische index">
  ${alphabet.map((char) => link(char, char === 'B' ? 'current' : ['Q', 'X', 'Y'].includes(char) ? 'disabled' : 'default')).join('\n  ')}
</nav>`,
  },
  short: {
    name: 'Few characters',
    html: `<nav class="utrecht-index-char-nav" aria-label="Alfabetische index">
  ${link('A')}
  ${link('B', 'current')}
  ${link('C', 'disabled')}
  ${link('D')}
</nav>`,
  },
} satisfies Record<string, Example>;
