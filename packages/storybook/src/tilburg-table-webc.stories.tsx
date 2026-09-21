/* @license CC0-1.0 */

import { TilburgWebcTable } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-table.examples';

/* Stencil `<tilburg-webc-table>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). There are no row/cell custom elements (the HTML
   parser would hoist them out of the table): the component decorates a native
   `<table>` child, or renders one from `columns`/`rows`. */

const meta = {
  title: 'Tilburg Web Components/Table',
  id: 'tilburg-table-webc',
  component: TilburgWebcTable,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWebcTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const rows = [
  { name: 'Jan Janssen', city: 'Tilburg', code: '5038 EA' },
  { name: 'Anne de Vries', city: 'Tilburg', code: '5046 BC' },
  { name: 'Pieter Bakker', city: 'Tilburg', code: '5025 LJ' },
];

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4>Met caption-prop</h4>
        <TilburgWebcTable caption="Inwoners van Tilburg">
          <table>
            <thead>
              <tr>
                <th scope="col">Naam</th>
                <th scope="col">Woonplaats</th>
                <th scope="col">Postcode</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.name}>
                  <td>{r.name}</td>
                  <td>{r.city}</td>
                  <td>{r.code}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TilburgWebcTable>
      </div>
      <div>
        <h4>Met eigen caption + footer</h4>
        <TilburgWebcTable>
          <table>
            <caption>Inwoners (met footer-totaal)</caption>
            <thead>
              <tr>
                <th scope="col">Naam</th>
                <th scope="col">Postcode</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.name}>
                  <td>{r.name}</td>
                  <td>{r.code}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2}>{rows.length} rijen</td>
              </tr>
            </tfoot>
          </table>
        </TilburgWebcTable>
      </div>
      <div>
        <h4>Header met row-scope</h4>
        <TilburgWebcTable>
          <table>
            <tbody>
              {rows.map((r) => (
                <tr key={r.name}>
                  <th scope="row">{r.name}</th>
                  <td>{r.city}</td>
                  <td>{r.code}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TilburgWebcTable>
      </div>
      <div>
        <h4>Data-modus (columns / rows / footerRows)</h4>
        <TilburgWebcTable
          caption="Inwoners (data-modus)"
          columns={[
            { key: 'name', label: 'Naam', rowHeader: true },
            { key: 'city', label: 'Woonplaats' },
            { key: 'code', label: 'Postcode' },
          ]}
          rows={rows}
          footerRows={[{ name: 'Totaal', city: '', code: `${rows.length} rijen` }]}
        />
      </div>
    </div>
  ),
};
