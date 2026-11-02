import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export type UrlDataProps = HTMLAttributes<HTMLElement>;

export const UrlData = forwardRef(
  ({ className, children, ...restProps }: PropsWithChildren<UrlDataProps>, ref: ForwardedRef<HTMLElement>) => (
    <bdi ref={ref} translate="no" className={clsx('utrecht-url-data', className)} {...restProps}>
      {children}
    </bdi>
  ),
);

UrlData.displayName = 'UrlData';
