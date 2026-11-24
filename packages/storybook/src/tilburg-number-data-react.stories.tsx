/* @license CC0-1.0 */

import { NumberData, Paragraph } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-number-data.examples';

const meta = {
  title: 'Tilburg React/Number Data',
  id: 'tilburg-number-data-react',
  component: NumberData,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof NumberData>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div lang="nl">
      <Paragraph>
        Aantal inwoners van Tilburg: <NumberData value={226000}>226.000</NumberData>
      </Paragraph>
      <Paragraph>
        Groei ten opzichte van vorig jaar:{' '}
        <NumberData value="1.8" variant="positive">
          +1,8%
        </NumberData>
      </Paragraph>
      <Paragraph>
        Verandering in restafval per inwoner:{' '}
        <NumberData value="-12.4" variant="negative">
          −12,4 kg
        </NumberData>
      </Paragraph>
    </div>
  ),
};
