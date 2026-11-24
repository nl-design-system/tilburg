import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export interface BackdropProps extends HTMLAttributes<HTMLDivElement> {
  /** Cover the whole viewport (`position: fixed`) instead of the nearest positioned ancestor. */
  viewport?: boolean;
}

export const Backdrop = forwardRef(
  (
    { viewport = false, className, children, ...restProps }: PropsWithChildren<BackdropProps>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => (
    <div
      ref={ref}
      className={clsx('utrecht-backdrop', viewport && 'utrecht-backdrop--viewport', className)}
      {...restProps}
    >
      {children}
    </div>
  ),
);

Backdrop.displayName = 'Backdrop';
