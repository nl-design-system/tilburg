/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg action group. Imported
   by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Faction-group';

const intro = `Groups one or more related actions (buttons, link buttons, button links) and lays them out in a row, a column, or a column of equally wide actions (\`column-stretch\`). Rendered as \`<p class="utrecht-action-group">\` with \`role="group"\`; give the group a name with \`aria-label\` / \`aria-labelledby\` when that helps. Ported from Utrecht's action group (the installed Utrecht CSS does not have it yet). It is not the same as Button Group: use Action Group for the actions at the end of a form or a step, as Utrecht does. Use the column variants for narrow screens or panels only.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-action-group direction="row" ariaLabel="Formulierstappen">
  <tilburg-button appearance="primary-action-button" type="submit">Volgende stap</tilburg-button>
  <tilburg-link-button>Vorige stap</tilburg-link-button>
</tilburg-action-group>
\`\`\`

Inputs: \`direction\` (\`'row' | 'column' | 'column-stretch'\`, default \`'row'\`), \`role\` (default \`'group'\`), \`ariaLabel\`, \`ariaLabelledBy\`. Content: the actions.`;

const usageReact = `### React

\`\`\`tsx
import { ActionGroup, Button, LinkButton } from '@gemeente-tilburg/components-react';

export function Formulierstappen() {
  return (
    <ActionGroup aria-label="Formulierstappen">
      <Button appearance="primary-action-button" type="submit">
        Volgende stap
      </Button>
      <LinkButton>Vorige stap</LinkButton>
    </ActionGroup>
  );
}
\`\`\`

Props: \`direction\` (\`ActionGroupDirection\` = \`'row' | 'column' | 'column-stretch'\`, default \`'row'\`), \`role\` (default \`'group'\`), plus any \`<p>\` attribute (\`className\`, \`aria-label\`, \`aria-labelledby\`, …). \`ActionGroupProps\` and \`ActionGroupDirection\` are exported as types. The \`ref\` is forwarded to the \`<p>\`.`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<tilburg-wbc-action-group direction="column" aria-label="Formulierstappen">
  <tilburg-wbc-button appearance="primary-action-button" type="submit">Volgende stap</tilburg-wbc-button>
  <tilburg-wbc-link-button inline>Later verder gaan</tilburg-wbc-link-button>
</tilburg-wbc-action-group>
\`\`\`

Attributes: \`direction\` (\`'row' | 'column' | 'column-stretch'\`, default \`'row'\`), \`role\` (default \`'group'\`), and \`aria-label\` / \`aria-labelledby\` (moved onto the inner \`<p>\`). Slot: default (the actions). No events.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<p class="utrecht-action-group utrecht-action-group--row" role="group" aria-label="Formulierstappen">
  <button type="submit" class="utrecht-button utrecht-button--primary-action tilburg-medium">Volgende stap</button>
  <button type="button" class="utrecht-link-button utrecht-link-button--html-button">Vorige stap</button>
</p>
\`\`\`

Modifiers: \`utrecht-action-group--row\` (default), \`utrecht-action-group--column\`, \`utrecht-action-group--column-stretch\`. In a row, link buttons lose their inline padding so they line up with the text; in a column, use the \`utrecht-link-button--inline\` link button (as Utrecht does), so it lines up with the button above it.`;

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

const primary = (label: string, type = 'button') =>
  `<button type="${type}" class="utrecht-button utrecht-button--primary-action tilburg-medium${type === 'submit' ? ' utrecht-button--submit' : ''}">${label}</button>`;
const linkButton = (label: string, inline = false) =>
  `<button type="button" class="utrecht-link-button utrecht-link-button--html-button${inline ? ' utrecht-link-button--inline' : ''}">${label}</button>`;

export const examples = {
  row: {
    name: 'Row (default)',
    html: `<p class="utrecht-action-group utrecht-action-group--row" role="group" aria-label="Formulierstappen">
  ${primary('Volgende stap', 'submit')}
  ${linkButton('Vorige stap')}
</p>`,
  },
  column: {
    name: 'Column',
    html: `<p class="utrecht-action-group utrecht-action-group--column" role="group" aria-label="Formulierstappen">
  ${primary('Volgende stap', 'submit')}
  ${linkButton('Later verder gaan', true)}
  ${linkButton('Stoppen met dit formulier', true)}
</p>`,
  },
  columnStretch: {
    name: 'Column, equal width',
    html: `<p class="utrecht-action-group utrecht-action-group--column-stretch" role="group" aria-label="Formulierstappen">
  ${primary('Aanvraag versturen', 'submit')}
  <button type="button" class="utrecht-button utrecht-button--secondary-action tilburg-medium">Opslaan als concept</button>
</p>`,
  },
} satisfies Record<string, Example>;
