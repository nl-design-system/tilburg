/* @license CC0-1.0 */

import { Button, Modal, Paragraph } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { type ReactNode, useState } from 'react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-modal.examples';

const meta = {
  title: 'Tilburg React/Modal',
  id: 'tilburg-modal-react',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

/* Same content as the HTML/CSS reference examples, behind a trigger button:
   a modal that opens by itself would stack on the autodocs page. */
const ModalDemo = ({ title, children }: { title: string; children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button appearance="primary-action-button" onClick={() => setOpen(true)}>
        Open modal
      </Button>
      <Modal
        title={title}
        open={open}
        onClose={() => setOpen(false)}
        footer={
          <>
            <Button appearance="primary-action-button" onClick={() => setOpen(false)}>
              Bevestigen
            </Button>
            <Button appearance="secondary-action-button" onClick={() => setOpen(false)}>
              Annuleren
            </Button>
          </>
        }
      >
        {children}
      </Modal>
    </>
  );
};

export const Default: Story = {
  name: 'Default',
  args: { title: 'Aanvraag bevestigen' },
  render: () => (
    <ModalDemo title="Aanvraag bevestigen">
      <Paragraph>Weet je zeker dat je de aanvraag wilt versturen? Je kunt deze daarna niet meer wijzigen.</Paragraph>
      <Paragraph>Je ontvangt een e-mail zodra je aanvraag in behandeling is genomen.</Paragraph>
    </ModalDemo>
  ),
};

export const WithLink: Story = {
  name: 'With link in content',
  args: { title: 'Cookie-instellingen' },
  render: () => (
    <ModalDemo title="Cookie-instellingen">
      <Paragraph>
        Wij gebruiken alleen functionele cookies. Voor meer informatie zie ons <a href="#">privacystatement</a>.
      </Paragraph>
    </ModalDemo>
  ),
};
