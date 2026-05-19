import '@gemeente-tilburg/components-css/html-content/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export type HtmlContentProps = HTMLAttributes<HTMLDivElement>;

/* `utrecht-html-content` is the class Tilburg's SCSS targets to map bare HTML
   inside CMS-authored content to the Tilburg typography token chain. */
export const HtmlContent = forwardRef(
  ({ className, children, ...restProps }: PropsWithChildren<HtmlContentProps>, ref: ForwardedRef<HTMLDivElement>) => (
    <div ref={ref} className={clsx('utrecht-html-content', className)} {...restProps}>
      {children}
    </div>
  ),
);

HtmlContent.displayName = 'HtmlContent';
