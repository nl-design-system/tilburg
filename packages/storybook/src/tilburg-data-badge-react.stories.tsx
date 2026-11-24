/* @license CC0-1.0 */

import { DataBadge, Paragraph } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-data-badge.examples';

const meta = {
  title: 'Tilburg React/Data Badge',
  id: 'tilburg-data-badge-react',
  component: DataBadge,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof DataBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <>
      <Paragraph>
        Kenmerken van de woning: <DataBadge>Energielabel A</DataBadge> <DataBadge>Tuin op het zuiden</DataBadge>
      </Paragraph>
      <Paragraph>
        Perceeloppervlakte: <DataBadge value="259">≥ 250㎡</DataBadge>
      </Paragraph>
      <Paragraph>
        Uw afspraak: <DataBadge dateTime="2026-12-24">24 december 2026</DataBadge>, duur{' '}
        <DataBadge dateTime="PT30M">30 minuten</DataBadge>
      </Paragraph>
    </>
  ),
};
