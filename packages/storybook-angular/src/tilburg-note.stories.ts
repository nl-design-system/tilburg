/* @license CC0-1.0 */

import { TilburgNote } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-note.examples';

const meta: Meta<TilburgNote> = {
  title: 'Tilburg Angular/Note',
  id: 'tilburg-note-angular',
  component: TilburgNote,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgNote>;

export const Default: Story = {
  name: 'Default',
  render: () => ({
    template: `
      <tilburg-note>
        <tilburg-paragraph>Het Stadskantoor is op Koningsdag gesloten.</tilburg-paragraph>
      </tilburg-note>
    `,
  }),
};

export const AllVariants: Story = {
  name: 'All variants',
  render: () => ({
    template: `
      <div style="display:grid;gap:1rem">
        <tilburg-note variant="info">
          <tilburg-paragraph>Neem een geldig identiteitsbewijs mee naar je afspraak.</tilburg-paragraph>
        </tilburg-note>
        <tilburg-note variant="success">
          <tilburg-paragraph>Je hoeft niets te doen: we verlengen je parkeervergunning automatisch.</tilburg-paragraph>
        </tilburg-note>
        <tilburg-note variant="warning">
          <tilburg-paragraph>Je rijbewijs verloopt binnenkort. Vraag op tijd een nieuw rijbewijs aan.</tilburg-paragraph>
        </tilburg-note>
        <tilburg-note variant="danger">
          <tilburg-paragraph>Betaal de aanslag voor 31 maart, anders ontvang je een aanmaning met extra kosten.</tilburg-paragraph>
        </tilburg-note>
        <tilburg-note variant="info" [aside]="true" ariaLabelledBy="note-angular-heading">
          <h3 class="utrecht-heading-3" id="note-angular-heading">Goed om te weten</h3>
          <tilburg-paragraph>Woon je korter dan 3 jaar in Tilburg? Dan heb je een verklaring van je vorige gemeente nodig.</tilburg-paragraph>
        </tilburg-note>
      </div>
    `,
  }),
};
