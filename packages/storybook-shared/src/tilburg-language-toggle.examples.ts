/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg language toggle.
   Imported by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place.

   Note: the React story renders a stateless snapshot per active option, so
   no interactivity is lost in translation to plain HTML. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Flanguage-toggle';

const intro = `Two-option toggle for switching between Dutch and English. Active option uses the Tilburg interaction-active colour with white text.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-language-toggle
  [active]="currentLang"
  ariaLabel="Schakel taal"
  (toggle)="setLang($event)"
/>
\`\`\`

Inputs: \`options\` (\`TilburgLanguageOption[]\`, default \`[{code:'NL',label:'NL'},{code:'EN',label:'EN'}]\`), \`active\` (option code), \`ariaLabel\`. Output: \`(toggle)\` emits the next option code.`;

const usageReact = `### React

The toggle is controlled: it never stores the active language itself, it only reports which option comes next. Keep the value in state (or in your i18n store) and feed it back through \`active\`.

\`\`\`tsx
import { LanguageToggle } from '@gemeente-tilburg/components-react';
import { useState } from 'react';

export function TaalSchakelaar() {
  const [currentLang, setLang] = useState('NL');

  return <LanguageToggle active={currentLang} aria-label="Schakel taal" onToggle={setLang} />;
}
\`\`\`

Pass \`options\` to label the choices in full instead of by code — the \`code\` is what \`active\` and \`onToggle\` speak in, the \`label\` is what the user reads:

\`\`\`tsx
<LanguageToggle
  active={currentLang}
  aria-label="Schakel taal"
  onToggle={setLang}
  options={[
    { code: 'NL', label: 'Nederlands' },
    { code: 'EN', label: 'English' },
  ]}
/>
\`\`\`

Props: \`options\` (\`LanguageOption[]\`, default \`[{ code: 'NL', label: 'NL' }, { code: 'EN', label: 'EN' }]\`; \`LanguageOption\` is \`{ code: string; label: string }\`), \`active\` (\`string | null\`, default \`'NL'\` — matched against \`option.code\`), \`onToggle\` (\`(code: string) => void\`, called with the **next** option's code on click, Enter or Space), plus any standard \`<button>\` attribute (\`aria-label\`, default \`'Switch language'\`, \`className\`, \`disabled\`, …). Your own \`onClick\` / \`onKeyDown\` run first; calling \`event.preventDefault()\` in them suppresses the toggle. \`LanguageOption\` and \`LanguageToggleProps\` are exported as type aliases.`;

const usagePlainHtml = `### Plain HTML / CSS

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
