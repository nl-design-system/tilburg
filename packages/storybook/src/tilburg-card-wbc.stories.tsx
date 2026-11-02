/* @license CC0-1.0 */

import { TilburgWbcCard, TilburgWbcParagraph } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { bugs, cardImageSrc, descriptionWebComponents } from '../../storybook-shared/src/tilburg-card.examples';

/* Stencil `<tilburg-wbc-card>` rendered through its generated React proxy. */

const meta = {
  title: 'Tilburg Web Components/Card',
  id: 'tilburg-card-wbc',
  component: TilburgWbcCard,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const Frame = ({ children }: { children: ReactNode }) => <div style={{ maxInlineSize: '22rem' }}>{children}</div>;

export const Default: Story = {
  args: { heading: 'Openingstijden Stadskantoor' },
  render: (args) => (
    <Frame>
      <TilburgWbcCard {...args}>
        <TilburgWbcParagraph>
          Maandag tot en met vrijdag van 9.00 tot 17.00 uur, alleen op afspraak.
        </TilburgWbcParagraph>
      </TilburgWbcCard>
    </Frame>
  ),
};

export const WithLink: Story = {
  name: 'With link',
  args: { heading: 'Afval en containers', href: '#' },
  render: (args) => (
    <Frame>
      <TilburgWbcCard {...args}>
        <TilburgWbcParagraph>
          Wanneer wordt je afval opgehaald, en waar breng je grof afval naartoe?
        </TilburgWbcParagraph>
      </TilburgWbcCard>
    </Frame>
  ),
};

export const WithImage: Story = {
  name: 'With image and link',
  args: { heading: 'Parkeren in de binnenstad', href: '#' },
  render: (args) => (
    <Frame>
      <TilburgWbcCard {...args}>
        <img slot="image" src={cardImageSrc} alt="" />
        <TilburgWbcParagraph>
          Vraag een parkeervergunning aan of bekijk waar je met je auto terechtkunt.
        </TilburgWbcParagraph>
      </TilburgWbcCard>
    </Frame>
  ),
};
