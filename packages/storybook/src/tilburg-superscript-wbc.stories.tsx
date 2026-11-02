/* @license CC0-1.0 */

import { TilburgWbcSuperscript } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-superscript.examples';

/* Stencil `<tilburg-wbc-superscript>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Superscript',
  id: 'tilburg-superscript-wbc',
  component: TilburgWbcSuperscript,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcSuperscript>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <p className="utrecht-paragraph">
      Een dakkapel aan de achterkant tot 4 m<TilburgWbcSuperscript>2</TilburgWbcSuperscript> is meestal vergunningvrij.
    </p>
  ),
};

export const OpenType: Story = {
  name: 'OpenType glyphs',
  render: () => (
    <p className="utrecht-paragraph">
      Een dakkapel aan de achterkant tot 4 m<TilburgWbcSuperscript openType>2</TilburgWbcSuperscript> is meestal
      vergunningvrij.
    </p>
  ),
};
