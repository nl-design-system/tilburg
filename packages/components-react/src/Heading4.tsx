import '@gemeente-tilburg/components-css/heading-4/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export type Heading4Props = HTMLAttributes<HTMLHeadingElement>;

export const Heading4 = forwardRef(
  ({ className, children, ...restProps }: PropsWithChildren<Heading4Props>, ref: ForwardedRef<HTMLHeadingElement>) => (
    <h4 ref={ref} className={clsx('utrecht-heading-4', className)} {...restProps}>
      {children}
    </h4>
  ),
);

Heading4.displayName = 'Heading4';
