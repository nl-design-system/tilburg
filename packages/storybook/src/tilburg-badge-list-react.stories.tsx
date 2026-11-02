/* @license CC0-1.0 */

import { BadgeList, DataBadge } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-badge-list.examples';

const meta = {
  title: 'Tilburg React/Badge List',
  id: 'tilburg-badge-list-react',
  component: BadgeList,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof BadgeList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <BadgeList>
      <DataBadge>Parkeren</DataBadge>
      <DataBadge>Afval</DataBadge>
      <DataBadge>Paspoort en ID-kaart</DataBadge>
      <DataBadge>Verhuizen</DataBadge>
    </BadgeList>
  ),
};
