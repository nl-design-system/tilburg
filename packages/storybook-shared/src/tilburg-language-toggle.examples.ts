/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg language toggle.
   Imported by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place.

   Note: the React story renders a stateless snapshot per active option, so
   no interactivity is lost in translation to plain HTML. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Flanguage-toggle';

export const description = `Two-option toggle for switching between Dutch and English. Active option uses the Tilburg interaction-active colour with white text.

## Usage

### Angular

\`\`\`html
<tilburg-language-toggle
  [active]="currentLang"
  ariaLabel="Schakel taal"
  (toggle)="setLang($event)"
/>
\`\`\`

Inputs: \`options\` (\`TilburgLanguageOption[]\`, default \`[{code:'NL',label:'NL'},{code:'EN',label:'EN'}]\`), \`active\` (option code), \`ariaLabel\`. Output: \`(toggle)\` emits the next option code.

### Plain HTML / CSS

\`\`\`html
<button
  type="button"
  role="switch"
  aria-label="Schakel taal"
  aria-checked="false"
  class="tilburg-language-toggle utrecht-button utrecht-button--html-button utrecht-button--secondary-action"
>
  <span class="tilburg-language-toggle__option tilburg-language-toggle__option--active">NL</span>
  <span class="tilburg-language-toggle__option">EN</span>
</button>
\`\`\`
`;

export interface Example {
  name: string;
  html: string;
}

export const examples = {
  nlActive: {
    name: 'NL active',
    html: `<button type="button" role="switch" aria-label="Schakel taal" aria-checked="false" class="tilburg-language-toggle utrecht-button utrecht-button--html-button utrecht-button--secondary-action">
  <span class="tilburg-language-toggle__option tilburg-language-toggle__option--active">NL</span>
  <span class="tilburg-language-toggle__option">EN</span>
</button>`,
  },
  enActive: {
    name: 'EN active',
    html: `<button type="button" role="switch" aria-label="Schakel taal" aria-checked="true" class="tilburg-language-toggle utrecht-button utrecht-button--html-button utrecht-button--secondary-action">
  <span class="tilburg-language-toggle__option">NL</span>
  <span class="tilburg-language-toggle__option tilburg-language-toggle__option--active">EN</span>
</button>`,
  },
} satisfies Record<string, Example>;
