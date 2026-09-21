/* @license CC0-1.0 */

import {
  TilburgWebcDataList,
  TilburgWebcDataListItem,
  TilburgWebcDataListKey,
  TilburgWebcDataListValue,
} from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-data-list.examples';

/* Stencil `<tilburg-webc-data-list>` + item/key/value rendered through their
   generated React proxies. */

const meta = {
  title: 'Tilburg Web Components/Data List',
  id: 'tilburg-data-list-webc',
  component: TilburgWebcDataList,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWebcDataList>;

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
        <TilburgWebcDataList>
          {items.map((it) => (
            <TilburgWebcDataListItem key={it.key}>
              <TilburgWebcDataListKey>{it.key}</TilburgWebcDataListKey>
              <TilburgWebcDataListValue>{it.value}</TilburgWebcDataListValue>
            </TilburgWebcDataListItem>
          ))}
        </TilburgWebcDataList>
      </div>
      <div>
        <h4>Large (3-column grid per row)</h4>
        <TilburgWebcDataList large>
          {items.map((it) => (
            <TilburgWebcDataListItem key={it.key}>
              <TilburgWebcDataListKey>{it.key}</TilburgWebcDataListKey>
              <TilburgWebcDataListValue>{it.value}</TilburgWebcDataListValue>
            </TilburgWebcDataListItem>
          ))}
        </TilburgWebcDataList>
      </div>
    </div>
  ),
};
