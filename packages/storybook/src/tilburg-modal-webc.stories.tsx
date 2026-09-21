/* @license CC0-1.0 */

import { TilburgWebcButton, TilburgWebcModal, TilburgWebcParagraph } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { type ReactNode, useState } from 'react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-modal.examples';

/* Stencil `<tilburg-webc-modal>` rendered through its generated React proxy. */

const meta = {
  title: 'Tilburg Web Components/Modal',
  id: 'tilburg-modal-webc',
  component: TilburgWebcModal,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWebcModal>;

export default meta;
type Story = StoryObj<typeof meta>;

/* Same content as the HTML/CSS reference examples, behind a trigger button:
   a modal that opens by itself would stack on the autodocs page. */
const ModalDemo = ({ heading, children }: { heading: string; children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TilburgWebcButton appearance="primary-action-button" onClick={() => setOpen(true)}>
        Open modal
      </TilburgWebcButton>
      <TilburgWebcModal heading={heading} open={open} onTilburgClose={() => setOpen(false)}>
        {children}
        <TilburgWebcButton slot="footer" appearance="primary-action-button" onClick={() => setOpen(false)}>
          Bevestigen
        </TilburgWebcButton>
        <TilburgWebcButton slot="footer" appearance="secondary-action-button" onClick={() => setOpen(false)}>
          Annuleren
        </TilburgWebcButton>
      </TilburgWebcModal>
    </>
  );
};

export const Default: Story = {
  name: 'Default',
  render: () => (
    <ModalDemo heading="Aanvraag bevestigen">
      <TilburgWebcParagraph>
        Weet je zeker dat je de aanvraag wilt versturen? Je kunt deze daarna niet meer wijzigen.
      </TilburgWebcParagraph>
      <TilburgWebcParagraph>Je ontvangt een e-mail zodra je aanvraag in behandeling is genomen.</TilburgWebcParagraph>
    </ModalDemo>
  ),
};

export const WithLink: Story = {
  name: 'With link in content',
  render: () => (
    <ModalDemo heading="Cookie-instellingen">
      <TilburgWebcParagraph>
        Wij gebruiken alleen functionele cookies. Voor meer informatie zie ons <a href="#">privacystatement</a>.
      </TilburgWebcParagraph>
    </ModalDemo>
  ),
};
