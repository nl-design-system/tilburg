/* @license CC0-1.0 */

import { TilburgTable } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-table.examples';

const meta: Meta<TilburgTable> = {
  title: 'Tilburg Angular/Table',
  id: 'tilburg-table-angular',
  component: TilburgTable,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgTable>;

export const Default: Story = {
  name: 'Default — striped body',
  render: () => ({
    template: `
      <tilburg-table style="min-width:32rem;display:table">
        <thead tilburg-table-header>
          <tr tilburg-table-row>
            <th tilburg-table-header-cell scope="col">Zaaknummer</th>
            <th tilburg-table-header-cell scope="col">Status</th>
            <th tilburg-table-header-cell scope="col">Datum</th>
          </tr>
        </thead>
        <tbody tilburg-table-body>
          <tr tilburg-table-row>
            <td tilburg-table-cell>2025-TLB-001234</td>
            <td tilburg-table-cell>In behandeling</td>
            <td tilburg-table-cell>15-03-2025</td>
          </tr>
          <tr tilburg-table-row>
            <td tilburg-table-cell>2025-TLB-001235</td>
            <td tilburg-table-cell>Goedgekeurd</td>
            <td tilburg-table-cell>12-03-2025</td>
          </tr>
          <tr tilburg-table-row>
            <td tilburg-table-cell>2025-TLB-001236</td>
            <td tilburg-table-cell>Afgewezen</td>
            <td tilburg-table-cell>10-03-2025</td>
          </tr>
          <tr tilburg-table-row>
            <td tilburg-table-cell>2025-TLB-001237</td>
            <td tilburg-table-cell>In behandeling</td>
            <td tilburg-table-cell>08-03-2025</td>
          </tr>
          <tr tilburg-table-row>
            <td tilburg-table-cell>2025-TLB-001238</td>
            <td tilburg-table-cell>Goedgekeurd</td>
            <td tilburg-table-cell>04-03-2025</td>
          </tr>
        </tbody>
      </tilburg-table>
    `,
  }),
};

export const WithCaptionAndFooter: Story = {
  name: 'With caption + footer (totals row)',
  render: () => ({
    template: `
      <tilburg-table caption="Aanvragen per maand" style="min-width:32rem;display:table">
        <thead tilburg-table-header>
          <tr tilburg-table-row>
            <th tilburg-table-header-cell scope="col">Maand</th>
            <th tilburg-table-header-cell scope="col">Aanvragen</th>
          </tr>
        </thead>
        <tbody tilburg-table-body>
          <tr tilburg-table-row>
            <td tilburg-table-cell>Januari</td>
            <td tilburg-table-cell>23</td>
          </tr>
          <tr tilburg-table-row>
            <td tilburg-table-cell>Februari</td>
            <td tilburg-table-cell>31</td>
          </tr>
          <tr tilburg-table-row>
            <td tilburg-table-cell>Maart</td>
            <td tilburg-table-cell>28</td>
          </tr>
        </tbody>
        <tfoot tilburg-table-footer>
          <tr tilburg-table-row>
            <td tilburg-table-cell>Totaal Q1</td>
            <td tilburg-table-cell>82</td>
          </tr>
        </tfoot>
      </tilburg-table>
    `,
  }),
};
