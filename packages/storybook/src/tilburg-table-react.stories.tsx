/* @license CC0-1.0 */

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tilburg React/Table',
  id: 'tilburg-table-react',
  component: Table,
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

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
        <Table caption="Inwoners van Tilburg">
          <TableHeader>
            <TableRow>
              <TableHeaderCell scope="col">Naam</TableHeaderCell>
              <TableHeaderCell scope="col">Woonplaats</TableHeaderCell>
              <TableHeaderCell scope="col">Postcode</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.name}>
                <TableCell>{r.name}</TableCell>
                <TableCell>{r.city}</TableCell>
                <TableCell>{r.code}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <h4>Met TableCaption + TableFooter</h4>
        <Table>
          <TableCaption>Inwoners (met footer-totaal)</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHeaderCell scope="col">Naam</TableHeaderCell>
              <TableHeaderCell scope="col">Postcode</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.name}>
                <TableCell>{r.name}</TableCell>
                <TableCell>{r.code}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>{rows.length} rijen</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <div>
        <h4>Header met row-scope</h4>
        <Table>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.name}>
                <TableHeaderCell scope="row">{r.name}</TableHeaderCell>
                <TableCell>{r.city}</TableCell>
                <TableCell>{r.code}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  ),
};
