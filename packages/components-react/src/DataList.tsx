import '@gemeente-tilburg/components-css/data-list/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export interface DataListProps extends HTMLAttributes<HTMLDListElement> {
  large?: boolean;
}

export const DataList = forwardRef(
  (
    { large, className, children, ...restProps }: PropsWithChildren<DataListProps>,
    ref: ForwardedRef<HTMLDListElement>,
  ) => (
    <dl ref={ref} className={clsx('tilburg-data-list', large && 'tilburg-data-list--large', className)} {...restProps}>
      {children}
    </dl>
  ),
);
DataList.displayName = 'DataList';

export type DataListItemProps = HTMLAttributes<HTMLDivElement>;
export const DataListItem = forwardRef(
  ({ className, children, ...restProps }: PropsWithChildren<DataListItemProps>, ref: ForwardedRef<HTMLDivElement>) => (
    <div ref={ref} className={clsx('tilburg-data-list__item', className)} {...restProps}>
      {children}
    </div>
  ),
);
DataListItem.displayName = 'DataListItem';

export type DataListKeyProps = HTMLAttributes<HTMLElement>;
export const DataListKey = forwardRef(
  ({ className, children, ...restProps }: PropsWithChildren<DataListKeyProps>, ref: ForwardedRef<HTMLElement>) => (
    <dt ref={ref} className={clsx('tilburg-data-list__key', className)} {...restProps}>
      {children}
    </dt>
  ),
);
DataListKey.displayName = 'DataListKey';

export type DataListValueProps = HTMLAttributes<HTMLElement>;
export const DataListValue = forwardRef(
  ({ className, children, ...restProps }: PropsWithChildren<DataListValueProps>, ref: ForwardedRef<HTMLElement>) => (
    <dd ref={ref} className={clsx('tilburg-data-list__value', className)} {...restProps}>
      {children}
    </dd>
  ),
);
DataListValue.displayName = 'DataListValue';
