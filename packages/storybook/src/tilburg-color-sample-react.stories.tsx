/* @license CC0-1.0 */

import { ColorSample, Paragraph } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-color-sample.examples';

const meta = {
  title: 'Tilburg React/Color Sample',
  id: 'tilburg-color-sample-react',
  component: ColorSample,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof ColorSample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <>
      <Paragraph>
        <ColorSample color="#00a4db" /> Blauw, hoog water
      </Paragraph>
      <Paragraph>
        <ColorSample color="#ffd800" /> Geel, laag water
      </Paragraph>
      <Paragraph>
        <ColorSample color="#008a6a" /> Groen, normaal peil
      </Paragraph>
    </>
  ),
};
