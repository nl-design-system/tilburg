import '@gemeente-tilburg/components-css/data-badge/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export interface DataBadgeProps extends HTMLAttributes<HTMLElement> {
  /** Renders a `<time datetime>` (date, time or duration). Wins over `value`. */
  dateTime?: string;
  /** Renders a `<data value>` with a machine-readable value. */
  value?: string;
}

export const DataBadge = forwardRef(
  (
    { dateTime, value, className, children, ...restProps }: PropsWithChildren<DataBadgeProps>,
    ref: ForwardedRef<HTMLElement>,
  ) => {
    const props = { ...restProps, className: clsx('utrecht-data-badge', className), children };
    if (dateTime !== undefined)
      return <time ref={ref as ForwardedRef<HTMLTimeElement>} dateTime={dateTime} {...props} />;
    if (value !== undefined) return <data ref={ref as ForwardedRef<HTMLDataElement>} value={value} {...props} />;
    return <span ref={ref} {...props} />;
  },
);

DataBadge.displayName = 'DataBadge';
