import { render, screen } from '@testing-library/react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from './Table';
import '@testing-library/jest-dom';

describe('Table family', () => {
  it('renders a full table tree', () => {
    const { container } = render(
      <Table caption="My table">
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Alice</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>1 row</TableCell>
          </TableRow>
        </TableFooter>
      </Table>,
    );
    expect(container.querySelector('table')).toBeInTheDocument();
    expect(container.querySelector('thead')).toBeInTheDocument();
    expect(container.querySelector('tbody')).toBeInTheDocument();
    expect(container.querySelector('tfoot')).toBeInTheDocument();
    expect(screen.getByText('My table')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('renders a stand-alone TableCaption when used directly', () => {
    const { container } = render(
      <Table>
        <TableCaption>cap</TableCaption>
      </Table>,
    );
    expect(container.querySelector('caption')?.textContent).toBe('cap');
  });
});
