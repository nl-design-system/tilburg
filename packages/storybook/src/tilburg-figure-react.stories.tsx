/* @license CC0-1.0 */

import { Figure, Image } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-figure.examples';

const meta = {
  title: 'Tilburg React/Figure',
  id: 'tilburg-figure-react',
  component: Figure,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof Figure>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <>
      <Figure caption="Het logo van Gemeente Tilburg.">
        <Image src="logo.svg" alt="Logo van Gemeente Tilburg" width={240} />
      </Figure>
      <Figure>
        <Image src="logo.svg" alt="Logo van Gemeente Tilburg" width={240} />
      </Figure>
    </>
  ),
};
