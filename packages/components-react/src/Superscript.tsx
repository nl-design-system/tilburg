import '@gemeente-tilburg/components-css/superscript/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export interface SuperscriptProps extends HTMLAttributes<HTMLElement> {
  openType?: boolean;
}

export const Superscript = forwardRef(
  (
    { openType, className, children, ...restProps }: PropsWithChildren<SuperscriptProps>,
    ref: ForwardedRef<HTMLElement>,
  ) => (
    <sup
      ref={ref}
      className={clsx('utrecht-superscript', openType && 'utrecht-superscript--open-type', className)}
      {...restProps}
    >
      {children}
    </sup>
  ),
);

Superscript.displayName = 'Superscript';
