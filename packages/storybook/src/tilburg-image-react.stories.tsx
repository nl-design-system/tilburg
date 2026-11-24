/* @license CC0-1.0 */

import { Image } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-image.examples';

const meta = {
  title: 'Tilburg React/Image',
  id: 'tilburg-image-react',
  component: Image,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <>
      <Image src="logo.svg" alt="Logo van Gemeente Tilburg" width={240} />
      <div style={{ maxWidth: '12rem' }}>
        <Image src="logo.svg" alt="Logo van Gemeente Tilburg" width={480} photo />
      </div>
      <Image src="favicon.svg" alt="" width={48} height={48} />
    </>
  ),
};
