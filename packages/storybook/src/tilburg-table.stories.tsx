/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tilburg/Table',
  id: 'tilburg-table',
  tags: ['autodocs'],
  parameters: {
    bugs: 'https://github.com/nl-design-system/tilburg/labels/component%2Ftable',
    docs: {
      description: {
        component: `Data table built on \`.utrecht-table\` + \`__header\`, \`__body\`, \`__row\`, \`__header-cell\`, \`__cell\`. The Tilburg layer adds bold header cells with a blue-tint background, zebra-striped body rows (light-blue on odd, white on even), and a heavier top border on the footer row for totals / summaries.

## Usage

### Angular

\`\`\`html
<tilburg-table caption="Open aanvragen">
  <tilburg-table-header>
    <tr utrecht-table-row>
      <th utrecht-table-header-cell>Zaaknummer</th>
      <th utrecht-table-header-cell>Status</th>
      <th utrecht-table-header-cell>Datum</th>
    </tr>
  </tilburg-table-header>
  <tilburg-table-body>
    <tr utrecht-table-row>
      <td utrecht-table-cell>2025-TLB-001</td>
      <td utrecht-table-cell>In behandeling</td>
      <td utrecht-table-cell>15-03-2025</td>
    </tr>
    …
  </tilburg-table-body>
</tilburg-table>
\`\`\`

### Plain HTML / CSS

\`\`\`html
<table class="utrecht-table">
  <caption class="utrecht-table__caption">Open aanvragen</caption>
  <thead class="utrecht-table__header">
    <tr class="utrecht-table__row">
      <th class="utrecht-table__header-cell">Zaaknummer</th>
      <th class="utrecht-table__header-cell">Status</th>
    </tr>
  </thead>
  <tbody class="utrecht-table__body">
    <tr class="utrecht-table__row">
      <td class="utrecht-table__cell">2025-TLB-001</td>
      <td class="utrecht-table__cell">In behandeling</td>
    </tr>
  </tbody>
</table>
\`\`\`
`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const rows = [
  { id: '2025-TLB-001234', status: 'In behandeling', date: '15-03-2025' },
  { id: '2025-TLB-001235', status: 'Goedgekeurd', date: '12-03-2025' },
  { id: '2025-TLB-001236', status: 'Afgewezen', date: '10-03-2025' },
  { id: '2025-TLB-001237', status: 'In behandeling', date: '08-03-2025' },
  { id: '2025-TLB-001238', status: 'Goedgekeurd', date: '04-03-2025' },
];

export const Default: Story = {
  name: 'Default — striped body',
  render: () => (
    <table className="utrecht-table" style={{ minWidth: '32rem' }}>
      <thead className="utrecht-table__header">
        <tr className="utrecht-table__row">
          <th className="utrecht-table__header-cell">Zaaknummer</th>
          <th className="utrecht-table__header-cell">Status</th>
          <th className="utrecht-table__header-cell">Datum</th>
        </tr>
      </thead>
      <tbody className="utrecht-table__body">
        {rows.map((row) => (
          <tr key={row.id} className="utrecht-table__row">
            <td className="utrecht-table__cell">{row.id}</td>
            <td className="utrecht-table__cell">{row.status}</td>
            <td className="utrecht-table__cell">{row.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
};

export const WithCaptionAndFooter: Story = {
  name: 'With caption + footer (totals row)',
  render: () => (
    <table className="utrecht-table" style={{ minWidth: '32rem' }}>
      <caption className="utrecht-table__caption">Aanvragen per maand</caption>
      <thead className="utrecht-table__header">
        <tr className="utrecht-table__row">
          <th className="utrecht-table__header-cell">Maand</th>
          <th className="utrecht-table__header-cell">Aanvragen</th>
        </tr>
      </thead>
      <tbody className="utrecht-table__body">
        <tr className="utrecht-table__row">
          <td className="utrecht-table__cell">Januari</td>
          <td className="utrecht-table__cell">23</td>
        </tr>
        <tr className="utrecht-table__row">
          <td className="utrecht-table__cell">Februari</td>
          <td className="utrecht-table__cell">31</td>
        </tr>
        <tr className="utrecht-table__row">
          <td className="utrecht-table__cell">Maart</td>
          <td className="utrecht-table__cell">28</td>
        </tr>
      </tbody>
      <tfoot className="utrecht-table__footer">
        <tr className="utrecht-table__row">
          <td className="utrecht-table__cell">Totaal Q1</td>
          <td className="utrecht-table__cell">82</td>
        </tr>
      </tfoot>
    </table>
  ),
};
