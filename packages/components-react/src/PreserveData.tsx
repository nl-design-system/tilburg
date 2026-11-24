import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export interface PreserveDataProps extends HTMLAttributes<HTMLElement> {
  dateTime?: string;
  value?: string;
}

export const PreserveData = forwardRef(
  (
    { dateTime, value, className, children, ...restProps }: PropsWithChildren<PreserveDataProps>,
    ref: ForwardedRef<HTMLElement>,
  ) => {
    const props = { ...restProps, className: clsx('utrecht-preserve-data', className) };
    const text = <bdi translate="no">{children}</bdi>;
    if (dateTime !== undefined)
      return (
        <time ref={ref as ForwardedRef<HTMLTimeElement>} dateTime={dateTime} {...props}>
          {text}
        </time>
      );
    if (value !== undefined)
      return (
        <data ref={ref as ForwardedRef<HTMLDataElement>} value={value} {...props}>
          {text}
        </data>
      );
    return (
      <bdi ref={ref} translate="no" {...props}>
        {children}
      </bdi>
    );
  },
);

PreserveData.displayName = 'PreserveData';
