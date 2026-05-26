import '@gemeente-tilburg/components-css/heading-6/index.scss';
import { createElement, ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export type Heading6Props = HTMLAttributes<HTMLHeadingElement>;

export const Heading6 = forwardRef(
  ({ className, children, ...restProps }: PropsWithChildren<Heading6Props>, ref: ForwardedRef<HTMLHeadingElement>) =>
    createElement(
      'utrecht-heading-6',
      { className },
      <h6 ref={ref} className="utrecht-heading-6" {...restProps}>
        {children}
      </h6>,
    ),
);

Heading6.displayName = 'Heading6';
