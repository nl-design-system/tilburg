/* @license CC0-1.0 */

import { TilburgWbcUnorderedList } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-unordered-list.examples';

/* Stencil `<tilburg-wbc-unordered-list>` rendered through its generated React
   proxy. Plain `<li>` children land directly in the `<ul>`, so the
   `--html-ul > li` item styling applies without a class. */

const meta = {
  title: 'Tilburg Web Components/Unordered List',
  id: 'tilburg-unordered-list-wbc',
  component: TilburgWbcUnorderedList,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcUnorderedList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <h4>Default</h4>
        <TilburgWbcUnorderedList>
          <li>
            In deze app staan niet de dagen waarop wij de wijkcontainers legen, alleen de huiscontainers (kliko&apos;s).
          </li>
          <li>Je kunt je afval gescheiden aanbieden via de kliko of de milieustraat.</li>
          <li>Op feestdagen kan de ophaaldag verschuiven; controleer de afvalkalender.</li>
        </TilburgWbcUnorderedList>
      </div>
      <div>
        <h4>Nested</h4>
        <TilburgWbcUnorderedList>
          <li>
            Aanvragen
            <TilburgWbcUnorderedList>
              <li>Vergunningen</li>
              <li>Subsidies</li>
            </TilburgWbcUnorderedList>
          </li>
          <li>Contact</li>
        </TilburgWbcUnorderedList>
      </div>
    </div>
  ),
};
