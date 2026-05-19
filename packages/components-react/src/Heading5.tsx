import '@gemeente-tilburg/components-css/heading-5/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export type Heading5Props = HTMLAttributes<HTMLHeadingElement>;

export const Heading5 = forwardRef(
  ({ className, children, ...restProps }: PropsWithChildren<Heading5Props>, ref: ForwardedRef<HTMLHeadingElement>) => (
    <h5 ref={ref} className={clsx('utrecht-heading-5', className)} {...restProps}>
      {children}
    </h5>
  ),
);

Heading5.displayName = 'Heading5';
