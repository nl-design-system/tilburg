/* @license CC0-1.0 */

import { TilburgWbcButton, TilburgWbcModal, TilburgWbcParagraph } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { type ReactNode, useState } from 'react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-modal.examples';

/* Stencil `<tilburg-wbc-modal>` rendered through its generated React proxy. */

const meta = {
  title: 'Tilburg Web Components/Modal',
  id: 'tilburg-modal-wbc',
  component: TilburgWbcModal,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcModal>;

export default meta;
type Story = StoryObj<typeof meta>;

/* Same content as the HTML/CSS reference examples, behind a trigger button:
   a modal that opens by itself would stack on the autodocs page. */
const ModalDemo = ({ heading, children }: { heading: string; children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TilburgWbcButton appearance="primary-action-button" onClick={() => setOpen(true)}>
        Open modal
      </TilburgWbcButton>
      <TilburgWbcModal heading={heading} open={open} onTilburgClose={() => setOpen(false)}>
        {children}
        <TilburgWbcButton slot="footer" appearance="primary-action-button" onClick={() => setOpen(false)}>
          Bevestigen
        </TilburgWbcButton>
        <TilburgWbcButton slot="footer" appearance="secondary-action-button" onClick={() => setOpen(false)}>
          Annuleren
        </TilburgWbcButton>
      </TilburgWbcModal>
    </>
  );
};

export const Default: Story = {
  name: 'Default',
  render: () => (
    <ModalDemo heading="Aanvraag bevestigen">
      <TilburgWbcParagraph>
        Weet je zeker dat je de aanvraag wilt versturen? Je kunt deze daarna niet meer wijzigen.
      </TilburgWbcParagraph>
      <TilburgWbcParagraph>Je ontvangt een e-mail zodra je aanvraag in behandeling is genomen.</TilburgWbcParagraph>
    </ModalDemo>
  ),
};

export const WithLink: Story = {
  name: 'With link in content',
  render: () => (
    <ModalDemo heading="Cookie-instellingen">
      <TilburgWbcParagraph>
        Wij gebruiken alleen functionele cookies. Voor meer informatie zie ons <a href="#">privacystatement</a>.
      </TilburgWbcParagraph>
    </ModalDemo>
  ),
};
