import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export interface ColumnLayoutProps extends HTMLAttributes<HTMLDivElement> {
  /** Draw a line between the columns. */
  rule?: boolean;
}

export const ColumnLayout = forwardRef(
  (
    { rule = false, className, children, ...restProps }: PropsWithChildren<ColumnLayoutProps>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => (
    <div
      ref={ref}
      className={clsx('utrecht-column-layout', rule && 'utrecht-column-layout--rule', className)}
      {...restProps}
    >
      {children}
    </div>
  ),
);

ColumnLayout.displayName = 'ColumnLayout';
