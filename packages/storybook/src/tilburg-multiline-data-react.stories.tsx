/* @license CC0-1.0 */

import { MultilineData } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-multiline-data.examples';

const meta = {
  title: 'Tilburg React/Multiline Data',
  id: 'tilburg-multiline-data-react',
  component: MultilineData,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof MultilineData>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => <MultilineData>{'Gemeente Tilburg\nStadhuisplein 130\n5038 TC Tilburg'}</MultilineData>,
};
