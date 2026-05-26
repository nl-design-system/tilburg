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

export const description = `Native \`<dialog>\`-based modal styled with the \`tilburg-modal\` BEM class set. The Tilburg layer adds drop-shadow, rounded corners, a soft drop-in animation, and a backdrop blur. Reduced-motion users skip the animation.

## Usage

This component is pure CSS — there is no Angular wrapper. Use the platform \`<dialog>\` element together with the BEM classes; call \`.showModal()\` to open and \`.close()\` to dismiss.

### Plain HTML / CSS

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
\`\`\`

### Angular (using the platform element)

\`\`\`ts
@ViewChild('confirmDialog', { static: true }) confirm!: ElementRef<HTMLDialogElement>;
open()  { this.confirm.nativeElement.showModal(); }
close() { this.confirm.nativeElement.close(); }
\`\`\`

\`\`\`html
<button (click)="open()">Open modal</button>
<dialog #confirmDialog class="tilburg-modal" aria-labelledby="t">
  …same structure as above…
</dialog>
\`\`\`
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
