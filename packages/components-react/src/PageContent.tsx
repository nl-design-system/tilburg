import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export type PageContentProps = HTMLAttributes<HTMLDivElement>;

export const PageContent = forwardRef(
  ({ className, children, ...restProps }: PropsWithChildren<PageContentProps>, ref: ForwardedRef<HTMLDivElement>) => (
    <div ref={ref} className={clsx('utrecht-page-content', className)} {...restProps}>
      {children}
    </div>
  ),
);

PageContent.displayName = 'PageContent';
