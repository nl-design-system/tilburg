import '@gemeente-tilburg/components-css/table/index.scss';
import clsx from 'clsx';
import {
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from 'react';

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  caption?: string;
}

export const Table = forwardRef(
  (
    { caption, className, children, ...restProps }: PropsWithChildren<TableProps>,
    ref: ForwardedRef<HTMLTableElement>,
  ) => (
    <table ref={ref} className={clsx('utrecht-table', className)} {...restProps}>
      {caption && <caption className="utrecht-table__caption">{caption}</caption>}
      {children}
    </table>
  ),
);
Table.displayName = 'Table';

export type TableBodyProps = HTMLAttributes<HTMLTableSectionElement>;
export const TableBody = forwardRef(
  (
    { className, children, ...restProps }: PropsWithChildren<TableBodyProps>,
    ref: ForwardedRef<HTMLTableSectionElement>,
  ) => (
    <tbody ref={ref} className={clsx('utrecht-table__body', className)} {...restProps}>
      {children}
    </tbody>
  ),
);
TableBody.displayName = 'TableBody';

export type TableCaptionProps = HTMLAttributes<HTMLTableCaptionElement>;
export const TableCaption = forwardRef(
  (
    { className, children, ...restProps }: PropsWithChildren<TableCaptionProps>,
    ref: ForwardedRef<HTMLTableCaptionElement>,
  ) => (
    <caption ref={ref} className={clsx('utrecht-table__caption', className)} {...restProps}>
      {children}
    </caption>
  ),
);
TableCaption.displayName = 'TableCaption';

export type TableCellProps = TdHTMLAttributes<HTMLTableCellElement>;
export const TableCell = forwardRef(
  (
    { className, children, ...restProps }: PropsWithChildren<TableCellProps>,
    ref: ForwardedRef<HTMLTableCellElement>,
  ) => (
    <td ref={ref} className={clsx('utrecht-table__cell', className)} {...restProps}>
      {children}
    </td>
  ),
);
TableCell.displayName = 'TableCell';

export type TableFooterProps = HTMLAttributes<HTMLTableSectionElement>;
export const TableFooter = forwardRef(
  (
    { className, children, ...restProps }: PropsWithChildren<TableFooterProps>,
    ref: ForwardedRef<HTMLTableSectionElement>,
  ) => (
    <tfoot ref={ref} className={clsx('utrecht-table__footer', className)} {...restProps}>
      {children}
    </tfoot>
  ),
);
TableFooter.displayName = 'TableFooter';

export type TableHeaderProps = HTMLAttributes<HTMLTableSectionElement>;
export const TableHeader = forwardRef(
  (
    { className, children, ...restProps }: PropsWithChildren<TableHeaderProps>,
    ref: ForwardedRef<HTMLTableSectionElement>,
  ) => (
    <thead ref={ref} className={clsx('utrecht-table__header', className)} {...restProps}>
      {children}
    </thead>
  ),
);
TableHeader.displayName = 'TableHeader';

export type TableHeaderCellProps = ThHTMLAttributes<HTMLTableCellElement>;
export const TableHeaderCell = forwardRef(
  (
    { className, children, ...restProps }: PropsWithChildren<TableHeaderCellProps>,
    ref: ForwardedRef<HTMLTableCellElement>,
  ) => (
    <th ref={ref} className={clsx('utrecht-table__header-cell', className)} {...restProps}>
      {children}
    </th>
  ),
);
TableHeaderCell.displayName = 'TableHeaderCell';

export type TableRowProps = HTMLAttributes<HTMLTableRowElement>;
export const TableRow = forwardRef(
  ({ className, children, ...restProps }: PropsWithChildren<TableRowProps>, ref: ForwardedRef<HTMLTableRowElement>) => (
    <tr ref={ref} className={clsx('utrecht-table__row', className)} {...restProps}>
      {children}
    </tr>
  ),
);
TableRow.displayName = 'TableRow';
