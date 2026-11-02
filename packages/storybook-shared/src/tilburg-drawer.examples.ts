/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg drawer.
   Imported by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place.

   Interactivity caveat: static HTML can only show one snapshot, so the
   examples render the dialog with the `open` attribute (non-modal, no
   backdrop) inside a frame. The frame's `transform` makes it the containing
   block of the `position: fixed` drawer, so the drawer sticks to the frame's
   edge instead of the Storybook page. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fdrawer';

const intro = `Panel that slides over the page from one of its edges, for a menu, filters or extra information: a native \`<dialog class="utrecht-drawer">\`. Utrecht's base CSS with Tilburg tokens (white panel, \`--tilburg-space-*-rabbit\` padding, the Tilburg backdrop). \`utrecht-drawer--inline-start\` (default) and \`--inline-end\` put it on the left or right edge at full height; \`--block-start\` and \`--block-end\` at the top or bottom at full width. It always leaves at least 44px of the page visible, so the backdrop can be clicked or tapped to close it (WCAG 2.5.5).

Open it with \`showModal()\`: the page behind it becomes inert, focus moves into the drawer, and Escape closes it. Give the dialog an accessible name, from its heading with \`aria-labelledby\` or with \`aria-label\`. A \`<button>\` inside \`<form method="dialog">\` closes it without script. Closing on a click on the backdrop needs \`closedby="any"\` on the \`<dialog>\` (Chromium and Firefox; in other browsers add a click handler like the components do, or rely on the close button and Escape). In forced-colours mode the drawer keeps a visible edge: its transparent border becomes a system-colour line.`;

const usageLead = `The components below render exactly this markup, open it with \`showModal()\` and close it on Escape, on a click on the backdrop and on \`close()\`, with one close event for all of them — the same API as Modal.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<button type="button" class="utrecht-button utrecht-button--secondary-action" onclick="document.getElementById('menu').showModal()">
  Menu
</button>

<dialog id="menu" class="utrecht-drawer utrecht-drawer--inline-start" aria-labelledby="menu-title" closedby="any">
  <h2 class="utrecht-heading-2" id="menu-title">Menu</h2>
  <ul class="utrecht-unordered-list">…</ul>
  <form method="dialog">
    <button type="submit" class="utrecht-button utrecht-button--secondary-action">Sluiten</button>
  </form>
</dialog>
\`\`\``;

const usageAngular = `### Angular

\`\`\`html
<tilburg-button appearance="secondary-action-button" (click)="menuOpen = true">Menu</tilburg-button>

<tilburg-drawer ariaLabelledBy="menu-title" [(open)]="menuOpen">
  <tilburg-heading-2 id="menu-title">Menu</tilburg-heading-2>
  …
  <form method="dialog">
    <tilburg-button type="submit" appearance="secondary-action-button">Sluiten</tilburg-button>
  </form>
</tilburg-drawer>
\`\`\`

Inputs: \`align\` (\`'inline-start' | 'inline-end' | 'block-start' | 'block-end'\`, default \`'inline-start'\`), \`open\` (\`true\` opens via \`showModal()\`, \`false\` closes; two-way with \`[(open)]\`), \`closeOnBackdropClick\` (default \`true\`), \`ariaLabel\`, \`ariaLabelledBy\` (the dialog's accessible name). Outputs: \`(closed)\` for every way of closing (Escape, backdrop, \`close()\`, a \`method="dialog"\` form), \`(openChange)\`. Public methods \`showModal()\` / \`close()\` via \`@ViewChild(TilburgDrawer)\`. Content: default projection.`;

const usageReact = `### React

\`\`\`tsx
import { Button, Drawer, Heading2 } from '@gemeente-tilburg/components-react';
import { useState } from 'react';

export function Menu() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button appearance="secondary-action-button" onClick={() => setOpen(true)}>Menu</Button>
      <Drawer aria-labelledby="menu-title" open={open} onClose={() => setOpen(false)}>
        <Heading2 id="menu-title">Menu</Heading2>
        …
        <Button appearance="secondary-action-button" onClick={() => setOpen(false)}>Sluiten</Button>
      </Drawer>
    </>
  );
}
\`\`\`

Props: \`align\` (\`DrawerAlign\`, default \`'inline-start'\`), \`open\` (controlled; \`true\` opens via \`showModal()\`), \`onClose\` (fires for every way of closing — keep your state in sync there), \`closeOnBackdropClick\` (default \`true\`), plus any \`<dialog>\` attribute (\`aria-labelledby\`, \`aria-label\`, \`className\`, …). The forwarded \`ref\` is the \`<dialog>\`, so \`ref.current.showModal()\` works too. \`DrawerProps\` and \`DrawerAlign\` are exported as types.`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<tilburg-wbc-button id="open-menu" appearance="secondary-action-button">Menu</tilburg-wbc-button>

<tilburg-wbc-drawer id="menu" aria-labelledby="menu-title">
  <h2 class="utrecht-heading-2" id="menu-title">Menu</h2>
  …
  <form method="dialog">
    <button type="submit" class="utrecht-button utrecht-button--secondary-action">Sluiten</button>
  </form>
</tilburg-wbc-drawer>

<script type="module">
  const drawer = document.getElementById('menu');
  document.getElementById('open-menu').addEventListener('click', () => drawer.showModal());
  drawer.addEventListener('tilburgClose', () => console.log('gesloten'));
</script>
\`\`\`

Attributes: \`align\` (default \`inline-start\`), \`open\` (reflected; set it to open, it is removed when the drawer closes), \`close-on-backdrop-click\` (default \`true\`). \`aria-label\` and \`aria-labelledby\` on the element are moved onto the \`<dialog>\`. Methods: \`showModal()\`, \`close()\`. Event: \`tilburgClose\` for every way of closing. Slot: default.`;

export const description = `${intro}

## Usage

${usageLead}

${usageAngular}

${usagePlainHtml}
`;

export const descriptionReact = `${intro}

## Usage

${usageLead}

${usageReact}

${usagePlainHtml}
`;

export const descriptionWebComponents = `${intro}

## Usage

${usageLead}

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

/* `transform` makes the frame the containing block of the fixed-position drawer (see the comment at the top). */
const frameStyle =
  'position:relative;block-size:24rem;overflow:hidden;transform:translateZ(0);border:1px dashed var(--tilburg-line-border-color)';

const content = (id: string) => `<h2 class="utrecht-heading-2" id="${id}">Menu</h2>
    <ul class="utrecht-unordered-list">
      <li class="utrecht-unordered-list__item"><a class="utrecht-link utrecht-link--html-a" href="#">Afval</a></li>
      <li class="utrecht-unordered-list__item"><a class="utrecht-link utrecht-link--html-a" href="#">Parkeren</a></li>
      <li class="utrecht-unordered-list__item"><a class="utrecht-link utrecht-link--html-a" href="#">Paspoort en ID-kaart</a></li>
    </ul>
    <form method="dialog">
      <button type="submit" class="utrecht-button utrecht-button--secondary-action">Sluiten</button>
    </form>`;

const drawer = (name: string, align: string) => ({
  name,
  html: `<div style="${frameStyle}">
  <dialog class="utrecht-drawer utrecht-drawer--${align}" aria-labelledby="drawer-${align}-title" open>
    ${content(`drawer-${align}-title`)}
  </dialog>
</div>`,
});

export const examples = {
  default: drawer('Inline start (default)', 'inline-start'),
  inlineEnd: drawer('Inline end', 'inline-end'),
  blockStart: drawer('Block start', 'block-start'),
  blockEnd: drawer('Block end', 'block-end'),
} satisfies Record<string, Example>;
