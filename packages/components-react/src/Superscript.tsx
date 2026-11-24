import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export type SuperscriptProps = HTMLAttributes<HTMLElement>;

export const Superscript = forwardRef(
  ({ className, children, ...restProps }: PropsWithChildren<SuperscriptProps>, ref: ForwardedRef<HTMLElement>) => (
    <sup ref={ref} className={clsx('utrecht-superscript', className)} {...restProps}>
      {children}
    </sup>
  ),
);

Superscript.displayName = 'Superscript';
