/* @license CC0-1.0 */

import { TilburgWbcNote, TilburgWbcParagraph } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-note.examples';

/* Stencil `<tilburg-wbc-note>` rendered through its generated React proxy. */

const meta = {
  title: 'Tilburg Web Components/Note',
  id: 'tilburg-note-wbc',
  component: TilburgWbcNote,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcNote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <TilburgWbcNote {...args}>
      <TilburgWbcParagraph>Het Stadskantoor is op Koningsdag gesloten.</TilburgWbcParagraph>
    </TilburgWbcNote>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <TilburgWbcNote variant="info">
        <TilburgWbcParagraph>Neem een geldig identiteitsbewijs mee naar je afspraak.</TilburgWbcParagraph>
      </TilburgWbcNote>
      <TilburgWbcNote variant="success">
        <TilburgWbcParagraph>
          Je hoeft niets te doen: we verlengen je parkeervergunning automatisch.
        </TilburgWbcParagraph>
      </TilburgWbcNote>
      <TilburgWbcNote variant="warning">
        <TilburgWbcParagraph>
          Je rijbewijs verloopt binnenkort. Vraag op tijd een nieuw rijbewijs aan.
        </TilburgWbcParagraph>
      </TilburgWbcNote>
      <TilburgWbcNote variant="danger">
        <TilburgWbcParagraph>
          Betaal de aanslag voor 31 maart, anders ontvang je een aanmaning met extra kosten.
        </TilburgWbcParagraph>
      </TilburgWbcNote>
      <TilburgWbcNote variant="info" aside aria-labelledby="note-wbc-heading">
        <h3 className="utrecht-heading-3" id="note-wbc-heading">
          Goed om te weten
        </h3>
        <TilburgWbcParagraph>
          Woon je korter dan 3 jaar in Tilburg? Dan heb je een verklaring van je vorige gemeente nodig.
        </TilburgWbcParagraph>
      </TilburgWbcNote>
    </div>
  ),
};
