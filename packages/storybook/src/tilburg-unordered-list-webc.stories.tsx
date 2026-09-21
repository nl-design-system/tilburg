/* @license CC0-1.0 */

import { TilburgWebcUnorderedList } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-unordered-list.examples';

/* Stencil `<tilburg-webc-unordered-list>` rendered through its generated React
   proxy. Plain `<li>` children land directly in the `<ul>`, so the
   `--html-ul > li` item styling applies without a class. */

const meta = {
  title: 'Tilburg Web Components/Unordered List',
  id: 'tilburg-unordered-list-webc',
  component: TilburgWebcUnorderedList,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWebcUnorderedList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <h4>Default</h4>
        <TilburgWebcUnorderedList>
          <li>
            In deze app staan niet de dagen waarop wij de wijkcontainers legen, alleen de huiscontainers (kliko&apos;s).
          </li>
          <li>Je kunt je afval gescheiden aanbieden via de kliko of de milieustraat.</li>
          <li>Op feestdagen kan de ophaaldag verschuiven; controleer de afvalkalender.</li>
        </TilburgWebcUnorderedList>
      </div>
      <div>
        <h4>Nested</h4>
        <TilburgWebcUnorderedList>
          <li>
            Aanvragen
            <TilburgWebcUnorderedList>
              <li>Vergunningen</li>
              <li>Subsidies</li>
            </TilburgWebcUnorderedList>
          </li>
          <li>Contact</li>
        </TilburgWebcUnorderedList>
      </div>
    </div>
  ),
};
