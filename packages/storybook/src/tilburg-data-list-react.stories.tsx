/* @license CC0-1.0 */

import { DataList, DataListItem, DataListKey, DataListValue } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, description } from '../../storybook-shared/src/tilburg-data-list.examples';

const meta = {
  title: 'Tilburg React/Data List',
  id: 'tilburg-data-list-react',
  component: DataList,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof DataList>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  { key: 'Naam', value: 'Jan Janssen' },
  { key: 'E-mailadres', value: 'jan@example.com' },
  { key: 'Postcode', value: '5038 EA' },
  { key: 'Telefoon', value: '+31 13 542 8000' },
];

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4>Default</h4>
        <DataList>
          {items.map((it) => (
            <DataListItem key={it.key}>
              <DataListKey>{it.key}</DataListKey>
              <DataListValue>{it.value}</DataListValue>
            </DataListItem>
          ))}
        </DataList>
      </div>
      <div>
        <h4>Large (3-column grid per row)</h4>
        <DataList large>
          {items.map((it) => (
            <DataListItem key={it.key}>
              <DataListKey>{it.key}</DataListKey>
              <DataListValue>{it.value}</DataListValue>
            </DataListItem>
          ))}
        </DataList>
      </div>
    </div>
  ),
};
