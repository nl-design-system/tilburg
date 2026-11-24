/* @license CC0-1.0 */

import { TilburgWbcMark } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-mark.examples';

/* Stencil `<tilburg-wbc-mark>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Mark',
  id: 'tilburg-mark-wbc',
  component: TilburgWbcMark,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcMark>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <p className="utrecht-paragraph">
      Openingstijden <TilburgWbcMark>Stadswinkel</TilburgWbcMark> Stadhuisplein: maandag tot en met vrijdag van 9.00 tot
      17.00 uur.
    </p>
  ),
};
