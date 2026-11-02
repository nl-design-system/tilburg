/* @license CC0-1.0 */

import { TilburgWbcParagraph, TilburgWbcSpotlightSection } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-spotlight-section.examples';

/* Stencil `<tilburg-wbc-spotlight-section>` rendered through its generated React proxy. */

const meta = {
  title: 'Tilburg Web Components/Spotlight Section',
  id: 'tilburg-spotlight-section-wbc',
  component: TilburgWbcSpotlightSection,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcSpotlightSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <TilburgWbcSpotlightSection {...args}>
      <TilburgWbcParagraph>
        Je kunt je afspraak tot 24 uur van tevoren kosteloos verzetten of annuleren.
      </TilburgWbcParagraph>
    </TilburgWbcSpotlightSection>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <TilburgWbcSpotlightSection variant="info">
        <TilburgWbcParagraph>
          Neem een geldig identiteitsbewijs mee naar je afspraak in het Stadskantoor.
        </TilburgWbcParagraph>
      </TilburgWbcSpotlightSection>
      <TilburgWbcSpotlightSection variant="success">
        <TilburgWbcParagraph>
          Je melding is ontvangen. Binnen 5 werkdagen hoor je wat we ermee doen.
        </TilburgWbcParagraph>
      </TilburgWbcSpotlightSection>
      <TilburgWbcSpotlightSection variant="warning">
        <TilburgWbcParagraph>
          Vraag je paspoort uiterlijk 6 weken voor vertrek aan. In de zomer is het druk.
        </TilburgWbcParagraph>
      </TilburgWbcSpotlightSection>
      <TilburgWbcSpotlightSection variant="danger">
        <TilburgWbcParagraph>Let op: na 1 juli kun je geen bezwaar meer maken tegen deze aanslag.</TilburgWbcParagraph>
      </TilburgWbcSpotlightSection>
      <TilburgWbcSpotlightSection variant="info" aside aria-label="Tip">
        <TilburgWbcParagraph>Tip: met DigiD regel je de meeste zaken direct online.</TilburgWbcParagraph>
      </TilburgWbcSpotlightSection>
    </div>
  ),
};
