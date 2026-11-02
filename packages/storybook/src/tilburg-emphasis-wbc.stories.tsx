/* @license CC0-1.0 */

import { TilburgWbcEmphasis } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-emphasis.examples';

/* Stencil `<tilburg-wbc-emphasis>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Emphasis',
  id: 'tilburg-emphasis-wbc',
  component: TilburgWbcEmphasis,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcEmphasis>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Stressed: Story = {
  name: 'Stressed (em)',
  render: () => (
    <p className="utrecht-paragraph">
      Je kunt je aanvraag <TilburgWbcEmphasis>niet</TilburgWbcEmphasis> meer wijzigen nadat je hem hebt verstuurd.
    </p>
  ),
};

export const Strong: Story = {
  render: () => (
    <p className="utrecht-paragraph">
      Je afspraak staat vast. <TilburgWbcEmphasis strong>Neem je identiteitsbewijs mee</TilburgWbcEmphasis>, anders
      kunnen we je niet helpen.
    </p>
  ),
};
