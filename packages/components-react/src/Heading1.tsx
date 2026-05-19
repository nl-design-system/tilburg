import '@gemeente-tilburg/components-css/heading-1/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export type Heading1Props = HTMLAttributes<HTMLHeadingElement>;

export const Heading1 = forwardRef(
  ({ className, children, ...restProps }: PropsWithChildren<Heading1Props>, ref: ForwardedRef<HTMLHeadingElement>) => (
    <h1 ref={ref} className={clsx('utrecht-heading-1', className)} {...restProps}>
      {children}
    </h1>
  ),
);

Heading1.displayName = 'Heading1';
