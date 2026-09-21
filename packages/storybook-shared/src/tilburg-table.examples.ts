/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg table. Imported by
   both the React storybook (`packages/storybook`) and the Angular storybook
   (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Ftable';

const intro = `Data table built on \`.utrecht-table\` + \`__header\`, \`__body\`, \`__row\`, \`__header-cell\`, \`__cell\`. The Tilburg layer adds bold header cells with a blue-tint background, zebra-striped body rows (light-blue on odd, white on even), and a heavier top border on the footer row for totals / summaries.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-table caption="Open aanvragen">
  <thead tilburg-table-header>
    <tr tilburg-table-row>
      <th tilburg-table-header-cell scope="col">Zaaknummer</th>
      <th tilburg-table-header-cell scope="col">Status</th>
      <th tilburg-table-header-cell scope="col">Datum</th>
    </tr>
  </thead>
  <tbody tilburg-table-body>
    <tr tilburg-table-row>
      <th tilburg-table-header-cell scope="row">2025-TLB-001</th>
      <td tilburg-table-cell>In behandeling</td>
      <td tilburg-table-cell>15-03-2025</td>
    </tr>
    …
  </tbody>
</tilburg-table>
\`\`\`

Only \`tilburg-table\` is an element. The other seven are **attribute directives** applied to the native table elements — \`[tilburg-table-caption]\`, \`[tilburg-table-header]\`, \`[tilburg-table-body]\`, \`[tilburg-table-footer]\`, \`[tilburg-table-row]\`, \`[tilburg-table-header-cell]\`, \`[tilburg-table-cell]\` — and each is \`tilburg-\`-prefixed, not \`utrecht-\`.`;

const usageReact = `### React

React ships a compound family of real components. Every part renders its own native element (\`<thead>\`, \`<tbody>\`, \`<tr>\`, \`<th>\`, \`<td>\`, …) with the matching \`utrecht-table__*\` class already applied, so you never write those classes by hand.

\`\`\`tsx
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '@gemeente-tilburg/components-react';

const aanvragen = [
  { id: '2025-TLB-001', status: 'In behandeling', datum: '15-03-2025' },
  { id: '2025-TLB-002', status: 'Goedgekeurd', datum: '12-03-2025' },
];

export function OpenAanvragen() {
  return (
    <Table caption="Open aanvragen">
      <TableHeader>
        <TableRow>
          <TableHeaderCell scope="col">Zaaknummer</TableHeaderCell>
          <TableHeaderCell scope="col">Status</TableHeaderCell>
          <TableHeaderCell scope="col">Datum</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {aanvragen.map((aanvraag) => (
          <TableRow key={aanvraag.id}>
            <TableHeaderCell scope="row">{aanvraag.id}</TableHeaderCell>
            <TableCell>{aanvraag.status}</TableCell>
            <TableCell>{aanvraag.datum}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>2 aanvragen</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
\`\`\`

The caption can be written two ways: pass \`caption="Open aanvragen"\` to \`<Table>\` (it renders the \`<caption class="utrecht-table__caption">\` for you, always as the first child), or render \`<TableCaption>Open aanvragen</TableCaption>\` yourself as the first child when the caption needs markup instead of a plain string. Do not do both — you'd get two \`<caption>\` elements.

Props:

- \`Table\` — \`caption?: string\`, plus every \`<table>\` attribute via \`TableHTMLAttributes<HTMLTableElement>\`. Type \`TableProps\`.
- \`TableCaption\` — no component-specific props; \`HTMLAttributes<HTMLTableCaptionElement>\` on \`<caption>\`. Type \`TableCaptionProps\`.
- \`TableHeader\` — no component-specific props; \`HTMLAttributes<HTMLTableSectionElement>\` on \`<thead>\`. Type \`TableHeaderProps\`.
- \`TableBody\` — no component-specific props; \`HTMLAttributes<HTMLTableSectionElement>\` on \`<tbody>\`. Type \`TableBodyProps\`.
- \`TableFooter\` — no component-specific props; \`HTMLAttributes<HTMLTableSectionElement>\` on \`<tfoot>\`. Type \`TableFooterProps\`.
- \`TableRow\` — no component-specific props; \`HTMLAttributes<HTMLTableRowElement>\` on \`<tr>\`. Type \`TableRowProps\`.
- \`TableHeaderCell\` — no component-specific props; \`ThHTMLAttributes<HTMLTableCellElement>\` on \`<th>\`, so \`scope\`, \`colSpan\`, \`rowSpan\`, \`abbr\`. Type \`TableHeaderCellProps\`.
- \`TableCell\` — no component-specific props; \`TdHTMLAttributes<HTMLTableCellElement>\` on \`<td>\`, so \`colSpan\`, \`rowSpan\`, \`headers\`. Type \`TableCellProps\`.

All eight forward their ref to the underlying element and merge any \`className\` you pass on top of the \`utrecht-table*\` class. Always set \`scope="col"\` / \`scope="row"\` on header cells — nothing does it for you.`;

const usagePlainHtml = `### Plain HTML / CSS

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
\`\`\``;

export const description = `${intro}

## Usage

${usageAngular}

${usagePlainHtml}
`;

export const descriptionReact = `${intro}

## Usage

${usageReact}

${usagePlainHtml}
`;

const usageWebComponents = `### Web Components (Stencil)

There is one element, \`<tilburg-webc-table>\`, and no row/cell custom elements. The HTML parser only allows table elements between \`<table>\`, \`<thead>\`/\`<tbody>\`/\`<tfoot>\`, \`<tr>\` and \`<th>\`/\`<td>\`: a custom element there is hoisted out of the table, and a \`<tr>\`/\`<td>\` written outside a \`<table>\` is dropped — all before any JavaScript runs. Angular gets around this with attribute directives on native elements (\`tr[tilburg-table-row]\`), React with components that render native elements; the web component does the same thing by decorating a native table.

**Enhance mode** — wrap a native \`<table>\`. The component adds the \`utrecht-table*\` classes to the table, caption, sections, rows and cells (only this table's own parts, not nested tables), sets \`role="columnheader"\` / \`"rowheader"\` on \`<th>\` from its \`scope\` (like the Angular directive), and re-applies all of it when rows are added later (framework lists, \`insertRow()\`):

\`\`\`html
<tilburg-webc-table caption="Open aanvragen">
  <table>
    <thead>
      <tr>
        <th scope="col">Zaaknummer</th>
        <th scope="col">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">2025-TLB-001</th>
        <td>In behandeling</td>
      </tr>
    </tbody>
    <tfoot>
      <tr><td colspan="2">1 aanvraag</td></tr>
    </tfoot>
  </table>
</tilburg-webc-table>
\`\`\`

The \`caption\` attribute inserts a \`<caption class="utrecht-table__caption">\` as the table's first child; when the table already has its own \`<caption>\` (for markup inside it), that one is kept and classed instead.

**Data mode** — set \`columns\` (and \`rows\`, optionally \`footer-rows\`) and the component renders the whole table itself, header cells with \`scope="col"\`, columns marked \`rowHeader\` as \`<th scope="row">\`:

\`\`\`html
<tilburg-webc-table id="aanvragen" caption="Open aanvragen"></tilburg-webc-table>

<script type="module">
  const table = document.querySelector('#aanvragen');
  table.columns = [
    { key: 'id', label: 'Zaaknummer', rowHeader: true },
    { key: 'status', label: 'Status' },
  ];
  table.rows = [{ id: '2025-TLB-001', status: 'In behandeling' }];
  table.footerRows = [{ id: 'Totaal', status: '1' }];
</script>
\`\`\`

Both arrays can also be written as JSON string attributes (\`columns='[{"key":"id","label":"Zaaknummer"}]'\`). A slotted \`<table>\` is ignored in data mode.

Attributes / properties: \`caption\`, \`columns\` (\`{ key: string; label: string; rowHeader?: boolean }[]\`), \`rows\` and \`footer-rows\` (\`Record<string, string | number | null>[]\`), plus \`aria-label\`, \`aria-labelledby\` and \`aria-describedby\`, which are moved onto the \`<table>\` (Angular's \`ariaLabel\` / \`ariaLabelledby\` / \`ariaDescribedBy\` inputs). No events. Slot: default (the native \`<table>\`, enhance mode). Always set \`scope\` on header cells in enhance mode.`;

export const descriptionWebComponents = `${intro}

## Usage

${usageWebComponents}

${usagePlainHtml}
`;

export const descriptionHtml = `${intro}

## Usage

${usagePlainHtml}
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
    html: `<table class="utrecht-table">
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
    html: `<table class="utrecht-table">
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
