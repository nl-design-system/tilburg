import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export type PageProps = HTMLAttributes<HTMLDivElement>;

export const Page = forwardRef(
  ({ className, children, ...restProps }: PropsWithChildren<PageProps>, ref: ForwardedRef<HTMLDivElement>) => (
    <div ref={ref} className={clsx('utrecht-page', className)} {...restProps}>
      {children}
    </div>
  ),
);

Page.displayName = 'Page';
