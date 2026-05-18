/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { type ReactNode, useRef } from 'react';

const meta = {
  title: 'Tilburg/Modal',
  id: 'tilburg-modal',
  tags: ['autodocs'],
  parameters: {
    bugs: 'https://github.com/nl-design-system/tilburg/labels/component%2Fmodal',
    docs: {
      description: {
        component: `Native \`<dialog>\`-based modal styled with the \`tilburg-modal\` BEM class set. The Tilburg layer adds drop-shadow, rounded corners, a soft drop-in animation, and a backdrop blur. Reduced-motion users skip the animation.

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
    <p class="utrecht-paragraph">Weet u zeker dat u de aanvraag wilt versturen?</p>
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
`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const CloseIcon = () => (
  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ModalDemo = ({ id, title, children }: { id: string; title: string; children: ReactNode }) => {
  const ref = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button
        type="button"
        className="utrecht-button utrecht-button--primary-action"
        onClick={() => ref.current?.showModal()}
      >
        Open modal
      </button>
      <dialog id={id} ref={ref} className="tilburg-modal" aria-labelledby={`${id}-title`}>
        <header className="tilburg-modal__header">
          <h2 id={`${id}-title`}>{title}</h2>
          <button type="button" className="tilburg-modal__close-button" onClick={() => ref.current?.close()}>
            <span>Sluiten</span>
            <CloseIcon />
          </button>
        </header>
        <div className="tilburg-modal__content">{children}</div>
        <footer className="tilburg-modal__footer">
          <button
            type="button"
            className="utrecht-button utrecht-button--primary-action"
            onClick={() => ref.current?.close()}
          >
            Bevestigen
          </button>
          <button
            type="button"
            className="utrecht-button utrecht-button--secondary-action"
            onClick={() => ref.current?.close()}
          >
            Annuleren
          </button>
        </footer>
      </dialog>
    </>
  );
};

export const Default: Story = {
  name: 'Default',
  render: () => (
    <ModalDemo id="modal-default" title="Aanvraag bevestigen">
      <p className="utrecht-paragraph">
        Weet u zeker dat u de aanvraag wilt versturen? U kunt deze daarna niet meer wijzigen.
      </p>
      <p className="utrecht-paragraph">U ontvangt een e-mail zodra uw aanvraag in behandeling is genomen.</p>
    </ModalDemo>
  ),
};

export const WithLink: Story = {
  name: 'With link in content',
  render: () => (
    <ModalDemo id="modal-link" title="Cookie-instellingen">
      <p className="utrecht-paragraph">
        Wij gebruiken alleen functionele cookies. Voor meer informatie zie ons <a href="#">privacystatement</a>.
      </p>
    </ModalDemo>
  ),
};
