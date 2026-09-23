/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg modal.
   Imported by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place.

   Interactivity caveat: the React story uses a ref + showModal()/close()
   to open/close the dialog. Static HTML can only show one snapshot; we
   render the dialog with the `open` attribute (so it appears inline)
   rather than gated behind a button click. The trigger button is included
   for visual completeness but is non-functional in this static markup. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fmodal';

const intro = `Native \`<dialog>\`-based modal styled with the \`tilburg-modal\` BEM class set. The Tilburg layer adds drop-shadow, rounded corners, a soft drop-in animation, and a backdrop blur. Reduced-motion users skip the animation.`;

const usageLead = `The components below render exactly this markup, give the dialog its accessible name from the heading (\`aria-labelledby\`), and close it via the close button, Escape or a click on the backdrop. The page behind it is inert while it is open (native \`showModal()\`).`;

const usageLeadHtml = `This component is plain HTML/CSS on the platform \`<dialog>\` element: use the BEM classes, call \`.showModal()\` to open and \`.close()\` to dismiss. The React, Angular and Web Components layers wrap exactly this markup.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<button type="button" onclick="document.getElementById('confirm').showModal()">
  Open modal
</button>

<dialog id="confirm" class="tilburg-modal" aria-labelledby="confirm-title">
  <header class="tilburg-modal__header">
    <h2 id="confirm-title">Aanvraag bevestigen</h2>
    <button type="button" class="tilburg-modal__close-button" onclick="document.getElementById('confirm').close()">
      <span>Sluiten</span>
      <svg aria-hidden="true"><!-- close icon --></svg>
    </button>
  </header>
  <div class="tilburg-modal__content">
    <p class="utrecht-paragraph">Weet je zeker dat je de aanvraag wilt versturen?</p>
  </div>
  <footer class="tilburg-modal__footer">
    <button type="button" class="utrecht-button utrecht-button--primary-action">Bevestigen</button>
    <button type="button" class="utrecht-button utrecht-button--secondary-action">Annuleren</button>
  </footer>
</dialog>
\`\`\``;

const usageAngular = `### Angular

\`\`\`html
<tilburg-button (click)="open = true">Open modal</tilburg-button>

<tilburg-modal title="Aanvraag bevestigen" [open]="open" (closed)="open = false">
  <tilburg-paragraph>Weet je zeker dat je de aanvraag wilt versturen?</tilburg-paragraph>
  <tilburg-button slot="footer" appearance="primary-action-button" (click)="confirm()">Bevestigen</tilburg-button>
  <tilburg-button slot="footer" appearance="secondary-action-button" (click)="open = false">Annuleren</tilburg-button>
</tilburg-modal>
\`\`\`

Inputs: \`title\` (heading + accessible name), \`open\` (\`true\` opens via \`showModal()\`, \`false\` closes), \`closeLabel\` (default \`'Sluiten'\`), \`closeOnBackdropClick\` (default \`true\`). Output: \`(closed)\` — fires for every way of closing (close button, Escape, backdrop, \`close()\`); set your \`open\` back to \`false\` there. Content: default projection for the body, \`slot="footer"\` on each action (they become the footer's flex items; the footer disappears when empty). Public methods \`showModal()\` / \`close()\` via \`@ViewChild(TilburgModal)\`.`;

const usageReact = `### React

\`\`\`tsx
import { Button, Modal, Paragraph } from '@gemeente-tilburg/components-react';
import { useState } from 'react';

export function ConfirmApplication() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        title="Aanvraag bevestigen"
        open={open}
        onClose={() => setOpen(false)}
        footer={
          <>
            <Button appearance="primary-action-button" onClick={() => setOpen(false)}>Bevestigen</Button>
            <Button appearance="secondary-action-button" onClick={() => setOpen(false)}>Annuleren</Button>
          </>
        }
      >
        <Paragraph>Weet je zeker dat je de aanvraag wilt versturen?</Paragraph>
      </Modal>
    </>
  );
}
\`\`\`

Props: \`title\` (heading + accessible name), \`open\` (controlled; \`true\` opens via \`showModal()\`), \`onClose\` (fires for every way of closing — keep your state in sync there), \`closeLabel\` (default \`'Sluiten'\`), \`closeOnBackdropClick\` (default \`true\`), \`footer\` (\`ReactNode\`; no footer when omitted), plus any \`<dialog>\` attribute. The forwarded \`ref\` is the \`<dialog>\`, so \`ref.current.showModal()\` works too. \`AlertDialog\` (with \`customFooter\`) is a deprecated alias that renders through \`Modal\`.`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<tilburg-wbc-button id="open-confirm">Open modal</tilburg-wbc-button>

