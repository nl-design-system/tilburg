/* @license CC0-1.0 */

import {
  TilburgWbcDataList,
  TilburgWbcDataListItem,
  TilburgWbcDataListKey,
  TilburgWbcDataListValue,
} from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-data-list.examples';

/* Stencil `<tilburg-wbc-data-list>` + item/key/value rendered through their
   generated React proxies. */

const meta = {
  title: 'Tilburg Web Components/Data List',
  id: 'tilburg-data-list-wbc',
  component: TilburgWbcDataList,
  tags: ['autodocs', 'tilburg'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcDataList>;

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
        <TilburgWbcDataList>
          {items.map((it) => (
            <TilburgWbcDataListItem key={it.key}>
              <TilburgWbcDataListKey>{it.key}</TilburgWbcDataListKey>
              <TilburgWbcDataListValue>{it.value}</TilburgWbcDataListValue>
            </TilburgWbcDataListItem>
          ))}
        </TilburgWbcDataList>
      </div>
      <div>
        <h4>Large (3-column grid per row)</h4>
        <TilburgWbcDataList large>
          {items.map((it) => (
            <TilburgWbcDataListItem key={it.key}>
              <TilburgWbcDataListKey>{it.key}</TilburgWbcDataListKey>
              <TilburgWbcDataListValue>{it.value}</TilburgWbcDataListValue>
            </TilburgWbcDataListItem>
          ))}
        </TilburgWbcDataList>
      </div>
    </div>
  ),
};
