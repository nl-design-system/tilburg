/* @license CC0-1.0 */

import { TilburgSpotlightSection } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-spotlight-section.examples';

const meta: Meta<TilburgSpotlightSection> = {
  title: 'Tilburg Angular/Spotlight Section',
  id: 'tilburg-spotlight-section-angular',
  component: TilburgSpotlightSection,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgSpotlightSection>;

export const Default: Story = {
  name: 'Default',
  render: () => ({
    template: `
      <tilburg-spotlight-section>
        <tilburg-paragraph>Je kunt je afspraak tot 24 uur van tevoren kosteloos verzetten of annuleren.</tilburg-paragraph>
      </tilburg-spotlight-section>
    `,
  }),
};

export const AllVariants: Story = {
  name: 'All variants',
  render: () => ({
    template: `
      <div style="display:grid;gap:1rem">
        <tilburg-spotlight-section variant="info">
          <tilburg-paragraph>Neem een geldig identiteitsbewijs mee naar je afspraak in het Stadskantoor.</tilburg-paragraph>
        </tilburg-spotlight-section>
        <tilburg-spotlight-section variant="success">
          <tilburg-paragraph>Je melding is ontvangen. Binnen 5 werkdagen hoor je wat we ermee doen.</tilburg-paragraph>
        </tilburg-spotlight-section>
        <tilburg-spotlight-section variant="warning">
          <tilburg-paragraph>Vraag je paspoort uiterlijk 6 weken voor vertrek aan. In de zomer is het druk.</tilburg-paragraph>
        </tilburg-spotlight-section>
        <tilburg-spotlight-section variant="danger">
          <tilburg-paragraph>Let op: na 1 juli kun je geen bezwaar meer maken tegen deze aanslag.</tilburg-paragraph>
        </tilburg-spotlight-section>
        <tilburg-spotlight-section variant="info" [aside]="true" ariaLabel="Tip">
          <tilburg-paragraph>Tip: met DigiD regel je de meeste zaken direct online.</tilburg-paragraph>
        </tilburg-spotlight-section>
      </div>
    `,
  }),
};
