import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export type PageContentProps = HTMLAttributes<HTMLElement>;

export const PageContent = forwardRef(
  ({ className, children, ...restProps }: PropsWithChildren<PageContentProps>, ref: ForwardedRef<HTMLElement>) => (
    <main ref={ref} className={clsx('utrecht-page-content', className)} {...restProps}>
      {children}
    </main>
  ),
);

PageContent.displayName = 'PageContent';
