/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg tooltip. Imported by both the React storybook
   (`packages/storybook`) and the Angular storybook (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Ftooltip';

const pencilIcon = `<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`;

const intro = `**Tilburg component**: not based on an Utrecht component; its markup and CSS use the \`tilburg-*\` class set.

A short description of a control, shown when the pointer is over it or it has keyboard focus (bq-tlb-frontend TIL-53/54). It meets WCAG 1.4.13: it opens on hover (after a short delay) and on focus, **Escape** closes it without moving the pointer or focus, and the pointer can move onto the tooltip without it closing. On touch screens, which have no hover, a tap toggles it.

The tooltip is a **description**, not a name: the trigger keeps its own accessible name (its text, or \`aria-label\` for an icon-only button), and refers to the tooltip with \`aria-describedby\`, added to any ids already there. The tooltip text stays in the page while it is closed, so screen-reader users get it either way.

The tooltip keeps itself in view: when the preferred side has no room (at the top of the page, or at the edge of a container with \`overflow: hidden\`, such as a table cell) it opens on the other side, and when it would stick out past the left or right edge it shifts sideways. The script records this in \`data-tilburg-tooltip-placement\` and \`--_tilburg-tooltip-shift\`, so the \`tilburg-tooltip--below\` class stays as you set it.

Keep the text short and never put essential information or links in a tooltip: people who do not hover, or zoom in, may miss it. Use a form field description for help that everyone needs.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-tooltip text="Uw gegevens bewerken">
  <button utrecht-button appearance="subtle-button" aria-label="Bewerken">…</button>
</tilburg-tooltip>
\`\`\`

The first element inside is the trigger; the component adds the tooltip's id to its \`aria-describedby\`. Inputs: \`text\`, \`placement\` (\`'above' | 'below'\`, default \`'above'\`).`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<span class="tilburg-tooltip" data-tilburg-tooltip-enhance>
  <button type="button" class="utrecht-button utrecht-button--subtle" aria-label="Bewerken" aria-describedby="tip-bewerken">…</button>
  <span class="tilburg-tooltip__popup" id="tip-bewerken" role="tooltip">Uw gegevens bewerken</span>
</span>

<script type="module">
  import { enhanceTooltip } from "@gemeente-tilburg/components-css/tooltip/index.js";
  enhanceTooltip();
</script>
\`\`\`

Add \`tilburg-tooltip--below\` to place the tooltip under the trigger. The script adds \`tilburg-tooltip--open\` while it is shown.`;

const usageReact = `### React

\`\`\`tsx
import { Button, Tooltip } from '@gemeente-tilburg/components-react';

export const Bewerken = () => (
  <Tooltip content="Uw gegevens bewerken">
    <Button appearance="subtle-button" aria-label="Bewerken">
      <PencilIcon />
    </Button>
  </Tooltip>
);
\`\`\`

The child is the trigger: it gets the tooltip's id added to its \`aria-describedby\`, so it must pass that prop to its element (all Tilburg components and plain elements do). Props: \`content\`, \`placement\` (\`'above' | 'below'\`, default \`'above'\`), \`className\`.`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<tilburg-wbc-tooltip text="Uw gegevens bewerken">
  <button type="button" class="utrecht-button utrecht-button--subtle" aria-label="Bewerken">…</button>
</tilburg-wbc-tooltip>
\`\`\`

The first child element is the trigger; the element adds the tooltip's id to its \`aria-describedby\`. Attributes: \`text\`, \`placement\` (\`'above' | 'below'\`, default \`'above'\`).`;

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

/** A container that cuts off what sticks out (like a table cell), with the trigger in its top-left corner. */
export const edgeFrameStyle =
  'overflow:hidden;min-block-size:9rem;max-inline-size:28rem;border:1px dashed currentColor;padding:0.25rem';
export const edgeText =
  'Kwijtschelding is een vrijstelling van gemeentelijke belastingen voor inwoners met een laag inkomen en weinig vermogen.';

/* Room above and below, so the tooltip is not clipped by the story frame. */
const frameStyle = 'padding-block:4rem;padding-inline:2rem;display:flex;gap:2rem;align-items:center';

export interface Example {
  name: string;
  html: string;
}

export const examples = {
  default: {
    name: 'Default',
    html: `<div style="${frameStyle}">
  <span class="tilburg-tooltip" data-tilburg-tooltip-enhance>
    <button type="button" class="utrecht-button utrecht-button--secondary-action tilburg-medium" aria-describedby="tip-default">Opslaan als concept</button>
    <span class="tilburg-tooltip__popup" id="tip-default" role="tooltip">U kunt de aanvraag later afmaken.</span>
  </span>
</div>`,
  },
  iconButton: {
    name: 'Icon-only button',
    html: `<div style="${frameStyle}">
  <span class="tilburg-tooltip" data-tilburg-tooltip-enhance>
    <button type="button" class="utrecht-button utrecht-button--subtle tilburg-medium" aria-label="Bewerken" aria-describedby="tip-icon">${pencilIcon}</button>
    <span class="tilburg-tooltip__popup" id="tip-icon" role="tooltip">Uw gegevens bewerken</span>
  </span>
</div>`,
  },
  below: {
    name: 'Below the trigger',
    html: `<div style="${frameStyle}">
  <span class="tilburg-tooltip tilburg-tooltip--below" data-tilburg-tooltip-enhance>
    <a class="utrecht-link" href="#" aria-describedby="tip-below">Kwijtschelding</a>
    <span class="tilburg-tooltip__popup" id="tip-below" role="tooltip">Vrijstelling van gemeentelijke belastingen bij een laag inkomen.</span>
  </span>
</div>`,
  },
  existingDescription: {
    name: 'Trigger with its own description',
    html: `<div style="${frameStyle};flex-direction:column;align-items:flex-start">
  <span class="tilburg-tooltip" data-tilburg-tooltip-enhance>
    <button type="button" class="utrecht-button utrecht-button--secondary-action tilburg-medium" aria-describedby="hint-verwijderen tip-verwijderen">Verwijderen</button>
    <span class="tilburg-tooltip__popup" id="tip-verwijderen" role="tooltip">Verwijdert het bestand uit de aanvraag.</span>
  </span>
  <p class="utrecht-paragraph" id="hint-verwijderen">Dit kan niet ongedaan worden gemaakt.</p>
</div>`,
  },
  edge: {
    name: 'Kept in view at the edge',
    html: `<div style="${edgeFrameStyle}">
  <span class="tilburg-tooltip" data-tilburg-tooltip-enhance>
    <button type="button" class="utrecht-button utrecht-button--secondary-action tilburg-medium" aria-describedby="tip-edge">Kwijtschelding</button>
    <span class="tilburg-tooltip__popup" id="tip-edge" role="tooltip">${edgeText}</span>
  </span>
</div>`,
  },
} satisfies Record<string, Example>;

/** Control descriptions, shared by the React, Web Components and Angular stories so the props tables agree. */
export const argDescriptions = {
  text: 'The tooltip text: a short description of the trigger, without links or essential information.',
  placement: 'Where the tooltip opens: above the trigger (default) or below it, for example at the top of the page.',
};
