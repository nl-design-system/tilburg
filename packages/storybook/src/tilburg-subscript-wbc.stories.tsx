/* @license CC0-1.0 */

import { TilburgWbcSubscript } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-subscript.examples';

/* Stencil `<tilburg-wbc-subscript>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Subscript',
  id: 'tilburg-subscript-wbc',
  component: TilburgWbcSubscript,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcSubscript>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <p className="utrecht-paragraph">
      Tilburg wil de uitstoot van CO<TilburgWbcSubscript>2</TilburgWbcSubscript> in 2030 met de helft verminderen.
    </p>
  ),
};

export const OpenType: Story = {
  name: 'OpenType glyphs',
  render: () => (
    <p className="utrecht-paragraph">
      Tilburg wil de uitstoot van CO<TilburgWbcSubscript openType>2</TilburgWbcSubscript> in 2030 met de helft
      verminderen.
    </p>
  ),
};
