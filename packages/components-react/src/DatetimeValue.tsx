import clsx from 'clsx';
import { ForwardedRef, forwardRef, PropsWithChildren, TimeHTMLAttributes } from 'react';

export type DatetimeValueProps = TimeHTMLAttributes<HTMLTimeElement>;

export const DatetimeValue = forwardRef(
  (
    { className, children, ...restProps }: PropsWithChildren<DatetimeValueProps>,
    ref: ForwardedRef<HTMLTimeElement>,
  ) => (
    <time ref={ref} className={clsx('utrecht-value-datetime', className)} {...restProps}>
      {children}
    </time>
  ),
);

DatetimeValue.displayName = 'DatetimeValue';
