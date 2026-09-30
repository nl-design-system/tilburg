import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export type ArticleProps = HTMLAttributes<HTMLElement>;

export const Article = forwardRef(
  ({ className, children, ...restProps }: PropsWithChildren<ArticleProps>, ref: ForwardedRef<HTMLElement>) => (
    <article ref={ref} className={clsx('utrecht-article', className)} {...restProps}>
      {children}
    </article>
  ),
);

Article.displayName = 'Article';
