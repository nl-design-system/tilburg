/* @license CC0-1.0 */

import { TilburgWbcCode } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-code.examples';

/* Stencil `<tilburg-wbc-code>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Code',
  id: 'tilburg-code-wbc',
  component: TilburgWbcCode,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcCode>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <p className="utrecht-paragraph">
      Upload je bestand als <TilburgWbcCode>.pdf</TilburgWbcCode> of <TilburgWbcCode>.jpg</TilburgWbcCode>, maximaal 10
      MB.
    </p>
  ),
};
