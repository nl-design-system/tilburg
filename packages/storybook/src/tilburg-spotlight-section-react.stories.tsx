/* @license CC0-1.0 */

import { Paragraph, SpotlightSection } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-spotlight-section.examples';

const meta = {
  title: 'Tilburg React/Spotlight Section',
  id: 'tilburg-spotlight-section-react',
  component: SpotlightSection,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: [undefined, 'info', 'success', 'warning', 'danger'] },
  },
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof SpotlightSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <SpotlightSection {...args}>
      <Paragraph>Je kunt je afspraak tot 24 uur van tevoren kosteloos verzetten of annuleren.</Paragraph>
    </SpotlightSection>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <SpotlightSection variant="info">
        <Paragraph>Neem een geldig identiteitsbewijs mee naar je afspraak in het Stadskantoor.</Paragraph>
      </SpotlightSection>
      <SpotlightSection variant="success">
        <Paragraph>Je melding is ontvangen. Binnen 5 werkdagen hoor je wat we ermee doen.</Paragraph>
      </SpotlightSection>
      <SpotlightSection variant="warning">
        <Paragraph>Vraag je paspoort uiterlijk 6 weken voor vertrek aan. In de zomer is het druk.</Paragraph>
      </SpotlightSection>
      <SpotlightSection variant="danger">
        <Paragraph>Let op: na 1 juli kun je geen bezwaar meer maken tegen deze aanslag.</Paragraph>
      </SpotlightSection>
      <SpotlightSection variant="info" aside aria-label="Tip">
        <Paragraph>Tip: met DigiD regel je de meeste zaken direct online.</Paragraph>
      </SpotlightSection>
    </div>
  ),
};
