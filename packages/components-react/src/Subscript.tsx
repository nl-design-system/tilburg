import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export type SubscriptProps = HTMLAttributes<HTMLElement>;

export const Subscript = forwardRef(
  ({ className, children, ...restProps }: PropsWithChildren<SubscriptProps>, ref: ForwardedRef<HTMLElement>) => (
    <sub ref={ref} className={clsx('utrecht-subscript', className)} {...restProps}>
      {children}
    </sub>
  ),
);

Subscript.displayName = 'Subscript';
