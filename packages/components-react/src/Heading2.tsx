import '@gemeente-tilburg/components-css/heading-2/index.scss';
import { createElement, ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export type Heading2Props = HTMLAttributes<HTMLHeadingElement>;

export const Heading2 = forwardRef(
  ({ className, children, ...restProps }: PropsWithChildren<Heading2Props>, ref: ForwardedRef<HTMLHeadingElement>) =>
    createElement(
      'utrecht-heading-2',
      { className },
      <h2 ref={ref} className="utrecht-heading-2" {...restProps}>
        {children}
      </h2>,
    ),
);

Heading2.displayName = 'Heading2';
