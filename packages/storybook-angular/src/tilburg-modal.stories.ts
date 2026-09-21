/* @license CC0-1.0 */

import { TilburgModal } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-modal.examples';

const meta: Meta<TilburgModal> = {
  title: 'Tilburg Angular/Modal',
  id: 'tilburg-modal-angular',
  component: TilburgModal,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgModal>;

/* Same content as the HTML/CSS reference examples, behind a trigger button:
   a modal that opens by itself would stack on the autodocs page. */
const footer = `
  <tilburg-button slot="footer" appearance="primary-action-button" (click)="open = false">Bevestigen</tilburg-button>
  <tilburg-button slot="footer" appearance="secondary-action-button" (click)="open = false">Annuleren</tilburg-button>`;

export const Default: Story = {
  name: 'Default',
  args: { title: 'Aanvraag bevestigen' },
  render: (args) => ({
    props: { ...args, open: false },
    template: `
      <tilburg-button appearance="primary-action-button" (click)="open = true">Open modal</tilburg-button>
      <tilburg-modal [title]="title" [open]="open" (closed)="open = false">
        <tilburg-paragraph>Weet je zeker dat je de aanvraag wilt versturen? Je kunt deze daarna niet meer wijzigen.</tilburg-paragraph>
        <tilburg-paragraph>Je ontvangt een e-mail zodra je aanvraag in behandeling is genomen.</tilburg-paragraph>
        ${footer}
      </tilburg-modal>`,
  }),
};

export const WithLink: Story = {
  name: 'With link in content',
  args: { title: 'Cookie-instellingen' },
  render: (args) => ({
    props: { ...args, open: false },
    template: `
      <tilburg-button appearance="primary-action-button" (click)="open = true">Open modal</tilburg-button>
      <tilburg-modal [title]="title" [open]="open" (closed)="open = false">
        <tilburg-paragraph>Wij gebruiken alleen functionele cookies. Voor meer informatie zie ons <a href="#">privacystatement</a>.</tilburg-paragraph>
        ${footer}
      </tilburg-modal>`,
  }),
};
