/* @license CC0-1.0 */

import { TilburgWbcImage } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-image.examples';

/* Stencil `<tilburg-wbc-image>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Image',
  id: 'tilburg-image-wbc',
  component: TilburgWbcImage,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <>
      <TilburgWbcImage src="logo.svg" alt="Logo van Gemeente Tilburg" width={240} />
      <div style={{ maxWidth: '12rem' }}>
        <TilburgWbcImage src="logo.svg" alt="Logo van Gemeente Tilburg" width={480} photo />
      </div>
      <TilburgWbcImage src="favicon.svg" alt="" width={48} height={48} />
    </>
  ),
};
