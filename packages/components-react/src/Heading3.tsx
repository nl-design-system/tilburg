import '@gemeente-tilburg/components-css/heading-3/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export type Heading3Props = HTMLAttributes<HTMLHeadingElement>;

export const Heading3 = forwardRef(
  ({ className, children, ...restProps }: PropsWithChildren<Heading3Props>, ref: ForwardedRef<HTMLHeadingElement>) => (
    <h3 ref={ref} className={clsx('utrecht-heading-3', className)} {...restProps}>
      {children}
    </h3>
  ),
);

Heading3.displayName = 'Heading3';
