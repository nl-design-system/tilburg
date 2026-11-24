/* @license CC0-1.0 */

import { Heading3, Note, Paragraph } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-note.examples';

const meta = {
  title: 'Tilburg React/Note',
  id: 'tilburg-note-react',
  component: Note,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: [undefined, 'info', 'success', 'warning', 'danger'] },
  },
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof Note>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Note {...args}>
      <Paragraph>Het Stadskantoor is op Koningsdag gesloten.</Paragraph>
    </Note>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <Note variant="info">
        <Paragraph>Neem een geldig identiteitsbewijs mee naar je afspraak.</Paragraph>
      </Note>
      <Note variant="success">
        <Paragraph>Je hoeft niets te doen: we verlengen je parkeervergunning automatisch.</Paragraph>
      </Note>
      <Note variant="warning">
        <Paragraph>Je rijbewijs verloopt binnenkort. Vraag op tijd een nieuw rijbewijs aan.</Paragraph>
      </Note>
      <Note variant="danger">
        <Paragraph>Betaal de aanslag voor 31 maart, anders ontvang je een aanmaning met extra kosten.</Paragraph>
      </Note>
      <Note variant="info" aside aria-labelledby="note-react-heading">
        <Heading3 id="note-react-heading">Goed om te weten</Heading3>
        <Paragraph>
          Woon je korter dan 3 jaar in Tilburg? Dan heb je een verklaring van je vorige gemeente nodig.
        </Paragraph>
      </Note>
    </div>
  ),
};
