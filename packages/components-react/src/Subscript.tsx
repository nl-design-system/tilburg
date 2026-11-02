import '@gemeente-tilburg/components-css/subscript/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export interface SubscriptProps extends HTMLAttributes<HTMLElement> {
  openType?: boolean;
}

export const Subscript = forwardRef(
  (
    { openType, className, children, ...restProps }: PropsWithChildren<SubscriptProps>,
    ref: ForwardedRef<HTMLElement>,
  ) => (
    <sub
      ref={ref}
      className={clsx('utrecht-subscript', openType && 'utrecht-subscript--open-type', className)}
      {...restProps}
    >
      {children}
    </sub>
  ),
);

Subscript.displayName = 'Subscript';
