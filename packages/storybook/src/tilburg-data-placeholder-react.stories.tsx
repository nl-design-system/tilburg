/* @license CC0-1.0 */

import { DataPlaceholder, Paragraph } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-data-placeholder.examples';

const meta = {
  title: 'Tilburg React/Data Placeholder',
  id: 'tilburg-data-placeholder-react',
  component: DataPlaceholder,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof DataPlaceholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <>
      <Paragraph>
        Naam: <DataPlaceholder />
      </Paragraph>
      <div aria-busy="true">
        <Paragraph>
          Adres: <DataPlaceholder loading />
        </Paragraph>
      </div>
    </>
  ),
};