<tilburg-wbc-modal id="confirm" heading="Aanvraag bevestigen">
  <p class="utrecht-paragraph">Weet je zeker dat je de aanvraag wilt versturen?</p>
  <tilburg-wbc-button slot="footer" appearance="primary-action-button">Bevestigen</tilburg-wbc-button>
  <tilburg-wbc-button slot="footer" appearance="secondary-action-button">Annuleren</tilburg-wbc-button>
</tilburg-wbc-modal>

<script type="module">
  const modal = document.getElementById('confirm');
  document.getElementById('open-confirm').addEventListener('click', () => modal.showModal());
  modal.addEventListener('tilburgClose', () => console.log('gesloten'));
</script>
\`\`\`

Attributes: \`heading\` (the title — named \`heading\` because \`title\` is a global HTML attribute), \`open\` (reflected; set it to open, it is removed when the dialog closes), \`close-label\` (default \`'Sluiten'\`), \`close-on-backdrop-click\` (default \`true\`). Methods: \`showModal()\`, \`close()\`. Event: \`tilburgClose\` for every way of closing. Slots: default (body), \`footer\` — put \`slot="footer"\` on each action so they become the footer's flex items; the footer is omitted when unused.`;

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

${usageLeadHtml}

${usagePlainHtml}
`;

const closeIconSvg = `<svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
  <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
</svg>`;

export interface Example {
  name: string;
  html: string;
}

export const examples = {
  default: {
    name: 'Default',
    html: `<button type="button" class="utrecht-button utrecht-button--primary-action">Open modal</button>
<dialog id="modal-default" class="tilburg-modal" aria-labelledby="modal-default-title" open>
  <header class="tilburg-modal__header">
    <h2 id="modal-default-title">Aanvraag bevestigen</h2>
    <button type="button" class="tilburg-modal__close-button">
      <span>Sluiten</span>
      ${closeIconSvg}
    </button>
  </header>
  <div class="tilburg-modal__content">
    <p class="utrecht-paragraph">Weet je zeker dat je de aanvraag wilt versturen? Je kunt deze daarna niet meer wijzigen.</p>
    <p class="utrecht-paragraph">Je ontvangt een e-mail zodra je aanvraag in behandeling is genomen.</p>
  </div>
  <footer class="tilburg-modal__footer">
    <button type="button" class="utrecht-button utrecht-button--primary-action">Bevestigen</button>
    <button type="button" class="utrecht-button utrecht-button--secondary-action">Annuleren</button>
  </footer>
</dialog>`,
  },
  withLink: {
    name: 'With link in content',
    html: `<button type="button" class="utrecht-button utrecht-button--primary-action">Open modal</button>
<dialog id="modal-link" class="tilburg-modal" aria-labelledby="modal-link-title" open>
  <header class="tilburg-modal__header">
    <h2 id="modal-link-title">Cookie-instellingen</h2>
    <button type="button" class="tilburg-modal__close-button">
      <span>Sluiten</span>
      ${closeIconSvg}
    </button>
  </header>
  <div class="tilburg-modal__content">
    <p class="utrecht-paragraph">Wij gebruiken alleen functionele cookies. Voor meer informatie zie ons <a href="#">privacystatement</a>.</p>
  </div>
  <footer class="tilburg-modal__footer">
    <button type="button" class="utrecht-button utrecht-button--primary-action">Bevestigen</button>
    <button type="button" class="utrecht-button utrecht-button--secondary-action">Annuleren</button>
  </footer>
</dialog>`,
  },
} satisfies Record<string, Example>;
