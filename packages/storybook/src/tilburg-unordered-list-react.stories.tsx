/* @license CC0-1.0 */

import { UnorderedList } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-unordered-list.examples';

const meta = {
  title: 'Tilburg React/Unordered List',
  id: 'tilburg-unordered-list-react',
  component: UnorderedList,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof UnorderedList>;

export default meta;
type Story = StoryObj<typeof meta>;

/* Plain `<li>` children. `UnorderedList` emits `utrecht-unordered-list--html-ul`,
   and the CSS layer styles `--html-ul > li` identically to an explicit
   `.utrecht-unordered-list__item`, so item spacing, the `1ch` inline padding and
   the Tilburg marker colour apply without the consumer adding any class. */
export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <h4>Default</h4>
        <UnorderedList>
          <li>
            In deze app staan niet de dagen waarop wij de wijkcontainers legen, alleen de huiscontainers (kliko&apos;s).
          </li>
          <li>Je kunt je afval gescheiden aanbieden via de kliko of de milieustraat.</li>
          <li>Op feestdagen kan de ophaaldag verschuiven; controleer de afvalkalender.</li>
        </UnorderedList>
      </div>
      <div>
        <h4>Nested</h4>
        <UnorderedList>
          <li>
            Aanvragen
            <UnorderedList>
              <li>Vergunningen</li>
              <li>Subsidies</li>
            </UnorderedList>
          </li>
          <li>Contact</li>
        </UnorderedList>
      </div>
    </div>
  ),
};
