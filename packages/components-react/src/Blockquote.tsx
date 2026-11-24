import clsx from 'clsx';
import { BlockquoteHTMLAttributes, ForwardedRef, forwardRef, PropsWithChildren, ReactNode } from 'react';

export interface BlockquoteProps extends BlockquoteHTMLAttributes<HTMLQuoteElement> {
  attribution?: ReactNode;
}

export const Blockquote = forwardRef(
  (
    { attribution, className, children, ...restProps }: PropsWithChildren<BlockquoteProps>,
    ref: ForwardedRef<HTMLQuoteElement>,
  ) => (
    <blockquote ref={ref} className={clsx('utrecht-blockquote', className)} {...restProps}>
      <div className="utrecht-blockquote__content">{children}</div>
      {attribution && <div className="utrecht-blockquote__attribution">{attribution}</div>}
    </blockquote>
  ),
);

Blockquote.displayName = 'Blockquote';
