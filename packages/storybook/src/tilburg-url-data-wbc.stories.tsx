/* @license CC0-1.0 */

import { TilburgWbcUrlData } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-url-data.examples';

/* Stencil `<tilburg-wbc-url-data>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/URL Data',
  id: 'tilburg-url-data-wbc',
  component: TilburgWbcUrlData,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcUrlData>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ maxInlineSize: '16rem' }}>
      <p className="utrecht-paragraph">
        Kijk op <TilburgWbcUrlData>https://www.tilburg.nl/afval</TilburgWbcUrlData> voor de afvalkalender.
      </p>
      <p className="utrecht-paragraph">
        Uw aanvraag volgen:{' '}
        <TilburgWbcUrlData>
          https://www.tilburg.nl/inwoners/mijn-tilburg/aanvragen/status?zaak=ZAAK-2026-004211
        </TilburgWbcUrlData>
      </p>
    </div>
  ),
};
