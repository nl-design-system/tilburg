/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg table. Imported by
   both the React storybook (`packages/storybook`) and the Angular storybook
   (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Ftable';

export const description = `Data table built on \`.utrecht-table\` + \`__header\`, \`__body\`, \`__row\`, \`__header-cell\`, \`__cell\`. The Tilburg layer adds bold header cells with a blue-tint background, zebra-striped body rows (light-blue on odd, white on even), and a heavier top border on the footer row for totals / summaries.

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
`;

export interface Example {
  name: string;
  html: string;
}

const rows = [
  { id: '2025-TLB-001234', status: 'In behandeling', date: '15-03-2025' },
  { id: '2025-TLB-001235', status: 'Goedgekeurd', date: '12-03-2025' },
  { id: '2025-TLB-001236', status: 'Afgewezen', date: '10-03-2025' },
  { id: '2025-TLB-001237', status: 'In behandeling', date: '08-03-2025' },
  { id: '2025-TLB-001238', status: 'Goedgekeurd', date: '04-03-2025' },
];

const bodyRows = rows
  .map(
    (row) => `    <tr class="utrecht-table__row">
      <td class="utrecht-table__cell">${row.id}</td>
      <td class="utrecht-table__cell">${row.status}</td>
      <td class="utrecht-table__cell">${row.date}</td>
    </tr>`,
  )
  .join('\n');

export const examples = {
  default: {
    name: 'Default — striped body',
    html: `<table class="utrecht-table" style="min-width:32rem">
  <thead class="utrecht-table__header">
    <tr class="utrecht-table__row">
      <th class="utrecht-table__header-cell">Zaaknummer</th>
      <th class="utrecht-table__header-cell">Status</th>
      <th class="utrecht-table__header-cell">Datum</th>
    </tr>
  </thead>
  <tbody class="utrecht-table__body">
${bodyRows}
  </tbody>
</table>`,
  },
  withCaptionAndFooter: {
    name: 'With caption + footer (totals row)',
    html: `<table class="utrecht-table" style="min-width:32rem">
  <caption class="utrecht-table__caption">Aanvragen per maand</caption>
  <thead class="utrecht-table__header">
    <tr class="utrecht-table__row">
      <th class="utrecht-table__header-cell">Maand</th>
      <th class="utrecht-table__header-cell">Aanvragen</th>
    </tr>
  </thead>
  <tbody class="utrecht-table__body">
    <tr class="utrecht-table__row">
      <td class="utrecht-table__cell">Januari</td>
      <td class="utrecht-table__cell">23</td>
    </tr>
    <tr class="utrecht-table__row">
      <td class="utrecht-table__cell">Februari</td>
      <td class="utrecht-table__cell">31</td>
    </tr>
    <tr class="utrecht-table__row">
      <td class="utrecht-table__cell">Maart</td>
      <td class="utrecht-table__cell">28</td>
    </tr>
  </tbody>
  <tfoot class="utrecht-table__footer">
    <tr class="utrecht-table__row">
      <td class="utrecht-table__cell">Totaal Q1</td>
      <td class="utrecht-table__cell">82</td>
    </tr>
  </tfoot>
</table>`,
  },
} satisfies Record<string, Example>;
