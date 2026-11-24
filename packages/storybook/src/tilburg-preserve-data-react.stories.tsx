/* @license CC0-1.0 */

import { Paragraph, PreserveData } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-preserve-data.examples';

const meta = {
  title: 'Tilburg React/Preserve Data',
  id: 'tilburg-preserve-data-react',
  component: PreserveData,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof PreserveData>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <>
      <Paragraph>
        Uw naam: <PreserveData>J. de Vries</PreserveData>
      </Paragraph>
      <Paragraph>
        Postcode: <PreserveData value="5038 AB">5038 AB</PreserveData>
      </Paragraph>
      <Paragraph>
        Geboortedatum: <PreserveData dateTime="2026-05-19">19 mei 2026</PreserveData>
      </Paragraph>
    </>
  ),
};
