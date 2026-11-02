/* @license CC0-1.0 */

import { Card, Paragraph } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, cardImageSrc, descriptionReact } from '../../storybook-shared/src/tilburg-card.examples';

const meta = {
  title: 'Tilburg React/Card',
  id: 'tilburg-card-react',
  component: Card,
  tags: ['autodocs'],
  args: { heading: 'Openingstijden Stadskantoor' },
  decorators: [(Story) => <div style={{ maxInlineSize: '22rem' }}>{Story()}</div>],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <Paragraph>Maandag tot en met vrijdag van 9.00 tot 17.00 uur, alleen op afspraak.</Paragraph>
    </Card>
  ),
};

export const WithLink: Story = {
  name: 'With link',
  args: { heading: 'Afval en containers', href: '#' },
  render: (args) => (
    <Card {...args}>
      <Paragraph>Wanneer wordt je afval opgehaald, en waar breng je grof afval naartoe?</Paragraph>
    </Card>
  ),
};

export const WithImage: Story = {
  name: 'With image and link',
  args: { heading: 'Parkeren in de binnenstad', href: '#' },
  render: (args) => (
    <Card {...args} image={<img src={cardImageSrc} alt="" />}>
      <Paragraph>Vraag een parkeervergunning aan of bekijk waar je met je auto terechtkunt.</Paragraph>
    </Card>
  ),
};
