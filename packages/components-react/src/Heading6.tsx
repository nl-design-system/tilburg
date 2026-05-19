import '@gemeente-tilburg/components-css/heading-6/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export type Heading6Props = HTMLAttributes<HTMLHeadingElement>;

export const Heading6 = forwardRef(
  ({ className, children, ...restProps }: PropsWithChildren<Heading6Props>, ref: ForwardedRef<HTMLHeadingElement>) => (
    <h6 ref={ref} className={clsx('utrecht-heading-6', className)} {...restProps}>
      {children}
    </h6>
  ),
);

Heading6.displayName = 'Heading6';
