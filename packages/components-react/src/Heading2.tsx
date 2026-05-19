import '@gemeente-tilburg/components-css/heading-2/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export type Heading2Props = HTMLAttributes<HTMLHeadingElement>;

export const Heading2 = forwardRef(
  ({ className, children, ...restProps }: PropsWithChildren<Heading2Props>, ref: ForwardedRef<HTMLHeadingElement>) => (
    <h2 ref={ref} className={clsx('utrecht-heading-2', className)} {...restProps}>
      {children}
    </h2>
  ),
);

Heading2.displayName = 'Heading2';
