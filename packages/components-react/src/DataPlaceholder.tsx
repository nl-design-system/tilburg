import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes } from 'react';

export interface DataPlaceholderProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  loading?: boolean;
}

export const DataPlaceholder = forwardRef(
  ({ loading, className, ...restProps }: DataPlaceholderProps, ref: ForwardedRef<HTMLSpanElement>) => (
    <span
      ref={ref}
      className={clsx('utrecht-data-placeholder', { 'utrecht-data-placeholder--loading': loading }, className)}
      {...restProps}
    />
  ),
);

DataPlaceholder.displayName = 'DataPlaceholder';
